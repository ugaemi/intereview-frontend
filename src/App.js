import {useEffect, useState} from "react";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Home from "./routes/Home";
import axios from "axios";
import SignIn from "./routes/SignIn";

export default function App() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    try {
      axios.get("/api/v1/users/me")
        .then(res => {
          setIsLogin(true);
        })
        .catch(e => {
          console.log(e);
        })
        .finally(() => {
        })
    } catch (e) {
      console.log(e);
    }
  });

  return <div className="App">
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route path="/sign-in" element={isLogin ? <Navigate to={"/"} /> : <SignIn/>}/>
      </Routes>
    </BrowserRouter>
  </div>;
}
