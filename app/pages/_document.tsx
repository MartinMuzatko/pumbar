import { createStylesServer, ServerStyles } from '@mantine/next'
import { Document, Html, DocumentHead, Main, BlitzScript, DocumentContext, getSession } from 'blitz'

const stylesServer = createStylesServer()

class MyDocument extends Document {
	static async getInitialProps(ctx: DocumentContext) {
		const initialProps = await Document.getInitialProps(ctx)

		return {
			...initialProps,
			styles: (
				<>
					{initialProps.styles}
					<ServerStyles html={initialProps.html} server={stylesServer} />
				</>
			),
		}
	}

	render() {
		return (
			<Html lang="de">
				<DocumentHead />
				<body>
					<Main />
					<BlitzScript />
				</body>
			</Html>
		)
	}
}

export default MyDocument
