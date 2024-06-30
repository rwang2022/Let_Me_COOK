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
exports.createRecipe = createRecipe;
exports.addIngredientToRecipe = addIngredientToRecipe;
exports.getRecipeById = getRecipeById;
exports.getIngredientsForRecipe = getIngredientsForRecipe;
const db_1 = __importDefault(require("../db"));
function createRecipe(name, instructions, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield db_1.default.query('INSERT INTO Recipes (name, instructions, user_id) VALUES ($1, $2, $3) RETURNING *', [name, instructions, userId]);
        return result.rows[0];
    });
}
function addIngredientToRecipe(recipeId, ingredientId, quantity) {
    return __awaiter(this, void 0, void 0, function* () {
        yield db_1.default.query('INSERT INTO RecipeIngredients (recipe_id, ingredient_id, quantity) VALUES ($1, $2, $3)', [recipeId, ingredientId, quantity]);
    });
}
function getRecipeById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield db_1.default.query('SELECT * FROM Recipes WHERE id = $1', [id]);
        return result.rows[0];
    });
}
function getIngredientsForRecipe(recipeId) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield db_1.default.query('SELECT i.*, ri.quantity FROM Ingredients i INNER JOIN RecipeIngredients ri ON i.id = ri.ingredient_id WHERE ri.recipe_id = $1', [recipeId]);
        return result.rows;
    });
}
