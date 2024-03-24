import "../App.css";

const TermsConditions = (props) => {
  const { t, showPopup, setShowPopup, setTermsConfirm } = props;

  const closePopUp = (confirm) => {
    setShowPopup(false);
    setTermsConfirm(confirm);
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
            <p>{t("termsConditionsText")}</p>
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
