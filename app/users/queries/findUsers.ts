import { resolver } from 'blitz'
import type { Prisma } from '@prisma/client'
import db from 'db'

const getUserResolver = async (where: Prisma.UserFindFirstArgs['where']) => {
	// TODO: in multi-tenant app, you must add validation to ensure correct tenant
	const users = await db.user.findMany({
		where,
		take: 15,
		include: {
			eventsCreated: true,
			permissions: true,
			registrations: {
				include: {
					event: {
						include: {
							items: true,
							groups: true,
						}
					},
					items: {
						select: {
							id: true
						}
					},
					groups: {
						select: {
							id: true
						}
					},
				}
			},
			avatar: true,
		},
	})
	return users.map(user => ({
		...user,
		permissions: user.permissions.map(p => p.name)

	}))
}

const findUsers = resolver.pipe(
	resolver.authorize(),
	getUserResolver,
)

export default findUsers

export type FullUser = Awaited<ReturnType<typeof getUserResolver>>
