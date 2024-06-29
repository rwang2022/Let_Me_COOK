import dotenv from 'dotenv';
dotenv.config();

console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID);
console.log('GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET);

import express from 'express';
import session from 'express-session';
import passport from 'passport';
import routes from './routes';
import path from 'path';

// Your existing setup code...
const app = express();

app.use(session({
  secret: process.env.SESSION_SECRET!,
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

// Serve the index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
