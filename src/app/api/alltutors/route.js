import bcrypt from 'bcryptjs';
import { Pool } from 'pg';
import jwt from 'jsonwebtoken';  // Import the jsonwebtoken package
import { headers } from 'next/headers';

const pool = new Pool({
    user: 'postgres', // PostgreSQL username
    host: 'localhost',     // Database host (e.g., localhost)
    database: 'tuthub',   // Your database name
    password: 'Milkyway147!', // PostgreSQL password
    port: 5432,            // PostgreSQL port (default is 5432)
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
      // Verify and decode the JWT token
    //   const decoded = jwt.verify(token, JWT_SECRET);
    //   const userId = decoded.userId;
  
      // Fetch the user's details from the database using the userId
    //   const result = await pool.query('SELECT full_name FROM tutors WHERE id = $1', [userId]);
      const result = await pool.query('SELECT full_name, email FROM tutors');
  
      if (result.rows.length === 0) {
        return new Response(JSON.stringify({ message: 'Tutors not found' }), { status: 404 });
      }
  
      const users = result.rows;
  
      // Return the user's full name in the response
      return new Response(JSON.stringify({ tutors: users }), { status: 200 });
    } catch (error) {
      console.error('Invalid token:', error);
      return new Response(JSON.stringify({ message: 'Invalid token or server error' }), { status: 403 });
    }
  }