import { Ingredient, Recipe, RecipeStep } from 'app/types'

export type CompleteRecipe = Recipe & { steps: (RecipeStep & { ingredient: Ingredient })[] }
export type PartialRecipe = Recipe & { steps: (RecipeStep)[] }
