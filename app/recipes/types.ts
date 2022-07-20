import { Ingredient, Recipe, RecipeStep } from '@prisma/client'

export type CompleteRecipe = Recipe & { steps: (RecipeStep & { ingredient: Ingredient })[] }
