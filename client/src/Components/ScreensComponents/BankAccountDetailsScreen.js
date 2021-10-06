import { React, useState, useContext } from "react";
import "../../Style/BankAccountDetailsStyle/BADS.css";
import { useForm, useFieldArray } from "react-hook-form";
import { GlobalDataHolder } from "../Context/GlobalData.js";
import auth from "../ApplyProtectedRoutes/auth.js";

export const BankAccountDetailsScreen = (props) => {
  const { dispatch } = useContext(GlobalDataHolder);

  const { register, control, handleSubmit } = useForm();

  const { fields, append, remove } = useFieldArray({control, name: "BankAccountsArray",});

  const [stopRender, setRender] = useState(true);

  const onSubmit = (UserNewBankAccountArray) => {
    dispatch({
      type: "ADD_ARRAY_TO_USER_DATA",
      payload: UserNewBankAccountArray,
    });

    auth.authenticationApproval(() => {
      props.history.push("/LoansDetailsScreen");
    });
  };

  const activateReturnBtn = () => {
    dispatch({
      type: "REMOVE_THE_NEXT_OBJECTS_BY_INDEX",
      payload: "2",
    });
    auth.authenticationApproval(() => {
      props.history.push("/PersonalCompanyDetailsScreen");
    });
  };

  const addBankAccount = () => {
    if (fields.length < 3) {
      append();
    } else if (fields.length === 3) {
      setRender(false);
      alert("You cannot add more then 3 bank accounts!");
    }
  };

  return (
    <div className="BankAccountDetailsScreen-maindiv">
      <div className="main-form-container-design BankAccountDetailsScreen-container-design">
        <div className="formCover-and-inputs-container">
          <div className="left-page-container BADS-left-background">
            <div className="btb-logo"></div>
          </div>

          <div className="right-page-container">
            <div className="input-header-container">
              <img src="https://i.ibb.co/XkG28bS/lock-png-white.png" alt="" />

              <p>Please Fill The Company's Bank Account(s) Details</p>

              <div className="responsive-btb-logo"></div>

              <div className="BankAccountDetailsScreen-content">
                <div className="het-pey-p">LTD Number: 51-6578854</div>

                <form onSubmit={handleSubmit(onSubmit)} className="BADS-form">
                  <div className="holding-and-label-container">
                    <label htmlFor="holdings-selection"> Holdings %</label>
                    <select
                      name="holdings-selection"
                      id="company-holdinyPCNT-selectionID"
                      {...register("CompanyHoldingPercentage")}
                      defaultValue={"10%"}
                    >
                      <option>10%</option>
                      <option>25%</option>
                      <option>50%</option>
                      <option>75%</option>
                      <option>100%</option>
                    </select>
                  </div>

                  <ul className="BADS-bank-account-selection-container">
                    {fields.length <= 0 ? (
                      <div id="please-click-to-add-bank-account">
                        Please Click The Button Below To Add A Bank Account
                      </div>
                    ) : (
                      fields.map((item, index) => (
                        <li
                          key={item.id}
                          className="bankAccountDetails-container"
                        >
                          <span type="button" onClick={() => remove(index)}>
                            X
                          </span>

                          <input
                            {...register(
                              `BankAccountsArray.${index}.BankAccountNumber`
                            )}
                            defaultValue={item.bankAccountNumber} // make sure to set up defaultValue
                            placeholder="Account Number"
                          />
                          <input
                            {...register(
                              `BankAccountsArray.${index}.BankBranchNumber`
                            )}
                            defaultValue={item.bankBranchNumber} // make sure to set up defaultValue
                            placeholder="Branch Number"
                          />

                          <select
                            {...register(`BankAccountsArray.${index}.bankName`)}
                            defaultValue={item.bankName}
                          >
                            <option>Leumi</option>
                            <option>OstarHaHayal</option>
                            <option>Poalim</option>
                          </select>
                          <span id="responsive-addAccount-Logo"></span>
                        </li>
                      ))
                    )}
                  </ul>

                  <div className="add-account-container">
                    <span
                      type="button"
                      onClick={addBankAccount}
                      id="responsive-addAccount-Logo"
                    >
                      + Add Account
                    </span>
                  </div>

                  <div className="btn-container">
                    <input type="submit" value="" className="btn-design" />

                    <div
                      className="btn-design back-btn"
                      onClick={activateReturnBtn}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
