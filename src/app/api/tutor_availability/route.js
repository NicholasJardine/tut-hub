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
