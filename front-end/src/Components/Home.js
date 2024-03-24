import { Link } from "react-router-dom";
import "../App.css";

const Home = (props) => {
  const { t } = props;
  return (
    <>
      <div className="center">
        <p className="greetings-message">{t("greetingsMessage")}</p>
        <Link to="/login">
          <button>{t("loginBtnName")}</button>
        </Link>

        <Link to="/signup">
          <button>{t("signupBtnName")}</button>
        </Link>
      </div>
    </>
  );
};

export default Home;
