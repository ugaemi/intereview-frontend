import axios from "axios";

export function useAccountAction() {
  return {
    findUsername,
    verificationCodeForUsername,
    sendResetPasswordLink,
    resetPassword,
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
}
