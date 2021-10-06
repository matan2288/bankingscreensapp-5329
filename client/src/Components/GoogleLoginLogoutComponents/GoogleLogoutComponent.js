import { React, useContext } from "react";
import { GoogleLogout } from "react-google-login";
import { GlobalDataHolder } from "../Context/GlobalData.js";
import { useHistory } from "react-router-dom";
import auth from "../ApplyProtectedRoutes/auth.js";
export const GoogleLogoutComponent = () => {
  const { dispatch, setGoogleLogoutBtnRendering } = useContext(GlobalDataHolder);

  const history = useHistory();

  const onSignoutSuccess = () => {
    setGoogleLogoutBtnRendering(false);
    alert("You have been logged out successfully");
    dispatch({
      type: "SIGNOUT_REDUCER",
    });
    auth.authenticationApproval(() => {
      history.push("/");
    });
  };

  return (
      <GoogleLogout
        clientId={
          "356607893904-ks9ntc0p09be388b5qphvket4bk03mq2.apps.googleusercontent.com"
        }
        buttonText="Sign Out"
        onLogoutSuccess={onSignoutSuccess}
        className="google-login-btn"
      />
  );
};
