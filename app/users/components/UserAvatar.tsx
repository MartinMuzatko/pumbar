import { Avatar, MantineSize, Text } from '@mantine/core'
import { Image } from 'blitz'
import { FullUser } from '../queries/getUser'
import defaultAvatar from 'public/default-avatar.svg'
import { File } from '@prisma/client'

type AvatarPath = Pick<File, 'path'>

interface UserAvatarProps {
	user: Pick<FullUser, 'name'> & { avatar?: AvatarPath | null }
	size?: MantineSize
	hideName?: boolean
	classNames?: {
		image?: string
		root?: string
	}
}

const UserAvatarImage = (props: UserAvatarProps) => <Avatar
	size={props.size || 'lg'}
	className={`rounded-full bg-white dark:bg-black border-yellow-400 border-2 ${props.size == 'lg' ? 'mr-4' : 'mr-2'} ${props.classNames?.image || ''}`}
	src={props.user.avatar?.path}
>
	<Image {...defaultAvatar} alt="default" />
</Avatar>

const UserAvatar = (props: UserAvatarProps) => props.hideName
	? <UserAvatarImage {...props} />
	: <div className={`flex items-center ${props.classNames?.root || ''}`}>
		<UserAvatarImage {...props} />
		<Text size={props.size || 'lg'} component="h2">
			{props.user.name}
		</Text>
	</div>

export default UserAvatar
