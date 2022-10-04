import Header from "./Header";
import {Navigate, Outlet} from "react-router-dom";
import {useRecoilValue} from "recoil";
import {authAtom} from "../_state/Auth";
import "./Layout.css";
import React from "react";

export default function Layout() {
  const auth = useRecoilValue(authAtom);
  if (auth) {
    return <div>
      <Header auth={auth}/>
      <main>
        <div>
          <Outlet/>
        </div>
      </main>
    </div>
  } else {
    return <Navigate to={"/accounts/sign-in"}/>
  }
}
