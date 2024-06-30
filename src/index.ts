import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import session from 'express-session';
import passport from 'passport';
import bodyParser from 'body-parser';
import path from 'path';
import routes from './routes/routes'; // Your API routes
import authRoutes from './routes/authRoutes'; // Your auth routes
import './auth'; // Ensure this file initializes Passport

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET!,
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Use the authentication routes
app.use(authRoutes);

// Use the API routes
app.use('/api', routes);

// Define a route for the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
