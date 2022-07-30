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
	async (recipe: CompleteRecipe) => {
		await Promise.all(recipe.steps.map(async step => {
			setPinOn(step.ingredient.relais)
			await sleep(step.ingredient.timePerCentiliter * step.centiliter)
			setPinOff(step.ingredient.relais)
		}))
	}
)
