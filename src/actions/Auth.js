import {useSetRecoilState} from "recoil";
import {authAtom} from "../state/Auth";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export function useAuthAction() {
  const setAuth = useSetRecoilState(authAtom);
  const navigate = useNavigate();

  return {
    signIn,
    signOut,
    getAuth,
  }

  function signIn(formData) {
    return axios.post(
      "/api/v1/accounts/token",
      formData,
    );
  }

  function signOut() {
    localStorage.removeItem("refresh");
    axios.defaults.headers.common["Authorization"] = null;
    setAuth(null);
    navigate("/accounts/sign-in", {replace: true});
  }

  function getAuth(formData) {
    return axios.post(
      "/api/v1/accounts/token/refresh",
      formData,
    )
  }
}
