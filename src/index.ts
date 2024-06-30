import express from 'express';
import session from 'express-session';
import passport from 'passport';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import path from 'path';
// import './auth'; // Ensure this is imported so that passport strategies are registered
import routes from './routes/routes';

console.log("Loading environment variables...");
dotenv.config();
console.log("Environment variables loaded.");

const app = express();
console.log("Express app initialized.");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET!,
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

console.log("Middlewares applied.");

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));
console.log("Static files middleware applied.");

app.use('/api', routes);

app.get('/', (req, res) => {
  console.log("Serving index.html");
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
