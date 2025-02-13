import { DefaultCtx, SessionContext } from 'blitz'
declare module 'blitz' {
	export interface Ctx extends DefaultCtx {
		session: SessionContext
	}
	export interface Session {
		isAuthorized: false
		PublicData: Record<string, any>
	}
}
