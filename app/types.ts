export type Ingredient = {
	id: string
	name: string
	relais: number
	timePerCentiliter: number
	alcohol: number
}

export type RecipeStep = {
	centiliter: number
	ingredientId: string
}

export type Recipe = {
	name: string
}
