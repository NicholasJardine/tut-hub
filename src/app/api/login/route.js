import bcrypt from 'bcryptjs';
import { Pool } from 'pg';

const pool = new Pool({
    user: 'postgres', // PostgreSQL username
    host: 'localhost',     // Database host (e.g., localhost)
    database: 'tuthub',   // Your database name
    password: 'Milkyway147!', // PostgreSQL password
    port: 5432,            // PostgreSQL port (default is 5432)
});

export async function POST(req){
    try{
    const body = await req.json();
    const { email, user_password } = body;
    const result = await pool.query('SELECT * FROM tutors WHERE email = $1', [email]);

    if (result.rows.length > 0){
        const user = result.rows[0];

        const isMAtch = await bcrypt.compare(user_password, user.user_password);

        if (isMAtch){
            return new Response(JSON.stringify({message: 'Login successful!'}), {status:200});
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