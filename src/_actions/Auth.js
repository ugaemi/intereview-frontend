import {useCookies} from "react-cookie";
import {useSetRecoilState} from "recoil";
import {authAtom} from "../_state/Auth";
import axios from "axios";
import jwtDecode from "jwt-decode";
import {useNavigate} from "react-router-dom";

export function useAuthAction() {
  const [cookies, setCookie, removeCookie] = useCookies();
  const setAuth = useSetRecoilState(authAtom);
  const navigate = useNavigate();

  return {
    signIn,
  }

  function signIn(formData) {
    return axios.post(
      "/api/v1/users/token",
      formData,
    ).then(res => {
      setCookie("token", res.data["token"], {sameSite: "none", secure: true});
      axios.defaults.headers.common["Authorization"] = `Bearer ` + res.data["token"];
      setAuth(jwtDecode(res.data["token"]));
      navigate("/", {replace: true});
    });
  }
}
