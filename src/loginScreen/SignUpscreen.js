/** @format */
import React, { useState } from "react";
import { app, db } from "../firebaseConfig";
import { ToastContainer, toast } from "react-toastify";
import "../../node_modules/react-toastify/dist/ReactToastify.min.css";
import "./formStyle.css";

import {
  getAuth,
  createUserWithEmailAndPassword,
 
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

import { addDoc, collection } from "firebase/firestore";
const SignUpScreen = () => {
  const [submitBtnDis, setSubmitBtnDis] = useState(false);
  const navigate = useNavigate();
  const [inputData, setInputeData] = useState({
    email: "",
    password: "",
    cnfpassword: "",
  });


  const [inpError, setInpError] = useState({
    erru: "d-none",
    erru2: "",
    errp: "d-none",
    errp2: "",
    errcp: "d-none",
    errcp2: "",
    errm: "d-none",
    errm2: "",
    errrole: "d-none",
    errrole2: "",
  });

  // form validation
  function formValidation(uname, inputEmail, password, cnfpassword, role, e) {
    var returnValue = true;

    // username validation
    if (uname === "" || IsUser(uname, e) === false) {
      setInpError((preVal) => {
        return { ...preVal, erru: "d-block" };
      });
      returnValue = false;
      if (uname === "") {
        setInpError((preVal) => {
          return { ...preVal, erru2: "*please enter your name" };
        });
      } else if (IsUser(uname) === false) {
        setInpError((preVal) => {
          return { ...preVal, erru2: "*Please enter correct name" };
        });
      }
    } else {
      setInpError((preVal) => {
        return { ...preVal, erru: "d-none" };
      });
    }

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

    //cnfpassword validation

    if (cnfpassword !== password || cnfpassword == "") {
      setInpError((preVal) => {
        return { ...preVal, errcp: "d-block" };
      });
      returnValue = false;
      if (password == "") {
        setInpError((preVal) => {
          return { ...preVal, errcp2: "*please enter your password" };
        });
      } else {
        setInpError((preVal) => {
          return { ...preVal, errcp2: "*Password not match" };
        });
      }
    } else {
      setInpError((preVal) => {
        return { ...preVal, errcp: "d-none" };
      });
    }

    // role validation

    if (role == "") {
      setInpError((preVal) => {
        return {
          ...preVal,
          errrole: "d-inline",
          errrole2: "*please select role",
        };

      });
      returnValue = false;
    } else {
      setInpError((preVal) => {
        return { ...preVal, errrole: "d-none" };
      });
    }

    function IsUser(uname, e) {
      let regex = /^[a-zA-Z\s]*$/;
      if (!regex.test(uname)) {
        return false;
      }
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

  const collectionRef = collection(db, "users");

  const auth = getAuth();

  const handelSubmitData = (e) => {
    console.log(inputData)
    if (
      formValidation(
        inputData.user_name,
        inputData.email,
        inputData.password,
        inputData.cnfpassword,
        inputData.role,
        e
      ) !== false
    ) {
      createUserWithEmailAndPassword(auth, inputData.email, inputData.password)
        .then((res) => {
          setSubmitBtnDis(true);
          console.log(res.user);
          const user = res.user;
          //  updateProfile(user,{
          //   displayName:value.name
          //  })

          navigate("/signin");
          addDoc(collectionRef, {
            userxname: inputData.user_name,
            email: inputData.email,
            password: inputData.password,
            role: inputData.role,
            tableData: [],
          })
            .then((res) => console.log(`data added :${res}`))
            .catch((err) => {
              console.log(err.message);
            });
        })
        .catch((err) => {
          toast(err.message);
        });
      setInputeData({
        email: "",
        password: "",
        cnfpassword: "",
        user_name: "",
        role: "",
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

  return (
    <div className="login_Container m-2 ">
      <div className="left_div">
        <h1 className="main_heading">Create account</h1>
        <br />

        <form className="input_form">
          <input
            className="data"
            type="text"
            name="user_name"
            id="user_name"
            placeholder="Name"
            onChange={getInputData}
            value={inputData.user_name}
          />
          <small className={`text-danger ms-1 ${inpError.erru}`}>
            {inpError.erru2}
          </small>
          <br />

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
            placeholder="password"
            name="password"
            onChange={getInputData}
            value={inputData.password}
          />
          <small className={`text-danger ms-1 ${inpError.errp}`}>
            {inpError.errp2}
          </small>
          <br />
          <input
            className="data"
            type="password"
            placeholder="repeat-password"
            name="cnfpassword"
            onChange={getInputData}
            value={inputData.cnfpassword}
          />
          <small className={`text-danger ms-1 ${inpError.errcp}`}>
            {inpError.errcp2}
          </small>
          <br />
          <p className="text-start w-75 ps-5 ms-3 mt-2 text-secondary m-0 ">
            {" "}
            Please select role
          </p>
          <div className="d-flex justify-content-around w-50">
            <span className="">
              <input type="radio" id="admin" onClick={getInputData} name="role" value="admin" />
              <label htmlFor="admin" className="text-center ms-1 align-top">
                admin
              </label>
            </span>

            <br />
            <span>
              <input type="radio" id="user" name="role" onClick={getInputData} value="user" />
              <label htmlFor="user" className="text-center ms-1 align-top">
                user
              </label>
            </span>

            <br />
          </div>
          <small className={`text-danger ms-1 ${inpError.errrole}`}>
            {inpError.errrole2}
          </small>
          <br />
          <button
            className="button-sign input_button"
            type="button"
            onClick={() => handelSubmitData()}
          >
            Sign up
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

        <span className="bottom-part">
          <small className="light_font">Have an account? </small>
          <Link to="/signin">Sign In</Link>
        </span>
      </div>
      <div className="right_div"></div>
    </div>
  );
};

export default SignUpScreen;
