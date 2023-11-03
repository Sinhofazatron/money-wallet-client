import { FC, useState } from 'react'
import { AiFillEdit, AiFillCloseCircle } from 'react-icons/ai'
import { FaPlus } from 'react-icons/fa'
import { Form, useLoaderData } from 'react-router-dom'
import CategoryModal from '../components/CategoryModal'
import { instance } from '../api/axios.api'
import { ICategory } from '../types/types'
import { toast } from 'react-toastify'

export const categoriesAction = async ({ request }: any) => {
	switch (request.method) {
		case 'POST': {
			try {
				const formData = await request.formData()
				const title = {
					title: formData.get('title'),
				}
				await instance.post('categories', title)
				return null
			} catch (err: any) {
				const error = err.response?.data.message
				toast.error(error.toString())
				return null
			}
		}
		case 'PATCH': {
			const formData = await request.formData()
			const category = {
				id: formData.get('id'),
				title: formData.get('title'),
			}
			await instance.patch(`categories/category/${category.id}`, category)
			return null
		}
		case 'DELETE': {
			const formData = await request.formData()
			const categoryId = formData.get('id')
			await instance.delete(`categories/category/${categoryId}`)

			return null
		}
	}
}

export const categoryLoader = async () => {
	const { data } = await instance.get<ICategory[]>('/categories')
	return data
}

const Categories: FC = () => {
	const categories = useLoaderData() as ICategory[]
	const [visibleModal, setVisibleModal] = useState<boolean>(false)
	const [isEdit, setIsEdit] = useState<boolean>(false)
	const [categoryId, setCategoryId] = useState<number>(0)

	return (
		<>
			<div className="mt-10 p-4 rounded-md bg-gray-200">
				<h1>Your category list:</h1>

				{/* Category list */}
				<div className="mt-2 flex flex-wrap items-center gap-2">
					{categories.map((category, idx) => (
						<div
							key={idx}
							className="group py-2 px-6 rounded-lg bg-green-600 flex items-center relative gap-2 text-white"
						>
							{category.title}
							<div className="hidden absolute px-1 left-0 top-0 bottom-0 right-0 rounded-lg bg-green-800 items-center justify-end group-hover:flex gap-2">
								<button
									className="text-white"
									onClick={() => {
										setCategoryId(category.id)
										setVisibleModal(true)
										setIsEdit(true)
									}}
								>
									<AiFillEdit />
								</button>

								<Form className="flex mr-2" method="delete" action="/categories">
									<input type="hidden" name="id" value={category.id} />
									<button type="submit" className="text-white">
										<AiFillCloseCircle />
									</button>
								</Form>
							</div>
						</div>
					))}
				</div>

				{/* Add category */}
				<button
					onClick={() => {
						setIsEdit(false)
						setVisibleModal(true)
					}}
					className="flex mt-5 max-w-fit items-center gap-2 text-black hover:text-stone-600"
				>
					<FaPlus className="mb-[0.16rem]" />
					<span>Create new category</span>
				</button>
			</div>

			{/* Add Category Modal */}
			{visibleModal && (
				<CategoryModal type="post" setVisibleModal={setVisibleModal} />
			)}

			{/* Add Category Modal */}
			{visibleModal && isEdit && (
				<CategoryModal
					type="patch"
					id={categoryId}
					setVisibleModal={setVisibleModal}
				/>
			)}
		</>
	)
}

export default Categories
