import { BlitzApiHandler, BlitzApiRequest, BlitzApiResponse, getSession } from 'blitz'
import multer from 'multer'
import * as path from 'path'
import * as fs from 'fs/promises'
import db from 'db'
import cors from 'cors'
import { nanoid } from 'nanoid'

const runMiddleware = (req: BlitzApiRequest, res: BlitzApiResponse, fn: (req, res, fn) => any) =>
	new Promise((resolve, reject) => {
		fn(req, res, (result) => {
			if (result instanceof Error) {
				return reject(result)
			}
			return resolve(result)
		})
	})

const dest = path.resolve(__dirname, '../../../../public/public')
const upload = multer({
	dest,
	limits: {
		fileSize: 1024 * 1024 * 3,
	},
})

export const config = {
	api: {
		bodyParser: false,
	},
}

const handler: BlitzApiHandler = async (
	req: BlitzApiRequest & { file?: Express.Multer.File },
	res
) => {
	const session = await getSession(req, res)
	await runMiddleware(req, res, upload.single('file'))
	await runMiddleware(
		req,
		res,
		cors({
			origin: '*',
		})
	)
	if (!req.file) return
	const id = nanoid(10)
	const filename = `${id}-${req.file.originalname}`
	const filepath = path.join(dest, filename)
	await fs.rename(req.file.path, filepath)
	const savedFile = await db.file.create({
		data: {
			extension: path.parse(req.file.originalname).ext.replace('.', ''),
			mimeType: req.file.mimetype,
			size: req.file.size,
			// event: { connect: { id: Number(req.body.eventId) } },
			name: path.parse(req.file.originalname).name,
			path: `/public/${filename}`,
			author: {
				connect: {
					id: session.userId || undefined,
				},
			},
			...JSON.parse(req.body.extraFields || '{}'),
		},
	})
	res.json(savedFile)
}
export default handler
