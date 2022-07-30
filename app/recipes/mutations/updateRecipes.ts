import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'
import { CompleteRecipe } from '../types'

// const UpdateRecipe = z.array(
// 	z.object({
// 		id: z.number(),
// 		name: z.string(),
// 	})
// )

export default resolver.pipe(
	// resolver.zod(UpdateRecipe),
	async (recipes: CompleteRecipe[]) => {
		// TODO: in multi-tenant app, you must add validation to ensure correct tenant
		await db.recipeStep.deleteMany()
		for (const { steps, ...recipe } of recipes) {
			if (recipe.id < 0) await db.recipe.create({
				data: {
					...recipe
				}
			})
			else await db.recipe.update({
				data: {
					...recipe,
					steps: {
						create: steps.map(({ ingredient, ...step }) => step)
					}
				},
				where: {
					id: recipe.id
				}
			})
		}
		return recipes
	}
)
