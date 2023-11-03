import { FC } from 'react'
import { Form } from 'react-router-dom'

interface Props {
	type: 'post' | 'patch'
	id?:	number
	setVisibleModal: (visible: boolean) => void
}

const CategoryModal: FC<Props> = ({ type, id, setVisibleModal }) => {
	
  return (
	<div className='flex justify-center items-center fixed top-0 bottom-0 right-0 left-0 w-full h-full bg-black/50 '>
		<Form onSubmit={() => setVisibleModal(false)} action='/categories' method={type} className='grid gap-2 w-[300px] p-5 rounded-md bg-slate-800'>
			<label htmlFor="title">
				<p className='flex items-center justify-center mb-4 text-white'>Category title</p>
				<input type="text" name='title' placeholder='Title...' className='input w-full  mb-4'/>
				<input type="hidden" value={id} name='id' />
			</label>
			<div className='flex items-center justify-center gap-2 text-white'>
				<button type='submit' className='btn btn-green hover:text-white/50 duration-300'>
					{ type === 'patch' ? 'Save' : 'Create'}
				</button>
				<button onClick={() => setVisibleModal(false)} className='btn btn-red hover:text-white/50 duration-300'>Close</button>
			</div>
		</Form>
	</div>
  )
}

export default CategoryModal