import { Group, Button, ButtonProps } from '@mantine/core'
import { showNotification, updateNotification } from '@mantine/notifications'
import { MdCheckCircleOutline, MdError } from 'react-icons/md'
import Trans from './Trans'

interface SaveButtonProps {
	onClick: () => Promise<void> | void | any
	hideNotification?: boolean
	className?: string
	loading: boolean
}

const SaveButton = ({ onClick, hideNotification, ...props }: React.PropsWithChildren<SaveButtonProps & ButtonProps<'button'>>) => {
	return (
		<div className="flex justify-end">
			<Button
				{...props}
				onClick={async () => {
					!hideNotification && showNotification({
						id: 'load-data',
						loading: true,
						title: <Trans>Daten werden gespeichert</Trans>,
						message: '',
						autoClose: false,
						disallowClose: true,
					})
					try {
						await onClick()
						setTimeout(() => {
							!hideNotification && updateNotification({
								id: 'load-data',
								color: 'teal',
								title: <Trans>Daten wurden erfolgreich gespeichert!</Trans>,
								message: '',
								icon: <MdCheckCircleOutline />,
								autoClose: 5000,
							})
						}, 200)
					} catch (error) {
						!hideNotification && showNotification({
							id: 'load-data',
							loading: true,
							icon: <MdError />,
							color: 'red',
							title: <Trans>Fehler</Trans>,
							message: error.message,
							autoClose: false,
							disallowClose: true,
						})
					}
				}}
			>
				{props.children}
			</Button>
		</div>
	)
}
export default SaveButton
