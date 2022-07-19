import { ActionIcon, Modal, SimpleGrid } from '@mantine/core'
import React, { Suspense } from 'react'
import { BlitzPage, Head, useInfiniteQuery, useQuery } from 'blitz'
import Layout from 'app/core/layouts/Layout'
import getUsers from 'app/users/queries/getUsers'
import UserAvatar from 'app/users/components/UserAvatar'
import HideUnauthorized from 'app/auth/components/HideUnauthorized'
import { globalPermission } from 'types'
import { FiSettings } from 'react-icons/fi'
import { User } from '@prisma/client'
import getUser from 'app/users/queries/getUser'
import EditUser from 'app/users/components/EditUser'

interface UserEditModalProps {
	userId: number
}

const UserEditModal = ({ userId }: UserEditModalProps) => {
	const [user] = useQuery(getUser, { id: userId })
	return <div>
		<EditUser hideAvatarUpload hideSocialSettings user={user} />
	</div>
}

const UserList = () => {
	const [activeUser, setActiveUser] = React.useState<User | null>(null)
	const [userPages, userQuery] = useInfiniteQuery(
		getUsers,
		(page) => ({ ...page, take: 3 }),
		{
			getNextPageParam: lastPage => lastPage.nextPage
		}
	)
	return (
		<>
			<div className="p-4">
				<Modal size="xl" opened={!!activeUser} onClose={() => setActiveUser(null)}>
					{activeUser?.id && <UserEditModal userId={activeUser.id} />}
				</Modal>
				<SimpleGrid cols={4} spacing="md">
					{userPages.flatMap((userPage, index) => (
						userPage.users.flatMap((user) => (
							<div key={user.id} className="my-4 relative bg-white shadow rounded p-4">
								<UserAvatar user={user} hideName classNames={{ image: 'absolute bottom-full left-1/2 trans-abovecenter' }} />
								<p className="text-xl mt-4">
									{user.name}
								</p>
								<p>
									{user.speciesIcon} {user.species}
								</p>
								<HideUnauthorized permissions={[globalPermission.edit_user]}>
									<ActionIcon onClick={() => setActiveUser(user)} color="primary" size="lg" className="absolute top-0 right-0">
										<FiSettings color="black" size={18} />
									</ActionIcon>
								</HideUnauthorized>
							</div>
						))
					))}
				</SimpleGrid>
				<button
					onClick={() => userQuery.fetchNextPage()}
					disabled={!userQuery.hasNextPage || !!userQuery.isFetchingNextPage}
				>
					{userQuery.isFetchingNextPage
						? 'Loading more...'
						: userQuery.hasNextPage
							? 'Load More'
							: 'Nothing more to load'}
				</button>
			</div>
		</>
	)
}

const UserListPage: BlitzPage = () => {
	return <div>
		<Suspense fallback="...loading">
			<UserList />
		</Suspense>
	</div>
}

UserListPage.suppressFirstRenderFlicker = true
UserListPage.getLayout = (page) => <Layout contain>{page}</Layout>

export default UserListPage
