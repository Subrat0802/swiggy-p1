import { Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import Header from "./components/common/Header";

function App() {
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
