import { Ctx } from 'blitz'
import db from 'db'
import { Permission } from 'types'
import * as R from 'ramda'

export default async function getCurrentUser(_ = null, { session }: Ctx) {
	if (!session.userId) return null

	const user = await db.user.findFirst({
		where: { id: session.userId },
		include: {
			avatar: true,
			permissions: {
				select: {
					name: true,
				}
			},
			registrations: {
				select: {
					id: true,
					attendeeStatus: true,
					eventId: true,
				}
			},
			eventrequest: true,
		},
		// select: { id: true, name: true, email: true, role: true },
	})
	if (!user) return null
	return {
		...R.omit(['hashedPassword'], user),
		permissions: (user?.permissions || []).map(p => p.name) as Permission[],
	}
}

export type CurrentUser = Awaited<ReturnType<typeof getCurrentUser>>
