import axios from "axios";

export function useCareerAction() {
  return {
    fetchSimpleCareer,
  }

  function fetchSimpleCareer() {
    return axios.get(
      "/api/v1/career/",
    );
  }

  function searchCompany() {
    return axios.get(
      "/api/v1/career/company/search",
    )
  }
}
