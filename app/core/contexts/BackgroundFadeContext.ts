import * as React from 'react'

const BackgroundFadeContext = React.createContext({
	backgroundFade: 'transparent',
	setBackgroundFade: (fade: string) => {},
})
export default BackgroundFadeContext
