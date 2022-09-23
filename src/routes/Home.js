import React from "react";
import Header from "../components/Header";
import {Navigate} from "react-router-dom";
import {authAtom} from "../_state/Auth";
import {useRecoilValue} from "recoil";


export default function Home() {
  const auth = useRecoilValue(authAtom);
  return {auth} ? <Header/> : <Navigate replace to={"/accounts/sign-in"}/>
}
