import { Link, Route, Routes } from "react-router-dom";
import "../App.css";
import Login from "./Login";
import Signup from "./Signup";

const Home = () => {
  return (
    <>
      <div className="center">
        <p className="greetings">İnternet Bankacılığına Hoş Geldiniz!</p>
        <Link to="/login">
          <button>Giriş Yap</button>
        </Link>

        <Link to="/signup">
          <button>Müşteri Ol</button>
        </Link>
      </div>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
};

export default Home;
