import { useMutation } from 'blitz'
import { useState } from 'react'
import assembleCocktail from '../mutations/assembleCocktail'
import { CompleteRecipe } from '../types'
import DrinkDialog from './DrinkDialog'

interface RecipeCardProps {
	recipe: CompleteRecipe
}

const RecipeCard = ({ recipe }: RecipeCardProps) => {
	const [inProgress, setInProgress] = useState(false)
	const hasAlcohol = recipe.steps.filter((s) => s.ingredient.alcohol).length
	const totalTime = recipe.steps.reduce((prev, cur) => prev + cur.centiliter, 0)
	const ingredients = recipe.steps.map((s) => ({
		...s,
		percentage: s.centiliter / totalTime,
	}))
	return (
		<>
			<article
				onClick={() => {
					setInProgress(true)
				}}
				className="shadow rounded p-4 py-8 cursor-pointer bg-green-600/50"
			>
				<h3>
					<div className="font-bold text-4xl">{recipe.name}</div>
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
							<small>☆ Alkoholfrei</small>
						)}
					</div>
				</h3>
				<div className="divide-y">
					{ingredients.map((step) => (
						<div key={step.ingredientId} className="flex justify-between">
							<div>
								{step.centiliter}cl {step.ingredient.name}
							</div>
							<div className="text-sm">
								<small>{(step.percentage * 100).toFixed(0)}%</small> <small>({step.ingredient.relais})</small>
							</div>
						</div>
					))}
				</div>
			</article>
			{inProgress && <DrinkDialog {...{ recipe, inProgress, setInProgress }} />}
		</>
	)
}
export default RecipeCard
