import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { signupCustomer } from "../api/CustomerApi";

import { PatternFormat } from "react-number-format";
import ClipLoader from "react-spinners/ClipLoader";

import {
  validateEmailPass,
  validateNameSurnameDate,
  validatePhoneTC,
} from "../utils/Validator";

import TermsConditions from "./TermsConditions";
import "../App.css";

const initalValues = {
  email: "",
  password: "",
  name: "",
  surname: "",
  birthday: "",
  tcNo: "",
  phoneNo: "",
  hasatKartPreference: false,
};
const Signup = () => {
  const [showEmailPass, setShowEmailPass] = useState(true);
  const [showNameSurnameDate, setShowNameSurnameDate] = useState(false);
  const [showPhoneTC, setShowPhoneTC] = useState(false);
  const [showEndingModal, setShowEndingModal] = useState(false);

  const [showPopup, setShowPopup] = useState(false);
  const [termsConfirm, setTermsConfirm] = useState(false);

  const [signupSuccessful, setSignupSuccessful] = useState(false);
  const [hasatKart, setHasatKart] = useState(false);

  const [formValues, setFormValues] = useState(initalValues);
  const [formErrors, setFormErrors] = useState({});

  const [loading, setLoading] = useState(false);
  const [phoneObj, setPhoneObj] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  useEffect(() => {
    formValues.phoneNo = phoneObj.formattedValue;
  }, [formErrors, formValues, phoneObj]);

  return (
    <>
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
              style={{
                border: formErrors.email
                  ? "1px solid #ff4444"
                  : "1px solid #80bc04",
              }}
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
              style={{
                border: formErrors.password
                  ? "1px solid #ff4444"
                  : "1px solid #80bc04",
              }}
            ></input>
          </div>
          <p className="signUpError">{formErrors.password}</p>

          <button
            onClick={(e) => {
              e.preventDefault();
              const errors = validateEmailPass(formValues);

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
              style={{
                border: formErrors.name
                  ? "1px solid #ff4444"
                  : "1px solid #80bc04",
              }}
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
              style={{
                border: formErrors.surname
                  ? "1px solid #ff4444"
                  : "1px solid #80bc04",
              }}
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
              style={{
                border: formErrors.birthday
                  ? "1px solid #ff4444"
                  : "1px solid #80bc04",
              }}
            ></input>
          </div>
          <p className="signUpError">{formErrors.birthday}</p>

          <button
            onClick={(e) => {
              e.preventDefault();
              const errors = validateNameSurnameDate(formValues);

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
              disabled={loading}
              onChange={handleChange}
              style={{
                border: formErrors.tcNo
                  ? "1px solid #ff4444"
                  : "1px solid #80bc04",
              }}
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
              disabled={loading}
              onValueChange={(values) => {
                setPhoneObj(values);
              }}
              style={{
                border: formErrors.phoneNo
                  ? "1px solid #ff4444"
                  : "1px solid #80bc04",
              }}
            />
          </div>
          <p className="signUpError">{formErrors.phoneNo}</p>

          <div className="checkBoxes">
            <input
              type="checkbox"
              id="hasatKart"
              name="checkbox2"
              disabled={loading}
              onChange={(e) => {
                e.target.checked ? setHasatKart(true) : setHasatKart(false);
                formValues.hasatKartPreference = !hasatKart;
              }}
            ></input>
            <label htmlFor="hasatKart">Hasat Kart İstiyorum</label>
          </div>

          <div className="checkBoxes">
            <input
              type="checkbox"
              id="uzaktanMusteri"
              name="checkbox1"
              value="uzaktanMusteri"
              disabled={loading}
              checked={termsConfirm}
              onChange={(e) => {
                setTermsConfirm(false);
                if (e.target.checked) {
                  setShowPopup(true);
                }
              }}
            ></input>
            <label htmlFor="uzaktanMusteri">
              Uzaktan Müşteri Edinimi Aydınlatma Metni
            </label>

            <TermsConditions
              showPopup={showPopup}
              setShowPopup={setShowPopup}
              setTermsConfirm={setTermsConfirm}
            />
          </div>
          <p className="signUpError">{formErrors.popUp}</p>

          {loading && (
            <ClipLoader
              color="#80bc04"
              loading={loading}
              size={50}
              speedMultiplier={0.75}
            />
          )}

          <button
            disabled={loading}
            onClick={(e) => {
              e.preventDefault();
              const errors = validatePhoneTC(formValues, termsConfirm);

              if (Object.keys(errors).length || !termsConfirm) {
                setFormErrors(errors);
              } else {
                setFormErrors({});
                setLoading(true);

                signupCustomer(formValues)
                  .then((data) => {
                    if (data.isSuccess) {
                      setSignupSuccessful(true);
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                  })
                  .finally(() => {
                    setLoading(false);
                    setShowPhoneTC(false);
                    setShowEndingModal(true);
                  });
              }
            }}
          >
            Müşteri Ol
          </button>
        </form>
      )}

      {showEndingModal && (
        <div className="center">
          <h1>
            {signupSuccessful ? "İşleminiz Başarılı " : "İşleminiz Başarısız"}
          </h1>
          <p>
            {signupSuccessful
              ? "Müşterimiz olduğunuz için teşekkür ederiz. "
              : "Anasayfaya dönün ve tekrar deneyin."}
          </p>
          <Link to="/">
            <button
              onClick={() => {
                setShowEndingModal(false);
              }}
            >
              Anasayfa
            </button>
          </Link>
        </div>
      )}
    </>
  );
};

export default Signup;
