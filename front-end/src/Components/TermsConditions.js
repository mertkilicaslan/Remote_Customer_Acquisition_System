import "../App.css";

const TermsConditions = (props) => {
  const { t, showPopup, setShowPopup, setTermsConfirm } = props;

  const closePopUp = (termsConfirm) => {
    setShowPopup(false);
    setTermsConfirm(termsConfirm);
  };

  return (
    showPopup && (
      <>
        <div className="terms-conditions">
          <div className="terms-conditions-inner">
            <button className="close-button" onClick={() => closePopUp(false)}>
              &#10006;
            </button>
            <h2>{t("termsConditionsPopupTitle")}</h2>
            {Array(11)
              .fill(null)
              .map((_, i) => (
                <p key={i}>{t("termsConditionsText")}</p>
              ))}
            <button onClick={() => closePopUp(true)}>
              {t("readAndApproveBtnName")}
            </button>
          </div>
        </div>
      </>
    )
  );
};

export default TermsConditions;
