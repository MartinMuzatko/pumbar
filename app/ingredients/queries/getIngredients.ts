import { paginate, resolver } from 'blitz'
import db, { Prisma } from 'db'

interface GetIngredientsInput
	extends Pick<Prisma.IngredientFindManyArgs, 'where' | 'orderBy' | 'skip' | 'take'> { }

export default resolver.pipe(
	resolver.authorize(),
	async ({ where, orderBy, skip = 0, take = 100 }: GetIngredientsInput) => {
		// TODO: in multi-tenant app, you must add validation to ensure correct tenant
		const {
			items: ingredients,
			hasMore,
			nextPage,
			count,
		} = await paginate({
			skip,
			take,
			count: () => db.ingredient.count({ where }),
			query: (paginateArgs) => db.ingredient.findMany({ ...paginateArgs, where, orderBy }),
		})

		return {
			ingredients,
			nextPage,
			hasMore,
			count,
		}
	}
)
