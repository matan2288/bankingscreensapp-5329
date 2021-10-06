import React from "react";
import { useForm } from "react-hook-form";
import { ChangePasswordRoute } from "../Api/Api";

export const ChangePW = (props) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (thisUserDataGoesToDb) => {
    if (
      thisUserDataGoesToDb.RegisterNewPassword ===
      thisUserDataGoesToDb.NewPasswordRepeated
    ) {
      console.log(thisUserDataGoesToDb);
      ChangePasswordRoute(thisUserDataGoesToDb);
    } else alert("Passwords Do Not Match!");
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="changepw-form">
        <h1>Change Password</h1>
        <input
          {...register("RegisterdId", { required: true })}
          className="changepw-input-design"
          type="text"
          placeholder="Your Email"
          required
        />

        <input
          {...register("OldPassword", { required: true })}
          className="changepw-input-design"
          type="password"
          placeholder="Old Password"
        />
        <input
          {...register("RegisterNewPassword", { required: true })}
          className="changepw-input-design"
          type="password"
          placeholder="Password"
        />
        <input
          {...register("NewPasswordRepeated", { required: true })}
          className="changepw-input-design"
          type="password"
          placeholder="Repeat Password"
        />

        <input type="submit" value="Submit" className="changepw-submit-btn" />

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
              props.setRenderChangePW(true);
              props.setRenderResetPW(false);
            }}
          >
            Reset password
          </span>
        </div>
      </form>
    </div>
  );
};
