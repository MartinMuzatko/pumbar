import mail from 'integrations/mail'

type ResetPasswordMailer = {
	to: string
	token: string
}

export function forgotPasswordMailer({ to, token }: ResetPasswordMailer) {
	// In production, set APP_ORIGIN to your production server origin
	const origin = process.env.APP_ORIGIN || process.env.BLITZ_DEV_SERVER_ORIGIN
	const resetUrl = `${origin}/reset-password?token=${token}`

	return mail.sendMail({
		from: 'regsystem@s-s-f.de',
		to,
		subject: 'Passwort zurücksetzen',
		html: `
			<h1>Reset Your Password</h1>
			<h3>NOTE: You must set up a production email integration in mailers/forgotPasswordMailer.ts</h3>

			<a href="${resetUrl}">
				Click here to set a new password
			</a>
		`,
	})
}
