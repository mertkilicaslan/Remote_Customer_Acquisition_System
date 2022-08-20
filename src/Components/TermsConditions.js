import React from "react";
import "./TermsConditions.css";

function TermsConditions(props, {onChange}) {
  return props.trigger ? (
    <div className="termsConditions">
      <div className="termsConditions-inner">
        <button
          className="close-button"
          onClick={() => {
            props.setTrigger(false);
            props.setTrigger2(false);
          }}
        >
          &#10006;
        </button>

        {props.children}

        <button
          onClick={() => {
            props.setTrigger(false);
            props.setTrigger2(true);
          }}
        >
          Okudum, onayladım.
        </button>
      </div>
    </div>
  ) : (
    null
  );
}

export default TermsConditions;
