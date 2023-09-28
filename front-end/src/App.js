import { Link, Route, Routes } from "react-router-dom";

import Home from "./components/Home";
import Signup from "./components/Signup";
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
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default App;
