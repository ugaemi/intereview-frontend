import Header from "./Header";
import { Navigate, Outlet } from "react-router-dom";
import { useRecoilState } from "recoil";
import { authAtom } from "../state/Auth";
import "./Layout.css";
import React from "react";
import { useAuthAction } from "../actions/Auth";
import axios from "axios";

export default function Layout() {
  const [auth, setAuth] = useRecoilState(authAtom);
  const authAction = useAuthAction();
  const refreshToken = localStorage.getItem("refresh");

  if (!refreshToken) {
    return <Navigate to={"/accounts/sign-in"} />
  }

  if (!auth) {
    const formData = new FormData();
    formData.append("grant_type", "refresh_token");
    formData.append("refresh_token", refreshToken);
    authAction.getAuth(formData).then(res => {
      axios.defaults.headers.common["Authorization"] = res.data["token_type"] + ` ` + res.data["access_token"];
      setAuth(res.data);
      return <div>
        <Header auth={auth} />
        <main>
          <div>
            <Outlet />
          </div>
        </main>
      </div>
    }).catch((err) => {
      localStorage.removeItem("refresh");
      axios.defaults.headers.common["Authorization"] = null;
      setAuth(null);
      return <Navigate to={"/accounts/sign-in"} />
    });
  } else {
    return <div>
      <Header auth={auth} />
      <main>
        <div>
          <Outlet />
        </div>
      </main>
    </div>
  }
}
