import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const UpdatePermission = z.object({
	id: z.number(),
	name: z.string(),
})

export default resolver.pipe(
	resolver.zod(UpdatePermission),
	resolver.authorize(),
	async ({ id, ...data }) => {
		// TODO: in multi-tenant app, you must add validation to ensure correct tenant
		const permission = await db.permission.update({ where: { id }, data })

		return permission
	}
)
