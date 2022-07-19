import { NotFoundError, SecurePassword, resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'
import { authenticateUser } from './login'


export default resolver.pipe(
	resolver.zod(z.object({
		colorScheme: z.enum(['dark', 'light'])
	})),
	async ({ colorScheme }, ctx) => {
		// ctx.session.
		await ctx.session.$setPublicData({
			colorScheme
		})
	}
)
