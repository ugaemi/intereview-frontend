import {getCookie} from "./Cookies";

export const isLogin = () => {
  return getCookie("token");
}
