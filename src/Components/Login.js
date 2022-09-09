import "../App.css";
import React, { useState, useEffect } from "react";

const initalValues = {
  email: "",
  password: "",
};

export function Login() {
  const [formValues, setFormValues] = useState(initalValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  useEffect(() => {
    //console.log("error", formErrors);
    console.log("value", formValues);
  }, [formValues]);

  return (
    <>
      <form className="center">
        <p className="greetings">İnternet bankacılığına giriş Yap</p>
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
        <button>Giriş Yap</button>
      </form>
    </>
  );
}
