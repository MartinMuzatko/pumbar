/* eslint-disable indent */
import { GetServerSideProps, GetServerSidePropsContext, invokeWithMiddleware } from 'blitz'
import getDocument from './documents/queries/getDocument'
import type { ParsedUrlQuery } from 'querystring'

export const documentGetServerSideProps = <Q extends ParsedUrlQuery = ParsedUrlQuery>(
	pathFn: (ctx: GetServerSidePropsContext<Q>) => (string | null)[]
) => {
	const getServerSideProps: GetServerSideProps<
		{ document: Awaited<ReturnType<typeof getDocument>> },
		Q
	> = async (ctx) => {
		const { req, res } = ctx
		const path = pathFn(ctx)
		try {
			const document = await invokeWithMiddleware(getDocument, path, { req, res })
			return {
				props: { document },
			}
		} catch (error) {
			return {
				notFound: true,
			}
		}
	}
	return getServerSideProps
}
