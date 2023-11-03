import { FC } from 'react'

const Home: FC = () => {
	return (
		<div className="mt-10 p-4">
			<h1 className="text-center text-4xl mb-8">Money Wallet</h1>
			<p className="text-lg ml-10 mb-10">
				... is an application designed to help you keep track of your expenses.
			</p>
			<p className="text-base">1. First of all go through the registration</p>
			<p className="text-base">2. Then create a category</p>
			<p className="text-base">2. And create a transaction</p>
		</div>
	)
}

export default Home
