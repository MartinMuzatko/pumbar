import blitz from 'blitz/custom-server'
import { createServer } from 'http'
import { parse } from 'url'
import db from 'db'

const { PORT = '3000' } = process.env
const dev = process.env.NODE_ENV !== 'production'
const app = blitz({ dev })
const handle = app.getRequestHandler()

db.$use(async (params, next) => {
	const result = await next(params)
	return result
})

app.prepare().then(async () => {
	createServer((req, res) => {
		// Be sure to pass `true` as the second argument to `url.parse`.
		// This tells it to parse the query portion of the URL.
		const parsedUrl = parse(req.url!, true)
		const { pathname } = parsedUrl

		if (pathname === '/hello') {
			res.writeHead(200).end('world')
			return
		}

		handle(req, res, parsedUrl)
	}).listen(PORT, () => {
		console.log(`Ready on http://localhost:${PORT}`)
	})
})
