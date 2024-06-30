import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import pool from './db';
import dotenv from 'dotenv';
import { log } from 'console';

// Load environment variables from .env file

console.log(process.env.GOOGLE_CLIENT_ID);

dotenv.config();

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  callbackURL: "/auth/google/callback"
},
async (token, tokenSecret, profile, done) => {
  const email = profile.emails?.[0].value;
  const name = profile.displayName;
  const googleId = profile.id;

  try {
    let user = await pool.query('SELECT * FROM users WHERE google_id = $1', [googleId]);
    if (user.rowCount === 0) {
      user = await pool.query('INSERT INTO users (name, email, google_id) VALUES ($1, $2, $3) RETURNING *', [name, email, googleId]);
    }
    done(null, user.rows[0]);
  } catch (err) {
    done(err);
  }
}));

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    done(null, user.rows[0]);
  } catch (err) {
    done(err);
  }
});
