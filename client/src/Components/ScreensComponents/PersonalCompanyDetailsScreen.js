import { React, useContext } from "react";
import "../../Style/PersonalCompanyDetailsScreenStyle/PCDS.css";
import { useForm } from "react-hook-form";
import ReactTooltip from "react-tooltip";
import { GlobalDataHolder } from "../Context/GlobalData.js";
import auth from "../ApplyProtectedRoutes/auth.js";

import { GoogleLogoutComponent } from "../GoogleLoginLogoutComponents/GoogleLogoutComponent.js";

export const PersonalCompanyDetailsScreen = (props) => {
  const { register, handleSubmit } = useForm();

  const {
    dispatch,
    renderManualLogoutBtn,
    renderGoogleLogoutBtn,
    setManualLogoutBtnRendering,
  } = useContext(GlobalDataHolder);

  const onSubmit = (thisCompanyDetailsObjectGoesToDB) => {
    // console.log(thisCompanyDetailsObjectGoesToDB);
    dispatch({
      type: "ADD_ARRAY_TO_USER_DATA",
      payload: thisCompanyDetailsObjectGoesToDB,
    });
    auth.authenticationApproval(() => {
      props.history.push("/BankAccountDetailsScreen");
    });
  };

  const activateReturnBtn = () => {
    setManualLogoutBtnRendering(false);
    dispatch({
      type: "SIGNOUT_REDUCER",
    });
    auth.authenticationApproval(() => {
      props.history.push("/");
    });
  };

  return (
    <div className="PersonalCompanyDetailsScreen-maindiv">
      <ReactTooltip />

      <div className="main-form-container-design">
        <div className="formCover-and-inputs-container">
          <div className="left-page-container PersonalCompanyDetailsScreen-left-container">
            <div className="btb-logo"></div>
          </div>

          <div className="right-page-container">
            <div className="input-header-container">
              <img src="https://i.ibb.co/hfHH6DY/checkPNG.png" alt="" />

              <p>Please Complete The Next Information</p>

              <div className="responsive-btb-logo"></div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="inputs-container">
                <div className="inputs-row1">
                  <input
                    {...register("RegisterdFirstName", { required: true })}
                    className="inputs-design-class"
                    type="text"
                    placeholder="First Name:"
                    required
                  />

                  <input
                    {...register("RegisterdBirthDate", { required: true })}
                    className="inputs-design-class date-input-design"
                    type="date"
                    data-tip="Date Of Birth"
                  />
                  <input
                    {...register("RegisterdEmailAdress", { required: true })}
                    className="inputs-design-class"
                    type="email"
                    placeholder="Email"
                    required
                  />
                  <input
                    {...register("RegisterdHetpayPartnershipOrganization", {
                      required: true,
                    })}
                    className="inputs-design-class"
                    type="text"
                    placeholder="Partnership"
                    required
                  />
                </div>

                <div className="inputs-row2">
                  <input
                    {...register("RegisterdLastName", { required: true })}
                    className="inputs-design-class"
                    type="text"
                    placeholder="Last Name:"
                    required
                  />

                  <input
                    {...register("RegisterdId", { required: true })}
                    className="inputs-design-class"
                    type="text"
                    placeholder="ID Number:"
                    required
                  />

                  <input
                    {...register("RegisterdPhoneNumber", { required: true })}
                    className="inputs-design-class"
                    type="text"
                    placeholder="PhoneNumber"
                  />

                  <input
                    {...register("RegisterdCompanyName", { required: true })}
                    className="inputs-design-class"
                    type="text"
                    placeholder="Buisness Name"
                    required
                  />
                </div>
              </div>

              <div className="btn-container">
                <input type="submit" value="" className="btn-design" />

                {renderGoogleLogoutBtn ? <GoogleLogoutComponent /> : null}

                {renderManualLogoutBtn ? (
                  <div
                    className="btn-design back-btn"
                    onClick={activateReturnBtn}
                    data-tip="Sign Out"
                  />
                ) : null}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
