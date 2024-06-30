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

// Get all recipes
export const getRecipes = async (req: Request, res: Response) => {
    const userId = (req.user as any).id;
    try {
        const result = await pool.query('SELECT * FROM recipes WHERE user_id = $1', [userId]);
        res.json(result.rows);
    } catch (err) {
        handleError(res, err);
    }
};

// Get recipe by ID
export const getRecipeById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = (req.user as any).id;
    try {
        const result = await pool.query('SELECT * FROM recipes WHERE id = $1 AND user_id = $2', [id, userId]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Recipe not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        handleError(res, err);
    }
};

// Create a new recipe
export const createRecipe = async (req: Request, res: Response) => {
    const userId = (req.user as any).id;
    const { name, instructions, quantity } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO recipes (name, instructions, user_id, quantity) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, instructions, userId, quantity]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        handleError(res, err);
    }
};

// Update a recipe
export const updateRecipe = async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = (req.user as any).id;
    const { name, instructions, quantity } = req.body;
    try {
        const result = await pool.query(
            'UPDATE recipes SET name = $1, instructions = $2, quantity = $3 WHERE id = $4 AND user_id = $5 RETURNING *',
            [name, instructions, quantity, id, userId]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Recipe not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        handleError(res, err);
    }
};

// Delete a recipe
export const deleteRecipe = async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = (req.user as any).id;
    try {
        const result = await pool.query(
            'DELETE FROM recipes WHERE id = $1 AND user_id = $2 RETURNING *',
            [id, userId]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Recipe not found' });
        }
        res.json({ message: 'Recipe deleted', recipe: result.rows[0] });
    } catch (err) {
        handleError(res, err);
    }
};
