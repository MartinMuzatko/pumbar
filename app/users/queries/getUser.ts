import { resolver, NotFoundError } from 'blitz'
import type { Prisma } from '@prisma/client'
import db from 'db'

const getUserResolver = async (where: Prisma.UserFindFirstArgs['where']) => {
	// TODO: in multi-tenant app, you must add validation to ensure correct tenant
	const user = await db.user.findFirst({
		where,
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
	if (!user) throw new NotFoundError()
	return {
		...user,
		permissions: user.permissions.map(p => p.name)
	}
}

export default resolver.pipe(
	resolver.authorize(),
	getUserResolver,
)

export type FullUser = Awaited<ReturnType<typeof getUserResolver>>
