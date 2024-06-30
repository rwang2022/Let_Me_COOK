import { Router } from 'express';
import { createRecipe, getRecipe, updateRecipe, deleteRecipe } from '../controllers/recipesController';
import { getPantry, addIngredientToPantry, updatePantryIngredient, deletePantryIngredient } from '../controllers/pantryController';
import { getShoppingList, addItemToShoppingList, updateShoppingListItem, deleteShoppingListItem } from '../controllers/shoppingListController';
import { getIngredients, createIngredient, updateIngredient, deleteIngredient } from '../controllers/ingredientController';
import ensureAuthenticated from '../middlewares/authMiddleware';

const router = Router();

// Recipe Routes
router.post('/recipes', ensureAuthenticated, createRecipe);
router.get('/recipes/:id', ensureAuthenticated, getRecipe);
router.put('/recipes/:id', ensureAuthenticated, updateRecipe);
router.delete('/recipes/:id', ensureAuthenticated, deleteRecipe);

// Pantry Routes
router.get('/pantry', ensureAuthenticated, getPantry);
router.post('/pantry', ensureAuthenticated, addIngredientToPantry);
router.put('/pantry', ensureAuthenticated, updatePantryIngredient);
router.delete('/pantry', ensureAuthenticated, deletePantryIngredient);

// Shopping List Routes
router.get('/shoppinglist', ensureAuthenticated, getShoppingList);
router.post('/shoppinglist', ensureAuthenticated, addItemToShoppingList);
router.put('/shoppinglist', ensureAuthenticated, updateShoppingListItem);
router.delete('/shoppinglist', ensureAuthenticated, deleteShoppingListItem);

// Ingredient Routes
router.get('/ingredients', ensureAuthenticated, getIngredients);
router.post('/ingredients', ensureAuthenticated, createIngredient);
router.put('/ingredients/:id', ensureAuthenticated, updateIngredient);
router.delete('/ingredients/:id', ensureAuthenticated, deleteIngredient);

export default router;
