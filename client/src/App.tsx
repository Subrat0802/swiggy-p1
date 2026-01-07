import { Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import Header from "./components/common/Header";
import { me } from "./services/operations.ts/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearUser, setUser } from "./redux/slices/userState";
import { setLocation } from "./redux/slices/location";


function App() {
  const dispatch = useDispatch();
  const getUser = async () => {
  try {
      const res = await me();
      const userData = res?.data;
      dispatch(setUser(userData));
      
      // If user is logged in and has location in profile, sync it
      if(userData?.currentLocation?.lat && userData?.currentLocation?.lon) {
        const { location, lat, lon } = userData.currentLocation;
        localStorage.setItem("location", location || "Current Location");
        localStorage.setItem("lat", lat);
        localStorage.setItem("lon", lon);
        dispatch(setLocation({
          location: location || "Current Location",
          lat: lat,
          lon: lon
        }));
      }
    } catch {
      dispatch(clearUser()); 
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="">
      <Header />
      <Routes>
        <Route path="" element={<LandingPage />} />
      </Routes>
    </div>
  );
}

export default App;
