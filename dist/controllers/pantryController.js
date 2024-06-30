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
exports.deletePantryIngredient = exports.updatePantryIngredient = exports.addIngredientToPantry = exports.getPantry = void 0;
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
// Get all ingredients in user's pantry
const getPantry = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    try {
        const result = yield db_1.default.query('SELECT * FROM pantry WHERE user_id = $1', [userId]);
        res.json(result.rows);
    }
    catch (err) {
        handleError(res, err);
    }
});
exports.getPantry = getPantry;
// Add ingredient to pantry
const addIngredientToPantry = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    const { ingredient_id, quantity } = req.body;
    try {
        const result = yield db_1.default.query('INSERT INTO pantry (user_id, ingredient_id, quantity) VALUES ($1, $2, $3) RETURNING *', [userId, ingredient_id, quantity]);
        res.status(201).json(result.rows[0]);
    }
    catch (err) {
        handleError(res, err);
    }
});
exports.addIngredientToPantry = addIngredientToPantry;
// Update ingredient quantity in pantry
const updatePantryIngredient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    const { ingredient_id, quantity } = req.body;
    try {
        const result = yield db_1.default.query('UPDATE pantry SET quantity = $1 WHERE user_id = $2 AND ingredient_id = $3 RETURNING *', [quantity, userId, ingredient_id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Ingredient not found in pantry' });
        }
        res.json(result.rows[0]);
    }
    catch (err) {
        handleError(res, err);
    }
});
exports.updatePantryIngredient = updatePantryIngredient;
// Delete ingredient from pantry
const deletePantryIngredient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    const { ingredient_id } = req.body;
    try {
        const result = yield db_1.default.query('DELETE FROM pantry WHERE user_id = $1 AND ingredient_id = $2 RETURNING *', [userId, ingredient_id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Ingredient not found in pantry' });
        }
        res.json({ message: 'Ingredient deleted from pantry', ingredient: result.rows[0] });
    }
    catch (err) {
        handleError(res, err);
    }
});
exports.deletePantryIngredient = deletePantryIngredient;
