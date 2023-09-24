import React, { useState } from "react";

const Assets = ({ name, surname }) => {
  const [bankBalance, setBankBalance] = useState(265);
  const [creditBalance, setCreditBalance] = useState(394);

  return (
    <div className="center">
      <p className="greetings">
        Hoş Geldiniz {name} {surname}
      </p>
      <hr />

      <h2>Varlıklarım</h2>
      <div className="assets">
        <p>Banka Kartı</p>
        <div className="balanceActions">
          <button onClick={() => setBankBalance((prev) => prev - 1)}>-</button>
          <p className="balance">{bankBalance},00&nbsp;TL</p>
          <button onClick={() => setBankBalance((prev) => prev + 1)}>+</button>
        </div>
      </div>

      <div className="assets">
        <p>Kredi Kartı</p>
        <div className="balanceActions">
          <button onClick={() => setCreditBalance((prev) => prev - 1)}>
            -
          </button>
          <p className="balance">{creditBalance},00&nbsp;TL</p>
          <button onClick={() => setCreditBalance((prev) => prev + 1)}>
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default Assets;
