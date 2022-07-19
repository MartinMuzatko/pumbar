import { Text } from '@mantine/core'

const MenuLabel = ({ children }: React.PropsWithChildren<{}>) =>
	<Text color="#868e96" size="xs" weight={500} className="my-2">
		{children}
	</Text>
export default MenuLabel
