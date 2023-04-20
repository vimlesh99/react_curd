/** @format */

import React from "react";
import { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const FormData = ({ atrrArr }) => {
  const [
    show,
    setShow,
    setInpError,
    inpError,
    addUserData,
    userData,
    setUserData,
    saveUserData,
    loginRole
  ] = atrrArr;


const navigate = useNavigate()
  const getUserData = (e) => {
    let { name, value } = e.target;
    setUserData((prevVal) => {
      return {
        ...prevVal,
        [name]: value,
      };
    });
  };

  const path = useLocation();


  const nameImputHandel = (e) => {
    var charCode = e.key;
    let regex = /^[a-zA-Z\s]*$/;
    console.log(charCode);
    if (regex.test(charCode)) {
      setInpError((preVal) => {
        return { ...preVal, err1: "d-none" };
      });
      return true;
    } else {
      e.preventDefault();
      setInpError((preVal) => {
        return {
          ...preVal,
          err1: "d-block",
          err2: "please enter valid charecter",
        };
      });
    }
  };



  const cancelForm = () => {
    setInpError((preVal) => {
      return { ...preVal, err1: "d-none", errp: "d-none", errm: "d-none" };
    });
    navigate("/home")
    setShow((preVal) => {
      return { ...preVal, formShow: "d-none" , saveBtnShow: "d-none",  submitBtnShow: "d-inline",};
    });
    setUserData(() => {
      return { uname: "", phone: "", mail: "" };
    });
  };
  const numberImputHandel = (e) => {
    let numCode = e.charCode;
    console.log(numCode);
    if (numCode >= 48 && numCode < 58 && userData.phone?.length < 10) {
      setInpError((preVal) => {
        return { ...preVal, errp: "d-none" };
      });
      return true;
    } else {
      e.preventDefault();
      if (userData.phone?.length == 10) {
        setInpError((preVal) => {
          return { ...preVal, errp: "d-block", errp2: "only 10 digit" };
        });
        setTimeout(() => {
          setInpError((preVal) => {
            return { ...preVal, errp: "d-block", errp2: "" };
          });
        }, 2000);
      } else {
        setInpError((preVal) => {
          return {
            ...preVal,
            errp: "d-block",
            errp2: "please enter valid charecter",
          };
        });
      }
    }
  };

  useEffect(()=>{
    if(loginRole=="admin"){
      setShow((preVal) => {
        return {
          ...preVal,
          formShow: "d-block",
          saveBtnShow: "d-none",
          submitBtnShow: "d-inline",
        };
      });
    }else{
      setShow((preVal) => {
        return {
          ...preVal,
          formShow: "d-none",
          saveBtnShow: "d-none",
          submitBtnShow: "d-inline",
        };
      });
    }
  },[ ])
  return (
    <div
      className={`container d-flex justify-content-center flex-column align-items-center gap-5 mb-5 ${show.formShow}`}
    >
   {loginRole =="admin" &&( path.pathname == "/adduser"?<h1 className="text-"> Add user data</h1>:<h1 className="text-"> Edit user data</h1>)}
      <form className="row g-3 col-6">
        <div className="col-md-6">
          <label htmalfor="userName" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="userName"
            name="uname"
            onChange={getUserData}
            onKeyPress={nameImputHandel}
            value={userData.uname}
          />
          <small className={`text-danger ms-1 ${inpError.err1}`}>
            {inpError.err2}
          </small>
        </div>
        <div className="col-md-6">
          <label htmalfor="mobileNo" className="form-label">
            Mobile No.
          </label>
          <input
            type="number"
            className="form-control"
            id="mobileNo"
            name="phone"
            onChange={getUserData}
            onKeyPress={numberImputHandel}
            value={userData.phone}
          />
          <small className={`text-danger ms-1 ${inpError.errp}`}>
            {inpError.errp2}
          </small>
        </div>
        <div className="col-12">
          <label htmalfor="userMail" className="form-label">
            Mail
          </label>
          <input
            type="email"
            className="form-control"
            id="userMail"
            placeholder="1234 Main St"
            name="mail"
            onChange={getUserData}
            value={userData.mail}
          />
          <small className={`text-danger ms-1 ${inpError.errm}`}>
            {inpError.errm2}
          </small>
        </div>

        <div className="col-12  d-flex justify-content-between flex-row align-items-center">
       

          <div>
            <button type="button" className="btn btn-secondary " onClick={cancelForm}>
              Cancel
            </button>
            <button
              type="button"
              className={`btn btn-success ms-2 ${show.submitBtnShow}`}
              onClick={() =>{
                 addUserData()
                 }}
            >
              Submit
            </button>
            <button
             type="button"
              className={`btn btn-primary ms-2 ${show.saveBtnShow}`}
              onClick={() => saveUserData()}
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormData;
