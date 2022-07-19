import { BlitzPage } from 'blitz'
import Layout from 'app/core/layouts/Layout'
import { Button, Modal, Progress, RangeSlider, Slider, Switch, Tabs, TextInput } from '@mantine/core'
import { useEffect, useState } from 'react'
import { useListState } from '@mantine/hooks'
import { UseListStateHandler } from '@mantine/hooks/lib/use-list-state/use-list-state'

interface Ingredient {
	id: number
	name: string
	relais: number
	/** ms */
	timePerCentiliter: number
	alcohol: boolean
}

interface RecipeStep {
	ingredient: Ingredient
	/** ms */
	centiliter: number
}

interface Recipe {
	id: number
	name: string
	steps: RecipeStep[]
}

interface RecipeCardProps {
	recipe: Recipe
}

interface RecipeEditorProps {
	recipe: Recipe
	recipeHandler: UseListStateHandler<Recipe>
	ingredients: Ingredient[]
}

const getRemainderPart = (divisor: number = 1, divident: number) => {
	return Number.isInteger(divident) ? `${divisor}/${divident}` : getRemainderPart(divisor + 1, divident * 2)
}

const FillProgress = ({ max }) => {
	const [counter, setCounter] = useState(max / 100)
	useEffect(() => {
		counter > 0 && setTimeout(() => setCounter(counter - 1), 100)
	}, [counter])
}

const RecipeCard = ({ recipe }: RecipeCardProps) => {
	const [inProgress, setInProgress] = useState(false)
	const longestTime = recipe.steps.reduce((acc, step) => Math.max(acc, step.centiliter), 0)
	const hasAlcohol = recipe.steps.filter(s => s.ingredient.alcohol).length
	const totalTime = recipe.steps.reduce((prev, cur) => prev + cur.centiliter, 0)
	const ingredients = recipe.steps.map(s => ({
		...s,
		percentage: s.centiliter / totalTime
	}))
	return <article onClick={() => {
		setInProgress(true)
	}} className="shadow rounded p-4 cursor-pointer bg-green-600/50">
		<h3 className="flex justify-between">
			<div className="font-bold text-lg">
				{recipe.name}
			</div>
			<div>
				{/* ★☆ */}
				{hasAlcohol ?
					<>
						<span>Alkohol: </span>
						{[...Array(hasAlcohol)].map((_s, i) => <span key={i}>★</span>)}
					</>
					: 'Alkoholfrei'}
			</div>
		</h3>
		<div>
			{ingredients.map(step => <>
				<div>
					{(step.percentage * 100).toFixed(0)}% {step.ingredient.name}
				</div>
			</>)}
		</div>
		<Modal title="Drink wird zubereitet" centered onClose={() => { setInProgress(false) }} opened={inProgress}>
			<Progress value={20} />
			{longestTime}
		</Modal>
	</article>
}

const RecipeEditor = ({ recipe, ingredients, recipeHandler }: RecipeEditorProps) => {
	const [ingredientDialogOpened, setIngredientDialogOpened] = useState(false)
	const [recipeSteps, recipeStepsHandler] = useListState(recipe.steps)
	const hasAlcohol = recipeSteps.filter(s => s.ingredient.alcohol).length
	const totalTime = recipeSteps.reduce((prev, cur) => prev + cur.centiliter, 0)
	return <article className="shadow rounded p-4">
		<h3 className="flex justify-between">
			<TextInput label="Name" value={recipe.name} />
			<div>
				{/* ★☆ */}
				{hasAlcohol ?
					<>
						<span>Alkohol: </span>
						{[...Array(hasAlcohol)].map((_s, i) => <span key={i}>★</span>)}
					</>
					: 'Alkoholfrei'}
			</div>
		</h3>
		<div className="my-4">
			<Button onClick={() => { setIngredientDialogOpened(true) }}>Zutat hinzufügen</Button>
			<div>
				Gesamt: {totalTime}cl
			</div>
			{recipeSteps.map((step, stepIndex) => <>
				<div key={stepIndex}>
					{step.centiliter}cl {step.ingredient.name}
					<small>
						({((step.centiliter / totalTime) * 100).toFixed(0)}%)
					</small>
					<Slider
						value={step.centiliter}
						onChange={v => {
							recipeStepsHandler.setItem(stepIndex, { ...step, centiliter: v })
							recipeHandler.applyWhere(
								r => r.id == recipe.id,
								r => ({ ...r, steps: recipeSteps })
							)
						}}
						max={50}
						step={0.5}
						label={`${step.centiliter} cl`}
					/>
				</div>
			</>)}
		</div>
		<Modal title="Zutat hinzufügen" onClose={() => { setIngredientDialogOpened(false) }} opened={ingredientDialogOpened}>
			{ingredients.map(ingredient => <div onClick={() => {
				setIngredientDialogOpened(false)
				const newStep = { ingredient, centiliter: 4 }
				recipeStepsHandler.append(newStep)
				recipeHandler.applyWhere(
					r => r.id == recipe.id,
					r => ({ ...r, steps: [...r.steps, newStep] })
				)
			}} className="flex rounded cursor-pointer hover:bg-green-200 p-4" key={ingredient.id}>
				<span className="pr-2">{ingredient.name}</span>
				<span className="pr-2">Relais: {ingredient.relais}</span>
				<span className="pr-2">Alkohol: {ingredient.alcohol ? 'Ja' : 'Nein'}</span>
				{/* ★☆ */}
			</div>)}
		</Modal>
	</article>
}

interface IngredientsEditorProps {
	ingredients: Ingredient[]
}


const IngredientsEditor = ({ ingredients }: IngredientsEditorProps) => {
	return <>
		<table className="w-full bg-gray-800">
			<thead className="bg-green-800 text-left shadow">
				<tr>
					<th>Aktionen</th>
					<th>Name</th>
					<th>Relais #</th>
					<th>Alkohol %</th>
					<th>Zeit ms/cl</th>
				</tr>
			</thead>
			<tbody>
				{ingredients.map(ingredient => <tr key={ingredient.id}>
					<td className="py-1">
						<Button className="mr-2">Vorlauf</Button>
						<Button color="pink">Einlernen</Button>
					</td>
					<td>{ingredient.name}</td>
					<td># {ingredient.relais}</td>
					<td>{ingredient.alcohol} %</td>
					<td>{ingredient.timePerCentiliter} ms/cl</td>
				</tr>)}
			</tbody>
		</table>
	</>
}

const IndexPage: BlitzPage = () => {
	const originalIngredients = [
		{
			id: 1,
			alcohol: false,
			name: 'Ananassaft',
			timePerCentiliter: 10000,
			relais: 1,
		},
		{
			id: 2,
			alcohol: false,
			name: 'Orangensaft',
			timePerCentiliter: 10000,
			relais: 2,
		},
		{
			id: 3,
			alcohol: true,
			name: 'Triple Sec',
			timePerCentiliter: 10000,
			relais: 3,
		},
		{
			id: 4,
			alcohol: false,
			name: 'Coca Cola',
			timePerCentiliter: 10000,
			relais: 4,
		},
	]
	const originalRecipes: Recipe[] = [
		{
			id: 1,
			name: 'Coconut Kiss',
			steps: [
				{
					ingredient: originalIngredients[0],
					centiliter: 4,
				},
				{
					ingredient: originalIngredients[1],
					centiliter: 6,
				}
			]
		},
		{
			id: 2,
			name: 'Cuba Libre',
			steps: [
				{
					ingredient: originalIngredients[2],
					centiliter: 3,
				},
				{
					ingredient: originalIngredients[3],
					centiliter: 4,
				}
			]
		}
	]

	const [recipes, recipesHandler] = useListState(originalRecipes)
	const [ingredients, ingredientsHandler] = useListState(originalIngredients)
	const [editMode, setEditMode] = useState(false)
	return <div className="">
		<Tabs classNames={{ tabsList: 'bg-green-1o00' }}>
			<Tabs.Tab label="Rezepte">
				<div className="p-4 bg-gray-800">
					{recipes.map(recipe => <div className="my-4" key={recipe.id}>
						{editMode
							? <RecipeEditor {...{ ingredients, recipe, recipeHandler: recipesHandler }} />
							: <RecipeCard recipe={recipe} />
						}
					</div>)}
				</div>
			</Tabs.Tab>
			<Tabs.Tab label="Zutaten">
				<div className="p-4">
					{editMode && <IngredientsEditor {...{ ingredients }} />
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
