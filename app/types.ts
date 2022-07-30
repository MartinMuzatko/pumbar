export type Ingredient = {
	id: number
	name: string
	relais: number
	timePerCentiliter: number
	alcohol: number
}

export type RecipeStep = {
	centiliter: number
	ingredientId: number
}

export type Recipe = {
	name: string
}
