import { paginate, resolver } from 'blitz'
import db, { Prisma } from 'db'

interface GetRecipeStepsInput
    extends Pick<Prisma.RecipeStepFindManyArgs, 'where' | 'orderBy' | 'skip' | 'take'> {}

export default resolver.pipe(
    resolver.authorize(),
    async ({ where, orderBy, skip = 0, take = 100 }: GetRecipeStepsInput) => {
        // TODO: in multi-tenant app, you must add validation to ensure correct tenant
        const {
            items: recipeSteps,
            hasMore,
            nextPage,
            count,
        } = await paginate({
            skip,
            take,
            count: () => db.recipeStep.count({ where }),
            query: (paginateArgs) => db.recipeStep.findMany({ ...paginateArgs, where, orderBy }),
        })

        return {
            recipeSteps,
            nextPage,
            hasMore,
            count,
        }
    }
)
