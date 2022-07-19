import { useRouter, BlitzPage, Routes, useRouterQuery } from 'blitz'
import Layout from 'app/core/layouts/Layout'
import SignupForm from 'app/auth/components/SignupForm'

const RegisterPage: BlitzPage = () => {
	const user = useRouterQuery()
	const router = useRouter()
	return <div className="flex items-center justify-center">
		<div className="w-1/3 my-32 shadow">
			<SignupForm presetValues={user} />
		</div>
	</div>
}

RegisterPage.redirectAuthenticatedTo = '/'
RegisterPage.getLayout = (page) => <Layout contain>{page}</Layout>

export default RegisterPage
