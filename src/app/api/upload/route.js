// import { Pool } from 'pg';
// import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
// import formidable from 'formidable';
// import fs from 'fs';
// import jwt from 'jsonwebtoken';

// // Setup PostgreSQL pool connection
// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'tuthub',
//   password: 'your_password',
//   port: 5432,
// });

// // Configure AWS S3 client
// const s3 = new S3Client({
//   region: process.env.AWS_REGION,
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   }
// });

// // Disable Next.js body parsing, as we'll use `formidable`
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export async function POST(req) {
//   console.log("Request received for file upload"); // Log for debugging

//   return new Promise((resolve, reject) => {
//     // Extract token from cookie
//     const cookieHeader = req.headers.get('cookie');
//     const token = cookieHeader?.split('token=')[1];

//     if (!token) {
//       resolve(new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 }));
//       return;
//     }

//     try {
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       const tutor_id = decoded.userId; // Extract tutor_id from the token

//       // Initialize formidable form for file parsing
//       const form = formidable({ multiples: false });

//       form.parse(req, async (err, fields, files) => {
//         if (err) {
//           console.error('Error parsing form:', err);
//           reject(new Response(JSON.stringify({ message: 'Error parsing form data' }), { status: 500 }));
//           return;
//         }

//         console.log('Parsed fields:', fields);
//         console.log('Parsed files:', files);

//         const file = files.avatar;
//         if (!file) {
//           resolve(new Response(JSON.stringify({ message: 'No file uploaded' }), { status: 400 }));
//           return;
//         }

//         // Read the file for uploading
//         const fileStream = fs.createReadStream(file.filepath);
//         const uploadParams = {
//           Bucket: process.env.AWS_S3_BUCKET_NAME,
//           Key: `avatars/${file.originalFilename}`,
//           Body: fileStream,
//           ContentType: file.mimetype,
//         };

//         try {
//           const s3Result = await s3.send(new PutObjectCommand(uploadParams));
//           const avatarUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/avatars/${file.originalFilename}`;

//           // Insert or update profile in the database
//           const query = `
//             INSERT INTO profiles (tutor_id, bio, specialty, years_of_experience, hourly_rate, avatar_url)
//             VALUES ($1, $2, $3, $4, $5, $6)
//             ON CONFLICT (tutor_id)
//             DO UPDATE SET bio = $2, specialty = $3, years_of_experience = $4, hourly_rate = $5, avatar_url = $6, updated_at = CURRENT_TIMESTAMP
//             RETURNING *`;

//           const result = await pool.query(query, [
//             tutor_id,
//             fields.bio,
//             fields.specialty,
//             fields.years_of_experience,
//             fields.hourly_rate,
//             avatarUrl,
//           ]);

//           const updatedProfile = result.rows[0];
//           resolve(new Response(JSON.stringify({ message: 'Profile updated successfully', profile: updatedProfile }), { status: 200 }));
//         } catch (s3Error) {
//           console.error('S3 upload error:', s3Error);
//           reject(new Response(JSON.stringify({ message: 'S3 upload error' }), { status: 500 }));
//         }
//       });
//     } catch (error) {
//       console.error('JWT verification error:', error);
//       resolve(new Response(JSON.stringify({ message: 'Invalid token' }), { status: 403 }));
//     }
//   });
// }



// import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
// import { Pool } from 'pg';

// // Initialize S3 client
// const s3 = new S3Client({
//   region: process.env.AWS_REGION,
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   },
// });

// // Initialize database connection (if needed)
// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'tuthub',
//   password: 'your_password',
//   port: 5432,
// });

// export async function POST(req) {
//   try {
//     // Parse the incoming request to get the file data
//     const formData = await req.formData();
//     const file = formData.get('file');

//     if (!file) {
//       return new Response(JSON.stringify({ message: 'No file uploaded' }), {
//         status: 400,
//       });
//     }

//     // Prepare the upload to S3
//     const uploadParams = {
//       Bucket: process.env.AWS_S3_BUCKET_NAME,
//       Key: `avatars/${file.name}`, // Using the file's name for the key
//       Body: file.stream(),
//       ContentType: file.type,
//     };

//     // Upload to S3
//     const command = new PutObjectCommand(uploadParams);
//     const s3Response = await s3.send(command);

//     const imageUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/avatars/${file.name}`;

//     // Optionally, you can store the URL in your database if needed
//     // const result = await pool.query('UPDATE avatars_table SET avatar_url = $1 WHERE user_id = $2', [imageUrl, userId]);

//     return new Response(JSON.stringify({ message: 'File uploaded successfully!', imageUrl }), {
//       status: 200,
//     });
//   } catch (error) {
//     console.error("Error uploading the file:", error);
//     return new Response(JSON.stringify({ message: 'Unexpected server error' }), {
//       status: 500,
//     });
//   }
// }


// import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
// import { NextRequest, NextResponse } from 'next/server';
// import { Pool } from 'pg'; // Import PostgreSQL pool for database connection

// // Configure AWS S3
// const s3 = new S3Client({
//   region: process.env.AWS_REGION,
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   },
// });

// const pool = new Pool({
//     user: 'postgres', // PostgreSQL username
//     host: 'localhost',     // Database host (e.g., localhost)
//     database: 'tuthub',   // Your database name
//     password: 'Milkyway147!', // PostgreSQL password
//     port: 5432,            // PostgreSQL port (default is 5432)
//   });

// export const config = {
//   api: {
//     bodyParser: false, // Disable Next.js body parsing
//   },
// };

// export async function POST(req) {
//   try {
//     console.log('Request received for file upload');

//     // Get the file from the request
//     const formData = await req.formData();
//     const file = formData.get('file');

//     if (!file) {
//       return new NextResponse(JSON.stringify({ message: 'No file uploaded' }), { status: 400 });
//     }

//     // Convert the file stream to a Buffer
//     const fileBuffer = await file.arrayBuffer();
//     const buffer = Buffer.from(fileBuffer);

//     // Prepare upload parameters
//     const uploadParams = {
//       Bucket: process.env.AWS_S3_BUCKET_NAME,
//       Key: `avatars/${file.name}`, // Use the filename for the S3 key
//       Body: buffer,
//       ContentType: file.type, // Set the file's MIME type
//     };

//     // Upload to S3
//     const data = await s3.send(new PutObjectCommand(uploadParams));
//     console.log('File uploaded successfully:', data);

//     const avatarUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/avatars/${file.name}`;

//     // Save the avatar URL to the database
//     const client = await pool.connect();
//     try {
//       const insertQuery = 'INSERT INTO avatar_storage (avatar_url) VALUES ($1)';
//       await client.query(insertQuery, [avatarUrl]);
//       console.log('Avatar URL saved to database');
//     } finally {
//       client.release();
//     }

//     return new NextResponse(JSON.stringify({ message: 'File uploaded successfully', imageUrl: `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/avatars/${file.name}` }), { status: 200 });
//   } catch (error) {
//     console.error('Error uploading the file:', error);
//     return new NextResponse(JSON.stringify({ message: 'Error uploading the file' }), { status: 500 });
//   }
// }



// import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
// import { NextRequest, NextResponse } from 'next/server';
// import { Pool } from 'pg';

// // Configure AWS S3
// const s3 = new S3Client({
//   region: process.env.AWS_REGION,
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   },
// });

// // Configure PostgreSQL connection
// const pool = new Pool({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASSWORD,
//   port: 5432,
// });

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export async function POST(req) {
//   try {
//     console.log('Request received for file upload');

//     // Get the file and tutor_id from the request
//     const formData = await req.formData();
//     const file = formData.get('file');
//     const tutorId = formData.get('tutor_id'); // Get the tutor_id from the form data

//     if (!file || !tutorId) {
//       return new NextResponse(JSON.stringify({ message: 'File or tutor_id missing' }), { status: 400 });
//     }

//     // Convert the file stream to a Buffer
//     const fileBuffer = await file.arrayBuffer();
//     const buffer = Buffer.from(fileBuffer);

//     // Prepare upload parameters
//     const uploadParams = {
//       Bucket: process.env.AWS_S3_BUCKET_NAME,
//       Key: `avatars/${file.name}`,
//       Body: buffer,
//       ContentType: file.type,
//     };

//     // Upload to S3
//     const data = await s3.send(new PutObjectCommand(uploadParams));
//     console.log('File uploaded successfully:', data);

//     // Create the avatar URL
//     const avatarUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/avatars/${file.name}`;

//     // Save the avatar URL and tutor ID to the database
//     const client = await pool.connect();
//     try {
//       const insertQuery = 'INSERT INTO avatar_storage (tutor_id, avatar_url) VALUES ($1, $2)';
//       await client.query(insertQuery, [tutorId, avatarUrl]);
//       console.log('Avatar URL and tutor_id saved to database');
//     } finally {
//       client.release();
//     }

//     // Return the response with the uploaded image URL
//     return new NextResponse(JSON.stringify({ message: 'File uploaded successfully', imageUrl: avatarUrl }), { status: 200 });
//   } catch (error) {
//     console.error('Error uploading the file:', error);
//     return new NextResponse(JSON.stringify({ message: 'Error uploading the file' }), { status: 500 });
//   }
// }



// import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
// import { NextRequest, NextResponse } from 'next/server';
// import { Pool } from 'pg';
// import jwt from 'jsonwebtoken';

// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'tuthub',
//   password: 'Milkyway147!',
//   port: 5432,
// });

// const JWT_SECRET = process.env.JWT_SECRET;

// export const config = {
//   api: {
//     bodyParser: false, // Disable Next.js body parsing
//   },
// };

// export async function POST(req) {
//   try {
//     // Get the token from cookies
//     const cookieHeader = req.headers.get('cookie');
//     const token = cookieHeader?.split('token=')[1];

//     if (!token) {
//       return new NextResponse(JSON.stringify({ message: 'No token provided' }), { status: 401 });
//     }

//     // Verify the token server-side
//     const decoded = jwt.verify(token, JWT_SECRET); // Use server-side secret
//     const tutorId = decoded.tutor_id || decoded.userId;

//     console.log("Decoded token:", decoded);

//     // Get the file from the request
//     const formData = await req.formData();
//     const file = formData.get('file');

//     if (!file) {
//       return new NextResponse(JSON.stringify({ message: 'No file uploaded' }), { status: 400 });
//     }

//     // Convert the file stream to a Buffer
//     const fileBuffer = await file.arrayBuffer();
//     const buffer = Buffer.from(fileBuffer);

//     // Prepare upload parameters
//     const uploadParams = {
//       Bucket: process.env.AWS_S3_BUCKET_NAME,
//       Key: `avatars/${file.name}`, // Use the filename for the S3 key
//       Body: buffer,
//       ContentType: file.type, // Set the file's MIME type
//     };

//     // Upload to S3
//     const s3 = new S3Client({
//       region: process.env.AWS_REGION,
//       credentials: {
//         accessKeyId: process.env.AWS_ACCESS_KEY,
//         secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//       },
//     });

//     const data = await s3.send(new PutObjectCommand(uploadParams));
//     console.log('File uploaded successfully:', data);

//     // Save the avatar URL and tutorId to the database
//     const avatarUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/avatars/${file.name}`;

//     const client = await pool.connect();
//     try {
//       const insertQuery = 'INSERT INTO avatar_storage (tutor_id, avatar_url) VALUES ($1, $2) ON CONFLICT (tutor_id) DO UPDATE SET avatar_url = $2';
//       await client.query(insertQuery, [tutorId, avatarUrl]);
//       console.log('Avatar URL and tutorId saved to database');
//     } finally {
//       client.release();
//     }

//     // Return the response with the uploaded image URL
//     return new NextResponse(JSON.stringify({ message: 'File uploaded successfully', imageUrl: avatarUrl }), { status: 200 });
//   } catch (error) {
//     console.error('Error during upload:', error);
//     return new NextResponse(JSON.stringify({ message: 'Error uploading the file' }), { status: 500 });
//   }
// }




import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';
import jwt from 'jsonwebtoken';

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
  ssl:sslConfig
});

const JWT_SECRET = process.env.JWT_SECRET;

export const config = {
  api: {
    bodyParser: false, // Disable Next.js body parsing
  },
};

export async function POST(req) {
  try {
    // Step 1: Extract and verify the token from cookies
    const cookieHeader = req.headers.get('cookie');
    const token = cookieHeader?.split('token=')[1];

    if (!token) {
      return new NextResponse(JSON.stringify({ message: 'No token provided' }), { status: 401 });
    }

    // Step 2: Decode the token to get the tutor_id
    const decoded = jwt.verify(token, JWT_SECRET); // Use server-side secret
    const tutorId = decoded.tutor_id || decoded.userId;

    console.log("Decoded token:", decoded);

    // Step 3: Parse the form and retrieve the profile fields and file
    const formData = await req.formData();
    const file = formData.get('file');
    const bio = formData.get('bio');
    const specialty = formData.get('specialty');
    const yearsOfExperience = formData.get('years_of_experience');
    const hourlyRate = formData.get('hourly_rate');

    // Handle file upload to S3 (if there's a file)
    let avatarUrl = null;
    if (file) {
      const fileBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(fileBuffer);
      const uploadParams = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: `avatars/${file.name}`,
        Body: buffer,
        ContentType: file.type,
      };

      const s3 = new S3Client({
        region: process.env.AWS_REGION,
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        },
      });

      const data = await s3.send(new PutObjectCommand(uploadParams));
      console.log('File uploaded successfully:', data);

      // Generate the avatar URL
      avatarUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/avatars/${file.name}`;
    }

    // Step 4: Save the profile data and avatar URL to the database
    const client = await pool.connect();
    try {
      const insertQuery = `
        INSERT INTO profiles (tutor_id, bio, specialty, years_of_experience, hourly_rate, avatar_url)
        VALUES ($1, $2, $3, $4, $5, $6)
        ON CONFLICT (tutor_id)
        DO UPDATE SET 
          bio = $2, 
          specialty = $3, 
          years_of_experience = $4, 
          hourly_rate = $5, 
          avatar_url = COALESCE($6, profiles.avatar_url),
          updated_at = CURRENT_TIMESTAMP
        RETURNING *`;

      const result = await client.query(insertQuery, [
        tutorId,
        bio,
        specialty,
        yearsOfExperience,
        hourlyRate,
        avatarUrl,
      ]);
      
      const updatedProfile = result.rows[0];
      console.log('Profile updated successfully:', updatedProfile);

      return new NextResponse(JSON.stringify({ message: 'Profile updated successfully', profile: updatedProfile }), { status: 200 });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error during profile update:', error);
    return new NextResponse(JSON.stringify({ message: 'Error updating profile' }), { status: 500 });
  }
}
