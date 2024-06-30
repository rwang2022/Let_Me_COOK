"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const ingredientController_1 = require("../controllers/ingredientController");
const pantryController_1 = require("../controllers/pantryController");
const recipesController_1 = require("../controllers/recipesController");
const shoppingListController_1 = require("../controllers/shoppingListController");
const router = (0, express_1.Router)();
// Authentication Routes
router.get('/auth/google', passport_1.default.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback', passport_1.default.authenticate('google', { failureRedirect: '/login.html' }), (req, res) => {
    res.redirect('/'); // Redirect to the homepage or dashboard after successful login
});
// Ingredient Routes
router.get('/ingredients', ingredientController_1.getIngredients);
router.get('/ingredients/:id', ingredientController_1.getIngredientById);
router.post('/ingredients', ingredientController_1.createIngredient);
router.put('/ingredients/:id', ingredientController_1.updateIngredient);
router.delete('/ingredients/:id', ingredientController_1.deleteIngredient);
// Pantry Routes
router.get('/pantry', pantryController_1.getPantry);
router.post('/pantry', pantryController_1.addIngredientToPantry);
router.put('/pantry', pantryController_1.updatePantryIngredient);
router.delete('/pantry', pantryController_1.deletePantryIngredient);
// Recipes Routes
router.get('/recipes', recipesController_1.getRecipes);
router.get('/recipes/:id', recipesController_1.getRecipeById);
router.post('/recipes', recipesController_1.createRecipe);
router.put('/recipes/:id', recipesController_1.updateRecipe);
router.delete('/recipes/:id', recipesController_1.deleteRecipe);
// Shopping List Routes
router.get('/shoppinglist', shoppingListController_1.getShoppingList);
router.post('/shoppinglist', shoppingListController_1.addItemToShoppingList);
router.put('/shoppinglist', shoppingListController_1.updateShoppingListItem);
router.delete('/shoppinglist', shoppingListController_1.deleteShoppingListItem);
exports.default = router;
