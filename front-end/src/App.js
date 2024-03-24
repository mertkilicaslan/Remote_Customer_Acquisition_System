import { Link, Route, Routes } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";

import "./App.css";

const App = () => {
  const { t, i18n } = useTranslation();

  const toggleLanguage = async () => {
    await i18n.changeLanguage(i18n.language === "TR" ? "EN" : "TR");
  };

  return (
    <>
      <nav>
        <Link to="/">
          <button>Şekerbank Demo</button>
        </Link>
        <button onClick={toggleLanguage}>
          {i18n.language === "TR" ? "English" : "Türkçe"}
        </button>
      </nav>
      <Routes>
        <Route path="/" element={<Home t={t} />} />
        <Route path="/signup" element={<Signup t={t} />} />
        <Route path="/login" element={<Login t={t} />} />
      </Routes>
    </>
  );
};

export default App;
