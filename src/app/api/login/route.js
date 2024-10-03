// import bcrypt from 'bcryptjs';
// import { Pool } from 'pg';
// import jwt from 'jsonwebtoken';  // Import the jsonwebtoken package
// import { headers } from 'next/headers';

// const pool = new Pool({
//     user: 'postgres', // PostgreSQL username
//     host: 'localhost',     // Database host (e.g., localhost)
//     database: 'tuthub',   // Your database name
//     password: 'Milkyway147!', // PostgreSQL password
//     port: 5432,            // PostgreSQL port (default is 5432)
// });

// const JWT_SECRET = process.env.JWT_SECRET;
// export async function POST(req){
//     try{
//     const body = await req.json();
//     const { email, user_password } = body;
//     const result = await pool.query('SELECT * FROM tutors WHERE email = $1', [email]);

//     if (result.rows.length > 0){
//         const user = result.rows[0];

//         const isMAtch = await bcrypt.compare(user_password, user.user_password);

//         if (isMAtch){
//             const token = jwt.sign({userId: user.id, email: user.email}, JWT_SECRET, { expiresIn: '1h'});
//             return new Response(JSON.stringify({message: 'Login successful!', token}), {status:200, headers: {
//                 'Set-Cookie': `token=${token}; HttpOnly; Secure; Path=/; Max-Age=3600; SameSite=None`,
//             }},);
//         } else {
//             return new Response(JSON.stringify({ message: 'Invalid credentials' }), { status: 401 });     
//         }
//     } else {
//         return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
//     }

// } catch(error){
//     console.error('Error during Login:', error);
//     return new Response(JSON.stringify({ message: 'Server error' }), { status: 500 });

// }
// }



import bcrypt from 'bcryptjs';
import { Pool } from 'pg';
import jwt from 'jsonwebtoken';
import { headers } from 'next/headers';
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
  ssl: sslConfig,        
});

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, user_password } = body;

    // First, search in the tutors table
    let result = await pool.query('SELECT * FROM tutors WHERE email = $1', [email]);

    let role = 'tutor'; // Assume tutor if found in the tutors table

    if (result.rows.length === 0) {
      // If no result in tutors, search in the students table
      result = await pool.query('SELECT * FROM students WHERE email = $1', [email]);
      role = 'student'; // Change role to student if found in students table
    }

    // If no user found in either table
    if (result.rows.length === 0) {
      return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
    }

    // Extract the user data
    const user = result.rows[0];

    // Compare the provided password with the hashed password stored in the database
    const isMatch = await bcrypt.compare(user_password, user.user_password);

    if (isMatch) {
      // Generate a JWT token with the user ID, email, and role
      const token = jwt.sign({ userId: user.id, email: user.email, role }, JWT_SECRET, { expiresIn: '1h' });

      return new Response(
        JSON.stringify({ message: 'Login successful!', token }),
        {
          status: 200,
          headers: {
            'Set-Cookie': `token=${token}; HttpOnly; Secure; Path=/; Max-Age=3600; SameSite=None`,
          },
        }
      );
    } else {
      // If password doesn't match
      return new Response(JSON.stringify({ message: 'Invalid credentials' }), { status: 401 });
    }

  } catch (error) {
    console.error('Error during Login:', error);
    return new Response(JSON.stringify({ message: 'Server error' }), { status: 500 });
  }
}
