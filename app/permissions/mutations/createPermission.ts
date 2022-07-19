import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const CreatePermission = z.object({
	name: z.string(),
})

export default resolver.pipe(
	resolver.zod(CreatePermission),
	resolver.authorize(),
	async (input) => {
		// TODO: in multi-tenant app, you must add validation to ensure correct tenant
		const permission = await db.permission.create({ data: input })

		return permission
	}
)
