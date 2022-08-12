import React from "react";

const SignUp2 = () => {
  return (
    <>
      <h1>SignUp 2 Page</h1>
      <form>
        <div>
          <label htmlFor="name">Ad: </label>
          <input type="text" id="name" required></input>
        </div>

        <div>
          <label htmlFor="surname">Soyad: </label>
          <input type="text" id="surname" required></input>
        </div>

        <div>
          <label htmlFor="birthday">Birthday: </label>
          <input type="date" id="birthday" required></input>
        </div>

        <button>Devam</button>
      </form>
    </>
  );
};

export default SignUp2;
