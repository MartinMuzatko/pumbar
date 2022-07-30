import { Button, Modal } from '@mantine/core'
import FillProgress from 'app/core/components/FillProgress'
import { useMutation } from 'blitz'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import assembleCocktail from '../mutations/assembleCocktail'
import { CompleteRecipe } from '../types'

interface DrinkDialogProps {
	recipe: CompleteRecipe
	inProgress: boolean
	setInProgress: Dispatch<SetStateAction<boolean>>
}

enum MixingState {
	idle,
	mixing,
	done,
}

const DrinkDialog = ({ recipe, inProgress, setInProgress }: DrinkDialogProps) => {
	const [assembleCocktailMutation] = useMutation(assembleCocktail)
	const [mixing, setMixing] = useState(MixingState.idle)
	useEffect(() => {
		mixing == MixingState.done && setTimeout(() => setInProgress(false), 5000)
	}, [mixing, setInProgress])
	const longestTime = recipe.steps.reduce(
		(acc, step) => Math.max(acc, step.centiliter * step.ingredient.timePerCentiliter),
		0
	)
	return (
		<Modal
			closeOnEscape={mixing != MixingState.mixing}
			closeOnClickOutside={mixing != MixingState.mixing}
			withCloseButton={mixing != MixingState.mixing}
			title={`${recipe.name} wird zubereitet`}
			centered
			onClose={() => {
				setInProgress(false)
			}}
			opened={inProgress}
		>
			{mixing == MixingState.idle && (
				<div className="flex items-center justify-around py-8">
					<Button
						onClick={() => {
							setMixing(MixingState.mixing)
							assembleCocktailMutation(recipe)
						}}
					>
						Zubereitung beginnen
					</Button>
					<Button
						color="pink"
						onClick={() => {
							setInProgress(false)
						}}
					>
						Zurück
					</Button>
				</div>
			)}
			{mixing == MixingState.mixing && (
				<FillProgress
					max={longestTime}
					onDone={() => {
						setMixing(MixingState.done)
					}}
				/>
			)}
			{mixing == MixingState.done && (
				<div className="flex flex-col items-center justify-center py-8">
					<h2 className="font-bold text-lg">Fertig! Genieß deinen {recipe.name}!</h2>
					<small>Dieser Dialog schließt automatisch in 5 Sekunden</small>
				</div>
			)}
		</Modal>
	)
}
export default DrinkDialog
