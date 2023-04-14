/** @format */
import { useState } from "react";
// import FormSec from "./component/FormSec.js";
import SignUpScreen from "./loginScreen/SignUpscreen";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Home from "./homeScreen/Home";
import UserSignInScreen from "./loginScreen/SignInScreen";


function App() {

  

  return (
    <>
    <Routes>
    <Route
      path="/"
      exact
      element={<SignUpScreen/>}
    ></Route>
    <Route
      path="/signin"
      exact
      element={<UserSignInScreen/>}
    ></Route>
    <Route
      path="/home"
      exact
      element={<Home/>}
    ></Route>
   </Routes>
   </>
  );
}

export default App;
