import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import pool from './db';

console.log('GOOGLE_CLIENT_ID in auth:', process.env.GOOGLE_CLIENT_ID);
console.log('GOOGLE_CLIENT_SECRET in auth:', process.env.GOOGLE_CLIENT_SECRET);


passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  callbackURL: '/auth/google/callback'
},
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Check if profile.emails exists and has at least one email
      if (!profile.emails || profile.emails.length === 0) {
        return done(new Error('No email associated with this account'), false);
      }

      const existingUser = await pool.query('SELECT * FROM users WHERE google_id = $1', [profile.id]);
      if (existingUser.rows.length > 0) {
        return done(null, existingUser.rows[0]);
      } else {
        const newUser = await pool.query(
          'INSERT INTO users (name, email, google_id) VALUES ($1, $2, $3) RETURNING *',
          [profile.displayName, profile.emails[0].value, profile.id]
        );
        return done(null, newUser.rows[0]);
      }
    } catch (err) {
      return done(err, false);
    }
  }
));

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
  try {
    const user = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    done(null, user.rows[0]);
  } catch (err) {
    done(err, false);
  }
});
