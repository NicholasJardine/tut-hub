import { Pool } from 'pg';
import AWS from 'aws-sdk';
import formidable from 'formidable';
import jwt from 'jsonwebtoken';
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
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

// Configure AWS S3
const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
  });
  export const runtime = 'nodejs';

export async function POST(req) {
  return new Promise((resolve, reject) => {
    // Extract the token from the cookie
    const cookieHeader = req.headers.get('cookie');
    console.log("Cookie Header:", cookieHeader);  // Log the cookie header for debugging

    const token = cookieHeader?.split('token=')[1];
    console.log("Token:", token);  // Log the extracted token for debugging

    if (!token) {
      resolve(new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 }));
      return;
    }

    try {

        console.log("Decoding token:", token);
  
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        console.log("Decoded token:", decoded);


      decoded.verify(token, process.env.JWT_SECRET);
      const tutor_id = decoded.userId; // Extract tutor_id from the token

      const form = new formidable.IncomingForm();
      form.parse(req, async (err, fields, files) => {
        if (err) {
          reject(new Response(JSON.stringify({ message: 'Error parsing form data' }), { status: 500 }));
          return;
        }

        const { bio, specialty, years_of_experience, hourly_rate } = fields;
        const file = files.avatar;
        
        if (file) {
          const fileStream = fs.createReadStream(file.filepath);
          const uploadParams = {
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: `avatars/${file.originalFilename}`,
            Body: fileStream,
            ContentType: file.mimetype,
          };

          try {
            const s3Result = await s3.upload(uploadParams).promise();
            const avatarUrl = s3Result.Location;

            // Insert profile data into the database
            const query = `
              INSERT INTO profiles (tutor_id, bio, specialty, years_of_experience, hourly_rate, avatar_url) 
              VALUES ($1, $2, $3, $4, $5, $6)
              ON CONFLICT (tutor_id)
              DO UPDATE SET bio = $2, specialty = $3, years_of_experience = $4, hourly_rate = $5, avatar_url = $6, updated_at = CURRENT_TIMESTAMP
              RETURNING *`;

            const result = await pool.query(query, [
              tutor_id,
              bio,
              specialty,
              years_of_experience,
              hourly_rate,
              avatarUrl,
            ]);

            const updatedProfile = result.rows[0];
            resolve(new Response(JSON.stringify({ message: 'Profile updated successfully', profile: updatedProfile }), { status: 200 }));
          } catch (error) {
            console.error('Error uploading to S3 or saving profile:', error);
            reject(new Response(JSON.stringify({ message: 'Error uploading to S3 or saving profile' }), { status: 500 }));
          }
        } else {
          // Handle cases without an image file
          resolve(new Response(JSON.stringify({ message: 'No image uploaded' }), { status: 400 }));
        }
      });
    } catch (error) {
      resolve(new Response(JSON.stringify({ message: 'Invalid token' }), { status: 403 }));
    }
  });
}
