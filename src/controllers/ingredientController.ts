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

// Get all ingredients
export const getIngredients = async (req: Request, res: Response) => {
    try {
        const result = await pool.query('SELECT * FROM ingredients');
        res.json(result.rows);
    } catch (err) {
        handleError(res, err);
    }
};

// Get ingredient by ID
export const getIngredientById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM ingredients WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Ingredient not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        handleError(res, err);
    }
};

// Create a new ingredient
export const createIngredient = async (req: Request, res: Response) => {
    const { name, category, allergens, nutrition_info } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO ingredients (name, category, allergens, nutrition_info) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, category, allergens, nutrition_info]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        handleError(res, err);
    }
};

// Update an ingredient
export const updateIngredient = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, category, allergens, nutrition_info } = req.body;
    try {
        const result = await pool.query(
            'UPDATE ingredients SET name = $1, category = $2, allergens = $3, nutrition_info = $4 WHERE id = $5 RETURNING *',
            [name, category, allergens, nutrition_info, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Ingredient not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        handleError(res, err);
    }
};

// Delete an ingredient
export const deleteIngredient = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM ingredients WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Ingredient not found' });
        }
        res.json({ message: 'Ingredient deleted', ingredient: result.rows[0] });
    } catch (err) {
        handleError(res, err);
    }
};
