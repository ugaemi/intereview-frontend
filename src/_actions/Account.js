import axios from "axios";
import {useAuthAction} from "./Auth";

export function useAccountAction() {
  const authAction = useAuthAction();

  return {
    findUsername,
    verificationCodeForUsername,
    sendResetPasswordLink,
    resetPassword,
    signUp,
    fetchBaseData,
    withdraw,
  }

  function findUsername(data) {
    return axios.post(
      "/api/v1/accounts/find/username",
      data,
    );
  }

  function verificationCodeForUsername(data) {
    return axios.post(
      "/api/v1/accounts/find/username/verification",
      data,
    );
  }

  function sendResetPasswordLink(data) {
    return axios.post(
      "/api/v1/accounts/reset/password/link",
      data,
    )
  }

  function resetPassword(data) {
    return axios.post(
      "/api/v1/accounts/reset/password",
      data,
    )
  }

  function signUp(data) {
    return axios.post(
      "/api/v1/accounts/",
      data,
    )
  }

  function fetchBaseData() {
    return axios.get(
      "/api/v1/accounts",
    )
  }

  function withdraw(data) {
    return axios.post(
      "/api/v1/accounts/withdraw",
      data,
    ).then(res => {
      authAction.signOut();
    })
  }
}
