/** @format */

import React, { useEffect, useState } from "react";

import "../../node_modules/react-toastify/dist/ReactToastify.css";
import "./formStyle.css";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { confirmPasswordReset, getAuth } from "firebase/auth";

const ResetPassword = ({toast}) => {
  const navigate = useNavigate();

  
  const [inputData, setInputeData] = useState({
    password: "",
    cnfpassword: "",
  });

  const [inpError, setInpError] = useState({
    errp: "d-none",
    errp2: "",
    errcp: "d-none",
    errcp2: "",
  });
  const query = useLocation();
  console.log('query :>> ', query.search);
   const q =new URLSearchParams(query.search);
   const oobCode = q.get('oobCode');
  console.log('oobCode :>> ', typeof(oobCode));

  // form validation
  function formValidation( password ,cnfpassword) {
    var returnValue = true;

  

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
          return { ...preVal, errp2: "*Password must have one upper case letter, special character and number" };
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


    // cnf password 
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
    

    function isPassword(password) {
      var regex =
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
      if (!regex.test(password)) {
        return false;
      }
    }

    return returnValue;
  }

  const handelSubmitSetPassword = () => {
    const auth = getAuth();

    if (formValidation( inputData.password ,inputData.cnfpassword) !== false) {
        console.log('oobCode :>> ', oobCode);
        confirmPasswordReset(auth,oobCode,inputData.password).then(()=>{
            toast("reset password success")
        navigate("/signin")
     }).catch((err)=>{
        toast.error(err.message, {
            position: "top-center",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
     })
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
    <div className="login_Container w-50 d-flex justify-content-center m-auto mt-5">
      <div className="left_div w-100">
        <h1 className="main_heading">Reset password</h1>
     
        <br />

        <form className="input_form" onClick={(e) => e.preventDefault()}>
        
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
          <small className={`text-danger ms-1 `}>
         * Password must have one upper case letter and one special character  and one number
          </small>
          <br />
          <input
            className="data"
            type="password"
            placeholder="Confirm-password"
            name="cnfpassword"
            onChange={getInputData}
            value={inputData.cnfpassword}
          />
          <small className={`text-danger ms-1 ${inpError.errcp}`}>
            {inpError.errcp2}
          </small>
          <br />
          <button
            className=" login_button input_button"
            type="submit"
            onClick={() => handelSubmitSetPassword()}
          >
            Save
          </button>
          
        </form>

        <span className="bottom-part text-center ms-3 ">
          <small className="light_font"></small>
          <Link to="/signin">Sign in?</Link>
          <br />
        </span>
      </div>
      {/* <div className="right_div"></div> */}
    </div>
  );
};

export default ResetPassword;
