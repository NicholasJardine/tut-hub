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

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'tuthub',
  password: 'Milkyway147!',
  port: 5432,
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
