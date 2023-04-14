/** @format */

import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "../../node_modules/react-toastify/dist/ReactToastify.css";
import "./formStyle.css";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/action/loginUser";

const SignInScreen = () => {
  const navigate = useNavigate();

  const loginSt = useSelector((state) => state.login);
  
 let getAccessToken = loginSt.accessToken?.accessToken;
  const [inputData, setInputeData] = useState({
    email: "",
    password: "",
  });

  const [inpError, setInpError] = useState({
    errp: "d-none",
    errp2: "",
    errm: "d-none",
    errm2: "",
    errL:"d-none",
    errLogin:""
  });

  // form validation
  function formValidation(inputEmail, password) {
    var returnValue = true;

    // mail validation

    if (inputEmail === "" || IsEmail(inputEmail) === false) {
      setInpError((preVal) => {
        return { ...preVal, errm: "d-block" };
      });
      returnValue = false;
      if (inputEmail === "") {
        setInpError((preVal) => {
          return { ...preVal, errm2: "*please enter your mail" };
        });
      } else if (IsEmail(inputEmail) === false) {
        setInpError((preVal) => {
          return { ...preVal, errm2: "*Please enter correct mail" };
        });
      }
    } else {
      setInpError((preVal) => {
        return { ...preVal, errm: "d-none" };
      });
    }

    //password validation
    if (
      password === "" ||
      isPassword(password) === false ||
      password.length <= 8
    ) {
      setInpError((preVal) => {
        return { ...preVal, errp: "d-block" };
      });
      returnValue = false;
      if (password === "") {
        setInpError((preVal) => {
          return { ...preVal, errp2: "*please enter your password" };
        });
      } else if (isPassword(password) === false) {
        setInpError((preVal) => {
          return { ...preVal, errp2: "*Please enter correct password" };
        });
      } else {
        setInpError((preVal) => {
          return { ...preVal, errp2: "*Password is too short" };
        });
      }
    } else {
      setInpError((preVal) => {
        return { ...preVal, errp: "d-none" };
      });
    }

    function IsEmail(email) {
      var regex =
        /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      if (!regex.test(email)) {
        return false;
      }
    }

    function isPassword(password) {
      var regex =
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
      if (!regex.test(password)) {
        return false;
      }
    }

    return returnValue;
  }

  const dispatch = useDispatch();

  const handelSubmitSignIn = () => {
    
    if (formValidation(inputData.email, inputData.password) !== false) {
      dispatch(login(inputData.email, inputData.password));
      setInpError((preVal)=>{
        return{
          ...preVal,errLogin:loginSt?.error,errL:"d-inline"
        }
      })
      setInputeData({
        email: "",
        password: "",
        cnfpassword: "",
      });
    }
  };

  const getInputData = (e) => {
    let { name, value } = e.target;
    setInputeData((prevVal) => {
      return {
        ...prevVal,
        [name]: value,
      };
    });
  };

  useEffect(() => {
    if (getAccessToken) {
      navigate("/home");
    }else{
      navigate("/signin");
    }
  },[getAccessToken, navigate]);

  useEffect(()=>{
    if(loginSt.error){
    toast(loginSt.error)}
  },[loginSt.error])

  return (
    <div className="login_Container w-50 d-flex justify-content-center m-auto mt-5">
      <div className="left_div w-100">
        <h1 className="main_heading">Welcome, again</h1>
        <small className="light_font">
          Please signin to open your table data
        </small>
        <br />

        <form className="input_form" onClick={(e) => e.preventDefault()}>
          <input
            className="data"
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            onChange={getInputData}
            value={inputData.email}
          />
          <small className={`text-danger ms-1 ${inpError.errm}`}>
            {inpError.errm2}
          </small>
          <br />
          <input
            className="data"
            type="password"
            placeholder="Password"
            name="password"
            onChange={getInputData}
            value={inputData.password}
          />
          <small className={`text-danger ms-1 ${inpError.errp}`}>
            {inpError.errp2}
          </small>
          <br />
          <small className={`text-danger ms-1 ${inpError.errL}`}>
            {inpError.errLogin}
          </small>
          <br />
          <button
            className=" login_button input_button"
            type="submit"
            onClick={() => handelSubmitSignIn()}
          >
            Login in
          </button>
          <ToastContainer
            position="top-center"
            autoClose={4000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </form>

        <span className="bottom-part ">
          <small className="light_font">Don't have an account? </small>
          <Link to="/">Sign up</Link>
        </span>
      </div>
      {/* <div className="right_div"></div> */}
    </div>
  );
};

export default SignInScreen;
