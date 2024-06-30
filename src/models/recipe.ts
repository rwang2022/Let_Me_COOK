import pool from '../db';

export async function createRecipe(name: string, instructions: string, userId: number) {
  const result = await pool.query(
    'INSERT INTO Recipes (name, instructions, user_id) VALUES ($1, $2, $3) RETURNING *',
    [name, instructions, userId]
  );
  return result.rows[0];
}

export async function addIngredientToRecipe(recipeId: number, ingredientId: number, quantity: string) {
  await pool.query(
    'INSERT INTO RecipeIngredients (recipe_id, ingredient_id, quantity) VALUES ($1, $2, $3)',
    [recipeId, ingredientId, quantity]
  );
}

export async function getRecipeById(id: number) {
  const result = await pool.query('SELECT * FROM Recipes WHERE id = $1', [id]);
  return result.rows[0];
}

export async function getIngredientsForRecipe(recipeId: number) {
  const result = await pool.query(
    'SELECT i.*, ri.quantity FROM Ingredients i INNER JOIN RecipeIngredients ri ON i.id = ri.ingredient_id WHERE ri.recipe_id = $1',
    [recipeId]
  );
  return result.rows;
}
