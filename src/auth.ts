import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import pool from './db';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

dotenv.config();

console.log('GOOGLE_CLIENT_ID in auth:', process.env.GOOGLE_CLIENT_ID);
console.log('GOOGLE_CLIENT_SECRET in auth:', process.env.GOOGLE_CLIENT_SECRET);

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  callbackURL: "/auth/google/callback"
}, (token, tokenSecret, profile, done) => {
  done(null, profile);
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user as Express.User);
});

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};
