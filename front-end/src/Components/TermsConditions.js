import React from "react";
import "./TermsConditions.css";
import "../App.css";

import { termsConditionsText } from "../utils/Constants";

const TermsConditions = (props) => {
  const { showPopup, setShowPopup, setTermsConfirm } = props;

  const closePopUp = (confirm) => {
    setShowPopup(false);
    setTermsConfirm(confirm);
  };

  return (
    showPopup && (
      <>
        <div className="termsConditions">
          <div className="termsConditions-inner">
            <button className="close-button" onClick={() => closePopUp(false)}>
              &#10006;
            </button>
            <h2> Ayıdnlatma Metni</h2>
            <p>{termsConditionsText}</p>
            <button onClick={() => closePopUp(true)}>Okudum, onayladım.</button>
          </div>
        </div>
      </>
    )
  );
};

export default TermsConditions;
