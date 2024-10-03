import bcrypt from 'bcryptjs';
import { Pool } from 'pg';
import jwt from 'jsonwebtoken';  // Import the jsonwebtoken package

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
  ssl: sslConfig
});

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
        SELECT  * FROM bookings WHERE tutor_id = $1 AND status = 'booked'
      `, [userId]);
  
      if (result.rows.length === 0) {
        return new Response(JSON.stringify({ message: 'No bookings found' }), { status: 404 });
      }
  
      const bookings = result.rows;
      console.log(bookings)
      // Return the tutors' data with profile information in the response
      return new Response(JSON.stringify({ bookings: bookings }), { status: 200 });
    } catch (error) {
      console.error('Error fetching tutors or invalid token:', error);
      return new Response(JSON.stringify({ message: 'Invalid token or server error' }), { status: 403 });
    }
  }


  const JWT_SECRET = process.env.JWT_SECRET;
  
  export async function POST(req) {
    try {
      const body = await req.json();
      const { tutor_id, booking_date, appointment_time } = body;
  
      // Get token from headers to verify and extract student information
      const token = req.headers.get('cookie')
        ?.split('; ')
        .find(row => row.startsWith('token='))
        ?.split('=')[1];
      
      if (!token) {
        return new Response(JSON.stringify({ message: 'No token provided' }), { status: 401 });
      }
  
      // Decode the JWT to extract the user information
      const decoded = jwt.verify(token, JWT_SECRET);
      const { userId, role } = decoded;
  
      if (role !== 'student') {
        return new Response(JSON.stringify({ message: 'Only students can book a tutor' }), { status: 403 });
      }
  
      // Insert the booking into the 'bookings' table
      const result = await pool.query(
        `INSERT INTO bookings (tutor_id, student_id, booking_date, appointment_time, status) 
         VALUES ($1, $2, $3, $4, 'booked') RETURNING id`,
        [tutor_id, userId, booking_date, appointment_time]
      );
  
      const bookingId = result.rows[0].id;
  
      return new Response(JSON.stringify({ message: 'Booking successful', bookingId }), { status: 200 });
    } catch (error) {
      console.error('Error creating booking:', error);
      return new Response(JSON.stringify({ message: 'Server error' }), { status: 500 });
    }
  }
  