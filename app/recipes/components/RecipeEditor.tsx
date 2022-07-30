import { Button, Divider, Modal, Slider, TextInput } from '@mantine/core'
import { useListState } from '@mantine/hooks'
import { UseListStateHandler } from '@mantine/hooks/lib/use-list-state/use-list-state'
import { Ingredient } from 'app/types'
import { useEffect, useState } from 'react'
import { CompleteRecipe } from '../types'

interface RecipeEditorProps {
	recipe: CompleteRecipe
	recipeHandler: UseListStateHandler<CompleteRecipe>
	ingredients: Ingredient[]
	index: number
}

const RecipeEditor = ({ recipe, ingredients, recipeHandler, index }: RecipeEditorProps) => {
	const [ingredientDialogOpened, setIngredientDialogOpened] = useState(false)
	const [recipeSteps, recipeStepsHandler] = useListState(recipe.steps)
	const hasAlcohol = recipeSteps.filter((s) => s.ingredient.alcohol).length
	const totalTime = recipeSteps.reduce((prev, cur) => prev + cur.centiliter, 0)
	useEffect(() => {
		recipeHandler.setItemProp(index, 'steps', recipeSteps)
	}, [index, recipeSteps, recipeHandler])
	return (
		<article className="shadow rounded p-4">
			<h3 className="flex justify-between">
				<TextInput label="Name" value={recipe.name} onChange={e => {
					recipeHandler.setItemProp(index, 'name', e.currentTarget.value)
				}} />
				<div>
					{/* ★☆ */}
					{hasAlcohol ? (
						<>
							<span>Alkohol: </span>
							{[...Array(hasAlcohol)].map((_s, i) => (
								<span key={i}>★</span>
							))}
						</>
					) : (
						'Alkoholfrei'
					)}
					<Button onClick={() => { recipeHandler.remove(index) }} className="ml-4" size="xs" color="red">Löschen</Button>
				</div>
			</h3>
			<div className="my-4">
				<Button
					onClick={() => {
						setIngredientDialogOpened(true)
					}}
				>
					Zutat hinzufügen
				</Button>
				<div>Gesamt: {totalTime}cl</div>
				{recipeSteps.map((step, stepIndex) => (
					<>
						<div key={stepIndex}>
							<div className="flex items-center justify-between">
								<span>
									{step.centiliter}cl {step.ingredient.name}
								</span>
								<Button
									onClick={() => {
										recipeStepsHandler.remove(stepIndex)
										recipeHandler.setItemProp(index, 'steps', recipeSteps)
									}}
									className="ml-4" size="xs" color="red"
								>
									Löschen
								</Button>
							</div>
							<small>({((step.centiliter / totalTime) * 100).toFixed(0)}%)</small>
							<Slider
								value={step.centiliter}
								onChange={(v) => {
									recipeStepsHandler.setItem(stepIndex, {
										...step,
										centiliter: v,
									})
								}}
								max={50}
								step={0.5}
								label={`${step.centiliter} cl`}
							/>
							<Divider className="my-2" />
						</div>
					</>
				))}
			</div>
			<Modal
				title="Zutat hinzufügen"
				onClose={() => {
					setIngredientDialogOpened(false)
				}}
				opened={ingredientDialogOpened}
			>
				{ingredients.map((ingredient) => (
					<div
						onClick={() => {
							setIngredientDialogOpened(false)
							const newStep = { ingredientId: ingredient.id, ingredient, centiliter: 4 }
							recipeStepsHandler.append(newStep)
							recipeHandler.setItemProp(index, 'steps', [...recipeSteps, newStep])
						}}
						className="flex rounded cursor-pointer hover:bg-green-800 p-4"
						key={ingredient.id}
					>
						<span className="pr-2">{ingredient.name}</span>
						<span className="pr-2">Relais: {ingredient.relais}</span>
						<span className="pr-2">Alkohol: {ingredient.alcohol ? 'Ja' : 'Nein'}</span>
						{/* ★☆ */}
					</div>
				))}
			</Modal>
		</article>
	)
}
export default RecipeEditor
