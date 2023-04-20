/** @format */

import React, { useEffect, useState } from "react";

import Datatable from "../component/Table";
import Userform from "../component/UserForm";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../redux/action/loginUser";
import AdminNextTable from "../component/AdminTable";

function Home({requiredArrib}){

const [setUserIdTable ,show, setShow ,userData, setUserData ,inpError, setInpError , searchChar, setSearch ,addUserData,editUserData , saveUserData ,deleteRow ] = requiredArrib;

 
 

  // use redux
  const { accessToken, mail, loginRole } = useSelector(
    (state) => state.login.accessToken
  );

  console.log(`mail=>${mail} role=>${loginRole}`);

  const tbData = useSelector((state) => state.tableData?.tableAllData);

  const userArrayData = tbData;

  const dispatch = useDispatch();


  const atrrArr = [
    show,
    setShow,
    setInpError,
    inpError,
    addUserData,
    userData,
    setUserData,
    saveUserData,
    loginRole,
  ];

  const navigate = useNavigate();
  const searchVal = (e) => {
    setSearch(e.target.value);
  };

 

  useEffect(() => {
    if (accessToken) {
      navigate("/home");
    } else {
      navigate("/signin");
    }
  }, [accessToken, navigate]);

  return (
    <div className="container mt-5">
     {loginRole == "user" && <Userform atrrArr={atrrArr} />}
      <div className="mt-5 d-flex  justify-content-between">
        <button
          className="btn btn-danger ms-3"
          onClick={() => dispatch(logOut())}
        >
          SIGN OUT
        </button>
        <div className=" d-flex  justify-content-end">
          <input
            class="border text-dark ps-3 "
            onChange={searchVal}
            type="search"
            placeholder="Search"
            id="search_box"
          />
          {loginRole === "user" && (
            <button
              className="btn btn-primary ms-3"
              onClick={() =>
                setShow((preVal) => {
                  return { ...preVal, formShow: "d-block" };
                })
              }
            >
              ADD USER
            </button>
          )}
        </div>
      </div>
      {loginRole === "user" &&
        userArrayData?.map((arrayData) => {
          return (
            <Datatable
              editForm={editUserData}
              newFirebaseData={arrayData}
              deleteRow={deleteRow}
              searchChar={searchChar.trim()}
            />
          );
        })}
      {loginRole === "admin" && (
        <AdminNextTable
          editForm={editUserData}
          newFirebaseData={userArrayData}
          deleteRow={deleteRow}
          searchChar={searchChar.trim()}
          addUser={addUserData}
          setUserIdTable={setUserIdTable}
          setShow={setShow}
        />
      )}
      {/* {loginRole=== "admin" && 
     
      <AdminOneTable
        editForm={editUserData}
        newFirebaseData={userArrayData}
        deleteRow={deleteRow}
        searchChar={searchChar.trim()}
        addUser={addUserData}
        setUserIdTable={setUserIdTable}
        setShow={setShow}
      />
      } */}
    </div>
  );
}

export default Home;
