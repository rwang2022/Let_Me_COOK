import { Router } from 'express';
import passport from 'passport';
import {
  getIngredients,
  getIngredientById,
  createIngredient,
  updateIngredient,
  deleteIngredient
} from '../controllers/ingredientController';
import {
  getPantry,
  addIngredientToPantry,
  updatePantryIngredient,
  deletePantryIngredient
} from '../controllers/pantryController';
import {
  getRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe
} from '../controllers/recipesController';
import {
  getShoppingList,
  addItemToShoppingList,
  updateShoppingListItem,
  deleteShoppingListItem
} from '../controllers/shoppingListController';

const router = Router();

// Authentication Routes
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login.html' }),
  (req, res) => {
    res.redirect('/'); // Redirect to the homepage or dashboard after successful login
  }
);

// Ingredient Routes
router.get('/ingredients', getIngredients);
router.get('/ingredients/:id', getIngredientById);
router.post('/ingredients', createIngredient);
router.put('/ingredients/:id', updateIngredient);
router.delete('/ingredients/:id', deleteIngredient);

// Pantry Routes
router.get('/pantry', getPantry);
router.post('/pantry', addIngredientToPantry);
router.put('/pantry', updatePantryIngredient);
router.delete('/pantry', deletePantryIngredient);

// Recipes Routes
router.get('/recipes', getRecipe);
router.post('/recipes', createRecipe);
router.put('/recipes/:id', updateRecipe);
router.delete('/recipes/:id', deleteRecipe);

// Shopping List Routes
router.get('/shoppinglist', getShoppingList);
router.post('/shoppinglist', addItemToShoppingList);
router.put('/shoppinglist', updateShoppingListItem);
router.delete('/shoppinglist', deleteShoppingListItem);

export default router;
