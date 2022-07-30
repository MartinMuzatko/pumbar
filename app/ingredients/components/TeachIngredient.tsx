import { Button, Loader, Tooltip } from '@mantine/core'
import { UseListStateHandler } from '@mantine/hooks/lib/use-list-state/use-list-state'
import { Ingredient } from 'app/types'
import { useEffect, useState } from 'react'

interface TeachIngredientProps {
	ingredient: Ingredient
	ingredientsHandler: UseListStateHandler<Ingredient>
	index: number
}

const TeachIngredient = ({
	ingredient,
	ingredientsHandler,
	index,
}: TeachIngredientProps) => {
	const [teachin, setTeachin] = useState(false)
	useEffect(() => {
		teachin &&
			setTimeout(() => {
				ingredientsHandler.setItemProp(index, 'timePerCentiliter', ingredient.timePerCentiliter + 100)
			}, 100)
	}, [ingredient, ingredientsHandler, teachin, index])
	return (
		<Tooltip className="flex-grow" label="Klicke auf Stop, sobald 1 cl eingefüllt wurde">
			<Button
				className="w-full"
				onClick={() => {
					setTeachin((t) => !t)
					!teachin && ingredientsHandler.setItemProp(index, 'timePerCentiliter', 0)
				}}
				color="pink"
			>
				{teachin ? (
					<>
						<span>Stop</span>
						<Loader color="pink" className="ml-2" size="xs" />
					</>
				) : (
					'Einlernen'
				)}
			</Button>
		</Tooltip>
	)
}

export default TeachIngredient
