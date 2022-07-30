import { CompleteRecipe, PartialRecipe } from 'app/recipes/types'
import { Ingredient } from 'app/types'
import * as fs from 'fs/promises'

const writeJson = (path: string, data: unknown) => fs.writeFile(path, JSON.stringify(data, null, 4))
const readJson = async (path: string) => JSON.parse(await fs.readFile(path, 'utf8'))

const recipesFile = 'db/db/recipes.json'
const ingredientsFile = 'db/db/ingredients.json'

const writeRecipes = (recipes: PartialRecipe[]) => writeJson(recipesFile, recipes)
const readRecipes = async (): Promise<CompleteRecipe[]> => {
	const ingredients = await readIngredients()
	const recipes = await readJson(recipesFile) as PartialRecipe[]
	return recipes.map(recipe => ({
		...recipe,
		steps: recipe.steps.map(step => ({
			...step,
			ingredient: ingredients.find(ingredient => ingredient.id === step.ingredientId) || { alcohol: 0, id: 'test', name: '', relais: 1, timePerCentiliter: 0 }
		}))
	}))
}
const writeIngredients = (Ingredients: Ingredient[]) => writeJson(ingredientsFile, Ingredients)
const readIngredients = (): Promise<Ingredient[]> => readJson(ingredientsFile)

const db = {
	writeRecipes,
	readRecipes,
	writeIngredients,
	readIngredients,
}
export default db
