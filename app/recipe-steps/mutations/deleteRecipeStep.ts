import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const DeleteRecipeStep = z.object({
	id: z.number(),
})

export default resolver.pipe(
	resolver.zod(DeleteRecipeStep),
	resolver.authorize(),
	async ({ id }) => {
		// TODO: in multi-tenant app, you must add validation to ensure correct tenant
		const recipeStep = await db.recipeStep.deleteMany({ where: { id } })

		return recipeStep
	}
)
