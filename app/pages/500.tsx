import { Head, Image } from 'blitz'
import Layout from 'app/core/layouts/Layout'
import Error404Image1 from 'public/404-cat.gif'
import Error404Image2 from 'public/404-falk.gif'
import { Button, Divider } from '@mantine/core'

export default function Page500() {
	const randomError = Math.random() > 0.5
		? { image: Error404Image1, text: 'Ich kanns nicht glauben! Die Website ist weg' }
		: { image: Error404Image2, text: 'Die Website wurde gerade weg geschnappt' }
	const statusCode = 404
	return (
		<>
			<Layout contain>
				<div className="flex flex-col items-center justify-center">
					<div className="relative w-96 h-96 stack">
						{/* <div className="absolute w-96 h-96 top-0 left-0">
							<Image className="absolute top-0 left-0" src={Error404Image.src} width={Error404Image.width / 3} height={Error404Image.height / 3} alt="404" />
						</div> */}
						<div className="absolute w-96 h-96 top-0 left-0 glitch-animation">
							<Image className="absolute top-0 left-0" src={randomError.image.src} width={randomError.image.width / 3} height={randomError.image.height / 3} alt="404" />
						</div>
					</div>
					<div className="flex flex-col items-center justify-center h-full py-4">
						<h1 className="font-suedfurs text-center absolute -z-10 top-0 leading-none" style={{ fontSize: 450 }}>{statusCode}</h1>
						<p className="text-center text-3xl">
							{randomError.text}
						</p>
						<p className="text-lg mt-8">Vielleicht findest du weiter unten, wonach Du suchst?</p>
						<Divider className="w-64 my-8" />
					</div>
					<div className="w-full p-4">
						<h3>Events</h3>
					</div>
					<div className="flex flex-col items-center justify-center h-full py-4">
						<Divider className="w-64 my-8" />
						<p className="text-center text-lg">
							Schlimmstenfalls kannst du noch immer
						</p>
						<div className="flex justify-around my-4 w-full">
							<Button<'a'> href="/" component="a">Zurück zur Hauptseite</Button>
						</div>
					</div>
				</div>
			</Layout>
			<Head>
				<title>
					Error 404
				</title>
			</Head>
		</>
	)
}
