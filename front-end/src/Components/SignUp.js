import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "../App.css";
import TermsConditions from "./TermsConditions";
import { PatternFormat } from "react-number-format";

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
  const [showEmailPass, setShowEmailPass] = useState(true);
  const [showNameSurnameDate, setShowNameSurnameDate] = useState(false);
  const [showPhoneTC, setShowPhoneTC] = useState(false);
  const [showEndingPage, setShowEndingPage] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);
  const [popUpConfirm, setPopUpConfirm] = useState(false);
  const [signUpSuccessful, setSignUpSuccessful] = useState(false);
  const [hasatKart, setHasatKart] = useState(false);

  const [formValues, setFormValues] = useState(initalValues);
  const [formErrors, setFormErrors] = useState({});

  const [phoneObj, setPhoneObj] = useState({});

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
      /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

    if (showEmailPass) {
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
      if (values.phoneNo[5] == "_") {
        errors.phoneNo = "Lütfen cep telefon numaranızı giriniz.";
      } else if (!regexPhoneNo.test(values.phoneNo)) {
        errors.phoneNo = "Cep telefon numaranızı kontrol edin.";
      }
    }

    return errors;
  };

  useEffect(() => {
    formValues.phoneNo = phoneObj.formattedValue;
    //console.log("error", formErrors);
    //console.log("value", formValues);
  }, [formErrors, formValues, phoneObj]);

  return (
    <>
      <main>
        {showEmailPass && (
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
                  setShowEmailPass(false);
                  setShowNameSurnameDate(true);
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
                  setShowNameSurnameDate(false);
                  setShowPhoneTC(true);
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
              <PatternFormat
                format="+90 (###) ### ####"
                allowEmptyFormatting
                mask="_"
                className="inputCenter"
                id="phoneNo"
                name="phoneNo"
                onValueChange={(values, sourceInfo) => {
                  setPhoneObj(values);
                }}
              />
            </div>
            <p className="signUpError">{formErrors.phoneNo}</p>

            <div className="checkBoxes">
              <input
                type="checkbox"
                id="uzaktanMusteri"
                name="checkbox1"
                value="uzaktanMusteri"
                required
                checked={popUpConfirm}
                onChange={(e) => {
                  setPopUpConfirm(false);
                  if (e.target.checked) {
                    setShowPopUp(true);
                  }
                }}
              ></input>
              <label htmlFor="uzaktanMusteri">
                Uzaktan Müşteri Edinimi Aydınlatma Metni
              </label>
              <TermsConditions
                trigger={showPopUp}
                setTrigger={setShowPopUp}
                trigger2={popUpConfirm}
                setTrigger2={setPopUpConfirm}
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

                if (Object.keys(errors).length || !popUpConfirm) {
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
                      setShowPhoneTC(false);
                      setShowEndingPage(true);
                    });
                }
              }}
            >
              Müşteri Ol
            </button>
          </form>
        )}

        {showEndingPage && (
          <div className="center">
            <h1>
              {signUpSuccessful ? "İşleminiz Başarılı " : "İşleminiz Başarısız"}
            </h1>
            <p>
              {signUpSuccessful
                ? "Müşterimiz olduğunuz için teşekkür ederiz. "
                : "Anasayfaya dönün ve tekrar deneyin."}
            </p>
            <Link to="/">
              <button
                onClick={(e) => {
                  setShowEndingPage(false);
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
