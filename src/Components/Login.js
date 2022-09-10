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
  const [showCustomerPage, setShowCustomerPage] = useState(false);
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
            <p className="greetings">İnternet bankacılığına giriş yap</p>
            <div>
              <label htmlFor="email">E-Mail</label>
              <input
                autoFocus
                className="input-center"
                type="text"
                id="email"
                name="email"
                value={formValues.email}
                onChange={handleChange}
              ></input>
            </div>

            <div>
              <label htmlFor="password">Şifre</label>
              <input
                className="input-center"
                type="password"
                id="password"
                name="password"
                value={formValues.password}
                onChange={handleChange}
              ></input>
            </div>

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
                    setShowCustomerPage(true);
                  })
                  .catch((err) => console.log(err));
              }}
            >
              Giriş yap
            </button>
          </form>
        )}

        {showCustomerPage && (
          <>
            <img src={icon} alt="profile-icon" className="profile-icon"></img>
            <button className="nameSurname-btn">
              {incomingData.name + "  " + incomingData.surname}
            </button>
            <div className="center">
              <p className="greetings">
                Hoş Geldiniz
                {"  " + incomingData.name + "  " + incomingData.surname}
              </p>
            </div>
          </>
        )}
      </main>
    </>
  );
}
