import { Router, Request, Response, NextFunction } from 'express';
import passport from 'passport';
import ensureAuthenticated from '../middlewares/authMiddleware';
import path from 'path';

const router = Router();

// Route to start the Google OAuth flow
router.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

// Callback route for Google to redirect to after successful authentication
router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req: Request, res: Response) => {
    res.redirect('/login');
  }
);

// Logout route
router.get('/auth/logout', (req: Request, res: Response, next: NextFunction) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

// Login page route
router.get('/login', (req: Request, res: Response) => {
  res.sendFile('login.html', { root: path.join(__dirname, '../public') });
});

// Home page route
router.get('/', ensureAuthenticated, (req: Request, res: Response) => {
  res.sendFile('index.html', { root: path.join(__dirname, '../public') });
});

export default router;
