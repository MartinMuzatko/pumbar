import { resolver } from 'blitz'
import db from 'db'
import { PartialRecipe } from '../types'

export default resolver.pipe(
	async (recipes: PartialRecipe[]) => {
		await db.writeRecipes(recipes)
	}
)
