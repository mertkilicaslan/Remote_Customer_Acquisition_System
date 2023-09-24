import React from "react";
import "./TermsConditions.css";
import "../App.css";

const TermsConditions = (props) => {
  const { showPopUp, setShowPopUp, setTermsConfirm } = props;

  const closePopUp = (confirm) => {
    setShowPopUp(false);
    setTermsConfirm(confirm);
  };

  return (
    showPopUp && (
      <>
        <div className="termsConditions">
          <div className="termsConditions-inner">
            <button className="close-button" onClick={() => closePopUp(false)}>
              &#10006;
            </button>

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

            <button onClick={() => closePopUp(true)}>Okudum, onayladım.</button>
          </div>
        </div>
      </>
    )
  );
};

export default TermsConditions;
