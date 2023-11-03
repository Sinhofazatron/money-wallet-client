import { FC, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { Form, useLoaderData } from 'react-router-dom'
import { IResponseTransactionLoader } from '../types/types'
import CategoryModal from './CategoryModal'

const TransactionForm: FC = () => {
	const { categories } = useLoaderData() as IResponseTransactionLoader
	const [visibleModal, setVisibleModal] = useState<boolean>(false)

	return (
		<div className="relative rounded-md bg-gray-200 p-4">
			<Form className="grid gap-2" method="post" action="/transactions">
				<label className="grid" htmlFor="title">
					<span>Title</span>
					<input
						className="input bg-white/40"
						type="text"
						placeholder="Title..."
						name="title"
						required
					/>
				</label>
				<label className="grid" htmlFor="amount">
					<span>Amount</span>
					<input
						className="input bg-white/40"
						type="number"
						placeholder="Amount..."
						name="amount"
						required
					/>
				</label>

				{/* Select */}
				{categories.length ? (
					<label htmlFor="category" className="grid mb-9">
						<span>Category</span>
						<select name="category" required className="input bg-gray-200">
							{categories.map((ctg, idx) => (
								<option key={idx} value={ctg.id}>
									{ctg.title}
								</option>
							))}
						</select>
					</label>
				) : (
					<h1 className="mt-5 mb-[3.75rem] text-red-600">
						To continue create category first
					</h1>
				)}

				{/* Radio Buttons */}
				<div className="flex gap-4 items-center">
					<label className="flex cursor-pointer items-center gap-2">
						<input
							type="radio"
							name="type"
							value={'income'}
							className="form-radio text-blue-600"
							required
						/>
						<span>Income</span>
					</label>
					<label className="flex cursor-pointer items-center gap-2">
						<input
							type="radio"
							name="type"
							value={'expense'}
							className="form-radio text-blue-600"
						/>
						<span>Expense</span>
					</label>
				</div>

				{/* Submit Button */}
				<button className="btn btn-green max-w-fit mt-2">Submit</button>
			</Form>
			{/* Add category */}
			<button
				onClick={() => setVisibleModal(true)}
				className="absolute bottom-[6.5rem] flex max-w-fit items-center gap-2 text-black hover:text-stone-600"
			>
				<FaPlus className="mb-[0.16rem]" />
				<span>Manage Categories:</span>
			</button>

			{/* Add Category Modal */}
			{visibleModal && (
				<CategoryModal type="post" setVisibleModal={setVisibleModal} />
			)}
		</div>
	)
}

export default TransactionForm
