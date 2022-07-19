import { resolver, SecurePassword } from 'blitz'
import db from 'db'
import slug from 'slug'
import { UpdateUser } from '../validations'

export default resolver.pipe(
	resolver.zod(UpdateUser),
	resolver.authorize(),
	async ({ id, password, ...data }, ctx) => {
		// TODO: in multi-tenant app, you must add validation to ensure correct tenant

		const user = await db.user.update({
			where: { id },
			data: {
				...data,
				...((password != '********' && password) ? { hashedPassword: await SecurePassword.hash(password.trim()) } : {}),
				slug: slug(data.name),
			},
		})
		return user
	}
)
