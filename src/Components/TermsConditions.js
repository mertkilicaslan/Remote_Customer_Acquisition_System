import React from "react";
import "./TermsConditions.css";

function TermsConditions(props) {
  return props.trigger ? (
    <div className="termsConditions">
      <div className="termsConditions-inner">
        <button
          className="close-button"
          onClick={() => {
            props.setTrigger(false);
            props.confirmation(false);
          }}
        >
          Kapat
        </button>

        {props.children}

        <button
          onClick={() => {
            props.setTrigger(false);
            props.confirmation(true);
          }}
        >
          Okudum / Onayladım
        </button>
      </div>
    </div>
  ) : (
    ""
  );
}

export default TermsConditions;
