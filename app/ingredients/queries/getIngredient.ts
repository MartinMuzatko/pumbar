import { resolver, NotFoundError } from 'blitz'
import db from 'db'
import { z } from 'zod'

const GetIngredient = z.object({
	// This accepts type of undefined, but is required at runtime
	id: z.number().optional().refine(Boolean, 'Required'),
})

export default resolver.pipe(resolver.zod(GetIngredient), resolver.authorize(), async ({ id }) => {
	// TODO: in multi-tenant app, you must add validation to ensure correct tenant
	const ingredient = await db.ingredient.findFirst({ where: { id } })

	if (!ingredient) throw new NotFoundError()

	return ingredient
})
