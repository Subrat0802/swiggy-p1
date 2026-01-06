import { useAuth } from "../../context/AuthContext";
import { useDispatch } from "react-redux";
import { useState, type ChangeEvent } from "react";
import { me, signin, signup } from "../../services/operations.ts/auth";
import { setUser } from "../../redux/slices/userState";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const { auth, setAuth } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signupForm, setSignupForm] = useState({
    firstName:"",
    lastName:"",
    email:"",
    password:""
  })

  const isSignup = auth === "signup";

  const handleChanges = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    setSignupForm(prev => ({
        ...prev,
        [name]: value
    }))
  }

  const handleSignup = async () => {
    const {firstName, lastName, email, password} = signupForm;
    try{
        await signup({firstName, lastName, email, password})
        setAuth("signin")
    }catch(error){
        console.log(error);
    }
  }

  const handleSignin = async () => {
    const {email, password} = signupForm;
    try{
        const res = await signin({email, password});
        console.log("RES,", res);
        dispatch(setUser(res));
        me();
        navigate("/")
    }catch(error){
        console.log(error);
    }
  }

  return (
    <div className="relative flex flex-col items-center w-full px-6 py-8 ">
      <h2 className="text-xl md:text-2xl font-bold text-center text-gray-900">
        {isSignup ? "Create an account" : "Welcome back"}
      </h2>
      <p className="text-sm text-gray-500 mt-1 mb-6 text-center">
        {isSignup
          ? "Sign up to explore restaurants and order your favorite food"
          : "Sign in to continue ordering delicious meals"}
      </p>
      {isSignup && (
        <>
          <input
            placeholder="First Name"
            className="w-full mb-3 p-3 border rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-800"
            value={signupForm.firstName}
            onChange={(e) => handleChanges(e)}
            name="firstName"
          />
          <input
            placeholder="Last Name"
            className="w-full mb-3 p-3 border rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-800"
            value={signupForm.lastName}
            onChange={(e) => handleChanges(e)}
            name="lastName"
          />
        </>
      )}
      <input
        placeholder="Email Address"
        className="w-full mb-3 p-3 border rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-800"
        value={signupForm.email}
        onChange={(e) => handleChanges(e)}
        name="email"
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full mb-5 p-3 border rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-800"
        value={signupForm.password}
        onChange={(e) => handleChanges(e)}
        name="password"
      />
      <button
        className="
          w-full bg-green-900 text-white py-3 rounded-md font-medium
          hover:bg-green-800 transition-all duration-200
        "
        onClick={isSignup ? handleSignup : handleSignin}
      >
        {isSignup ? "Signup" : "Signin"}
      </button>
      <p
        onClick={() => setAuth(isSignup ? "signin" : "signup")}
        className="mt-5 text-sm text-gray-600 cursor-pointer"
      >
        {isSignup ? "Already have an account? " : "New here? "}
        <span className="font-semibold text-green-900 hover:underline">
          {isSignup ? "Signin" : "Signup"}
        </span>
      </p>
    </div>
  );
};

export default Auth;
