import { BlitzPage, useMutation, useQuery } from 'blitz'
import Layout from 'app/core/layouts/Layout'
import { Button, Switch, Tabs } from '@mantine/core'
import { Suspense, useState } from 'react'
import { useListState } from '@mantine/hooks'
import RecipeCard from 'app/recipes/components/RecipeCard'
import { CompleteRecipe } from 'app/recipes/types'
import RecipeEditor from 'app/recipes/components/RecipeEditor'
import IngredientsEditor from 'app/ingredients/components/IngredientEditor'
import SaveButton from 'app/core/components/SaveButton'
import updateRecipes from 'app/recipes/mutations/updateRecipes'
import getRecipes from 'app/recipes/queries/getRecipes'
import getIngredients from 'app/ingredients/queries/getIngredients'

const RecipeIngredientTabs = () => {
	const [originalRecipes] = useQuery(getRecipes, {})
	const [originalIngredients] = useQuery(getIngredients, {})
	const [updateRecipesMutation, updateRecipesSubmission] = useMutation(updateRecipes)
	const [ingredients, ingredientsHandler] = useListState(originalIngredients)
	const [recipes, recipesHandler] = useListState(originalRecipes)
	const [editMode, setEditMode] = useState(false)
	return <div className="">
		{editMode ? <>
			<Tabs variant="outline">
				<Tabs.Tab label="Rezepte">
					<div className="p-4 bg-gray-800">
						<Button onClick={() => {
							recipesHandler.append({
								name: 'Neues Rezept',
								steps: [],
							})
						}}>
							Rezept hinzufügen
						</Button>
						{recipes.map((recipe, index) => <div className="my-4" key={index}>
							<RecipeEditor {...{ ingredients, recipe, recipeHandler: recipesHandler, index }} />
						</div>)}
						<SaveButton onClick={() => updateRecipesMutation(recipes)} loading={updateRecipesSubmission.isLoading}>
							Speichern
						</SaveButton>
					</div>
				</Tabs.Tab>
				<Tabs.Tab label="Zutaten">
					<div className="p-4 bg-gray-800">
						<IngredientsEditor {...{ ingredients, ingredientsHandler }} />
					</div>
				</Tabs.Tab>
			</Tabs>
		</> : <div className="px-4 grid gap-4 grid-cols-2">
			{recipes.map((recipe, index) => <RecipeCard key={index} {...{ recipe }} />)}
		</div>}
		<div className="p-4">
			<Switch label="Edit Modus" checked={editMode} onChange={e => setEditMode(e.currentTarget.checked)} />
			<Button size="sm" className="mt-4" onClick={() => location.reload()}>Reload</Button>
		</div>
	</div>
}

const IndexPage: BlitzPage = () => {
	return <Suspense fallback="loading...">
		<RecipeIngredientTabs />
	</Suspense>
}

IndexPage.suppressFirstRenderFlicker = true
IndexPage.getLayout = (page) => <Layout contain className="bg-red-200">{page}</Layout>

export default IndexPage
