import { Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import Header from "./components/common/Header";
import { me } from "./services/operations.ts/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearUser, setUser } from "./redux/slices/userState";

function App() {
  const dispatch = useDispatch();
  
  const getUser = async () => {
  try {
      const res = await me();
      dispatch(setUser(res?.data.data));
    } catch {
      dispatch(clearUser()); // logout state
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
