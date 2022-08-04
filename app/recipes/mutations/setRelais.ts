import { resolver } from 'blitz'
import { execa } from 'execa'
import { CompleteRecipe } from '../types'

enum Signal {
	low = 'dl',
	high = 'dh',
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const setPin = (pin: number, signal: Signal) => execa('raspi-gpio', ['set', String(pin), 'op', signal])
const setPinOn = (pin: number) => setPin(pin, Signal.low)
const setPinOff = (pin: number) => setPin(pin, Signal.high)

export default resolver.pipe(
	async ({ relais, state }: { relais: number | string, state: boolean }) => {
		setPin(relais, state)
	}
)
