import pool from '../db';

export async function createIngredient(name: string, category: string, allergens: string, nutritionInfo: object) {
  const result = await pool.query(
    'INSERT INTO Ingredients (name, category, allergens, nutrition_info) VALUES ($1, $2, $3, $4) RETURNING *',
    [name, category, allergens, nutritionInfo]
  );
  return result.rows[0];
}

export async function getAllIngredients() {
  const result = await pool.query('SELECT * FROM Ingredients');
  return result.rows;
}

export async function getIngredientById(id: number) {
  const result = await pool.query('SELECT * FROM Ingredients WHERE id = $1', [id]);
  return result.rows[0];
}
