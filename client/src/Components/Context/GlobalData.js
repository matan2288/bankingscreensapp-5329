import { createContext, useState, useReducer } from "react";
import { LoggedUserDataReducers } from "./LoggedUserDataReducers.js";

export const GlobalDataHolder = createContext();

export const GlobalDataWrapper = ({ children }) => {
  //Wallpapers Array
  const [renderGoogleLogoutBtn, setGoogleLogoutBtnRendering] = useState(false);
  const [renderManualLogoutBtn, setManualLogoutBtnRendering] = useState(false);

  const [state, dispatch] = useReducer(LoggedUserDataReducers, {
    LoggedUserDetailsAndLoanDataObjects: [],
  });

  return (
    <GlobalDataHolder.Provider
      value={{
        renderGoogleLogoutBtn,
        setGoogleLogoutBtnRendering,
        renderManualLogoutBtn,
        setManualLogoutBtnRendering,
        state,
        dispatch,
      }}
    >
      {children}
    </GlobalDataHolder.Provider>
  );
};
