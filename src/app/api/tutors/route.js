// POST: Create a new tutor


import { Pool } from 'pg';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
// Set up the PostgreSQL connection pool
const pool = new Pool({
  user: 'postgres', // PostgreSQL username
  host: 'localhost',     // Database host (e.g., localhost)
  database: 'tuthub',   // Your database name
  password: 'Milkyway147!', // PostgreSQL password
  port: 5432,            // PostgreSQL port (default is 5432)
});

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req) {
    const body = await req.json();
    const { full_name, email, user_password } = body;
  
    try {

      const hashedPassword = await bcrypt.hash(user_password, 10);
      // Database logic to insert a new tutor
      // Assuming you have your PostgreSQL connection set up
      const result = await pool.query(
        `INSERT INTO tutors (full_name, email, user_password)
        VALUES ($1, $2, $3) RETURNING id`,
        [full_name, email, hashedPassword]
      );

      const newUser = result.rows[0];
      const token = jwt.sign({userId: newUser.id, email, full_name}, JWT_SECRET, {expiresIn:'1h'});
  
      return new Response(JSON.stringify({ message: "You've signed up successfully!"}), {
        status: 200,
        headers:{
        'Set-Cookie': `token=${token}; HttpOnly; Secure; Path=/; Max-Age=3600; SameSite=Strict`,    
        }
      });
    } catch (error) {
      console.error('Error creating tutor:', error);
      return new Response(JSON.stringify({ message: 'Error creating tutor' }), { status: 500 });
    }
  }
  
  // GET: Fetch all tutors
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
      const decoded = jwt.verify(token, JWT_SECRET);
      const userId = decoded.userId;
  
      // Fetch the user's details from the database using the userId
      const result = await pool.query('SELECT full_name FROM tutors WHERE id = $1', [userId]);
  
      if (result.rows.length === 0) {
        return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
      }
  
      const user = result.rows[0];
  
      // Return the user's full name in the response
      return new Response(JSON.stringify({ full_name: user.full_name }), { status: 200 });
    } catch (error) {
      console.error('Invalid token:', error);
      return new Response(JSON.stringify({ message: 'Invalid token' }), { status: 403 });
    }
  }