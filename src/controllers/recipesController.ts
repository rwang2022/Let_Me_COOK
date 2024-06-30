import { Request, Response } from 'express';
import pool from '../db';

const handleError = (res: Response, err: unknown) => {
    if (err instanceof Error) {
        res.status(500).json({ error: err.message });
    } else {
        res.status(500).json({ error: 'An unknown error occurred' });
    }
};

// Create a new recipe
export const createRecipe = async (req: Request, res: Response) => {
    const { name, instructions, ingredients } = req.body;
    const userId = (req.user as any).id;

    try {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');

            const recipeResult = await client.query(
                'INSERT INTO recipes (name, instructions, user_id) VALUES ($1, $2, $3) RETURNING *',
                [name, instructions, userId]
            );

            const recipeId = recipeResult.rows[0].id;

            for (const ingredient of ingredients) {
                const { ingredient_id, quantity } = ingredient;
                await client.query(
                    'INSERT INTO RecipeIngredients (recipe_id, ingredient_id, quantity) VALUES ($1, $2, $3)',
                    [recipeId, ingredient_id, quantity]
                );
            }

            await client.query('COMMIT');
            res.status(201).json(recipeResult.rows[0]);
        } catch (err) {
            await client.query('ROLLBACK');
            throw err;
        } finally {
            client.release();
        }
    } catch (err) {
        handleError(res, err);
    }
};

export const getRecipe = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const recipeResult = await pool.query('SELECT * FROM recipes WHERE id = $1', [id]);
        if (recipeResult.rows.length === 0) {
            return res.status(404).json({ error: 'Recipe not found' });
        }

        const ingredientsResult = await pool.query(
            // first two lines gets all the ingredients "2 cups, sugar, sweeter",...,"1, apple, fruit"
            // next two lines I'm not sure
            `SELECT RecipeIngredients.quantity, Ingredients.name, Ingredients.category
             FROM RecipeIngredients
             JOIN Ingredients ON RecipeIngredients.ingredient_id = Ingredients.id
             WHERE RecipeIngredients.recipe_id = $1`,
            [id]
        );

        const recipe = {
            ...recipeResult.rows[0],
            ingredients: ingredientsResult.rows
        };

        res.json(recipe);
    } catch (err) {
        handleError(res, err);
    }
};

export const updateRecipe = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, instructions, ingredients } = req.body;
    const userId = (req.user as any).id;

    try {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');

            const recipeResult = await client.query(
                `UPDATE recipes SET name = $1, instructions = $2 
                WHERE id = $3 AND user_id = $4 RETURNING *`,
                [name, instructions, id, userId]
            );

            if (recipeResult.rows.length === 0) {
                await client.query('ROLLBACK');
                return res.status(404).json({ error: 'Recipe not found or not owned by user' });
            }

            await client.query('DELETE FROM RecipeIngredients WHERE recipe_id = $1', [id]);

            for (const ingredient of ingredients) {
                const { ingredient_id, quantity } = ingredient;
                await client.query(
                    'INSERT INTO RecipeIngredients (recipe_id, ingredient_id, quantity) VALUES ($1, $2, $3)',
                    [id, ingredient_id, quantity]
                );
            }

            await client.query('COMMIT');
            res.json(recipeResult.rows[0]);
        } catch (err) {
            await client.query('ROLLBACK');
            throw err;
        } finally {
            client.release();
        }
    } catch (err) {
        handleError(res, err);
    }
};

export const deleteRecipe = async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = (req.user as any).id;

    try {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');

            const recipeResult = await client.query(
                'DELETE FROM recipes WHERE id = $1 AND user_id = $2 RETURNING *',
                [id, userId]
            );

            if (recipeResult.rows.length === 0) {
                await client.query('ROLLBACK');
                return res.status(404).json({ error: 'Recipe not found or not owned by user' });
            }

            await client.query('DELETE FROM RecipeIngredients WHERE recipe_id = $1', [id]);

            await client.query('COMMIT');
            res.json({ message: 'Recipe deleted successfully' });
        } catch (err) {
            await client.query('ROLLBACK');
            throw err;
        } finally {
            client.release();
        }
    } catch (err) {
        handleError(res, err);
    }
};

