import axios from "axios";

export function useAccountAction() {
  return {
    findUsername,
    verificationCode,
  }

  function findUsername(data) {
    return axios.post(
      "/api/v1/accounts/find/username",
      data,
    );
  }

  function verificationCode(data) {
    return axios.post(
      "/api/v1/accounts/find/verification",
      data,
    );
  }
}
