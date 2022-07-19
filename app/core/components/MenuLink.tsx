import { Link } from 'blitz'
import type { UrlObject } from 'url'


const MenuLink = ({ children, href, icon, ...props }: Omit<JSX.IntrinsicElements['a'], 'href'> & React.PropsWithChildren<{ href?: string | UrlObject, icon?: JSX.Element }>) =>
	<Link href={href || ''} passHref>
		<a {...props} className={`flex rounded hover:bg-gray-50 dark:hover:bg-gray-400 items-center p-2 text-sm ${props.className || ''}`}>
			{icon && <div className="mr-2">{icon}</div>}
			{children}
		</a>
	</Link>
export default MenuLink
