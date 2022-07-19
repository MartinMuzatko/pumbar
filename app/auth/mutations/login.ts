import { resolver, SecurePassword, AuthenticationError } from 'blitz'
import db from 'db'
import { Login } from '../validations'
import { Permission } from 'types'
import { z } from 'zod'

export const authenticateUser = async (login: z.infer<typeof Login>) => {
	const { identifier, password } = Login.parse(login)
	const user = await db.user.findFirst({
		where: {
			OR: [
				{
					email: identifier,
				},
				{
					name: identifier,
				},
			],
		},
		include: {
			permissions: {
				select: {
					name: true,
				}
			}
		}
	})
	if (!user) throw new AuthenticationError('Username oder Passwort ungültig')
	try {
		const result = await SecurePassword.verify(user.hashedPassword, password)
		if (result === SecurePassword.VALID_NEEDS_REHASH) {
			// Upgrade hashed password with a more secure hash
			const improvedHash = await SecurePassword.hash(password)
			await db.user.update({ where: { id: user.id }, data: { hashedPassword: improvedHash } })
		}
		const { hashedPassword, ...rest } = user
		return rest
	} catch (error) {
		throw new AuthenticationError('Username oder Passwort ungültig')
	}
}

export default resolver.pipe(resolver.zod(Login), async (login, ctx) => {
	// This throws an error if credentials are invalid
	const user = await authenticateUser(login)
	await ctx.session.$create({
		userId: user.id,
		permissions: user.permissions.map(p => p.name as Permission),
		colorScheme: 'light'
	})

	return user
})

export type AuthenticatedUser = Awaited<ReturnType<typeof authenticateUser>>
