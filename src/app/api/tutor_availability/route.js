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

    // Fetch the availability for the specific tutor
    const result = await pool.query(`
      SELECT * FROM availability WHERE tutor_id = $1 AND status = 'unavailable'
    `, [tutorId]);

    if (result.rows.length === 0) {
      return new Response(JSON.stringify({ message: 'All slots are available' }), { status: 404 });
    }

    const availabilities = result.rows;
    return new Response(JSON.stringify({ availabilities }), { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ message: 'Invalid token or server error' }), { status: 403 });
  }
}
