import { Button, NumberInput, Select, TextInput } from '@mantine/core'
import { UseListStateHandler } from '@mantine/hooks/lib/use-list-state/use-list-state'
import SaveButton from 'app/core/components/SaveButton'
import { Ingredient } from 'app/types'
import { useMutation } from 'blitz'
import updateIngredients from '../mutations/updateIngredients'
import TeachIngredient from './TeachIngredient'
import { nanoid } from 'nanoid'

interface IngredientsEditorProps {
	ingredients: Ingredient[]
	ingredientsHandler: UseListStateHandler<Ingredient>
}

const IngredientsEditor = ({ ingredients, ingredientsHandler }: IngredientsEditorProps) => {
	const [updateIngredientsMutation, updateIngredientsSubmission] = useMutation(updateIngredients)
	const relais = [
		'2',
		'3',
		'4',
		'7',
		'8',
		'9',
		'10',
		'14',
		'15',
		'17',
		'18',
		'22',
		'23',
		'24',
		'25',
		'27',
	]
	return <>
		<Button onClick={() => {
			ingredientsHandler.append({
				alcohol: 0,
				id: nanoid(),
				name: 'Zutatensaft',
				relais: 2,
				timePerCentiliter: 1000,
			})
		}}>
			Zutat hinzufügen
		</Button>
		<table className="w-full bg-gray-800">
			<thead className="bg-green-800 text-left shadow">
				<tr>
					<th className="px-2 py-1">Aktionen</th>
					<th className="px-2 py-1">Name</th>
					<th className="px-2 py-1">Relais #</th>
					<th className="px-2 py-1">Alkohol %</th>
					<th className="px-2 py-1">Zeit ms/cl</th>
				</tr>
			</thead>
			<tbody>
				{ingredients.map((ingredient, index) => <tr key={ingredient.id}>
					<td className="py-1">
						<div className="flex">
							<Button className="mr-2">Vorlauf</Button>
							<TeachIngredient {...{ ingredient, ingredientsHandler, index }} />
						</div>
					</td>
					<td>
						<TextInput value={ingredient.name} onChange={e => { ingredientsHandler.setItemProp(index, 'name', e.target.value) }} />
					</td>
					<td>
						<Select value={ingredient.relais + ''} data={relais} onChange={v => ingredientsHandler.setItemProp(index, 'relais', parseInt(v || '0'))} />
					</td>
					<td>
						<NumberInput value={ingredient.alcohol} onChange={v => { ingredientsHandler.setItemProp(index, 'alcohol', v || 0) }} />
					</td>
					<td>
						<div className="flex">
							<NumberInput value={ingredient.timePerCentiliter} onChange={v => { ingredientsHandler.setItemProp(index, 'timePerCentiliter', v || 10000) }} rightSection="ms/cl" />
							<Button
								onClick={() => {
									ingredientsHandler.remove(index)
								}}
								className="ml-4" size="xs" color="red"
							>
								&times;
							</Button>
						</div>
					</td>
				</tr>)}
			</tbody>
		</table>
		<SaveButton onClick={() => updateIngredientsMutation(ingredients)} loading={updateIngredientsSubmission.isLoading}>
			Speichern
		</SaveButton>
	</>
}
export default IngredientsEditor
