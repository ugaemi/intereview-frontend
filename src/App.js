import React from "react";
import Login from "./routes/Login";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./routes/Home";

export default function App() {
  return <div className="App">
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route path="/sign-in" element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  </div>;
}
