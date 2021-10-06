import { React, useState, useContext } from "react";
import "../../Style/LoansDetailsScreenStyle/LDSS.css";
import { useForm } from "react-hook-form";
import { PushTheRestOfTheUserDataToDB } from "../Api/Api.js";
import { GlobalDataHolder } from "../Context/GlobalData.js";
import auth from "../ApplyProtectedRoutes/auth.js";
import { dark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import SyntaxHighlighter from "react-syntax-highlighter";

export const LoansDetailsScreen = (props) => {
  const { state, dispatch } = useContext(GlobalDataHolder);

  const [initial, setInitial] = useState(3);

  const [dipslayData, setDisplayData] = useState(false);

  const { register, handleSubmit } = useForm();
  const onSubmit = async (theseLoanAmountAndLoanYearsObjectGoesToDB) => {
    
    dispatch({
      type: "ADD_ARRAY_TO_USER_DATA",
      payload: theseLoanAmountAndLoanYearsObjectGoesToDB,
    });

    setDisplayData(true);
  };

  const handleChange = (event) => {
    setInitial(event.target.value);
  };

  const activateReturnBtn = () => {
    dispatch({
      type: "REMOVE_THE_NEXT_OBJECTS_BY_INDEX",
      payload: "3",
    });

    auth.authenticationApproval(() => {
      props.history.push("/BankAccountDetailsScreen");
    });
  };

  return (
    <div className="LoansDetailsScreen-maindiv">
      <div className="main-form-container-design LoansDetailsScreen-form-container">
        <div className="formCover-and-inputs-container">
          <div className="left-page-container LDSS-left-background">
            <div className="btb-logo"></div>
          </div>

          <div className="right-page-container">
            {dipslayData ? (
              <div className="data-sent-to-server , input-header-container">
                <img src="https://i.ibb.co/yYCYcnT/Check-Png3.png" alt="" />

                <p>Data To Be Sent To Server!</p>

                <div className="responsive-btb-logo"></div>

                <SyntaxHighlighter
                  language="javascript"
                  style={dark}
                  className="syntax-highlighter-container"
                  showLineNumbers={true}
                  wrapLines={true}
                  language="jsx"
                >
                  {`LoggedUserDetailsAndLoanDataObjects : [
${JSON.stringify(state.LoggedUserDetailsAndLoanDataObjects[0])}
${JSON.stringify(state.LoggedUserDetailsAndLoanDataObjects[1])}
${JSON.stringify(state.LoggedUserDetailsAndLoanDataObjects[2])}
${JSON.stringify(state.LoggedUserDetailsAndLoanDataObjects[3])}
]`}
                </SyntaxHighlighter>

                <div
                  onClick={() => {
                    PushTheRestOfTheUserDataToDB(
                      state.LoggedUserDetailsAndLoanDataObjects
                    ).then(() => window.location.reload());
                  }}
                  className="last-submit-btn"
                ></div>
              </div>
            ) : (
              <div className="input-header-container">
                <img
                  src="https://i.ibb.co/Mpd9DXP/Ruler-Logo-White-Png.png"
                  alt=""
                />

                <p>Please Provide The Loan Amount & Loan Time</p>

                <div className="responsive-btb-logo"></div>

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="LoansDetailsScreen-content"
                >
                  <input
                    type="number"
                    className="loan-amount"
                    placeholder="₪100,000-1,000,000"
                    {...register("LoanAmount", {
                      required: true,
                    })}
                    required
                  />

                  <div className="range-container">
                    <input
                      className="loan-range"
                      id="rangeDesign"
                      type="range"
                      min="1"
                      max="5"
                      value={initial}
                      {...register("LoanYears")}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      step="1"
                    />

                    <div className="slider-label-container">
                      <label className="range-label" id="slider-years">
                        {initial}
                      </label>
                      <label className="range-label">Years</label>
                    </div>
                  </div>

                  <div className="btn-container">
                    <input className="btn-design" type="submit" value="" />

                    <div
                      className="btn-design back-btn "
                      onClick={activateReturnBtn}
                    />
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
