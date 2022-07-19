import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const DeletePermission = z.object({
	id: z.number(),
})

export default resolver.pipe(
	resolver.zod(DeletePermission),
	resolver.authorize(),
	async ({ id }) => {
		// TODO: in multi-tenant app, you must add validation to ensure correct tenant
		const permission = await db.permission.deleteMany({ where: { id } })

		return permission
	}
)
