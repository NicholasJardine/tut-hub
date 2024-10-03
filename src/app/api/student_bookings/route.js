import { Pool } from 'pg';
import jwt from 'jsonwebtoken';
import path from 'path';
import fs from 'fs';
const certPath = path.resolve('src/assets/af-south-1-bundle.pem');
console.log('Resolved path to the certificate:', certPath); 

const sslConfig = {
  rejectUnauthorized: true,
  ca: fs.readFileSync(certPath).toString(),
};
// Set up the PostgreSQL connection pool
const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
  ssl: sslConfig
});

// // GET: Fetch bookings for a specific tutor
// export async function GET(req) {
//   const { searchParams } = new URL(req.url); // Extract query parameters from the request URL
//   const tutor_id = searchParams.get('tutorId'); // Get the 'tutorId' parameter

//   if (!tutor_id) {
//     return new Response(JSON.stringify({ message: 'Tutor ID is required' }), { status: 400 });
//   }

//   try {
//     // Query the database to get bookings for the tutor
//     const result = await pool.query(
//       `SELECT * FROM bookings WHERE tutor_id = $1`,
//       [tutor_id]
//     );

//     if (result.rows.length === 0) {
//       return new Response(JSON.stringify({ message: 'No bookings found for this tutor' }), { status: 404 });
//     }

//     // Return the bookings data in JSON format
//     return new Response(JSON.stringify({ bookings: result.rows }), { status: 200 });
//   } catch (error) {
//     console.error('Error fetching bookings:', error);
//     return new Response(JSON.stringify({ message: 'Internal server error' }), { status: 500 });
//   }
// }


// export async function GET(req) {
//     // Get the JWT token from the cookies in the request headers
//     const cookieHeader = req.headers.get('cookie');
//     const token = cookieHeader
//       ? cookieHeader.split('; ').find(row => row.startsWith('token=')).split('=')[1]
//       : null;
  
//     if (!token) {
//       return new Response(JSON.stringify({ message: 'No token provided' }), { status: 401 });
//     }
  
//     try {
//       // Verify and decode the JWT token (Assuming we will use this token for further authentication)
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       const userId = decoded.userId;
//       console.log("Tutor/User ID:", userId);  // Log the tutor/user ID


//       // Fetch the tutors' details along with profile information using INNER JOIN
//       const result = await pool.query(`
//         SELECT  * FROM bookings WHERE tutor_id = $1 AND status = 'booked'
//       `, [userId]);
  
//       if (result.rows.length === 0) {
//         return new Response(JSON.stringify({ message: 'No bookings found' }), { status: 404 });
//       }
  
//       const bookings = result.rows;
//       console.log(bookings)
//       // Return the tutors' data with profile information in the response
//       return new Response(JSON.stringify({ bookings: bookings }), { status: 200 });
//     } catch (error) {
//       console.error('Error fetching tutors or invalid token:', error);
//       return new Response(JSON.stringify({ message: 'Invalid token or server error' }), { status: 403 });
//     }
//   }




// api/student_bookings/route.js

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const tutorId = searchParams.get('tutorId');
  
  if (!tutorId) {
    return new Response(JSON.stringify({ message: 'No tutor ID provided' }), { status: 400 });
  }

  // Get JWT token from cookies
  const cookieHeader = req.headers.get('cookie');
  const token = cookieHeader ? cookieHeader.split('; ').find(row => row.startsWith('token=')).split('=')[1] : null;

  if (!token) {
    return new Response(JSON.stringify({ message: 'No token provided' }), { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { userId, role } = decoded;

    // Only allow students to access this API
    if (role !== 'student') {
      return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 403 });
    }

    // Fetch the bookings for the specific tutor
    const result = await pool.query(`
      SELECT * FROM bookings WHERE tutor_id = $1 AND status = 'booked'
    `, [tutorId]);

    if (result.rows.length === 0) {
      return new Response(JSON.stringify({ message: 'No bookings found' }), { status: 404 });
    }

    const bookings = result.rows;
    return new Response(JSON.stringify({ bookings }), { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ message: 'Invalid token or server error' }), { status: 403 });
  }
}

export async function POST(req) {
  // Get JWT token from cookies
  const cookieHeader = req.headers.get('cookie');
  const token = cookieHeader ? cookieHeader.split('; ').find(row => row.startsWith('token=')).split('=')[1] : null;

  if (!token) {
    return new Response(JSON.stringify({ message: 'No token provided' }), { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { userId, role } = decoded;

    // Only allow students to create bookings
    if (role !== 'student') {
      return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 403 });
    }

    const body = await req.json();
    const { tutor_id, booking_date, appointment_time } = body;

    if (!tutor_id || !booking_date || !appointment_time) {
      return new Response(JSON.stringify({ message: 'Missing required booking data' }), { status: 400 });
    }

    // Insert the new booking into the database
    const result = await pool.query(
      `INSERT INTO bookings (tutor_id, student_id, booking_date, appointment_time, status)
       VALUES ($1, $2, $3, $4, $5) RETURNING id`,
      [tutor_id, userId, booking_date, appointment_time, 'booked']
    );

    const newBooking = result.rows[0];

    return new Response(JSON.stringify({ message: 'Booking successful', booking: newBooking }), { status: 201 });
  } catch (error) {
    console.error('Error creating booking:', error);
    return new Response(JSON.stringify({ message: 'Invalid token or server error' }), { status: 403 });
  }
}
