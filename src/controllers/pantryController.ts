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

// Get all ingredients in user's pantry
export const getPantry = async (req: Request, res: Response) => {
  const userId = (req.user as any).id;
  try {
    const result = await pool.query('SELECT * FROM pantry WHERE user_id = $1', [userId]);
    res.json(result.rows);
  } catch (err) {
    handleError(res, err);
  }
};

// Add ingredient to pantry
export const addIngredientToPantry = async (req: Request, res: Response) => {
  const userId = (req.user as any).id;
  const { ingredient_id, quantity } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO pantry (user_id, ingredient_id, quantity) VALUES ($1, $2, $3) RETURNING *',
      [userId, ingredient_id, quantity]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    handleError(res, err);
  }
};

// Update ingredient quantity in pantry
export const updatePantryIngredient = async (req: Request, res: Response) => {
  const userId = (req.user as any).id;
  const { ingredient_id, quantity } = req.body;
  try {
    const result = await pool.query(
      'UPDATE pantry SET quantity = $1 WHERE user_id = $2 AND ingredient_id = $3 RETURNING *',
      [quantity, userId, ingredient_id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Ingredient not found in pantry' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    handleError(res, err);
  }
};

// Delete ingredient from pantry
export const deletePantryIngredient = async (req: Request, res: Response) => {
  const userId = (req.user as any).id;
  const { ingredient_id } = req.body;
  try {
    const result = await pool.query(
      'DELETE FROM pantry WHERE user_id = $1 AND ingredient_id = $2 RETURNING *',
      [userId, ingredient_id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Ingredient not found in pantry' });
    }
    res.json({ message: 'Ingredient deleted from pantry', ingredient: result.rows[0] });
  } catch (err) {
    handleError(res, err);
  }
};
