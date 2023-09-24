import { Link, Route, Routes } from "react-router-dom";

import Home from "./components/Home";
import SignUp from "./components/SignUp";
import Login from "./components/Login";

import "./App.css";

const App = () => {
  return (
    <>
      <nav>
        <Link to="/">
          <button>Şekerbank Demo</button>
        </Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default App;
