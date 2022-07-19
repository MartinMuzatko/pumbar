import React, { useContext } from 'react'
import { Head, useRouter } from 'blitz'
import ColorSchemeContext from 'app/core/contexts/ColorSchemeContext'

interface LayoutProps {
	children: React.ReactNode
	title?: string
	contain?: boolean
	className?: string
}

const Layout = ({ children, title, contain, className }: LayoutProps) => {
	const { colorScheme, setColorScheme } = useContext(ColorSchemeContext)
	const router = useRouter()
	return (
		<div>
			<Head>
				<title>{title || 'Südstaaten Furs e.V.'}</title>
			</Head>
			<header>
				<div className="bg-gray-50 dark:bg-gray-800 z-10 relative">
					<div className="container">
						Header
					</div>
				</div>
			</header>
			{contain ? (
				<div className="container pt-8">
					<div className="rounded shadow relative">
						{children}
					</div>
				</div>
			) : (
				children
			)}
			<div className="container pb-16">
				<div className="bg-black text-white p-4">Footer</div>
			</div>
		</div>
	)
}
export default Layout
