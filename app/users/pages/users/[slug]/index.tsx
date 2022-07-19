import { Alert, Avatar, Button, Indicator, Modal, Stepper, Text } from '@mantine/core'
import { Suspense, useState } from 'react'
import { BlitzPage, Routes, useQuery, useParam, Head } from 'blitz'
import Layout from 'app/core/layouts/Layout'
import { BsCalendarX, BsCalendarCheck } from 'react-icons/bs'
import RegistrationProgress from 'app/registrations/components/RegistrationProgress'
import { FiMail, FiSettings } from 'react-icons/fi'
import Trans from 'app/core/components/Trans'
import getPublicUser from 'app/users/queries/getPublicUser'
import EventOrganizeOnboardingForm from 'app/users/components/EventOrganizeOnboardingForm'
import { useCurrentUser } from 'app/core/hooks/useCurrentUser'
import { formatDate } from 'app/util'

const EventOrganizeOnboardingButton = () => {
	const [organizeEventDialog, setOrganizeEventDialog] = useState(false)
	const [user] = useCurrentUser()
	// user?.eventrequest?.accepted
	const buttonMessage = !user?.eventrequest
		? <Trans>Ich möchte Events organisieren</Trans>
		: user?.eventrequest?.accepted == null
			? <Trans>Deine Anfrage wird geprüft</Trans>
			: <>
				<Indicator color="white" className="mr-2">
					<FiMail />
				</Indicator>
				<Trans>Deine Anfrage wurde geprüft!</Trans>
			</>
	return <>
		{user && <>
			<Button onClick={() => { setOrganizeEventDialog(true) }}>
				{buttonMessage}
			</Button>
			<Modal className="prose" size="xl" title="Anfrage zum Event Organisieren" opened={organizeEventDialog} onClose={() => setOrganizeEventDialog(false)}>
				{!user?.eventrequest
					? <EventOrganizeOnboardingForm user={user} />
					: user.eventrequest.accepted == null
						? <Trans>Deine Anfrage vom {formatDate(user?.eventrequest?.createdAt || new Date())} wird aktuell bearbeitet</Trans>
						: <>
							{user.eventrequest.accepted
								? <>
									<Alert color="green">
										Deine Anfrage wurde angenommen. Du kannst nun von dir erstellte Events veröffentlichen.
									</Alert>
								</>
								: <>
									<Alert color="red">
										Deine Anfrage wurde abgelehnt.
									</Alert>
								</>
							}
							{user.eventrequest.reply && <div>
								<h3>Antwort</h3>
								{user.eventrequest.reply}
							</div>}
							<div className="flex justify-center my-4">

								<Button>OK</Button>
							</div>
						</>
				}

			</Modal>
		</>}
	</>

}

const UserInfo = () => {
	const slug = useParam('slug', 'string')
	const [user] = useQuery(getPublicUser, { slug })
	const currentEvents = user.registrations.filter(registration => (registration.event.endDate || new Date()) > new Date())
	const previousEvents = user.registrations.filter(registration => (registration.event.endDate || new Date()) < new Date())
	return (
		<>
			<Head>
				<title>
					{user.speciesIcon || '🐈'} {user.name} Profil
				</title>
			</Head>
			<div className="p-4">
				<div className="flex justify-between">
					<div className="flex items-center">
						<Avatar
							size="xl"
							className="rounded-full bg-white dark:bg-black border-yellow-400 border-2 mr-4"
							src={user.avatar?.path}
						/>
						<Text size="xl" component="h2">
							{user.name}
						</Text>
					</div>
					<Suspense fallback={<div>Loading...</div>}>
						<EventOrganizeOnboardingButton />
					</Suspense>
				</div>
				<Text size="lg" component="h3" className="flex items-center my-4">
					<BsCalendarCheck className="mr-2" />
					<Trans>Aktuelle Events</Trans>
				</Text>
				{!currentEvents.length && <>
					<Trans>Du hast aktuell keine Events</Trans>
				</>}
				{currentEvents.map(registration => <RegistrationProgress registration={registration} key={registration.id} />)}
				<Text size="lg" component="h3" className="flex items-center my-4">
					<BsCalendarX className="mr-2" />
					<Trans>Vergangene Events</Trans>
				</Text>
				{!previousEvents.length && <>
					<Trans>Du hast aktuell keine Events</Trans>
				</>}
				<Text size="lg" component="h3" className="flex items-center my-4">
					<FiSettings className="mr-2" />
					<Trans>Erstellte Events</Trans>
				</Text>
				{previousEvents.map(registration => <RegistrationProgress registration={registration} key={registration.id} />)}
				{/* {user.eventsCreated.map(registration => <RegistrationProgress registration={registration} key={registration.id} />)} */}
			</div>
		</>
	)
}

const UserPage: BlitzPage = () => {
	return (
		<>
			<Suspense fallback={<div>Loading... User...</div>}>
				<UserInfo />
			</Suspense>
		</>
	)
}

UserPage.suppressFirstRenderFlicker = true
UserPage.getLayout = (page) => <Layout contain>{page}</Layout>

export default UserPage
