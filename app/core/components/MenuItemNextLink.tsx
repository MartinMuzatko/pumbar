import { forwardRef } from 'react'
import { LinkProps, Link } from 'blitz'

const MenuItemNextLink = forwardRef<any, React.PropsWithChildren<LinkProps>>(
	({ href, ...props }, ref) => (
		<Link href={href}>
			<a {...props} ref={ref}>
				{props.children}
			</a>
		</Link>
	)
)
export default MenuItemNextLink
