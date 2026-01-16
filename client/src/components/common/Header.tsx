import { useDispatch, useSelector } from "react-redux";
import Logo from "/Swiggy logo-2.png";
import { setLeftOpen, setRightOpen } from "../../redux/slices/uiStates";
import type { RootState } from "../../main";
import { MapPin, Menu, User } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { clearUser } from "../../redux/slices/userState";
import { logout } from "../../services/operations.ts/auth";
import { Link } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const { setAuth } = useAuth();
  const dispatch = useDispatch();
  const uiState = useSelector((state: RootState) => state.uiStates);
  const userState = useSelector((state: RootState) => state.userState.user);
  const [showDropDown, setShowDropDown] = useState(false);
  const [showBurger, setShowBurger] = useState(false);

  const handleLocationSidebar = () => {
    if (uiState.rightOpen) {
      dispatch(setRightOpen(false));
    }
    dispatch(setLeftOpen(!uiState.leftOpen));
  };

  const handleAuthSidebar = (value: string) => {
    if (uiState.leftOpen) {
      dispatch(setLeftOpen(false));
    }
    dispatch(setRightOpen(!uiState.rightOpen));
    setAuth(value);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      dispatch(clearUser());
    }
  };

  return (
    <div className="px-4 md:px-0 w-full bg-white py-2 text-black/90 fixed z-20 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center z-20 ">
        <div className="flex justify-center items-center md:gap-7 gap-2">
          <img className="w-24 md:w-48 lg:w-48" src={Logo} />
          <div
            className="text-[10px] cursor-pointer ms:text-xs select-none md:text-[16px] flex justify-center items-center gap-1"
            onClick={handleLocationSidebar}
          >
            <p className="hidden md:block">Location</p>{" "}
            <MapPin className="mt-1 md:mt-0 w-4 md:w-5" />
          </div>
        </div>
        <div className="justify-between items-center gap-7 text-lg flex">
          <ul className="flex gap-7 ">
            <Link to={"/"}>
              <li className="cursor-pointer hover:text-black/70 transition-all duration-200 hidden md:block">
                Home
              </li>
            </Link>
            <li className="cursor-pointer hover:text-black/70 transition-all duration-200 hidden md:block">
              Search
            </li>
            <li className="cursor-pointer hover:text-black/70 transition-all duration-200 hidden md:block">
              Grocery
            </li>
            <li className="cursor-pointer hover:text-black/70 transition-all duration-200 hidden md:block">
              Contact
            </li>
            <li className="cursor-pointer hover:text-white/70 transition-all duration-200 hidden md:block">
              Items
            </li>
          </ul>
          {userState == null && (
            <button
              className="p-2 border rounded-lg cursor-pointer"
              onClick={() => handleAuthSidebar("signin")}
            >
              Login
            </button>
          )}
          {userState && (
            <div className="relative flex justify-center items-center gap-2">
              <div className="group inline-block ">
                <div
                  onClick={() => setShowDropDown((prev) => !prev)}
                  className="p-1 border border-gray-400/70 rounded-full cursor-pointer hover:bg-gray-100 transition"
                >
                  <User className="w-3 h-3 md:w-5 md:h-5 text-gray-200" />
                </div>
                <div
                  className={`
                    absolute right-0 mt-1 w-36
                    rounded-xl bg-white shadow-lg border border-gray-200
                    opacity-0 pointer-events-none
                    group-hover:opacity-100 group-hover:pointer-events-auto
                    transition-opacity duration-200
                    z-50 ${showDropDown ? "opacity-100" : "opacity-0"}
                  `}
                >
                  <p className="px-4 py-2  text-sm text-gray-700 hover:bg-gray-100 cursor-pointer rounded-t-xl">
                    Location
                  </p>
                  <p className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer rounded-t-xl">
                    Profile
                  </p>
                  <p
                    onClick={handleLogout}
                    className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer rounded-b-xl"
                  >
                    Logout
                  </p>
                </div>
              </div>

              <div
                onClick={() => setShowBurger((prev) => !prev)}
                className="text-sm md:hidden"
              >
                <Menu className="w-5 h-5 md:w-5 md:h-5 text-gray-200/60" />
              </div>
            </div>
          )}
        </div>
      </div>
      <div
        className={`
          absolute w-full
          transform transition-transform duration-300 ease-initial
          ${showBurger ? "translate-x-0" : "translate-x-full"}
          flex text-black/80 flex-col justify-between items-center
          py-3 text-sm -ml-4 mt-2 bg-gray-100/95
        `}
      >
        <ul className="text-center flex flex-col gap-3">
          <Link to="/">
            <li className="px-4 py-2 hover:bg-gray-200 rounded-lg cursor-pointer">
              Home
            </li>
          </Link>
          <li className="px-4 py-2 hover:bg-gray-200 rounded-lg cursor-pointer">
            Search
          </li>
          <li className="px-4 py-2 hover:bg-gray-200 rounded-lg cursor-pointer">
            Grocery
          </li>
          <li className="px-4 py-2 hover:bg-gray-200 rounded-lg cursor-pointer">
            Contact
          </li>
          <li className="px-4 py-2 hover:bg-gray-200 rounded-lg cursor-pointer">
            Items
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
