import { Select, SelectProps } from '@mantine/core'
import { useDebouncedValue } from '@mantine/hooks'
import { forwardRef, useState } from 'react'
import { useQuery } from 'blitz'
import UserAvatar from './UserAvatar'
import { FullUser } from '../queries/getUser'
import findUsers from '../queries/findUsers'
import { File } from '@prisma/client'

type AvatarPath = Pick<File, 'path'>

export type PartialUser = Pick<FullUser, 'name' | 'id'> & { avatar?: AvatarPath | null }

interface UserSelectProps {
	selectProps?: Partial<SelectProps>
	selectedUser?: PartialUser
	setSelectedUser: (user: PartialUser) => void
	clearOnSelect?: boolean
}


const UserSelect = (props: UserSelectProps) => {
	const [searchName, setSearchName] = useState('')
	const [debouncedSearchName] = useDebouncedValue(searchName, 150)
	const [foundUsers] = useQuery(findUsers, { name: { contains: debouncedSearchName } })
	const SelectItem = forwardRef<any, React.PropsWithChildren<{ value: string }>>(
		({ value, ...others }, ref) => {
			const foundUser = foundUsers.find(u => u.id == Number(value))
			if (!foundUser) return <></>
			return <div ref={ref} {...others}>
				<UserAvatar size="md" user={foundUser} />
			</div>
		}
	)

	return <Select
		{...props.selectProps}
		onSearchChange={v => setSearchName(v)}
		itemComponent={SelectItem}
		value={String(props.selectedUser?.id)}
		data={foundUsers.map(u => ({ value: u.id + '', label: u.name }))}
		onChange={id => {
			const foundUser = foundUsers.find(u => u.id == Number(id))
			foundUser && props.setSelectedUser(foundUser)
			console.log(props.clearOnSelect)
			props.clearOnSelect && setSearchName('')
		}}
		searchable
	/>

}
export default UserSelect
