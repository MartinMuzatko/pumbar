import { BlitzPage, useMutation } from 'blitz'
import Layout from 'app/core/layouts/Layout'
import { LabeledTextField } from 'app/core/components/LabeledTextField'
import { Form, FORM_ERROR } from 'app/core/components/Form'
import { ForgotPassword } from 'app/auth/validations'
import forgotPassword from 'app/auth/mutations/forgotPassword'
import Trans from 'app/core/components/Trans'

const ForgotPasswordPage: BlitzPage = () => {
	const [forgotPasswordMutation, { isSuccess }] = useMutation(forgotPassword)

	return <div className="flex items-center justify-center">
		<div className="w-1/3 my-32 shadow bg-white p-4 rounded">
			<h1 className="text-lg"><Trans>Passwort vergessen</Trans></h1>

			{isSuccess ? (
				<div>
					<h2>Request Submitted</h2>
					<p>
						<Trans>Falls deine E-mail Adresse in unserem System ist, erhältst du gleich eine Anleitung um dein Passwort zurück zu setzen</Trans>
					</p>
				</div>
			) : (
				<Form
					submitText="Send"
					schema={ForgotPassword}
					initialValues={{ email: '' }}
					onSubmit={async (values) => {
						try {
							await forgotPasswordMutation(values)
						} catch (error: any) {
							return {
								[FORM_ERROR]:
									'Sorry, we had an unexpected error. Please try again.',
							}
						}
					}}
				>
					{/* <LabeledTextField name="email" label={<Trans>Email</Trans>} placeholder="Email" /> */}
				</Form>
			)}
		</div>
	</div>
}

ForgotPasswordPage.redirectAuthenticatedTo = '/'
ForgotPasswordPage.getLayout = (page) => <Layout contain>{page}</Layout>

export default ForgotPasswordPage
