import {
	BlitzPage,
	getSession,
	GetServerSideProps,
	invokeWithMiddleware,
	InferGetServerSidePropsType,
} from 'blitz'
import Layout from 'app/core/layouts/Layout'
import getUser, { FullUser } from 'app/users/queries/getUser'
import EditUser from 'app/users/components/EditUser'
import { globalPermission } from 'types'

export const getServerSideProps: GetServerSideProps<{ user: FullUser, error: null } | { user: null, error: string }, { slug: string }> = async (ctx) => {
	const { req, res, params } = ctx
	const session = await getSession(req, res)
	const user = await invokeWithMiddleware(getUser, { slug: params?.slug }, ctx)
	if (!session.userId && session.userId != user.id && session.permissions?.includes(globalPermission.edit_user))
		return { props: { error: 'Kein Zugang', user: null } }
	return {
		props: {
			user,
			error: null,
		}
	}
}

const EditUserPage: BlitzPage<InferGetServerSidePropsType<typeof getServerSideProps>> = (props) => {
	if (props.error) return <>{props.error}</>
	return props.user && (
		<>
			<EditUser user={props.user} />
		</>
	)
}

EditUserPage.suppressFirstRenderFlicker = true
EditUserPage.getLayout = (page) => <Layout contain>{page}</Layout>

export default EditUserPage
