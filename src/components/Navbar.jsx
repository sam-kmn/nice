import { NavLink } from "react-router-dom"
import useAuth from "../context/Auth"
import HomeIcon from "./Icons/Home"
import UserIcon from "./Icons/User"
import AddIcon from "./Icons/Add"
import Btn from "./Btn"

const Navbar = () => {
  const {currentUser, signOut} = useAuth()
  const activeNavLink = ({isActive}) => isActive ? 'text-green-700': 'text-black'
  
  return (
    <div className="bg-zinc-100 py-3">
      <nav className="container mx-auto px-3 flex flex-row justify-between">
        <div className="text-3xl font-semibold">Nice.</div>
        <div className="flex flex-row gap-3">
          
          <NavLink to={'/add'} className={activeNavLink}>
            <Btn className={'border-0 hover:bg-gray-100 rounded-full !p-2'}><AddIcon/></Btn>
          </NavLink>

          <NavLink to={'/'} className={activeNavLink}>
            <Btn className={'border-0 hover:bg-gray-100 rounded-full !p-2'}><HomeIcon/></Btn>
          </NavLink>
          
          { currentUser && (<>
          <NavLink to={'/profile'} className={activeNavLink}>
            <Btn className={'border-0 hover:bg-gray-100 rounded-full !p-2'}><UserIcon/></Btn>
          </NavLink>
          
          <Btn onClick={signOut} className='border-0'>Log out</Btn>
          </>)

          }
        </div>
      </nav>
    </div>
  )
}

export default Navbar