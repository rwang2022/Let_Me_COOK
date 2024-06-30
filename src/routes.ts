import { Router } from 'express';
import passport from 'passport';
import { createUser, getUserByEmail, getUserById } from './models/user';
import { createIngredient, getAllIngredients, getIngredientById } from './models/ingredient';
import { createRecipe, addIngredientToRecipe, getRecipeById, getIngredientsForRecipe } from './models/recipe';

const router = Router();

// Authentication routes
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

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


router.get('/login', (req, res) => {
  res.send('Please <a href="/auth/google">login with Google</a>.');
});

// User routes
router.post('/users', async (req, res) => {
  const { name, email, googleId } = req.body;
  const user = await createUser(name, email, googleId);
  res.json(user);
});

router.get('/users/:id', async (req, res) => {
  const user = await getUserById(parseInt(req.params.id));
  res.json(user);
});

// Ingredient routes
router.post('/ingredients', async (req, res) => {
  const { name, category, allergens, nutritionInfo } = req.body;
  const ingredient = await createIngredient(name, category, allergens, nutritionInfo);
  res.json(ingredient);
});

router.get('/ingredients', async (req, res) => {
  const ingredients = await getAllIngredients();
  res.json(ingredients);
});

router.get('/ingredients/:id', async (req, res) => {
  const ingredient = await getIngredientById(parseInt(req.params.id));
  res.json(ingredient);
});

// Recipe routes
router.post('/recipes', async (req, res) => {
  const { name, instructions, userId } = req.body;
  const recipe = await createRecipe(name, instructions, userId);
  res.json(recipe);
});

router.post('/recipes/:id/ingredients', async (req, res) => {
  const { ingredientId, quantity } = req.body;
  await addIngredientToRecipe(parseInt(req.params.id), ingredientId, quantity);
  res.sendStatus(200);
});

router.get('/recipes/:id', async (req, res) => {
  const recipe = await getRecipeById(parseInt(req.params.id));
  res.json(recipe);
});

router.get('/recipes/:id/ingredients', async (req, res) => {
  const ingredients = await getIngredientsForRecipe(parseInt(req.params.id));
  res.json(ingredients);
});

export default router;
