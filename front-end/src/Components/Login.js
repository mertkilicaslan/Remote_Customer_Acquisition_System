import { useState } from "react";
import Assets from "./Assets";
import MiniProfile from "./MiniProfile";
import { loginCustomer } from "../api/CustomerApi";

import "../App.css";
import icon from "../assets/icon.png";

const Login = () => {
  const [showLoginPage, setShowLoginPage] = useState(true);
  const [showAssetsPage, setShowAssetsPage] = useState(false);
  const [showMiniProfile, setShowMiniProfile] = useState(false);
  const [loginFail, setLoginFail] = useState(false);
  const [userInformation, setUserInformation] = useState({});
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <>
      {showLoginPage && (
        <form className="center">
          <p className="greetings-message">Giriş Yap</p>
          <div>
            <label htmlFor="email">E-Mail</label>
            <input
              autoFocus
              type="text"
              id="email"
              name="email"
              value={formValues.email}
              onChange={handleChange}
              style={{
                border: loginFail ? "1px solid #ff4444" : "1px solid #80bc04",
              }}
            ></input>
          </div>

          <div>
            <label htmlFor="password">Şifre</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formValues.password}
              onChange={handleChange}
              style={{
                border: loginFail ? "1px solid #ff4444" : "1px solid #80bc04",
              }}
            ></input>
          </div>

          <p className="login-error">
            {loginFail ? "Lütfen şifrenizi veya emailinizi kontrol edin!" : ""}
          </p>

          <button
            onClick={(e) => {
              e.preventDefault();
              if (formValues.email && formValues.password) {
                setLoginFail(false);
                loginCustomer(formValues)
                  .then((data) => {
                    if (data.isSuccess) {
                      setUserInformation(data);
                      setShowLoginPage(false);
                      setShowAssetsPage(true);
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                    setLoginFail(true);
                  });
              } else {
                setLoginFail(true);
              }
            }}
          >
            Giriş yap
          </button>
        </form>
      )}

      {showAssetsPage && (
        <>
          <button
            className="profile-button"
            onClick={() => setShowMiniProfile(!showMiniProfile)}
          >
            <img src={icon} alt="profile icon" className="profile-icon "></img>
            {userInformation.name + "  " + userInformation.surname}
          </button>

          {showMiniProfile && <MiniProfile userInformation={userInformation} />}
          {showAssetsPage && (
            <Assets
              name={userInformation.name}
              surname={userInformation.surname}
            />
          )}
        </>
      )}
    </>
  );
};

export default Login;
