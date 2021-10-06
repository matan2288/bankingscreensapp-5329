import { React, useContext, useState } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { GlobalDataHolder } from "../Context/GlobalData.js";
import { useHistory } from "react-router-dom";
import auth from "../ApplyProtectedRoutes/auth.js";

export const GoogleComponent = () => {
  const [showloginButton, setShowloginButton] = useState(true);
  const [showlogoutButton, setShowlogoutButton] = useState(false);

  const { dispatch, setGoogleLogoutBtnRendering } = useContext(GlobalDataHolder);

  const history = useHistory();

  const onLoginSuccess = async (res) => {
    console.log("Login Success:", res.profileObj);

    dispatch({
      type: "ADD_ARRAY_TO_USER_DATA",
      payload: { Username: res.profileObj.email },
    });

    setGoogleLogoutBtnRendering(true);

    auth.authenticationApproval(() => {
      history.push("/PersonalCompanyDetailsScreen");
    });
  };

  const onSignoutSuccess = () => {
    alert("You have been logged out successfully");

    dispatch({
      type: "GOOGLE_SIGNOUT_REDUCER",
    });

    setShowloginButton(true);
    setShowlogoutButton(false);

    auth.authenticationApproval(() => {
      history.push("/");
    });
  };

  return (
    <div>
      {showloginButton ? (
        <GoogleLogin
          clientId={
            "356607893904-ks9ntc0p09be388b5qphvket4bk03mq2.apps.googleusercontent.com"
          }
          buttonText="Sign In"
          onSuccess={onLoginSuccess}
          onFailure={(err) => console.log("fail", err)}
          cookiePolicy={"single_host_origin"}
          isSignedIn={true}
          className="google-login-btn"
        />
      ) : (
        <GoogleLogout
          clientId={
            "356607893904-ks9ntc0p09be388b5qphvket4bk03mq2.apps.googleusercontent.com"
          }
          buttonText="Sign Out"
          onLogoutSuccess={onSignoutSuccess}
          className="google-login-btn"
        />
      )}
    </div>
  );
};
