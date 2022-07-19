import { paginate, resolver } from 'blitz'
import db, { Prisma } from 'db'

interface GetPermissionsInput
	extends Pick<Prisma.PermissionFindManyArgs, 'where' | 'orderBy' | 'skip' | 'take'> { }

export default resolver.pipe(
	resolver.authorize(),
	async ({ where, orderBy, skip = 0, take = 100 }: GetPermissionsInput) => {
		// TODO: in multi-tenant app, you must add validation to ensure correct tenant
		const {
			items: permissions,
			hasMore,
			nextPage,
			count,
		} = await paginate({
			skip,
			take,
			count: () => db.permission.count({ where }),
			query: (paginateArgs) => db.permission.findMany({ ...paginateArgs, where, orderBy }),
		})

		return {
			permissions,
			nextPage,
			hasMore,
			count,
		}
	}
)
