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


export const runtime = 'nodejs';  // Configure the API runtime


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
