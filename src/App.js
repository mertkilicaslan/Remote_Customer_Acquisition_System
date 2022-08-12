import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Component/Home";
import Login from "./Component/Login";
import SignUp1 from "./Component/SignUp1";
import SignUp2 from "./Component/SignUp2";
import SignUp3 from "./Component/SignUp3";
import Error from "./Component/Error";

const App = () => {
  return (
    <>
      <h1>MAIN APP</h1>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/SignUp1" element={<SignUp1 />} />
        <Route path="/SignUp2" element={<SignUp2 />} />
        <Route path="/SignUp3" element={<SignUp3 />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
};

export default App;
