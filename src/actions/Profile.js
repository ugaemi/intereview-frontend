import axios from "axios";

export function useProfileAction() {
  return {
    fetchBaseData,
  }

  function fetchBaseData() {
    return axios.get(
      "/api/v1/accounts/profile",
    );
  }
}
