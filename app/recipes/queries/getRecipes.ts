import { resolver } from 'blitz'
import db from 'db'

export default resolver.pipe(
	() => {
		return db.readRecipes()
	}
)
