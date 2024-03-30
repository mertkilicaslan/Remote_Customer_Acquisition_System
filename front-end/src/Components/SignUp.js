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
  harvestCardPreference: false,
};
const Signup = (props) => {
  const { t } = props;

  const [showEmailPass, setShowEmailPass] = useState(true);
  const [showNameSurnameDate, setShowNameSurnameDate] = useState(false);
  const [showPhoneTC, setShowPhoneTC] = useState(false);
  const [showEndingModal, setShowEndingModal] = useState(false);

  const [showPopup, setShowPopup] = useState(false);
  const [termsConfirm, setTermsConfirm] = useState(false);

  const [signupSuccessful, setSignupSuccessful] = useState(false);
  const [harvestCard, setHarvestCard] = useState(false);

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
          <p className="greetings-message">{t("signupFormTitle")}</p>
          <div>
            <label htmlFor="email">{t("email")}</label>
            <input
              autoFocus
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
          <p className="signup-error">{formErrors.email}</p>

          <div>
            <label htmlFor="password">{t("password")}</label>
            <input
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
          <p className="signup-error">{formErrors.password}</p>

          <button
            onClick={(e) => {
              e.preventDefault();
              const errors = validateEmailPass(t, formValues);

              if (Object.keys(errors).length) {
                setFormErrors(errors);
              } else {
                setFormErrors({});
                setShowEmailPass(false);
                setShowNameSurnameDate(true);
              }
            }}
          >
            {t("continueBtnName")}
          </button>
        </form>
      )}

      {showNameSurnameDate && (
        <form className="center">
          <div>
            <label htmlFor="name">{t("name")}</label>
            <input
              autoFocus
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
          <p className="signup-error">{formErrors.name}</p>

          <div>
            <label htmlFor="surname">{t("surname")}</label>
            <input
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
          <p className="signup-error">{formErrors.surname}</p>

          <div>
            <label htmlFor="birthday">{t("birthday")}</label>
            <input
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
          <p className="signup-error">{formErrors.birthday}</p>

          <button
            onClick={(e) => {
              e.preventDefault();
              const errors = validateNameSurnameDate(t, formValues);

              if (Object.keys(errors).length) {
                setFormErrors(errors);
              } else {
                setFormErrors({});
                setShowNameSurnameDate(false);
                setShowPhoneTC(true);
              }
            }}
          >
            {t("continueBtnName")}
          </button>
        </form>
      )}

      {showPhoneTC && (
        <form className="center">
          <div>
            <label htmlFor="tcNo">{t("tckno")}</label>
            <input
              autoFocus
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
          <p className="signup-error">{formErrors.tcNo}</p>

          <div>
            <label htmlFor="phoneNo">{t("phoneNo")}</label>
            <PatternFormat
              format="+90 (###) ### ####"
              allowEmptyFormatting
              mask="_"
              id="phoneNo"
              name="phoneNo"
              disabled={loading}
              onValueChange={(values) => setPhoneObj(values)}
              style={{
                border: formErrors.phoneNo
                  ? "1px solid #ff4444"
                  : "1px solid #80bc04",
              }}
            />
          </div>
          <p className="signup-error">{formErrors.phoneNo}</p>

          <div className="checkbox-container">
            <input
              type="checkbox"
              id="harvestCard"
              name="harvestCard"
              disabled={loading}
              onChange={(e) => {
                setHarvestCard(e.target.checked);
                formValues.harvestCardPreference = !harvestCard;
              }}
            ></input>
            <label htmlFor="harvestCard">{t("harvestCardPreference")}</label>
          </div>

          <div className="checkbox-container">
            <input
              type="checkbox"
              id="termsConditions"
              name="termsConditions"
              value="termsConditions"
              disabled={loading}
              checked={termsConfirm}
              onChange={(e) => {
                setTermsConfirm(false);
                if (e.target.checked) {
                  setShowPopup(true);
                }
              }}
            ></input>
            <label htmlFor="termsConditions">{t("termsConditions")}</label>

            <TermsConditions
              t={t}
              showPopup={showPopup}
              setShowPopup={setShowPopup}
              setTermsConfirm={setTermsConfirm}
            />
          </div>
          <p className="signup-error">{formErrors.popUp}</p>

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
              const errors = validatePhoneTC(t, formValues, termsConfirm);

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
            {t("signupBtnName")}
          </button>
        </form>
      )}

      {showEndingModal && (
        <div className="center">
          <h1>
            {t(signupSuccessful ? "signupSuccessMessage" : "signupFailMessage")}
          </h1>
          <p>
            {t(
              signupSuccessful
                ? "signupThankYouMessage"
                : "returnHomePageTryAgainMessage"
            )}
          </p>
          <Link to="/">
            <button onClick={() => setShowEndingModal(false)}>
              {t("homePageBtnName")}
            </button>
          </Link>
        </div>
      )}
    </>
  );
};

export default Signup;
