import { resolver, SecurePassword } from 'blitz'
import db from 'db'
import { Signup } from 'app/auth/validations'
import slug from 'slug'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'

export default resolver.pipe(resolver.zod(Signup), async ({ name, email, password, birthday }, ctx) => {
	const hashedPassword = await SecurePassword.hash(password.trim())
	try {
		const user = await db.user.create({
			data: {
				name,
				slug: slug(name),
				email: email.toLowerCase().trim(),
				birthday,
				hashedPassword,
			},
		})
		await ctx.session.$create({
			userId: user.id,
			permissions: [],
			colorScheme: 'light'
		})
		return user
	} catch (error) {
		if (error instanceof PrismaClientKnownRequestError) {
			throw new Error('Username oder E-mail bereits vergeben')
		}
		throw new Error('Unbekannter Fehler')
	}
})
