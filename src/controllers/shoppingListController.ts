import { Request, Response } from 'express';
import pool from '../db';

// Utility function to handle error
const handleError = (res: Response, err: unknown) => {
    if (err instanceof Error) {
        res.status(500).json({ error: err.message });
    } else {
        res.status(500).json({ error: 'An unknown error occurred' });
    }
};

// Get all items in user's shopping list
export const getShoppingList = async (req: Request, res: Response) => {
    const userId = (req.user as any).id;
    try {
        const result = await pool.query('SELECT * FROM shoppinglist WHERE user_id = $1', [userId]);
        res.json(result.rows);
    } catch (err) {
        handleError(res, err);
    }
};

// Add item to shopping list
export const addItemToShoppingList = async (req: Request, res: Response) => {
    const userId = (req.user as any).id;
    const { ingredient_id, quantity } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO shoppinglist (user_id, ingredient_id, quantity) VALUES ($1, $2, $3) RETURNING *',
            [userId, ingredient_id, quantity]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        handleError(res, err);
    }
};

// Update item quantity in shopping list
export const updateShoppingListItem = async (req: Request, res: Response) => {
    const userId = (req.user as any).id;
    const { ingredient_id, quantity } = req.body;
    try {
        const result = await pool.query(
            'UPDATE shoppinglist SET quantity = $1 WHERE user_id = $2 AND ingredient_id = $3 RETURNING *',
            [quantity, userId, ingredient_id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Item not found in shopping list' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        handleError(res, err);
    }
};

// Delete item from shopping list
export const deleteShoppingListItem = async (req: Request, res: Response) => {
    const userId = (req.user as any).id;
    const { ingredient_id } = req.body;
    try {
        const result = await pool.query(
            'DELETE FROM shoppinglist WHERE user_id = $1 AND ingredient_id = $2 RETURNING *',
            [userId, ingredient_id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Item not found in shopping list' });
        }
        res.json({ message: 'Item deleted from shopping list', item: result.rows[0] });
    } catch (err) {
        handleError(res, err);
    }
};
