import "../App.css";
export function Login() {
  return (
    <>
      <form className="center">
        <div>
          <label htmlFor="email">E-Mail</label>
          <input
            autoFocus
            className="input-center"
            type="text"
            id="email"
            name="email"
          ></input>
        </div>

        <div>
          <label htmlFor="password">Şifre</label>
          <input
            className="input-center"
            type="password"
            id="password"
            name="password"
          ></input>
        </div>
      </form>
    </>
  );
}
