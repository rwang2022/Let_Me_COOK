import { Router } from 'express';
import passport from 'passport';
import { isAuthenticated } from './auth';

const router = Router();

router.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));

router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/');
  }
);

router.get('/logout', (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    res.redirect('/login');
  });
});

router.get('/protected', isAuthenticated, (req, res) => {
  res.send('This is a protected route.');
});

// Add this route to handle login
router.get('/login', (req, res) => {
  res.send('Please <a href="/auth/google">login with Google</a>.');
});
    
export default router;
