import * as React from 'react'

const LoginMenuContext = React.createContext({
	loginMenuOpened: false,
	setLoginMenuOpened: (opened: boolean) => { },
})
export default LoginMenuContext
