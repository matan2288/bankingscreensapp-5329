import { React, useRef } from "react";
import { EvokeRecoverPasswordRoute } from "../Api/Api";

export const ResetPW = (props) => {
  const inputReference = useRef();

  return (
    <div>
      <div className="forgot-password-modal-content">
        <h1 className="modal-content-title">Reset Password</h1>

        <input
          type="email"
          className="your-email-input"
          defaultValue={""}
          placeholder="Your Email"
          ref={inputReference}
        />
        <button
          onClick={() => {
            EvokeRecoverPasswordRoute(inputReference.current.value);
          }}
          className="recover-pw-btn"
          value="Recover Password"
        >
          Recover Password
        </button>

        <div className="modal-nav">
          <span
            className="close-modal-btn"
            onClick={() => {
              props.closeModal();
            }}
          >
            Main Screen
          </span>
          /
          <span
            className="close-modal-btn"
            onClick={() => {
              props.setRenderChangePW(false);
              props.setRenderResetPW(true);
            }}
          >
            Change Password
          </span>
        </div>
      </div>
    </div>
  );
};
