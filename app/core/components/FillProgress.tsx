import { Progress } from '@mantine/core'
import { useEffect, useState } from 'react'

interface FillProgressProps {
	max: number
	onDone?: () => void
}

const FillProgress = ({ max, onDone }: FillProgressProps) => {
	const refreshRate = 100
	const maxProgress = max / refreshRate
	const [counter, setCounter] = useState(0)
	const current = (100 / maxProgress) * counter
	const div = (1 / refreshRate) * 1000
	useEffect(() => {
		!(counter > maxProgress) ? setTimeout(() => setCounter(counter + 1), refreshRate) : onDone?.()
	}, [counter, maxProgress, onDone])
	return (
		<div>
			{(counter / div).toFixed(1)}s/{maxProgress / div}s
			<Progress value={current} />
		</div>
	)
}
export default FillProgress
