import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "../App.css";
import TermsConditions from "./TermsConditions";

const initalValues = {
  email: "",
  password: "",
  name: "",
  surname: "",
  birthday: "",
  tcNo: "",
  phoneNo: "",
  hasatKart: "false",
};

export function SignUp() {
  const [showMailPass, setShowPage1] = useState(true);
  const [showNameSurnameDate, setShowPage2] = useState(false);
  const [showPhoneTC, setShowPage3] = useState(false);
  const [showSuccessPage, setShowPage4] = useState(false);
  const [popUpTermsConditions, setShowPopUp] = useState(false);
  const [signUpSuccessful, setSignUpSuccessful] = useState(false);
  const [doesConfirm, setConfirm] = useState(false);
  const [hasatKart, setHasatKart] = useState(false);
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
    //console.log("error", formErrors);
    //console.log("value", formValues);
  }, [formErrors, formValues, doesConfirm, hasatKart, signUpSuccessful]);

  return (
    <>
      <main>
        {showMailPass && (
          <form className="center">
            <p className="greetings">Müşterimiz Ol</p>
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
              ></input>
            </div>
            <p className="signUpError">{formErrors.email}</p>

            <div>
              <label htmlFor="password">Şifre</label>
              <input
                className="inputCenter"
                type="password"
                id="password"
                name="password"
                value={formValues.password}
                onChange={handleChange}
              ></input>
            </div>
            <p className="signUpError">{formErrors.password}</p>

            <button
              onClick={(e) => {
                e.preventDefault();
                const errors = validate(formValues);

                if (Object.keys(errors).length) {
                  setFormErrors(errors);
                } else {
                  setFormErrors({});
                  setShowPage1(false);
                  setShowPage2(true);
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
                className="inputCenter"
                type="text"
                id="name"
                name="name"
                value={formValues.name}
                onChange={handleChange}
              ></input>
            </div>
            <p className="signUpError">{formErrors.name}</p>

            <div>
              <label htmlFor="surname">Soyad</label>
              <input
                className="inputCenter"
                type="text"
                id="surname"
                name="surname"
                value={formValues.surname}
                onChange={handleChange}
              ></input>
            </div>
            <p className="signUpError">{formErrors.surname}</p>

            <div>
              <label htmlFor="birthday">Doğum Tarihi</label>
              <input
                className="inputCenter"
                type="date"
                id="birthday"
                name="birthday"
                value={formValues.birthday}
                onChange={handleChange}
              ></input>
            </div>
            <p className="signUpError">{formErrors.birthday}</p>

            <button
              onClick={(e) => {
                e.preventDefault();
                const errors = validate(formValues);

                if (Object.keys(errors).length) {
                  setFormErrors(errors);
                } else {
                  setFormErrors({});
                  setShowPage2(false);
                  setShowPage3(true);
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
                className="inputCenter"
                type="text"
                id="tcNo"
                name="tcNo"
                value={formValues.tcNo}
                onChange={handleChange}
              ></input>
            </div>
            <p className="signUpError">{formErrors.tcNo}</p>

            <div>
              <label htmlFor="phoneNo">Cep Telefon Numarası</label>
              <input
                className="inputCenter"
                type="text"
                id="phoneNo"
                name="phoneNo"
                value={formValues.phoneNo}
                onChange={handleChange}
              ></input>
            </div>
            <p className="signUpError">{formErrors.phoneNo}</p>

            <div className="checkBoxes">
              <input
                type="checkbox"
                id="uzaktanMusteri"
                name="checkbox1"
                value="uzaktanMusteri"
                required
                checked={doesConfirm}
                onChange={(e) => {
                  setConfirm(false);
                  if (e.target.checked) {
                    setShowPopUp(true);
                  }
                }}
              ></input>
              <label htmlFor="uzaktanMusteri">
                Uzaktan Müşteri Edinimi Aydınlatma Metni
              </label>
              <TermsConditions
                trigger={popUpTermsConditions}
                setTrigger={setShowPopUp}
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
                onChange={(e) => {
                  if (e.target.checked) {
                    setHasatKart(true);
                  } else {
                    setHasatKart(false);
                  }
                  formValues["hasatKart"] = (!hasatKart).toString();
                }}
              ></input>
              <label htmlFor="hasatKart">Hasat Kart İstiyorum</label>
            </div>

            <button
              onClick={(e) => {
                e.preventDefault();
                const errors = validate(formValues);

                if (Object.keys(errors).length || !doesConfirm) {
                  setFormErrors(errors);
                } else {
                  setFormErrors({});

                  fetch("http://localhost:8080/customer/signup", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formValues),
                  })
                    .then((res) => {
                      if (res.ok && res.status === 200) {
                        setSignUpSuccessful(true);
                        return res;
                      }
                    })
                    .then((data) => console.log(data))
                    .catch((err) => console.log(err))
                    .finally(() => {
                      setShowPage3(false);
                      setShowPage4(true);
                    });
                }
              }}
            >
              Müşteri Ol
            </button>
          </form>
        )}

        {showSuccessPage && (
          <div className="center">
            <h1>
              {signUpSuccessful ? "İşleminiz Başarılı " : "İşleminiz Başarısız"}
            </h1>
            <p>
              {signUpSuccessful
                ? "Müşterimiz olduğunuz için teşekkür ederiz. "
                : "Anasayfaya dönün ve lütfen tekrar deneyin."}
            </p>
            <Link to="/">
              <button
                onClick={(e) => {
                  setShowPage4(false);
                }}
              >
                Anasayfa
              </button>
            </Link>
          </div>
        )}
      </main>
    </>
  );
}
