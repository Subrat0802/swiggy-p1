import Logo from "/swiggy_logo_white.jpg"
   
const Header = () => {
  return (
    <div className="px-4 md:px-0 w-full bg-green-900 py-2 text-neutral-100 fixed z-10 shadow-xl">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex justify items-center gap-7">
              <img className="w-32 md:w-48 lg:w-48" src={Logo}/>
              <p className="pt-2 hidden md:block">Location</p>
            </div>
            <div className="justify-between items-center gap-7 text-lg hidden md:flex">
                <ul className="flex gap-7 ">
                    <li>Home</li>
                    <li>Grocery</li>
                    <li>Contact</li>
                    <li>Items</li>
                </ul>
                <button className="p-2 border rounded-lg">Signup</button>
                <button className="p-2 border rounded-lg">Signin</button>
            </div>
        </div>
    </div>
  )
}

export default Header