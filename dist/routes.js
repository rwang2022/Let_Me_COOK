"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const user_1 = require("./models/user");
const ingredient_1 = require("./models/ingredient");
const recipe_1 = require("./models/recipe");
const router = (0, express_1.Router)();
// Authentication routes
router.get('/auth/google', passport_1.default.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback', passport_1.default.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
    res.redirect('/');
});
router.get('/logout', (req, res, next) => {
    req.logout(err => {
        if (err)
            return next(err);
        res.redirect('/login');
    });
});
router.get('/login', (req, res) => {
    res.send('Please <a href="/auth/google">login with Google</a>.');
});
// User routes
router.post('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, googleId } = req.body;
    const user = yield (0, user_1.createUser)(name, email, googleId);
    res.json(user);
}));
router.get('/users/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, user_1.getUserById)(parseInt(req.params.id));
    res.json(user);
}));
// Ingredient routes
router.post('/ingredients', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, category, allergens, nutritionInfo } = req.body;
    const ingredient = yield (0, ingredient_1.createIngredient)(name, category, allergens, nutritionInfo);
    res.json(ingredient);
}));
router.get('/ingredients', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ingredients = yield (0, ingredient_1.getAllIngredients)();
    res.json(ingredients);
}));
router.get('/ingredients/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ingredient = yield (0, ingredient_1.getIngredientById)(parseInt(req.params.id));
    res.json(ingredient);
}));
// Recipe routes
router.post('/recipes', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, instructions, userId } = req.body;
    const recipe = yield (0, recipe_1.createRecipe)(name, instructions, userId);
    res.json(recipe);
}));
router.post('/recipes/:id/ingredients', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ingredientId, quantity } = req.body;
    yield (0, recipe_1.addIngredientToRecipe)(parseInt(req.params.id), ingredientId, quantity);
    res.sendStatus(200);
}));
router.get('/recipes/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const recipe = yield (0, recipe_1.getRecipeById)(parseInt(req.params.id));
    res.json(recipe);
}));
router.get('/recipes/:id/ingredients', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ingredients = yield (0, recipe_1.getIngredientsForRecipe)(parseInt(req.params.id));
    res.json(ingredients);
}));
exports.default = router;
