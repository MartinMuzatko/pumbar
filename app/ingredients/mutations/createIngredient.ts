import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const CreateIngredient = z.object({
	name: z.string(),
})

export default resolver.pipe(
	resolver.zod(CreateIngredient),
	resolver.authorize(),
	(input) => {
		// TODO: in multi-tenant app, you must add validation to ensure correct tenant
		// const ingredient = await db.ingredient.create({ data: input })

	}
)
