import { useDispatch, useSelector } from "react-redux"
import Logo from "/swiggy_logo_white.jpg"
import { setLeftOpen, setRightOpen } from "../../redux/slices/uiStates";
import type { RootState } from "../../main";
import { MapPin } from 'lucide-react';
   
const Header = () => {
  const dispatch = useDispatch();
  const uiState = useSelector((state: RootState) => state.uiStates);
  const handleLocationSidebar = () => {
    dispatch(setLeftOpen(!uiState.leftOpen))
  }

  const handleAuthSidebar = () => {
    dispatch(setRightOpen(!uiState.rightOpen))
  }

  return (
    <div className="px-4 md:px-0 w-full bg-green-900 py-2 text-neutral-100 fixed z-10 shadow-xl">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex justify items-center md:gap-7 gap-2">
              <img className="w-32 md:w-48 lg:w-48" src={Logo}/>
              <p className="pt-2 cursor-pointer text-xs select-none md:text-[16px] flex justify-center items-center gap-1" 
                onClick={handleLocationSidebar}>Location <MapPin width={17}/></p>
            </div>
            <div className="justify-between items-center gap-7 text-lg hidden md:flex">
                <ul className="flex gap-7 ">
                    <li className="cursor-pointer">Home</li>
                    <li className="cursor-pointer">Grocery</li>
                    <li className="cursor-pointer">Contact</li>
                    <li className="cursor-pointer">Items</li>
                </ul>
                <button className="p-2 border rounded-lg cursor-pointer" onClick={handleAuthSidebar}>Signup</button>
                <button className="p-2 border rounded-lg cursor-pointer">Signin</button>
            </div>
        </div>
    </div>
  )
}

export default Header