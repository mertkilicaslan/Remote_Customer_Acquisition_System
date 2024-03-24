import { useState } from "react";

const Assets = (props) => {
  const { t, name, surname } = props;

  const [bankBalance, setBankBalance] = useState(265);
  const [creditBalance, setCreditBalance] = useState(394);

  return (
    <div className="center">
      <p className="greetings-message">
        {t("welcomeMessage")} {name} {surname}
      </p>
      <hr />

      <h2>{t("assetsTitle")}</h2>
      <div className="assets">
        <p>{t("bankCard")}</p>
        <div className="balance-actions">
          <button onClick={() => setBankBalance((prevState) => prevState - 1)}>
            -
          </button>
          <p className="balance">{bankBalance},00&nbsp;TL</p>
          <button onClick={() => setBankBalance((prevState) => prevState + 1)}>
            +
          </button>
        </div>
      </div>

      <div className="assets">
        <p>{t("creditCard")}</p>
        <div className="balance-actions">
          <button
            onClick={() => setCreditBalance((prevState) => prevState - 1)}
          >
            -
          </button>
          <p className="balance">{creditBalance},00&nbsp;TL</p>
          <button
            onClick={() => setCreditBalance((prevState) => prevState + 1)}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default Assets;
