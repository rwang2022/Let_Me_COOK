import { Router, Request, Response, NextFunction } from 'express';
import passport from 'passport';

const router = Router();

// Route to start the Google OAuth flow
router.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

// Callback route for Google to redirect to after successful authentication
router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req: Request, res: Response) => {
    res.redirect('/');
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

export default router;
