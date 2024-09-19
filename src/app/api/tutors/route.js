// POST: Create a new tutor


import { Pool } from 'pg';
import bcrypt from 'bcryptjs';

// Set up the PostgreSQL connection pool
const pool = new Pool({
  user: 'postgres', // PostgreSQL username
  host: 'localhost',     // Database host (e.g., localhost)
  database: 'tuthub',   // Your database name
  password: 'Milkyway147!', // PostgreSQL password
  port: 5432,            // PostgreSQL port (default is 5432)
});


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
  
      return new Response(JSON.stringify({ message: 'Tutor created successfully', tutorId: result.rows[0].id }), {
        status: 200,
      });
    } catch (error) {
      console.error('Error creating tutor:', error);
      return new Response(JSON.stringify({ message: 'Error creating tutor' }), { status: 500 });
    }
  }
  
  // GET: Fetch all tutors
  export async function GET() {
    try {
      const result = await pool.query('SELECT * FROM tutors');
      return new Response(JSON.stringify(result.rows), { status: 200 });
    } catch (error) {
      console.error('Error fetching tutors:', error);
      return new Response(JSON.stringify({ message: 'Error fetching tutors' }), { status: 500 });
    }
  }
  