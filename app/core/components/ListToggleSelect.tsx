import { UseListStateHandler } from '@mantine/hooks/lib/use-list-state/use-list-state'

interface ListToggleSelectProps<Item extends { id: number }> {
	items: Item[]
	children: (item: Item) => React.ReactNode
	selectedItems: Item[]
	selectedItemsHandlers: UseListStateHandler<Item>
	selectable?: (item: Item) => boolean
}

const ListToggleSelect = <Item extends { id: number }>(props: ListToggleSelectProps<Item>) => {
	return (
		<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
			{props.items.map((item, index) => {
				const selected = props.selectedItems.find(
					(selectedItem) => selectedItem.id === item.id
				)
				const selectedIndex = props.selectedItems.findIndex(
					(selectedItem) => selectedItem.id === item.id
				)
				return (
					<div
						key={index}
						className={
							`transition cursor-pointer
							bg-white dark:bg-gray-700/50
							rounded border border-yellow-500
							${selected ? 'bg-yellow-100 dark:bg-yellow-400/20 border-2' : ''}
							${props.selectable && !props.selectable(item) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-yellow-100 hover:dark:bg-yellow-400/10'}
							`
						}
						onClick={() => {
							if (props.selectable && !props.selectable(item)) return
							selected
								? props.selectedItemsHandlers.remove(selectedIndex)
								: props.selectedItemsHandlers.append(item)
						}}
					>
						{props.children(item)}
					</div>
				)
			})}
		</div>
	)
}

export default ListToggleSelect
