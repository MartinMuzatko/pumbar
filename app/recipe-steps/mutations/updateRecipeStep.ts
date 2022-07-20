import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const UpdateRecipeStep = z.object({
    id: z.number(),
    name: z.string(),
})

export default resolver.pipe(
    resolver.zod(UpdateRecipeStep),
    resolver.authorize(),
    async ({ id, ...data }) => {
        // TODO: in multi-tenant app, you must add validation to ensure correct tenant
        const recipeStep = await db.recipeStep.update({ where: { id }, data })

        return recipeStep
    }
)
