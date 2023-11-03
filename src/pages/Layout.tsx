import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'

const Layout: FC = () => {
	return (
		<div className="flex min-h-screen bg-gray-100 text-black font-roboto">
			<Header />
			<div className="container">
				<Outlet />
			</div>
		</div>
	)
}

export default Layout
