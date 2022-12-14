import "../App.css";
import icon from "../Assets/icon.png";
import React, { useState, useEffect } from "react";

const initalValues = {
  email: "",
  password: "",
};

let incomingData = {};

export function Login() {
  const [showLoginPage, setShowLoginPage] = useState(true);
  const [showAssetsPage, setShowAssetsPage] = useState(false);
  const [showMiniProfile, setShowMiniProfile] = useState(false);
  const [loginFail, setLoginFail] = useState(false);
  const [formValues, setFormValues] = useState(initalValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  useEffect(() => {
    //console.log("error", formErrors);
    //console.log("value", formValues);
  }, [formValues]);

  return (
    <>
      <main>
        {showLoginPage && (
          <form className="center">
            <p className="greetings">Giriş Yap</p>
            <div>
              <label htmlFor="email">E-Mail</label>
              <input
                autoFocus
                className="inputCenter"
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
                className="inputCenter"
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

            <p className="loginError">
              {loginFail
                ? "Lütfen şifrenizi veya emailinizi kontrol edin!"
                : ""}
            </p>

            <button
              onClick={(e) => {
                e.preventDefault();

                fetch("http://localhost:8080/customer/login", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(formValues),
                })
                  .then((res) => {
                    if (res.ok && res.status === 200) {
                      return res.json();
                    }
                  })
                  .then((data) => {
                    console.log(data);
                    incomingData = data;
                    setShowLoginPage(false);
                    setLoginFail(false);
                    setShowAssetsPage(true);
                  })
                  .catch((err) => {
                    //console.log(err);
                    setLoginFail(true);
                  });
              }}
            >
              Giriş yap
            </button>
          </form>
        )}

        {showAssetsPage && (
          <>
            <img src={icon} alt="profile icon" className="profileIcon"></img>
            <button
              className="nameSurnameButton"
              onClick={() => setShowMiniProfile(!showMiniProfile)}
            >
              {incomingData.name + "  " + incomingData.surname}
            </button>

            {showMiniProfile && (
              <section className="miniProfile">
                <h3>Profil Bilgilerim</h3>
                <ul>
                  <li>
                    <strong>Telefon No: </strong>
                    {incomingData.phoneNo}
                  </li>
                  <li>
                    <strong>T.C. Kimlik No: </strong>
                    {incomingData.tcNo}
                  </li>
                  <li>
                    <strong>Doğum Tarihi: </strong>
                    {incomingData.birthday}
                  </li>
                  <li>
                    <strong>Hasat Kart</strong>
                    {incomingData.hasatKart === "false"
                      ? "'a sahip değilsiniz."
                      : "'a sahipsiniz."}
                  </li>
                </ul>
              </section>
            )}

            <div className="center">
              <p className="greetings">
                Hoş Geldiniz
                {"  " + incomingData.name + "  " + incomingData.surname}
              </p>
              <hr></hr>

              <h2>Varlıklarım</h2>
              <div className="assets">
                <p>Banka Kartı</p>
                <p className="balance">265,00 TL</p>
              </div>
              <div className="assets">
                <p>Kredi Kartı</p>
                <p className="balance">394,00 TL</p>
              </div>
            </div>
          </>
        )}
      </main>
    </>
  );
}
