import { BlitzPage } from 'blitz'
import Layout from 'app/core/layouts/Layout'
import { Switch, Tabs } from '@mantine/core'
import { useState } from 'react'
import { useListState } from '@mantine/hooks'
import RecipeCard from 'app/recipes/components/RecipeCard'
import { CompleteRecipe } from 'app/recipes/types'
import RecipeEditor from 'app/recipes/components/RecipeEditor'
import IngredientsEditor from 'app/ingredients/components/IngredientEditor'

const IndexPage: BlitzPage = () => {
	const originalIngredients = [
		{
			id: 1,
			createdAt: new Date(),
			updatedAt: new Date(),
			alcohol: 0,
			name: 'Ananassaft',
			timePerCentiliter: 1000,
			relais: 1,
		},
		{
			id: 2,
			createdAt: new Date(),
			updatedAt: new Date(),
			alcohol: 0,
			name: 'Orangensaft',
			timePerCentiliter: 1000,
			relais: 2,
		},
		{
			id: 3,
			createdAt: new Date(),
			updatedAt: new Date(),
			alcohol: 30,
			name: 'Triple Sec',
			timePerCentiliter: 1000,
			relais: 3,
		},
		{
			id: 4,
			createdAt: new Date(),
			updatedAt: new Date(),
			alcohol: 0,
			name: 'Coca Cola',
			timePerCentiliter: 1000,
			relais: 4,
		},
	]
	const [ingredients, ingredientsHandler] = useListState(originalIngredients)
	const originalRecipes: CompleteRecipe[] = [
		{
			id: 1,
			name: 'Coconut Kiss',
			createdAt: new Date(),
			updatedAt: new Date(),
			steps: [
				{
					ingredient: ingredients[0],
					centiliter: 4,
				},
				{
					ingredient: ingredients[1],
					centiliter: 6,
				}
			]
		},
		{
			id: 2,
			name: 'Cuba Libre',
			createdAt: new Date(),
			updatedAt: new Date(),
			steps: [
				{
					ingredient: ingredients[2],
					centiliter: 3,
				},
				{
					ingredient: ingredients[3],
					centiliter: 4,
				}
			]
		}
	]
	const [recipes, recipesHandler] = useListState(originalRecipes)
	const [editMode, setEditMode] = useState(false)
	return <div className="">
		<Tabs classNames={{ tabsList: 'bg-green-1o00' }}>
			<Tabs.Tab label="Rezepte">
				<div className="p-4 bg-gray-800">
					{recipes.map(recipe => <div className="my-4" key={recipe.id}>
						{editMode
							? <RecipeEditor {...{ ingredients, recipe, recipeHandler: recipesHandler }} />
							: <RecipeCard {...{ recipe }} />
						}
					</div>)}
				</div>
			</Tabs.Tab>
			<Tabs.Tab label="Zutaten">
				<div className="p-4 bg-gray-800">
					{editMode && <IngredientsEditor {...{ ingredients, ingredientsHandler }} />
					}
				</div>
			</Tabs.Tab>
		</Tabs>
		<div className="p-4">
			<Switch label="Edit Modus" checked={editMode} onChange={e => setEditMode(e.currentTarget.checked)} />
		</div>
	</div>
}

IndexPage.suppressFirstRenderFlicker = true
IndexPage.getLayout = (page) => <Layout contain className="bg-red-200">{page}</Layout>

export default IndexPage
