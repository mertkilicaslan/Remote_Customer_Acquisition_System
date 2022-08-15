import React, { useState } from "react";
import "./App.css";
import TermsConditions from "./Components/TermsConditions";

function App() {
  const [showMailPass, setShow] = useState(true);
  const [showNameSurnameDate, setShow2] = useState(false);
  const [showPhoneTC, setShow3] = useState(false);
  const [popUpTermsConditions, setShow4] = useState(false);
  let isChecked = false;

  return (
    <>
      <h1>MAIN APP</h1>
      {showMailPass && (
        <form>
          <div>
            <label htmlFor="email">E-Mail </label>
            <input type="text" id="email"></input>
          </div>

          <div>
            <label htmlFor="password">Şifre </label>
            <input type="password" id="password"></input>
          </div>

          <button
            onClick={() => {
              setShow(false);
              setShow2(true);
            }}
          >
            Devam
          </button>
        </form>
      )}

      {showNameSurnameDate && (
        <form>
          <div>
            <label htmlFor="name">Ad </label>
            <input type="text" id="name"></input>
          </div>

          <div>
            <label htmlFor="surname">Soyad </label>
            <input type="text" id="surname"></input>
          </div>

          <div>
            <label htmlFor="birthday">Doğum Tarihi</label>
            <input type="date" id="birthday"></input>
          </div>

          <button
            onClick={() => {
              setShow2(false);
              setShow3(true);
            }}
          >
            Devam
          </button>
        </form>
      )}

      {showPhoneTC && (
        <form>
          <div>
            <label htmlFor="TC">TC Kimlik No </label>
            <input type="text" id="TC"></input>
          </div>

          <div>
            <label htmlFor="phoneNum">Cep Telefon No </label>
            <input type="text" id="phoneNum"></input>
          </div>

          <div>
            <input
              type="checkbox"
              id="uzaktanMusteri"
              name="checkbox1"
              value="uzaktanMusteri"
              onChange={(e) => {
                if (e.target.checked) {
                  setShow4(true);
                }
              }}
            ></input>
            <label htmlFor="uzaktanMusteri">
              Uzaktan Müşteri Edinimi Aydınlatma Metnini okudum
            </label>
            <TermsConditions
              trigger={popUpTermsConditions}
              setTrigger={setShow4}
              confirmation={isChecked}
            >
              <p>Aydınlatma Metni</p>
            </TermsConditions>
          </div>

          <div>
            <input
              type="checkbox"
              id="hasatKart"
              name="checkbox2"
              value="hasatKart"
            ></input>
            <label htmlFor="hasatKart">Hasat Kart İstiyorum</label>
          </div>

          <button
            onClick={() => {
              setShow3(false);
            }}
          >
            Müşteri Ol
          </button>
        </form>
      )}
    </>
  );
}

export default App;
