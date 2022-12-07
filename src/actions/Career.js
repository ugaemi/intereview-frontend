import axios from "axios";

export function useCareerAction() {
  return {
    fetchSimpleCareer,
    searchCompany,
  }

  function fetchSimpleCareer() {
    return axios.get(
      "/api/v1/career/",
    );
  }

  function searchCompany(keyword, page) {
    return axios.get(
      "/api/v1/career/search/company/?keyword=" + keyword + "&page=" + page,
    )
  }
}
