import * as React from 'react'

interface AdminDrawerPortalContextInterface {
	adminDrawerPortal: React.ReactNode | JSX.Element
	setAdminDrawerPortal: (el: React.ReactNode | JSX.Element) => void
}

const AdminDrawerPortalContext = React.createContext<AdminDrawerPortalContextInterface>({
	adminDrawerPortal: '',
	setAdminDrawerPortal: (drawer: React.ReactNode | JSX.Element) => { },
})
export default AdminDrawerPortalContext
