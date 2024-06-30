import pool from '../db';

export async function createUser(name: string, email: string, googleId: string) {
  const result = await pool.query(
    'INSERT INTO Users (name, email, google_id) VALUES ($1, $2, $3) RETURNING *',
    [name, email, googleId]
  );
  return result.rows[0];
}

export async function getUserByEmail(email: string) {
  const result = await pool.query('SELECT * FROM Users WHERE email = $1', [email]);
  return result.rows[0];
}

export async function getUserById(id: number) {
  const result = await pool.query('SELECT * FROM Users WHERE id = $1', [id]);
  return result.rows[0];
}
