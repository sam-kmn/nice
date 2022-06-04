import { NavLink, Link } from "react-router-dom"
import { useAuth } from "../context/Auth"
import { useSearch } from "../context/Search"

import Btn from "./Btn"
import {HiOutlineUserCircle} from 'react-icons/hi'
import {CgSearch} from 'react-icons/cg'
import {RiImageAddFill} from 'react-icons/ri'
import {IoMdLogOut} from 'react-icons/io'

const Navbar = () => {
  const {currentUser, signOut} = useAuth()
  const {search, setSearch} = useSearch()
  const activeNavLink = ({isActive}) => isActive ? 'text-green-700': 'text-black'
  
  return (
    <nav className="flex flex-row items-center gap-4 h-20 px-5 py-4 font-semibold !w-screen">

      <Link to={'/'} className='flex-none'>
        <img src="/nice.png" alt="" className='h-12 w-12' />
      </Link>
        
      <NavLink to={'/'} className={ ({isActive}) => isActive ? 'bg-black text-white h-full justify-center items-center rounded-full px-4 hidden md:flex' : 'bg-white text-black px-4 hidden md:block'} >
        Home page
      </NavLink>

      <NavLink to={'/add'} className={'flex justify-center items-center gap-1'}>
        <div className='hidden sm:block'>Create</div> <RiImageAddFill className="text-2xl sm:text-xl" />
      </NavLink>

      <div className="flex-1 flex justify-center items-center gap-2 bg-zinc-100 h-full px-3 rounded-full">
        <CgSearch className="text-2xl text-gray-500"  />
        <input type="search" value={search} onChange={e => setSearch(e.target.value)} className="flex-1 px-2 mr-4 h-full bg-inherit" placeholder='Search' />
      </div>

      
      { currentUser && (
        <div className='flex justify-end '>
          <NavLink to={'/u/' + currentUser.displayName} className={activeNavLink}>
            <Btn className={'border-0 hover:bg-gray-100 rounded-full !p-2'}><HiOutlineUserCircle className="text-3xl text-gray-700" /></Btn>
          </NavLink>

          <Btn onClick={signOut} className='border-0 hover:bg-gray-100 rounded-full !p-2'> <IoMdLogOut className='text-3xl text-gray-700' /></Btn>
       
        </div>
      )}

    </nav>
  )
}

export default Navbar