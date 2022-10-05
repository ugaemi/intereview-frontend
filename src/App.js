import {Route, Routes} from "react-router-dom";
import SignIn from "./routes/accounts/SignIn";
import FindAccount from "./routes/accounts/FindAccount";
import FindUsername from "./routes/accounts/FindUsername";
import FindPassword from "./routes/accounts/FindPassword";
import ResetPassword from "./routes/accounts/ResetPassword";
import SignUp from "./routes/accounts/SignUp";
import React from "react";
import Home from "./routes/Home";
import Layout from "./components/Layout";
import Profile from "./routes/settings/Profile";
import Account from "./routes/settings/Account";

export default function App() {
  return <Routes>
      <Route element={<Layout/>}>
        <Route path="/" element={<Home />}/>
        <Route path="/settings/profile" element={<Profile />}/>
        <Route path="/settings/account" element={<Account />}/>
      </Route>
      <Route exact path="/accounts/sign-up" element={<SignUp/>}/>
      <Route exact path="/accounts/sign-in" element={<SignIn/>}/>
      <Route exact path="/accounts/find" element={<FindAccount/>}/>
      <Route exact path="/accounts/find/username" element={<FindUsername/>}/>
      <Route exact path="/accounts/find/password" element={<FindPassword/>}/>
      <Route exact path="/accounts/find/password/reset" element={<ResetPassword/>}/>
    </Routes>;
}
