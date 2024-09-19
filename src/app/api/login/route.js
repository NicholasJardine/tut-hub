import bcrypt from 'bcryptjs';
import { Pool } from 'pg';
import jwt from 'jsonwebtoken';  // Import the jsonwebtoken package
import { headers } from 'next/headers';

const pool = new Pool({
    user: 'postgres', // PostgreSQL username
    host: 'localhost',     // Database host (e.g., localhost)
    database: 'tuthub',   // Your database name
    password: 'Milkyway147!', // PostgreSQL password
    port: 5432,            // PostgreSQL port (default is 5432)
});

const JWT_SECRET = process.env.JWT_SECRET;
export async function POST(req){
    try{
    const body = await req.json();
    const { email, user_password } = body;
    const result = await pool.query('SELECT * FROM tutors WHERE email = $1', [email]);

    if (result.rows.length > 0){
        const user = result.rows[0];

        const isMAtch = await bcrypt.compare(user_password, user.user_password);

        if (isMAtch){
            const token = jwt.sign({userId: user.id, email: user.email}, JWT_SECRET, { expiresIn: '1h'});
            return new Response(JSON.stringify({message: 'Login successful!', token}), {status:200, headers: {
                'Set-Cookie': `token=${token}; HttpOnly; Secure; Path=/; Max-Age=3600; SameSite=Strict`,
            }},);
        } else {
            return new Response(JSON.stringify({ message: 'Invalid credentials' }), { status: 401 });     
        }
    } else {
        return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
    }

} catch(error){
    console.error('Error during Login:', error);
    return new Response(JSON.stringify({ message: 'Server error' }), { status: 500 });

}
}