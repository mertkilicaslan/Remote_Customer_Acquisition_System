import { useState } from "react";
import Constants from "../utils/Constants";

const Assets = (props) => {
  const { t, name, surname } = props;

  const [bankBalance, setBankBalance] = useState(
    Math.floor(Math.random() * 1001)
  );
  const [creditBalance, setCreditBalance] = useState(
    Math.floor(Math.random() * 1001)
  );

  return (
    <div className="center">
      <p className="greetings-message">
        {t("welcomeMessage")} {name} {surname}
      </p>
      <hr />

      <h2>{t("assetsTitle")}</h2>
      <div className="assets">
        <p>{t("debitCard")}</p>
        <div className="balance-actions">
          <button onClick={() => setBankBalance((prevState) => prevState - 1)}>
            {Constants.minusSign}
          </button>
          <p className="balance">
            {bankBalance},00&nbsp;{Constants.currencyTL}
          </p>
          <button onClick={() => setBankBalance((prevState) => prevState + 1)}>
            {Constants.plusSign}
          </button>
        </div>
      </div>

      <div className="assets">
        <p>{t("creditCard")}</p>
        <div className="balance-actions">
          <button
            onClick={() => setCreditBalance((prevState) => prevState - 1)}
          >
            {Constants.minusSign}
          </button>
          <p className="balance">
            {creditBalance},00&nbsp;{Constants.currencyTL}
          </p>
          <button
            onClick={() => setCreditBalance((prevState) => prevState + 1)}
          >
            {Constants.plusSign}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Assets;
