import { resolver, NotFoundError, AuthorizationError, Ctx } from 'blitz'
import type Prisma from '@prisma/client'
import db from 'db'
import { z } from 'zod'
import { globalPermission } from 'types'

const GetUser = z.object({
	// This accepts type of undefined, but is required at runtime
	id: z.number().optional(),
	slug: z.string().optional(),
})

const getPublicUserResolver = async (where: Partial<Prisma.User>, ctx: Ctx) => {
	// TODO: in multi-tenant app, you must add validation to ensure correct tenant
	const user = await db.user.findFirst({
		where,
		select: {
			id: true,
			slug: true,
			name: true,
			createdAt: true,
			isPublic: true,
			eventsCreated: true,
			species: true,
			speciesIcon: true,
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
	if (!user.isPublic && ctx.session?.permissions?.includes(globalPermission.show_hidden_user)) throw new AuthorizationError()
	return user
}

export default resolver.pipe(
	// resolver.authorize(),
	getPublicUserResolver,
)

export type PublicUser = Awaited<ReturnType<typeof getPublicUserResolver>>
