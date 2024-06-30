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
exports.deleteShoppingListItem = exports.updateShoppingListItem = exports.addItemToShoppingList = exports.getShoppingList = void 0;
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
// Get all items in user's shopping list
const getShoppingList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    try {
        const result = yield db_1.default.query('SELECT * FROM shoppinglist WHERE user_id = $1', [userId]);
        res.json(result.rows);
    }
    catch (err) {
        handleError(res, err);
    }
});
exports.getShoppingList = getShoppingList;
// Add item to shopping list
const addItemToShoppingList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    const { ingredient_id, quantity } = req.body;
    try {
        const result = yield db_1.default.query('INSERT INTO shoppinglist (user_id, ingredient_id, quantity) VALUES ($1, $2, $3) RETURNING *', [userId, ingredient_id, quantity]);
        res.status(201).json(result.rows[0]);
    }
    catch (err) {
        handleError(res, err);
    }
});
exports.addItemToShoppingList = addItemToShoppingList;
// Update item quantity in shopping list
const updateShoppingListItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    const { ingredient_id, quantity } = req.body;
    try {
        const result = yield db_1.default.query('UPDATE shoppinglist SET quantity = $1 WHERE user_id = $2 AND ingredient_id = $3 RETURNING *', [quantity, userId, ingredient_id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Item not found in shopping list' });
        }
        res.json(result.rows[0]);
    }
    catch (err) {
        handleError(res, err);
    }
});
exports.updateShoppingListItem = updateShoppingListItem;
// Delete item from shopping list
const deleteShoppingListItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    const { ingredient_id } = req.body;
    try {
        const result = yield db_1.default.query('DELETE FROM shoppinglist WHERE user_id = $1 AND ingredient_id = $2 RETURNING *', [userId, ingredient_id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Item not found in shopping list' });
        }
        res.json({ message: 'Item deleted from shopping list', item: result.rows[0] });
    }
    catch (err) {
        handleError(res, err);
    }
});
exports.deleteShoppingListItem = deleteShoppingListItem;
