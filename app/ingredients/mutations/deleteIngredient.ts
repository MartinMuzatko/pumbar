import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const DeleteIngredient = z.object({
    id: z.number(),
})

export default resolver.pipe(
    resolver.zod(DeleteIngredient),
    resolver.authorize(),
    async ({ id }) => {
        // TODO: in multi-tenant app, you must add validation to ensure correct tenant
        const ingredient = await db.ingredient.deleteMany({ where: { id } })

        return ingredient
    }
)
