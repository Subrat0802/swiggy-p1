import { Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import Header from "./components/common/Header";
import { me } from "./services/operations.ts/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearUser, setUser } from "./redux/slices/userState";
import type { RootState } from "./main";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.userState.user);
  const getUser = async () => {
    if(user == null){
      return;
    }
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
