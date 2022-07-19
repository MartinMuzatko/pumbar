import { DefaultCtx, SessionContext } from 'blitz'
import { User } from 'db'
import { PermissionsIsAuthorized } from 'PermissionsIsAuthorized'

export enum eventPermission {
	event_edit = 'event_edit',
	event_edit_registration = 'event_edit_registration',
	event_edit_page = 'event_edit_page',
}

export enum globalPermission {
	edit_permission = 'global_edit_permission',
	edit_page = 'global_edit_page',
	edit_user = 'global_edit_user',
	edit_event = 'global_edit_event',
	edit_eventrequest = 'global_edit_eventrequest',
	create_event = 'global_create_event',
	modify_event_public = 'global_modify_event_public',
	show_hidden_user = 'global_show_hidden_user',
}

export type Permission = `${string}_${eventPermission}` | globalPermission

declare module 'blitz' {
	export interface Ctx extends DefaultCtx {
		session: SessionContext
	}
	export interface Session {
		isAuthorized: PermissionsIsAuthorized
		PublicData: {
			userId: User['id']
			permissions: Permission[]
			colorScheme: 'light' | 'dark'
		}
	}
}
