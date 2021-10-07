import { useState, useRef, useEffect } from "react";
import { useAuth } from "./useAuth";
import { supabase } from "./supabase.js";
import { useLocation } from "react-router-dom";

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Signup() {
  const auth = useAuth();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [invite, setInvite] = useState(false);
  let inviter = useRef(null);

  const query = useQuery();
  inviter.current = query.get("inviter");

  const canInvite = async (uid) => {
    const { data, error, count } = await supabase.rpc("is_employee", {
      uid: uid,
    });

    if (error) {
      console.log("returning an error here", error);
      return false;
    }

    console.log(
      "no error, returning the opposite of data. Is employee true can not invite. is employee is: " +
        data
    );
    return !data;
  };

  useEffect(async () => {
    if (inviter.current !== null) {
      console.log("what is inviter if it is not null?", inviter);
      const bla = await canInvite(inviter.current);
      setInvite(bla);
    }
  }, []);

  const RefSignup = () => {
    if (invite) {
      console.log("invite is true, what...");
      return (
        <div className="field">
          <button
            className="button is-primary"
            type="submit"
            onClick={() => {
              auth.signupWithReferral(email, pw, inviter.current);
            }}
          >
            Sign up with referral
          </button>
        </div>
      );
    }
    console.log("invite is false");

    return <></>;
  };

  return (
    <>
      <h1 className="title">Signup</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="field">
          <label className="label" htmlFor="email">
            Email address
          </label>
          <div className="control">
            <input
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
            className="button is-primary"
            type="submit"
            onClick={() => {
              auth.signup(email, pw);
            }}
          >
            Sign up
          </button>
        </div>
        <RefSignup />
      </form>
    </>
  );
}

export default Signup;
