import 'app/core/styles/index.css'

import {
	AppProps,
	ErrorBoundary,
	ErrorFallbackProps,
	useQueryErrorResetBoundary,
	Head,
	useSession,
} from 'blitz'
import { MantineProvider, MantineProviderProps } from '@mantine/core'
import { NotificationsProvider } from '@mantine/notifications'
import favicon from 'public/favicon.png'
import Layout from 'app/core/layouts/Layout'
import Error from 'app/core/components/Error'
import ColorSchemeContext, { ColorScheme } from 'app/core/contexts/ColorSchemeContext'
import { useLocalStorageValue } from '@mantine/hooks'
import { theme } from 'app/theme'
import { useState } from 'react'

const styles: MantineProviderProps['styles'] = {
	Button: () => ({
		filled: {
			color: 'black',
		},
	}),
}

export default function App({ Component, pageProps }: AppProps) {
	const [colorScheme, setColorScheme] = useLocalStorageValue({
		key: 'colorScheme',
		defaultValue: 'light' as ColorScheme,
	})
	const getLayout = Component.getLayout || ((page) => page)
	return (
		<>
			<Head>
				<title>Südstaatenfurs</title>
				<link rel="icon" href={favicon.src} />
				<meta
					name="viewport"
					content="minimum-scale=1, initial-scale=1, width=device-width"
				/>
			</Head>
			<MantineProvider styles={styles} theme={{ ...theme, colorScheme: 'dark' }} withGlobalStyles>
				<ColorSchemeContext.Provider value={{ colorScheme, setColorScheme }}>
					<NotificationsProvider>
						<ErrorBoundary
							FallbackComponent={RootErrorFallback}
							onReset={useQueryErrorResetBoundary().reset}
						>
							{getLayout(<Component {...pageProps} />)}
						</ErrorBoundary>
					</NotificationsProvider>
				</ColorSchemeContext.Provider>
			</MantineProvider>
		</>
	)
}

function RootErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
	return (
		<Layout contain>
			<Error statusCode={error.statusCode || 400} title={error.message || error.name} />
		</Layout>
	)
}
