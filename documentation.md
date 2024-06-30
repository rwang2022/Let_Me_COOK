# Documentation

## API Endpoints

### Recipes

- **POST /api/recipes**
  - Create a new recipe.
  - Request Body:
    ```json
    {
      "name": "Recipe Name",
      "instructions": "Recipe Instructions",
      "ingredients": [
        { "ingredient_id": 1, "quantity": "2 cups" },
        { "ingredient_id": 2, "quantity": "3 tbsp" }
      ]
    }
    ```

- **GET /api/recipes/:id**
  - Get a recipe by ID.

- **PUT /api/recipes/:id**
  - Update a recipe by ID.
  - Request Body:
    ```json
    {
      "name": "Updated Recipe Name",
      "instructions": "Updated Recipe Instructions",
      "ingredients": [
        { "ingredient_id": 1, "quantity": "2 cups" },
        { "ingredient_id": 2, "quantity": "3 tbsp" }
      ]
    }
    ```

- **DELETE /api/recipes/:id**
  - Delete a recipe by ID.

### Pantry

- **GET /api/pantry**
  - Get all items in the pantry.

- **POST /api/pantry**
  - Add an item to the pantry.
  - Request Body:
    ```json
    {
      "ingredient_id": 1,
      "quantity": "2 cups"
    }
    ```

- **PUT /api/pantry**
  - Update an item in the pantry.
  - Request Body:
    ```json
    {
      "ingredient_id": 1,
      "quantity": "3 cups"
    }
    ```

- **DELETE /api/pantry**
  - Delete an item from the pantry.
  - Request Body:
    ```json
    {
      "ingredient_id": 1
    }
    ```

### Shopping List

- **GET /api/shoppinglist**
  - Get all items in the shopping list.

- **POST /api/shoppinglist**
  - Add an item to the shopping list.
  - Request Body:
    ```json
    {
      "ingredient_id": 1,
      "quantity": "2 cups"
    }
    ```

- **PUT /api/shoppinglist**
  - Update an item in the shopping list.
  - Request Body:
    ```json
    {
      "ingredient_id": 1,
      "quantity": "3 cups"
    }
    ```

- **DELETE /api/shoppinglist**
  - Delete an item from the shopping list.
  - Request Body:
    ```json
    {
      "ingredient_id": 1
    }
    ```

### Ingredients

- **GET /api/ingredients**
  - Get all ingredients.

- **POST /api/ingredients**
  - Add a new ingredient.
  - Request Body:
    ```json
    {
      "name": "Ingredient Name",
      "category": "Category",
      "allergens": ["allergen1", "allergen2"],
      "nutrition_info": {"calories": 100, "protein": 2}
    }
    ```

- **PUT /api/ingredients/:id**
  - Update an ingredient by ID.
  - Request Body:
    ```json
    {
      "name": "Updated Ingredient Name",
      "category": "Updated Category",
      "allergens": ["updated_allergen1", "updated_allergen2"],
      "nutrition_info": {"calories": 120, "protein": 3}
    }
    ```

- **DELETE /api/ingredients/:id**
  - Delete an ingredient by ID.
