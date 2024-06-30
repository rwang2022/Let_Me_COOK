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
exports.deleteIngredient = exports.updateIngredient = exports.createIngredient = exports.getIngredientById = exports.getIngredients = void 0;
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
// Get all ingredients
const getIngredients = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield db_1.default.query('SELECT * FROM ingredients');
        res.json(result.rows);
    }
    catch (err) {
        handleError(res, err);
    }
});
exports.getIngredients = getIngredients;
// Get ingredient by ID
const getIngredientById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const result = yield db_1.default.query('SELECT * FROM ingredients WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Ingredient not found' });
        }
        res.json(result.rows[0]);
    }
    catch (err) {
        handleError(res, err);
    }
});
exports.getIngredientById = getIngredientById;
// Create a new ingredient
const createIngredient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, category, allergens, nutrition_info } = req.body;
    try {
        const result = yield db_1.default.query('INSERT INTO ingredients (name, category, allergens, nutrition_info) VALUES ($1, $2, $3, $4) RETURNING *', [name, category, allergens, nutrition_info]);
        res.status(201).json(result.rows[0]);
    }
    catch (err) {
        handleError(res, err);
    }
});
exports.createIngredient = createIngredient;
// Update an ingredient
const updateIngredient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, category, allergens, nutrition_info } = req.body;
    try {
        const result = yield db_1.default.query('UPDATE ingredients SET name = $1, category = $2, allergens = $3, nutrition_info = $4 WHERE id = $5 RETURNING *', [name, category, allergens, nutrition_info, id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Ingredient not found' });
        }
        res.json(result.rows[0]);
    }
    catch (err) {
        handleError(res, err);
    }
});
exports.updateIngredient = updateIngredient;
// Delete an ingredient
const deleteIngredient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const result = yield db_1.default.query('DELETE FROM ingredients WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Ingredient not found' });
        }
        res.json({ message: 'Ingredient deleted', ingredient: result.rows[0] });
    }
    catch (err) {
        handleError(res, err);
    }
});
exports.deleteIngredient = deleteIngredient;
