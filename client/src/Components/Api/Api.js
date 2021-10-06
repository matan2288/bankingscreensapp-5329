import Axios from "axios";

//? Register & Login API

export const RegisterNewUser = async (NewUserPassedFromClient) => {
  await Axios({
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: {
      username: NewUserPassedFromClient.username,
      password: NewUserPassedFromClient.password,
    },
    withCredentials: true,
    url: "http://localhost:4003/Register-Route/Register",
  })
    .then((res) => {
      alert(res.data);
    })
    .catch((error) => {
      console.log("ERROR FROM THE BACKEND", error);
    });
};

export const PushTheRestOfTheUserDataToDB = async (
  UserDataPassedFromClient
) => {
  await Axios({
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: {
      UserDataPassedFromClient,
    },
    withCredentials: true,
    url: "http://localhost:4003/PVUDTDB-Route/PVUDTDB",
  })
    .then((res) => alert(res.data))
    .catch((error) => {
      console.log("ERROR FROM THE BACKEND", error);
    });
};

export const EvokeRecoverPasswordRoute = async (UserDataPassedFromClient) => {
  await Axios({
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: {
      username: UserDataPassedFromClient,
    },
    withCredentials: true,
    url: "http://localhost:4003/ResetPassword-Route/ResetPassword",
  })
    .then((res) => alert(res.data))
    .catch((error) => {
      console.log("ERROR FROM THE BACKEND", error);
    });
};

export const ChangePasswordRoute = async (UserDataPassedFromClient) => {
  await Axios({
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: {
      username: UserDataPassedFromClient.RegisterdId,
      oldPassword: UserDataPassedFromClient.OldPassword,
      password: UserDataPassedFromClient.RegisterNewPassword,
    },
    withCredentials: true,
    url: "http://localhost:4003/ChangePassword-Route/ChangePassword",
  })
    .then((res) => alert(res.data))
    .catch((error) => {
      console.log("ERROR FROM THE BACKEND", error);
    });
};
