import React, {useState} from "react";
import Header from "../components/Header";
import {isLogin} from "../utils/Auth";
import {Navigate} from "react-router-dom";


export default function Home() {
  if (isLogin()) {
    return <Header/>
  } else {
    return <Navigate replace to={"/sign-in"}/>
  }
}
