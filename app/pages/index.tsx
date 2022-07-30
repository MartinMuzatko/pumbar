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
	const [{ recipes: originalRecipes }] = useQuery(getRecipes, {})
	const [{ ingredients: originalIngredients }] = useQuery(getIngredients, {})
	const [updateRecipesMutation, updateRecipesSubmission] = useMutation(updateRecipes)
	const [ingredients, ingredientsHandler] = useListState(originalIngredients)
	const [recipes, recipesHandler] = useListState(originalRecipes)
	const [editMode, setEditMode] = useState(false)
	return <div className="">
		<Tabs classNames={{ tabsList: 'bg-green-1o00' }}>
			<Tabs.Tab label="Rezepte">
				<div className="p-4 bg-gray-800">
					{editMode && <>
						<Button onClick={() => {
							recipesHandler.append({
								id: -1,
								createdAt: new Date(),
								updatedAt: new Date(),
								name: 'Neues Rezept',
								steps: [],
							})
						}}>
							Rezept hinzufügen
						</Button>
					</>}
					{recipes.map((recipe, index) => <div className="my-4" key={recipe.id}>
						{editMode
							? <RecipeEditor {...{ ingredients, recipe, recipeHandler: recipesHandler, index }} />
							: <RecipeCard {...{ recipe }} />
						}
					</div>)}
					{editMode && <>
						<SaveButton onClick={() => updateRecipesMutation(recipes)} loading={updateRecipesSubmission.isLoading}>
							Speichern
						</SaveButton>
					</>}
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

const IndexPage: BlitzPage = () => {
	return <Suspense fallback="loading...">
		<RecipeIngredientTabs />
	</Suspense>
}

IndexPage.suppressFirstRenderFlicker = true
IndexPage.getLayout = (page) => <Layout contain className="bg-red-200">{page}</Layout>

export default IndexPage
