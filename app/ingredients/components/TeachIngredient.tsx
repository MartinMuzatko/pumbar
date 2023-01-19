import { Button, Loader, Tooltip } from '@mantine/core'
import { UseListStateHandler } from '@mantine/hooks/lib/use-list-state/use-list-state'
import setRelais from 'app/recipes/mutations/setRelais'
import { Ingredient } from 'app/types'
import { useMutation } from 'blitz'
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
	const [setRelaisMutation] = useMutation(setRelais)
	const [teachin, setTeachin] = useState(false)
	const [teachinStart, setTeachinStart] = useState(new Date())
	useEffect(() => {
		teachin &&
			setTimeout(() => {
				ingredientsHandler.setItemProp(index, 'timePerCentiliter', new Date().getTime() - teachinStart.getTime())
			}, 100)
	}, [ingredient, ingredientsHandler, teachin, index, teachinStart])
	return (
		<Tooltip className="flex-grow" label="Klicke auf Stop, sobald 1 cl eingefüllt wurde">
			<Button
				className="w-full"
				onClick={() => {
					setTeachin((t) => !t)
					!teachin && setTeachinStart(new Date())
					setRelaisMutation({ relais: ingredient.relais, state: !teachin })
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
