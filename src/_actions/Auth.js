import {useSetRecoilState} from "recoil";
import {authAtom} from "../_state/Auth";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export function useAuthAction() {
  const setAuth = useSetRecoilState(authAtom);
  const navigate = useNavigate();

  return {
    signIn,
    signOut,
  }

  function signIn(formData) {
    return axios.post(
      "/api/v1/accounts/token",
      formData,
    ).then(res => {
      localStorage.setItem("user", JSON.stringify(res.data));
      axios.defaults.headers.common["Authorization"] = `Bearer ` + res.data["token"];
      setAuth(res);
      navigate("/", {replace: true});
    });
  }

  function signOut() {
    localStorage.removeItem("user");
    axios.defaults.headers.common["Authorization"] = null;
    setAuth(null);
    navigate("/accounts/sign-in", {replace: true});
  }
}
