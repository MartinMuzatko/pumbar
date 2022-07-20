import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const CreateRecipeStep = z.object({
    name: z.string(),
})

export default resolver.pipe(
    resolver.zod(CreateRecipeStep),
    resolver.authorize(),
    async (input) => {
        // TODO: in multi-tenant app, you must add validation to ensure correct tenant
        const recipeStep = await db.recipeStep.create({ data: input })

        return recipeStep
    }
)
