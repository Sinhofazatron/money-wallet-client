import { FC } from 'react'
import TransactionForm from '../components/TransactionForm'
import { instance } from '../api/axios.api'
import {
	ICategory,
	IResponseTransactionLoader,
	ITransaction,
} from '../types/types'
import { toast } from 'react-toastify'
import TransactionTable from '../components/TransactionTable'
import { useLoaderData } from 'react-router-dom'
import { formatToUSD } from '../helpers/currency.helper'
import Chart from '../components/Chart'

export const transactionLoader = async () => {
	const categories = await instance.get<ICategory[]>('/categories')
	const transactions = await instance.get<ITransaction[]>('/transactions')
	const totalIncome = await instance.get<number>('/transactions/income/find')
	const totalExpense = await instance.get<number>('/transactions/expense/find')

	const data = {
		categories: categories.data,
		transactions: transactions.data,
		totalIncome: totalIncome.data,
		totalExpense: totalExpense.data,
	}
	return data
}

export const transactionAction = async ({ request }: any) => {
	switch (request.method) {
		case 'POST': {
			const formData = await request.formData()
			const newTransaction = {
				title: formData.get('title'),
				amount: +formData.get('amount'),
				category: formData.get('category'),
				type: formData.get('type'),
			}

			if (!newTransaction.category) {
				toast.error('Create category!')
				return null
			}

			await instance.post('/transactions', newTransaction)
			toast.success('Transaction added')
			return null
		}
		case 'DELETE': {
			const formData = await request.formData()
			const transactionId = formData.get('id')

			await instance.delete(`/transactions/transaction/${transactionId}`)
			toast.success('Transaction deleted')
			return null
		}
	}
	const data = {}
	return data
}

const Transactions: FC = () => {
	const { totalIncome, totalExpense } =
		useLoaderData() as IResponseTransactionLoader

	return (
		<>
			<div className="mt-4 flex items-start gap-10">

				{/* Statistics Form */}
				<div className="rounded-md bg-gray-200 p-4">
					<div className="grid grid-cols-2 gap-3 mt-6">
						<div>
							<p className="text-md text-center font-bold uppercase">
								Total Income:
							</p>
							<p className="mt-2 rounded-sm bg-green-600 p-1 text-center">
								{formatToUSD.format(totalIncome)}
							</p>
						</div>
						<div>
							<p className="text-md text-center font-bold uppercase">
								Total Expense:
							</p>
							<p className="mt-2 rounded-sm bg-red-500 p-1 text-center">
								{formatToUSD.format(totalExpense)}
							</p>
						</div>
					</div>
					<Chart totalExpense={totalExpense} totalIncome={totalIncome} />
				</div>

				{/* Add Transactions Form */}
				<div className="col-span-2 grid w-full">
					<TransactionForm />
				</div>
			</div>

			{/* Transactions Table */}
			{totalIncome || totalExpense ? <TransactionTable limit={5} /> : null}
		</>
	)
}

export default Transactions
