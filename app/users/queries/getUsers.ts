import { paginate, resolver } from 'blitz'
import db, { Prisma } from 'db'

type GetUsersInput = Pick<
	Prisma.UserFindManyArgs,
	'where' | 'orderBy' | 'skip' | 'take' | 'include'
>

const getUsersResolver = async ({ where, orderBy, skip = 0, take = 2, include }: GetUsersInput) => {
	// TODO: in multi-tenant app, you must add validation to ensure correct tenant
	const {
		items: users,
		hasMore,
		nextPage,
		count,
	} = await paginate({
		skip,
		take,
		count: () => db.user.count({ where }),
		query: async (paginateArgs) => {

			const users = await db.user.findMany({
				...paginateArgs,
				where,
				orderBy,
				include: {
					avatar: true,
				}
			})
			return Promise.all(users.map(async user => ({
				...user,
				registrationsCount: await db.registration.count({
					where,
				})
			})))
		},
	})

	return {
		users,
		nextPage,
		hasMore,
		count,
	}
}

const getUsers = resolver.pipe(
	getUsersResolver,
)

export default getUsers
export type PaginatedUsers = Awaited<ReturnType<typeof getUsersResolver>>
