// import { Pool } from 'pg';

// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'tuthub',
//   password: 'Milkyway147!',
//   port: 5432,
// });

// // Handle POST requests
// export async function POST(req) {
//   try {
//     const body = await req.json(); // Parse the body content
//     const { tutor_id, available_date, available_start_time, status } = body;
    
//     console.log('Request body:', body); // Log the request body to ensure values are being received correctly


//     const cookieHeader = req.headers.cookie;
//     const token = cookieHeader?.split('; ').find(row => row.startsWith('token=')).split('=')[1];

//     if (!token) {
//       return res.status(401).json({ message: 'No token provided' });
//     }

//     // Validate incoming data
//     if (!tutor_id || !available_date || !available_start_time || !status) {
//       console.error('Missing required fields');
//       return new Response(JSON.stringify({ message: 'Missing required fields' }), { status: 400 });
//     }


//     try{
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         const tutor_id = decoded.userId; 
//         const query = `
//         INSERT INTO availability (tutor_id, available_date, available_start_time, status)
//         VALUES ($1, $2, $3, $4)
//       `;
//       await pool.query(query, [tutor_id, available_date, available_start_time, status]);

//       res.status(200).json({ message: 'Availability updated successfully' });
//     }catch{

//     }
    
//   } catch (error) {
//     console.error('Error updating availability:', error); // Log the actual error
//     return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
//   }
// }



import { Pool } from 'pg';
import jwt from 'jsonwebtoken'; // Make sure to import jwt
import { NextResponse } from 'next/server'; // Use Next.js Response
import path from 'path';
import fs from 'fs';
const certPath = path.resolve('src/assets/af-south-1-bundle.pem');
console.log('Resolved path to the certificate:', certPath); 

const sslConfig = {
  rejectUnauthorized: true,
  ca: fs.readFileSync(certPath).toString(),
};

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
  ssl:sslConfig,
});

// Handle POST requests
export async function POST(req) {
  try {
    const body = await req.json(); // Parse the body content
    const { available_date, available_start_time, status } = body;

    // Extract token from the cookie header
    const cookieHeader = req.headers.get('cookie');
    const token = cookieHeader?.split('; ').find(row => row.startsWith('token=')).split('=')[1];

    if (!token) {
      return NextResponse.json({ message: 'No token provided' }, { status: 401 });
    }

    // Verify the JWT token to get the tutor_id
    let tutor_id;
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      tutor_id = decoded.userId; // Get the userId from the token (tutor ID)
    } catch (error) {
      console.error('Token verification failed:', error);
      return NextResponse.json({ message: 'Invalid token' }, { status: 403 });
    }

    // Validate the incoming data
    if (!available_date || !available_start_time || !status) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    // Insert into the availability table
    const query = `
      INSERT INTO availability (tutor_id, available_date, available_start_time, status)
      VALUES ($1, $2, $3, $4);
    `;
    await pool.query(query, [tutor_id, available_date, available_start_time, status]);

    return NextResponse.json({ message: 'Availability updated successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error updating availability:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(req) {
    // Get the JWT token from the cookies in the request headers
    const cookieHeader = req.headers.get('cookie');
    const token = cookieHeader
      ? cookieHeader.split('; ').find(row => row.startsWith('token=')).split('=')[1]
      : null;
  
    if (!token) {
      return new Response(JSON.stringify({ message: 'No token provided' }), { status: 401 });
    }
  
    try {
      // Verify and decode the JWT token (Assuming we will use this token for further authentication)
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.userId;
      console.log("Tutor/User ID:", userId);  // Log the tutor/user ID


      // Fetch the tutors' details along with profile information using INNER JOIN
      const result = await pool.query(`
        SELECT  * FROM availability WHERE tutor_id = $1 AND status = 'unavailable'
      `, [userId]);
  
      if (result.rows.length === 0) {
        return new Response(JSON.stringify({ message: 'All slots are available' }), { status: 404 });
      }
  
      const availabilities = result.rows;
      console.log(availabilities)
      // Return the tutors' data with profile information in the response
      return new Response(JSON.stringify({ availabilities: availabilities }), { status: 200 });
    } catch (error) {
      console.error('Error fetching tutors or invalid token:', error);
      return new Response(JSON.stringify({ message: 'Invalid token or server error' }), { status: 403 });
    }
  }

