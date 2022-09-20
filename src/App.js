import {BrowserRouter, Route, Routes} from "react-router-dom";
import SignIn from "./routes/SignIn";
import Home from "./routes/Home";

export default function App() {
  return <div className="App">
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />}/>
        <Route exact path="/sign-in" element={<SignIn/>}/>
      </Routes>
    </BrowserRouter>
  </div>;
}
