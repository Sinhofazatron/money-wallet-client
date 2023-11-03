import { createBrowserRouter } from "react-router-dom"
import Layout from '../pages/Layout'
import ErrorPage from '../pages/ErrorPage'
import Home from '../pages/Home'
import Transactions from '../pages/Transactions'
import Categories, { categoriesAction, categoryLoader } from '../pages/Categories'
import Auth from '../pages/Auth'
import ProtectedRout from '../components/ProtectedRout'
import { transactionLoader, transactionAction } from '../pages/Transactions'

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout/>,
		errorElement: <ErrorPage/>,
		children: [
			{
				index: true,
				element: <Home/>
			},
			{
				path: 'transactions',
				action: transactionAction,
				loader: transactionLoader,
				element: <ProtectedRout>
							<Transactions/>
						</ProtectedRout>
			},
			{
				path: 'categories',
				action: categoriesAction,
				loader: categoryLoader,
				element: <ProtectedRout>
							<Categories/>	
						</ProtectedRout>
			},
			{
				path: 'auth',
				element: <Auth/>
			}
		]
	}
])
