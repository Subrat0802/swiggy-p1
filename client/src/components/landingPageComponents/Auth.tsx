import { X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useDispatch } from "react-redux";
import { setRightOpen } from "../../redux/slices/uiStates";

const Auth = () => {
  const { auth, setAuth } = useAuth();
  const dispatch = useDispatch();

  const isSignup = auth === "signup";

  return (
    <div className="relative flex flex-col items-center w-full px-6 py-8">
      <button
        onClick={() => dispatch(setRightOpen(false))}
        className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition"
      >
        <X className="w-5 h-5 text-gray-600" />
      </button>
      <h2 className="text-2xl font-bold text-gray-900">
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
          />
          <input
            placeholder="Last Name"
            className="w-full mb-3 p-3 border rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-800"
          />
        </>
      )}
      <input
        placeholder="Email Address"
        className="w-full mb-3 p-3 border rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-800"
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full mb-5 p-3 border rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-800"
      />
      <button
        className="
          w-full bg-green-900 text-white py-3 rounded-md font-medium
          hover:bg-green-800 transition-all duration-200
        "
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
