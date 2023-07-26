import React, { useState, useEffect, createContext } from "react";
import { auth } from "../Config/firebase";
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const getUser = async () => {
      await onAuthStateChanged(auth, (user) => {
        setUser(user);
      });
    };
    getUser();
  }, []);
  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export default AuthContext;
