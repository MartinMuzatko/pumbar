import { Ctx } from 'blitz'
import { Permission } from 'types'
import { includesSet } from 'app/util'

export type PermissionsIsAuthorizedArgs = {
	ctx: Ctx
	args: [permissions?: Permission[]]
}

export function permissionsIsAuthorized({
	ctx,
	args,
}: PermissionsIsAuthorizedArgs) {
	const [permissions] = args
	// TODO: What happens if permissions and session is undefined?
	return includesSet(permissions || [], ctx.session.permissions || [])
}

export type PermissionsIsAuthorized = typeof permissionsIsAuthorized
