import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <h1>Home Page</h1>

      <form>
        <div>
        <button onClick={() => navigate("/Login")}>Giriş Yap</button>
        </div>
        <div>
          <button onClick={() => navigate("/SignUp1")}>Müşteri Ol</button>
        </div>
      </form>
    </>
  );
};

export default Home;
