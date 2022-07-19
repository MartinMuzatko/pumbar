import { Suspense } from 'react'
import { useRouter, BlitzPage } from 'blitz'
import Layout from 'app/core/layouts/Layout'
import LoginForm from 'app/auth/components/LoginForm'

const LoginPage: BlitzPage = () => {
	const router = useRouter()
	return (
		<div className="flex justify-center py-8">
			<div className="bg-white w-auto">
				<LoginForm
					onSuccess={(_user) => {
						const next = router.query.next
							? decodeURIComponent(router.query.next as string)
							: '/'
						router.push(next)
					}}
				/>
			</div>
		</div>
	)
}

LoginPage.redirectAuthenticatedTo = '/'
LoginPage.getLayout = (page) => <Layout contain>{page}</Layout>

export default LoginPage
