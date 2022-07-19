import * as React from 'react'

export type ColorScheme = 'dark' | 'light'

const ColorSchemeContext = React.createContext({
	colorScheme: 'light' as ColorScheme,
	setColorScheme: (theme: ColorScheme) => { },
})
export default ColorSchemeContext
