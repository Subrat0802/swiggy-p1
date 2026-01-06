
const Auth = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-3 w-full text-center">
        <p className="text mb-5">Signin</p>
        <input placeholder="Email Address" className="placeholder:text-gray-500 w-[80%] p-2 border border-gray-700"/>
        <input placeholder="Password" className="placeholder:text-gray-500 w-[80%] p-2 border border-gray-700"/>
        <button className="text-white bg-green-900 w-[80%] p-4 cursor-pointer transition-all duration-200 hover:bg-green-800">Signin</button>
        <p className="group text-sm cursor-pointer">Don't have account? <span className="font-semibold group-hover:text-green-900">Signup</span></p>
    </div>
  )
}

export default Auth