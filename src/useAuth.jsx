import React, { useState, useEffect, useContext, createContext } from "react";
import { supabase } from "./supabase.js";
import { useHistory } from "react-router-dom";

const authContext = createContext();

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(authContext);
};

// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const [globalSession, setSession] = useState(null);
  const [notification, setNotification] = useState({});

  let history = useHistory();

  // Wrap any Firebase methods we want to use making sure ...
  // ... to save the user to state.
  const signin = async (email, password) => {
    const { user, session, error } = await supabase.auth.signIn({
      email: email,
      password: password,
    });

    if (error) {
      setNotification({
        type: "is-danger",
        message: error.message,
      });
      return false;
    }

    setNotification({});
    setSession(session);
    return true;
  };

  const signup = async (email, password) => {
    const { user, session, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      setNotification({
        type: "is-danger",
        message: "Error signing up: " + error.message,
      });
      return false;
    }

    if (session === null) {
      setNotification({
        type: "is-success",
        message:
          "Nice! Check your email (including spam folders) for a confirmation link!",
      });
    }
    setSession(session);

    history.push("/");
  };

  const signupWithReferral = async (email, password, referee) => {
    const { user, session, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      setNotification({
        type: "is-danger",
        message: "Error signing up: " + error.message,
      });
      return false;
    }

    const relationshipData = [
      {
        employee_id: user.id,
        manager_id: referee,
      },
    ];

    // Do the referral here.
    const insertReferral = await supabase
      .from("user_relationships")
      .insert(relationshipData);

    if (insertReferral.error) {
      setNotification({
        type: "is-warning",
        message:
          "Something went wrong while trying to record your referral status: " +
          insertReferral.error.message,
      });

      console.log(insertReferral.error);
      setSession(session);

      history.push("/");
    }

    if (session === null) {
      setNotification({
        type: "is-success",
        message:
          "Nice! Check your email (including spam folders) for a confirmation link!",
      });
    }
    setSession(session);

    history.push("/");
  };

  const signout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("error signing out");
      console.error(error);
      return false;
    }
    setSession(null);

    history.push("/");
  };

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  useEffect(() => {
    const { data, error } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session) {
          console.log("auth change happened", session);
          setSession(session);
        } else {
          setSession(null);
        }
      }
    );

    if (error) {
      console.error(
        "something went wrong with calling the onauthstatechange for supabase"
      );
      console.error(error);
    }

    // Cleanup subscription on unmount
    return () => data.unsubscribe();
  }, []);

  // Return the user object and auth methods
  return {
    globalSession,
    signin,
    signup,
    signupWithReferral,
    signout,
    notification,
    setNotification,
  };
}
