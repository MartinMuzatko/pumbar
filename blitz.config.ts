import WithBundleAnalyzer from '@next/bundle-analyzer'
import { BlitzConfig, sessionMiddleware } from 'blitz'

const withBundleAnalyzer = WithBundleAnalyzer({ enabled: process.env.ANALYZE == 'true' })

const config: BlitzConfig = {
	middleware: [
		sessionMiddleware({
			cookiePrefix: 'ssf',
			isAuthorized: () => false,
		}),
	],
	i18n: {
		locales: ['de', 'en', 'at', 'ch', 'schw'],
		defaultLocale: 'de',
		localeDetection: false
	},
	images: {
		domains: ['api.s-s-f.de'],
	},
}
module.exports = withBundleAnalyzer(config)
