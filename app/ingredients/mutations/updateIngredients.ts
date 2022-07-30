import { Ingredient } from 'app/types'
import { resolver } from 'blitz'
import db from 'db'

export default resolver.pipe(
	async (ingredients: Ingredient[]) => {
		await db.writeIngredients(ingredients)
	}
)
