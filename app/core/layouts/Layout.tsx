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
			{contain ? (
				<div className="container pt-8">
					<div className="rounded shadow relative">
						{children}
					</div>
				</div>
			) : (
				children
			)}
			<footer>
				<div className="container">
					<h1 className="font-bold text-xl">
						PuMbar! - Mixen bis zum Morgengrauen
					</h1>
					Gebastelt von Pum & Misan!
				</div>
			</footer>
		</div>
	)
}
export default Layout
