import bcrypt from 'bcryptjs';
import { Pool } from 'pg';
import jwt from 'jsonwebtoken';  // Import the jsonwebtoken package

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
