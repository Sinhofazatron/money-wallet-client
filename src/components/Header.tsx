import { FC } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { SlWallet } from 'react-icons/sl'
import { FaSignOutAlt } from 'react-icons/fa'
import { useAuth } from '../hooks/useAuth';
import { useAppDispatch } from '../store/hooks';
import { logout } from '../store/user/userSlice';
import { removeTokenFromLocalStorage } from '../helpers/localstorage.helper';
import { toast } from 'react-toastify';

const Header: FC = () => {
	const isAuth = useAuth();
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const logoutHandler = () => {
		dispatch(logout())
		removeTokenFromLocalStorage('token')
		toast.success("You logged out")
		navigate('/')
	}

	return (
		<header className='flex justify-between h-screen shadow-sm px-3 py-3 backdrop-blur-sm rounded-lg'>
			<div className=" flex flex-col items-center justify-between gap-3 px-3 py-3  w-44 bg-gray-300 rounded-2xl text-lg">
				<div>
					<Link to='/' className='flex gap-2 justify-center mt-1 mb-20'>
					<SlWallet size={24}/>
					<p className=''>Money Wallet</p>
				</Link>

				{/* Menu */}
				{
					isAuth && (
						<nav>
							<ul className='relative ml-4 text-base'>
								<li className="mb-2">
									<NavLink to='/' className={({isActive}) => isActive ? 'text-white' : 'text-black duration-300 hover:text-stone-600'}>Home</NavLink>
								</li>
								<li className="mb-2">
									<NavLink to='/categories' className={({isActive}) => isActive ? 'text-white' : 'text-black duration-300 hover:text-stone-600'}>Categories</NavLink>
								</li>
								<li>
									<NavLink to='/transactions' className={({isActive}) => isActive ? 'text-white' : 'text-black duration-300 hover:text-stone-600'}>Transactions</NavLink>
								</li>
							</ul>
						</nav>
					)
				}
				</div> 

				{/* Actions */}
				{
					isAuth ? (
						<div className='flex w-28 h-8 mb-4'>
							<button onClick={logoutHandler} className=' btn btn-red  text-base'>
								<span>Log Out</span>
								<FaSignOutAlt/>
							</button>
						</div>
					) : (
						<Link to={'auth'} className='py-2 hover:text-stone-600 text-black'>
							<button className='mb-2 btn btn-red text-base w-36 h-8'>
								<span>Log In / Sing In</span>
							</button>
						</Link>
					)
				}
			</div>	
		</header>
	)
}

export default Header

{/* <header className='flex justify-between w-44 h-screen px-3 py-3 shadow-sm bg-slate-800 backdrop-blur-sm rounded-lg'> */}