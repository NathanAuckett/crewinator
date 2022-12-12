import React, { useState } from "react";

export const LoginContext = React.createContext("");

export const LoginContextProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <LoginContext.Provider value={{loggedIn, setLoggedIn}}>
      {children}
    </LoginContext.Provider>
  );
}