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
exports.deleteRecipe = exports.updateRecipe = exports.createRecipe = exports.getRecipeById = exports.getRecipes = void 0;
const db_1 = __importDefault(require("../db"));
// Utility function to handle error
const handleError = (res, err) => {
    if (err instanceof Error) {
        res.status(500).json({ error: err.message });
    }
    else {
        res.status(500).json({ error: 'An unknown error occurred' });
    }
};
// Get all recipes
const getRecipes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    try {
        const result = yield db_1.default.query('SELECT * FROM recipes WHERE user_id = $1', [userId]);
        res.json(result.rows);
    }
    catch (err) {
        handleError(res, err);
    }
});
exports.getRecipes = getRecipes;
// Get recipe by ID
const getRecipeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const userId = req.user.id;
    try {
        const result = yield db_1.default.query('SELECT * FROM recipes WHERE id = $1 AND user_id = $2', [id, userId]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Recipe not found' });
        }
        res.json(result.rows[0]);
    }
    catch (err) {
        handleError(res, err);
    }
});
exports.getRecipeById = getRecipeById;
// Create a new recipe
const createRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    const { name, instructions, quantity } = req.body;
    try {
        const result = yield db_1.default.query('INSERT INTO recipes (name, instructions, user_id, quantity) VALUES ($1, $2, $3, $4) RETURNING *', [name, instructions, userId, quantity]);
        res.status(201).json(result.rows[0]);
    }
    catch (err) {
        handleError(res, err);
    }
});
exports.createRecipe = createRecipe;
// Update a recipe
const updateRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const userId = req.user.id;
    const { name, instructions, quantity } = req.body;
    try {
        const result = yield db_1.default.query('UPDATE recipes SET name = $1, instructions = $2, quantity = $3 WHERE id = $4 AND user_id = $5 RETURNING *', [name, instructions, quantity, id, userId]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Recipe not found' });
        }
        res.json(result.rows[0]);
    }
    catch (err) {
        handleError(res, err);
    }
});
exports.updateRecipe = updateRecipe;
// Delete a recipe
const deleteRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const userId = req.user.id;
    try {
        const result = yield db_1.default.query('DELETE FROM recipes WHERE id = $1 AND user_id = $2 RETURNING *', [id, userId]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Recipe not found' });
        }
        res.json({ message: 'Recipe deleted', recipe: result.rows[0] });
    }
    catch (err) {
        handleError(res, err);
    }
});
exports.deleteRecipe = deleteRecipe;
