import { FC, useEffect, useState } from 'react'
import { FaTrash } from 'react-icons/fa'
import { Form, useLoaderData } from 'react-router-dom'
import { IResponseTransactionLoader, ITransaction } from '../types/types'
import { formatDate } from '../helpers/date.helper'
import { formatToUSD } from '../helpers/currency.helper'
import { instance } from '../api/axios.api'
import ReactPaginate from 'react-paginate'

interface ITransactionTable {
	limit: number
}

const TransactionTable: FC<ITransactionTable> = ({ limit = 3 }) => {
	const { transactions } = useLoaderData() as IResponseTransactionLoader

	const [data, setData] = useState<ITransaction[]>([])
	const [currentPage, setCurrentPage] = useState<number>(1)
	const [totalPages, setTotalPages] = useState<number>(0)

	const fetchTransactions = async (page: number) => {
		const response = await instance.get(
			`/transactions/pagination?page=${page}&limit=${limit}`,
		)
		setData(response.data)
		setTotalPages(Math.ceil(transactions.length / limit))
	}

	const handleChangePage = (selectedItem: { selected: number }) => {
		setCurrentPage(selectedItem.selected + 1)
	}

	useEffect(() => {
		fetchTransactions(currentPage)
	}, [currentPage, transactions])

	return (
		<>
			<ReactPaginate
				className="mt-4 flex items-center justify-end gap-3"
				activeClassName="bg-blue-600 rounded-md"
				pageLinkClassName="text-white text-xs py-1 px-2 rounded-md"
				previousLinkClassName="text-white py-1 px-2 bg-slate-800 rounded-md text-xs"
				nextClassName="text-white py-1 px-2 bg-slate-800 rounded-md text-xs"
				disabledClassName="text-white/50 cursor-not-allowed"
				disabledLinkClassName="text-slate-600 cursor-not-allowed"
				pageCount={totalPages}
				pageRangeDisplayed={1}
				marginPagesDisplayed={2}
				onPageChange={handleChangePage}
			/>
			<div className="bg-slate-800 px-4 mt-4 rounded-md">
				<table className="w-full">
					<thead>
						<tr>
							<td className="font-bold">№</td>
							<td className="font-bold">Title</td>
							<td className="font-bold">Amount($)</td>
							<td className="font-bold">Category</td>
							<td className="font-bold">Date</td>
							<td className="text-right">Action</td>
						</tr>
					</thead>
					<tbody>
						{data?.map((transaction, idx) => (
							<tr key={idx}>
								<td> {idx + 1} </td>
								<td> {transaction.title} </td>
								<td
									className={
										transaction.type === 'income'
											? 'text-green-500'
											: 'text-red-500'
									}
								>
									{transaction.type === 'income'
										? `+ ${formatToUSD.format(transaction.amount)}`
										: `- ${formatToUSD.format(transaction.amount)}`}
								</td>
								<td> {transaction.category?.title || 'other'} </td>
								<td> {formatDate(transaction.createdAt)} </td>
								<td>
									<Form method="delete" action="/transactions">
										<input type="hidden" name="id" value={transaction.id} />
										<button className="btn hover:btn-red ml-auto">
											<FaTrash />
										</button>
									</Form>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	)
}

export default TransactionTable
