import { useState } from "react";
import { useAuth } from "./use-auth";
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

  const query = useQuery();
  const inviter = query.get("inviter");

  const checkInvite = async (uid) => {
    const { data, error, count } = await supabase.rpc("is_employee", {
      uid: uid,
    });

    console.log("inviter check", data, error, count);
    // if (error || !count) {
    //   auth.setNotification({
    //     type: "is-danger",
    //     message: "You have an invite referral, but that is invalid.",
    //   });
    //   return false;
    // }

    return uid;
  };

  if (inviter !== null) {
    console.log("checking inviter");
    checkInvite(inviter);
  }

  console.log(query.get("inviter"));

  return (
    <>
      <h1 className="title">Signup</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          auth.signup(email, pw);
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
          <button className="button is-primary" type="submit">
            Sign up
          </button>
        </div>
      </form>
    </>
  );
}

export default Signup;
