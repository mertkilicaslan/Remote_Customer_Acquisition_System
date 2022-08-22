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
    name: "",
    surname: "",
    birthday: "",
    tcNo: "",
    phoneNo: "",
  };

  const [formValues, setFormValues] = useState(initalValues);
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validate = (values) => {
    const errors = {};
    const regexEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/;
    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/;
    const regexTcNo = /^[1-9]{1}[0-9]{9}[02468]{1}$/;
    const regexPhoneNo =
      /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im;

    if (showMailPass) {
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
    } else if (showNameSurnameDate) {
      if (!values.name) {
        errors.name = "Lütfen isminizi giriniz.";
      }
      if (!values.surname) {
        errors.surname = "Lütfen soyisminizi giriniz.";
      }
      if (!values.birthday) {
        errors.birthday = "Lütfen doğum tarihinizi giriniz.";
      } else if (
        parseInt(values.birthday.substring(0, values.birthday.indexOf("-"))) >=
          2012 ||
        parseInt(values.birthday.substring(0, values.birthday.indexOf("-"))) <=
          1922
      ) {
        errors.birthday = "Doğum tarihinizi kontrol edin.";
      }
    } else if (showPhoneTC) {
      if (!values.tcNo) {
        errors.tcNo = "Lütfen TC Kimlik Numaranızı giriniz.";
      } else if (!regexTcNo.test(values.tcNo)) {
        errors.tcNo = "TC Kimlik Numaranızı kontrol edin.";
      }
      if (!values.phoneNo) {
        errors.phoneNo = "Lütfen cep telefon numaranızı giriniz.";
      } else if (!regexPhoneNo.test(values.phoneNo)) {
        errors.phoneNo = "Cep telefon numaranızı kontrol edin.";
      }
    }

    return errors;
  };

  useEffect(() => {
    console.log("error", formErrors);
    console.log("value", formValues);
    if (Object.keys(formErrors).length === 0) {
      console.log("value", formValues);
    }
  }, [formErrors, formValues, doesConfirm]);

  return (
    <>
      <header>
        <button>Şekerbank Demo</button>
      </header>

      <div>
        {showMailPass && (
          <form className="center">
            <p className="greetings">
              Şekerbank İnternet Bankacılığına Hoş Geldiniz!
            </p>
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
            <p className="errorValue">{formErrors.email}</p>

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
            <p className="errorValue">{formErrors.password}</p>

            <button
              onClick={(e) => {
                e.preventDefault();
                const errors = validate(formValues);

                if (Object.keys(errors).length) {
                  setFormErrors(errors);
                } else {
                  setFormErrors({});
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
                autoFocus
                className="input-center"
                type="text"
                id="name"
                name="name"
                value={formValues.name}
                onChange={handleChange}
              ></input>
            </div>
            <p className="errorValue">{formErrors.name}</p>

            <div>
              <label htmlFor="surname">Soyad</label>
              <input
                className="input-center"
                type="text"
                id="surname"
                name="surname"
                value={formValues.surname}
                onChange={handleChange}
              ></input>
            </div>
            <p className="errorValue">{formErrors.surname}</p>

            <div>
              <label htmlFor="birthday">Doğum Tarihi</label>
              <input
                className="input-center"
                type="date"
                id="birthday"
                name="birthday"
                value={formValues.birthday}
                onChange={handleChange}
              ></input>
            </div>
            <p className="errorValue">{formErrors.birthday}</p>

            <button
              onClick={(e) => {
                e.preventDefault();
                const errors = validate(formValues);

                if (Object.keys(errors).length) {
                  setFormErrors(errors);
                } else {
                  setFormErrors({});
                  setShow2(false);
                  setShow3(true);
                }
              }}
            >
              Devam
            </button>
          </form>
        )}

        {showPhoneTC && (
          <form className="center">
            <div>
              <label htmlFor="tcNo">TC Kimlik Numarası</label>
              <input
                autoFocus
                className="input-center"
                type="text"
                id="tcNo"
                name="tcNo"
                value={formValues.tcNo}
                onChange={handleChange}
              ></input>
            </div>
            <p className="errorValue">{formErrors.tcNo}</p>

            <div>
              <label htmlFor="phoneNo">Cep Telefon Numarası</label>
              <input
                className="input-center"
                type="text"
                id="phoneNo"
                name="phoneNo"
                value={formValues.phoneNo}
                onChange={handleChange}
              ></input>
            </div>
            <p className="errorValue">{formErrors.phoneNo}</p>

            <div className="checkBoxes">
              <input
                type="checkbox"
                id="uzaktanMusteri"
                name="checkbox1"
                value="uzaktanMusteri"
                onClick={(e) => {
                  if (e.target.checked) {
                    setShow4(true);
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
                <h2> Ayıdnlatma Metni</h2>
                <p>
                  &emsp; Ayıdnlatma Metni Ayıdnlatma Metni Ayıdnlatma Metni
                  Ayıdnlatma Metni Ayıdnlatma Metni Ayıdnlatma Metni Ayıdnlatma
                  Metni Ayıdnlatma Metni Ayıdnlatma Metni Ayıdnlatma Metni
                  Ayıdnlatma Metni Ayıdnlatma Metni Ayıdnlatma Metni Ayıdnlatma
                  Metni Ayıdnlatma Metni Ayıdnlatma Metni Ayıdnlatma Metni
                  Ayıdnlatma Metni Ayıdnlatma Metni Ayıdnlatma Metni Ayıdnlatma
                  Metni Ayıdnlatma Metni Ayıdnlatma Metni Ayıdnlatma Metni
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
              onClick={(e) => {
                e.preventDefault();
                const errors = validate(formValues);

                if (Object.keys(errors).length) {
                  setFormErrors(errors);
                } else {
                  setFormErrors({});
                  setShow3(false);
                }
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
