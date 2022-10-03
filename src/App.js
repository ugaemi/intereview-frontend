import {BrowserRouter, Route, Routes} from "react-router-dom";
import SignIn from "./routes/accounts/SignIn";
import Home from "./routes/Home";
import FindAccount from "./routes/accounts/FindAccount";
import FindUsername from "./routes/accounts/FindUsername";
import FindPassword from "./routes/accounts/FindPassword";
import ResetPassword from "./routes/accounts/ResetPassword";

export default function App() {
  return <div className="App">
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />}/>
        <Route exact path="/accounts/sign-in" element={<SignIn/>}/>
        <Route exact path="/accounts/find" element={<FindAccount/>}/>
        <Route exact path="/accounts/find/username" element={<FindUsername/>}/>
        <Route exact path="/accounts/find/password" element={<FindPassword/>}/>
        <Route exact path="/accounts/find/password/reset" element={<ResetPassword/>}/>
      </Routes>
    </BrowserRouter>
  </div>;
}
