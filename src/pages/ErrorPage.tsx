import { FC } from 'react'
import { Link } from 'react-router-dom'
import img from '../assets/404.png'

const ErrorPage: FC = () => {
	return 	<div className='min-h-screen flex justify-center items-center flex-col gap-10'>
				<img src={img} alt="error" />
				<Link to={'/'} className='btn btn-red'>Back</Link>
			</div>
}

export default ErrorPage 