import axios from "axios";

export function useAccountAction() {
  return {
    findUsername,
  }

  function findUsername(data) {
    return axios.post(
      "/api/v1/accounts/find/username",
      data,
    );
  }
}
