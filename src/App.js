import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import SignIn from "./routes/SignIn";
import {isLogin} from "./utils/Auth";
import Home from "./routes/Home";

export default function App() {
  return <div className="App">
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={isLogin() ? <Home /> : <Navigate to={"/sign-in"}/>}/>
        <Route exact path="/sign-in" element={<SignIn/>}/>
      </Routes>
    </BrowserRouter>
  </div>;
}
