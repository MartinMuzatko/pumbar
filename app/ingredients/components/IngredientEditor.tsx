import { Button, NumberInput, Select, TextInput } from '@mantine/core'
import { UseListStateHandler } from '@mantine/hooks/lib/use-list-state/use-list-state'
import { Ingredient } from '@prisma/client'
import TeachIngredient from './TeachIngredient'

interface IngredientsEditorProps {
	ingredients: Ingredient[]
	ingredientsHandler: UseListStateHandler<Ingredient>
}

const IngredientsEditor = ({ ingredients, ingredientsHandler }: IngredientsEditorProps) => {
	return <>
		<Button onClick={() => {
			ingredientsHandler.append({
				alcohol: 0,
				createdAt: new Date(),
				updatedAt: new Date(),
				id: -1,
				name: 'Zutatensaft',
				relais: 1,
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
						<Select value={ingredient.relais + ''} data={['1', '2', '3', '4', '5', '6', '7', '8']} onChange={v => ingredientsHandler.setItemProp(index, 'relais', parseInt(v || '0'))} />
					</td>
					<td>
						<NumberInput value={ingredient.alcohol} onChange={v => { ingredientsHandler.setItemProp(index, 'alcohol', v || 0) }} />
					</td>
					<td>
						<NumberInput value={ingredient.timePerCentiliter} onChange={v => { ingredientsHandler.setItemProp(index, 'timePerCentiliter', v || 10000) }} rightSection="ms/cl" />					</td>
				</tr>)}
			</tbody>
		</table>
	</>
}
export default IngredientsEditor
