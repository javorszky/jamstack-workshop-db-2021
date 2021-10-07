import { useState } from "react";
import { useAuth } from "./useAuth";
import { useHistory } from "react-router-dom";

function Login() {
  const auth = useAuth();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleLogin = async (e) => {
    setLoading(true);
    e.preventDefault();
    const success = await auth.signin(email, pw);
    setLoading(false);

    if (success) {
      history.push("/");
    }
  };

  return (
    <>
      <h1 className="title">Log in</h1>
      <form
        onSubmit={(e) => {
          handleLogin(e);
        }}
      >
        <div className="field">
          <label className="label" htmlFor="email">
            Email address
          </label>
          <div className="control">
            <input
              disabled={loading ? "disabled" : ""}
              className="input"
              type="email"
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="field">
          <label className="label" htmlFor="password">
            Password
          </label>
          <div className="control">
            <input
              disabled={loading ? "disabled" : ""}
              className="input"
              type="password"
              name="password"
              id="password"
              onChange={(e) => setPw(e.target.value)}
            />
          </div>
        </div>
        <div className="field">
          <button
            disabled={loading ? "disabled" : ""}
            className="button is-primary"
            type="submit"
          >
            Log in
          </button>
        </div>
      </form>
    </>
  );
}

export default Login;
