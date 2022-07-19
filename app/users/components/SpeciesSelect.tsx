import { Select, Tooltip, useMantineTheme } from '@mantine/core'
import { IoMdHelpCircle } from 'react-icons/io'
import { forwardRef, ReactElement, useState } from 'react'
import speciesList from 'app/users/species'
import Trans from 'app/core/components/Trans'

interface OnChangeProps {
	value: string
	icon: string
}

type SpeciesSelectProps = { className?: string } & {
	value: string | null
	icon: string | null
	label?: ReactElement | string
	onChange?: (props: OnChangeProps) => void
	onBlur?: () => void
}

interface Species {
	icon: string
	name: string
}

const SelectItem = forwardRef<any, React.PropsWithChildren<Species>>(
	({ icon, name, ...others }, ref) => (
		<div key={name} ref={ref} {...others}>
			{icon} <Trans>{name}</Trans>
		</div>
	)
)

const SpeciesSelect = ({ icon, value, onChange, onBlur, ...props }: SpeciesSelectProps) => {
	const theme = useMantineTheme()
	const [selectedSpecies, setSelectedSpecies] = useState(value)
	const [selectedSpeciesIcon, setSelectedSpeciesIcon] = useState(icon)
	const [species, setSpecies] = useState(
		speciesList.map((s) => ({ ...s, value: s.name, label: s.name }))
	)
	const label = props.label || (
		<div className="flex justify-between items-center">
			<div className="mr-2">Spezies</div>
			<Tooltip
				label={<Trans>Wähle deine Spezies oder wähle ein Symbol und benenne deine Spezies selbst</Trans>}
				withArrow
				placement="start"
			>
				<IoMdHelpCircle size={16} color={theme.colors.yellow[5]} />
			</Tooltip>
		</div>
	)

	const setSelection = (value: string) => {
		setSelectedSpecies(value)
		const newIcon =
			species.find((s) => s.name === value)?.icon || selectedSpeciesIcon || icon || ''
		setSelectedSpeciesIcon(newIcon)
		onChange && onChange({ value, icon: newIcon })
	}
	return (
		<Select
			{...props}
			label={label}
			icon={selectedSpeciesIcon}
			value={selectedSpecies}
			onChange={setSelection}
			onBlur={() => {
				setSelection(selectedSpecies || '')
				onBlur && onBlur()
			}}
			data={species}
			searchable
			itemComponent={SelectItem}
			creatable
			maxDropdownHeight={600}
			getCreateLabel={(query) =>
				`${species.find((s) => s.name === selectedSpecies)?.icon || ''} ${query} hinzufügen`
			}
			filter={(value = '', item) => {
				return (
					item.value.toLowerCase().includes(value.toLowerCase().trim()) ||
					(item.group || '').toLowerCase().includes(value.toLowerCase().trim())
				)
			}}
			onCreate={(query) =>
				setSpecies((current) => [
					...current,
					{
						icon:
							species.find((s) => s.name === value)?.icon ||
							selectedSpeciesIcon ||
							'',
						label: query,
						name: query,
						value: query,
					},
				])
			}
		/>
	)
}

export default SpeciesSelect
