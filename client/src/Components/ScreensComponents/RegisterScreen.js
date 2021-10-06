import { React, useContext } from "react";
import "../../Style/RegisterScreen/RGC.css";
import { useForm } from "react-hook-form";
import { RegisterNewUser } from "../Api/Api.js";
import { GlobalDataHolder } from "../Context/GlobalData.js";
import { GoogleComponent } from "../GoogleLoginLogoutComponents/GoogleComponent.js";
import Axios from "axios";
import auth from "../ApplyProtectedRoutes/auth.js";
import { ForgotPasswordModal } from "../ForgotPasswordModal/ForgotPasswordModal.js";

export const RegisterScreen = (passedNavigation) => {
  const { dispatch, setManualLogoutBtnRendering } =
    useContext(GlobalDataHolder);

  const { register: userLoginInfo, handleSubmit: handleLoginSubmit } = useForm({
    mode: "onBlur"
  });

  const { register: registerUserInfo, handleSubmit: handleRegisterSubmit } =
    useForm({
      mode: "onBlur"
    });

  //? LoginFunction
  const onSubmitLogin = async (LoggedUserDataPassed) => {
    setManualLogoutBtnRendering(true);

    await Axios({
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: {
        username: LoggedUserDataPassed.username,
        password: LoggedUserDataPassed.password,
      },
      withCredentials: true,
      url: "http://localhost:4003/UserLogin-Route/Login",
    })
      .then((res) => {
        if (res.status === 203) {
          dispatch({ type: "DEFAULT" });
          alert(res.data);
        } else if (res.status === 200) {
          dispatch({
            type: "ADD_ARRAY_TO_USER_DATA",
            payload: { Username: LoggedUserDataPassed.username },
          });
          alert(res.data);
          auth.authenticationApproval(() => {
            passedNavigation.history.push("/PersonalCompanyDetailsScreen");
          });
        }
      })
      .catch((error) => {
        console.log("ERROR FROM THE BACKEND", error);
      });
   
  };

  //? RegisterFunction
  const onSubmitRegister = async (NewRegisterdUserDataPassed) => {
    if (
      NewRegisterdUserDataPassed.password ===
      NewRegisterdUserDataPassed.registerNewUserRepeatedPw
    ) {
      RegisterNewUser(NewRegisterdUserDataPassed);
    } else alert("Wrong repeated passwords!");

  };


  return (
    <div className="RegisterScreen-maindiv">
      <div className="main-form-container-design">
        <div className="formCover-and-inputs-container">
          <div className="left-page-container RegisterScreen-left-container">
            <div className="btb-logo"></div>
          </div>

          <div className="right-page-container">
            <div className="input-header-container">
              <img src="https://i.ibb.co/hfHH6DY/checkPNG.png" alt="" />

              <p>Register & Login Screen</p>

              <div className="responsive-btb-logo"></div>
            </div>

            <div className="inputs-container-register-login">
              <div className="register-inputs">
                <p className="inputs-headers">Register</p>

                <form onSubmit={handleRegisterSubmit(onSubmitRegister)}>
                  <input
                    {...registerUserInfo("username", {
                      required: true,
                    })}
                    className="inputs-design-class"
                    type="email"
                    placeholder="EmailAdress"
                  />

                  <input
                    {...registerUserInfo("password", {
                      required: true,
                    })}
                    className="inputs-design-class"
                    type="text"
                    placeholder="Password"
                    type="password"
                  />

                  <input
                    {...registerUserInfo("registerNewUserRepeatedPw", {
                      required: true,
                    })}
                    className="inputs-design-class"
                    type="text"
                    placeholder="Repeat Password"
                    type="password"
                  />

                  <input
                    className="RGC-btn-design"
                    type="submit"
                    value="Register"
                  />
                </form>
              </div>

              <div id="inputs-midline"></div>
              <div className="login-inputs">
                <form onSubmit={handleLoginSubmit(onSubmitLogin)}>
                  <p className="inputs-headers">Sign In</p>

                  <input
                    {...userLoginInfo("username", {
                      required: true,
                    })}
                    className="inputs-design-class"
                    type="text"
                    placeholder="Your Email"
                  />

                  <input
                    {...userLoginInfo("password", { required: true })}
                    className="inputs-design-class"
                    type="text"
                    type="password"
                    placeholder="Password"
                    required
                  />

                  <input
                    className="RGC-btn-design"
                    type="submit"
                    value="Sign In"
                  />
                </form>

                <div className="login-rest">
                  <p>or</p>

                  <div>
                    <GoogleComponent />
                  </div>
                  <ForgotPasswordModal />
                </div>
              </div>
            </div>

            {/* <input
                className="btn-design first-page-btn"
                type="submit"
                value=""
              /> */}
          </div>
        </div>
      </div>
    </div>
  );
};
