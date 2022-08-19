import React, { useState, useEffect } from "react";
import "./App.css";
import TermsConditions from "./Components/TermsConditions";

function App() {
  const [showMailPass, setShow] = useState(true);
  const [showNameSurnameDate, setShow2] = useState(false);
  const [showPhoneTC, setShow3] = useState(false);

  const [popUpTermsConditions, setShow4] = useState(false);
  const [doesConfirm, setConfirm] = useState(false);

  // Validation
  const initalValues = {
    email: "",
    password: "",
  };

  const [formValues, setFormValues] = useState(initalValues);
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validate = (values) => {
    const errors = {};
    const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

    if (!values.email) {
      errors.email = "Lütfen e-mail adresinizi giriniz.";
    } else if (!regexEmail.test(values.email)) {
      errors.email = "E-mail geçerli formatda değil.";
    }
    if (!values.password) {
      errors.password = "Lütfen şifrenizi giriniz.";
    } else if (!regexPassword.test(values.password)) {
      errors.password =
        "Şifreniz en az sekiz karakter, bir büyük harf, bir küçük harf ve bir sayı içermelidir.";
    }

    return errors;
  };

  useEffect(() => {
    console.log("error", formErrors);
    if (Object.keys(formErrors).length === 0) {
      console.log("value", formValues);
    }
  }, [formErrors]);

  return (
    <>
      <h1>Sugar Bank</h1>

      <div>
        {showMailPass && (
          <form className="center">
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
            <p>{formErrors.email}</p>

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
            <p>{formErrors.password}</p>

            <button
              onClick={(e) => {
                e.preventDefault();
                const errors = validate(formValues);

                if (Object.keys(errors).length) {
                  setFormErrors(errors);
                } else {
                  setShow(false);
                  setShow2(true);
                }
              }}
            >
              Devam
            </button>
          </form>
        )}

        {showNameSurnameDate && (
          <form className="center">
            <div>
              <label htmlFor="name">Ad</label>
              <input
                className="input-center"
                type="text"
                id="name"
                autoFocus
              ></input>
            </div>

            <div>
              <label htmlFor="surname">Soyad</label>
              <input className="input-center" type="text" id="surname"></input>
            </div>

            <div>
              <label htmlFor="birthday">Doğum Tarihi</label>
              <input className="input-center" type="date" id="birthday"></input>
            </div>

            <button
              onClick={() => {
                setShow2(false);
                setShow3(true);
              }}
            >
              Devam
            </button>
          </form>
        )}

        {showPhoneTC && (
          <form className="center">
            <div>
              <label htmlFor="TC">TC Kimlik Numarası</label>
              <input
                className="input-center"
                type="text"
                id="TC"
                autoFocus
              ></input>
            </div>

            <div>
              <label htmlFor="phoneNum">Cep Telefon Numarası</label>
              <input className="input-center" type="text" id="phoneNum"></input>
            </div>

            <div className="checkBoxes">
              <input
                type="checkbox"
                id="uzaktanMusteri"
                name="checkbox1"
                value="uzaktanMusteri"
                onChange={(e) => {
                  if (e.target.checked) {
                    setShow4(true);

                    if (!doesConfirm) {
                      e.target.checked = true;
                    }
                  }
                }}
              ></input>
              <label htmlFor="uzaktanMusteri">
                Uzaktan Müşteri Edinimi Aydınlatma Metni
              </label>
              <TermsConditions
                trigger={popUpTermsConditions}
                setTrigger={setShow4}
                trigger2={doesConfirm}
                setTrigger2={setConfirm}
              >
                <p>
                  <h2> Ayıdnlatma Metni</h2>
                  &emsp; Ayıdnlatma Metni Ayıdnlatma Metni Ayıdnlatma Metni
                  Ayıdnlatma Metni Ayıdnlatma Metni Ayıdnlatma Metni Ayıdnlatma
                  Metni Ayıdnlatma Metni Ayıdnlatma Metni Ayıdnlatma Metni
                  Ayıdnlatma Metni Ayıdnlatma Metni Ayıdnlatma Metni Ayıdnlatma
                  Metni Ayıdnlatma Metni Ayıdnlatma Metni Ayıdnlatma Metni
                  Ayıdnlatma Metni Ayıdnlatma Metni Ayıdnlatma Metni
                </p>
              </TermsConditions>
            </div>

            <div className="checkBoxes">
              <input
                type="checkbox"
                id="hasatKart"
                name="checkbox2"
                value="hasatKart"
              ></input>
              <label htmlFor="hasatKart">Hasat Kart İstiyorum</label>
            </div>

            <button
              onClick={() => {
                setShow3(false);
              }}
            >
              Müşteri Ol
            </button>
          </form>
        )}
      </div>
    </>
  );
}

export default App;
