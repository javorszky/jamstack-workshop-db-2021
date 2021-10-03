import React, { useState, useEffect, useContext, createContext } from "react";
import { supabase } from './supabase.js'

const authContext = createContext();

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return (
        <authContext.Provider value={auth}>{children}</authContext.Provider>
    )
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
    return useContext(authContext);
};

// Provider hook that creates auth object and handles state
function useProvideAuth() {
    const [user, setUser] = useState(null);
    const [globalSession, setSession] = useState(null);

    // Wrap any Firebase methods we want to use making sure ...
    // ... to save the user to state.
    const signin = async (email, password, cb) => {
        const { user, session, error } = await supabase.auth.signIn({
            email: email,
            password: password
        })

        if (error) {
            console.error("error logging in")
            console.error(error)
            return false
        }

        console.log('success', session, user)
        setUser(user)
        setSession(session)

        cb()
    };

    const signup = async (email, password, cb) => {
        const { user, session, error } = await supabase.auth.signUp({
            email: email,
            password: password
        })

        if (error) {
            console.error("error signing up")
            console.error(error)
            return false
        }
        setUser(user)
        setSession(session)

        cb()
    };

    const signout = async (cb) => {
        const { error } = await supabase.auth.signOut()
        if (error) {
            console.error("error signing out")
            console.error(error)
            return false
        }
        setSession(null)
        setUser(null)

        cb()
    };

    // Subscribe to user on mount
    // Because this sets state in the callback it will cause any ...
    // ... component that utilizes this hook to re-render with the ...
    // ... latest auth object.
    useEffect(() => {
        const unsubscribe = supabase.auth.onAuthStateChange((event, session) => {
            if (session) {
                console.log('auth change happened', session)
                setSession(session);
            } else {
                setSession(null);
            }
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    // Return the user object and auth methods
    return {
        user,
        globalSession,
        signin,
        signup,
        signout
    };
}