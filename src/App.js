import { Link, Route, Routes } from "react-router-dom";
import { Home } from "./Components/Home";
import { SignUp } from "./Components/SignUp";
import { Login } from "./Components/Login";
import "./App.css";

function App() {
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
}

export default App;
