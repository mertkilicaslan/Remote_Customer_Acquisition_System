import React from "react";

const SignUp1 = () => {
  return (
    <>
      <h1>SignUp 1 Page</h1>

      <form>
        <div>
          <label htmlFor="email">E-mail: </label>
          <input type="email" id="email" required></input>
        </div>

        <div>
          <label htmlFor="password">Şifre: </label>
          <input type="password" id="password" required></input>
        </div>
        <button>Devam</button>
      </form>
    </>
  );
};

export default SignUp1;
