// import { NextResponse } from 'next/server';
// import { Pool } from 'pg'; // PostgreSQL connection

// // Create a PostgreSQL connection pool
// const pool = new Pool({
//     user: 'postgres', // PostgreSQL username
//     host: 'localhost', // Database host
//     database: 'tuthub', // Your database name
//     password: 'Milkyway147!', // PostgreSQL password
//     port: 5432, // PostgreSQL port (default is 5432)
//   });

// export async function GET(request, { params }) {
//   const tutorId = params.tutorId; // Extract user ID from URL parameters

//   try {
//     // Query the database to fetch user by ID
//     const result = await pool.query('SELECT * FROM profiles WHERE tutor_id = $1', [tutorId]);

//     if (result.rows.length === 0) {
//       return NextResponse.json({ message: 'User not found' }, { status: 404 });
//     }

//     // Return the user data
//     return NextResponse.json({ user: result.rows[0] });
//   } catch (error) {
//     console.error('Error fetching user:', error);
//     return NextResponse.json({ message: 'Error fetching user' }, { status: 500 });
//   }
// }



import { NextResponse } from 'next/server';
import { Pool } from 'pg'; // PostgreSQL connection

// Create a PostgreSQL connection pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'tuthub',
  password: 'Milkyway147!',
  port: 5432,
});

export async function GET(request) {
  const { searchParams } = new URL(request.url); // Get the query parameters from the URL
  const tutorId = searchParams.get('tutorId'); // Extract 'tutorId' from query parameters

  if (!tutorId) {
    return NextResponse.json({ message: 'Tutor ID is required' }, { status: 400 });
  }

  try {
    // Query the database to fetch tutor profile by tutor_id
    const result = await pool.query('SELECT * FROM profiles WHERE tutor_id = $1', [tutorId]);

    if (result.rows.length === 0) {
      return NextResponse.json({ message: 'Tutor not found' }, { status: 404 });
    }

    // Return the profile data directly
    return NextResponse.json(result.rows[0]); // Directly return the row from the profiles table
  } catch (error) {
    console.error('Error fetching tutor profile:', error);
    return NextResponse.json({ message: 'Error fetching tutor profile' }, { status: 500 });
  }
}
