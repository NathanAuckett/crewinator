import React, { useState } from "react";

export const LoginContext = React.createContext("");

export const LoginContextProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginInfo, setLoginInfo] = useState({id: "", username: ""});

  return (
    <LoginContext.Provider value={{loggedIn, setLoggedIn, loginInfo, setLoginInfo}}>
      {children}
    </LoginContext.Provider>
  );
}