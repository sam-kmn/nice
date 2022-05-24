import useAuth from "../context/Auth"
import Btn from "./Btn"
import HomeIcon from "./Icons/Home"
import AddIcon from "./Icons/Add"
import { NavLink } from "react-router-dom"

const Navbar = () => {
  const {currentUser, signOut} = useAuth()
  
  return (
    <div className="flex flex-row justify-between pt-2">
      <div className="text-2xl">Nice</div>
      <div className="flex flex-row gap-3">
        <NavLink to={'/add'}><Btn className={'border-0 hover:bg-gray-100 rounded-full !p-2'}><AddIcon/></Btn></NavLink>
        <NavLink to={'/'}><Btn className={'border-0 hover:bg-gray-100 rounded-full !p-2'}><HomeIcon/></Btn></NavLink>
        { currentUser && <Btn onClick={signOut} className='border-0'>Log out</Btn>}
      </div>
    </div>
  )
}

export default Navbar