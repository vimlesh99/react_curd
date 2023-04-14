/** @format */

import React, { useEffect, useState } from "react";

import Datatable from "../component/Table";
import Userform from "../component/UserForm";
import { useDispatch, useSelector } from "react-redux";
import getTableData from "../redux/action/getTableData";
import { addUserDataTable } from "../redux/action/addUserData";
import { useNavigate } from "react-router-dom";
import { logOut } from "../redux/action/loginUser";

import AdminOneTable from "../component/AdminOneTable";

function Home() {
  const [userData, setUserData] = useState({ uname: "", phone: "", mail: "" ,userId:"" });

  const[userIdOfTable , setUserIdTable]  = useState("");

  const [editIndex, setEditIndex] = useState();
  const [searchChar, setSearch] = useState("");

  const [inpError, setInpError] = useState({
    err1: "d-none",
    err2: "",
    errp: "d-none",
    errp2: "",
    errm: "d-none",
    errm2: "",
    errm3: "",
  });

  const [show, setShow] = useState({
    formShow: "d-none",
    saveBtnShow: "d-none",
    submitBtnShow: "d-inline-block",
  });

  function formValidation(userName, mobieNo, inputEmail, indexOfSaveRow) {
    console.log(indexOfSaveRow);
    var returnValue = true;
    // name validation
    if (userName === "" || IsName(userName) === false) {
      setInpError((preVal) => {
        return { ...preVal, err1: "d-block" };
      });
      if (userName === "") {
        setInpError((preVal) => {
          return { ...preVal, err2: "Please enter name" };
        });
      } else {
        setInpError((preVal) => {
          return { ...preVal, err2: "Please enter correct name" };
        });
      }
      returnValue = false;
    } else {
      setInpError((preVal) => {
        return { ...preVal, err1: "d-none", err2: "" };
      });
    }

    // phone number validation

    if (mobieNo === "" || IsPhone(mobieNo) === false) {
      setInpError((preVal) => {
        return { ...preVal, errp: "d-block" };
      });
      if (mobieNo === "") {
        setInpError((preVal) => {
          return { ...preVal, errp2: "please enter your phone number" };
        });
      } else {
        setInpError((preVal) => {
          return { ...preVal, errp2: "Please enter correct number" };
        });
      }
      returnValue = false;
    } else {
      setInpError((preVal) => {
        return { ...preVal, errp: "d-none" };
      });
    }

    // mail validation

    if (
      inputEmail === "" ||
      IsEmail(inputEmail) === false ||
      mailExist(inputEmail) === false
    ) {
      setInpError((preVal) => {
        return { ...preVal, errm: "d-block" };
      });
      returnValue = false;
      if (inputEmail === "") {
        setInpError((preVal) => {
          return { ...preVal, errm2: "please enter your mail" };
        });
      } else if (IsEmail(inputEmail) === false) {
        setInpError((preVal) => {
          return { ...preVal, errm2: "Please enter correct mail" };
        });
      } else {
        setInpError((preVal) => {
          return { ...preVal, errm2: "mail already exsit" };
        });
      }
    } else {
      setInpError((preVal) => {
        return { ...preVal, errm: "d-none" };
      });
    }

    function IsName(name) {
      let regex = /^[a-zA-Z\s]*$/;
      // let regex = /^[a-z]+\s[a-z ]+$/i;
      if (!regex.test(name)) {
        return false;
      }
    }
    function IsPhone(phone) {
      let regex = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/;
      if (!regex.test(phone)) {
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

    function mailExist(gmail) {
      for (let i = 0; i < userArrayData.length; i++) {
        if (gmail === userArrayData[i].mail && i !== indexOfSaveRow) {
          return false;
        }
      }
    }

    return returnValue;
  }

  // use redux
  const{ accessToken,mail,loginRole }= useSelector((state) => state.login.accessToken);

  console.log(`mail=>${mail} role=>${loginRole}`)

  const tbData = useSelector((state) => state.tableData?.tableAllData);

   const userArrayData = tbData;
   let userDataId = tbData[0]?.id;
      
  const dispatch = useDispatch();

  

  const addUserData = () => {
 console.log("run addUserData")
   console.log('userIdOfTable :>> ', userIdOfTable);
    setShow((preVal) => {
      return {
        ...preVal,
        formShow: "d-block",
        saveBtnShow: "d-none",
        submitBtnShow: "d-inline",
      };
    });
    const { uname, phone, mail ,userId } = userData;

    let userDataId =loginRole =="user"? tbData[0]?.id:userIdOfTable;
     
    console.log('userDataId :>> ', userDataId);
    const adminPrevDataArr = tbData?.filter(data=> data.id == userDataId)
   
    let prevData = adminPrevDataArr[0]?.tableData
    console.log(prevData)
  console.log(tbData)
  console.log(userDataId)
  console.log(adminPrevDataArr)

    if (formValidation(uname, phone, mail) !== false) {
      const newUser = [ ...prevData,
        {
          id: Math.floor(phone.toString().slice(0, 5) * Math.random()),
          name: uname,
          mobile: phone,
          mail,
        },
      ];

      dispatch(addUserDataTable(userDataId, newUser));

      setUserData(() => {
        return { uname: "", phone: "", mail: "" ,userId:"" };
      });
      setShow((preVal) => {
        return { ...preVal, formShow: "d-none" };
      });
    }
  };

  const editUserData = (id , editUserId) => {
    

    const adminPrevDataArr = tbData?.filter(data=> data.id == editUserId)
    const editArr = adminPrevDataArr[0]?.tableData
    setShow((preVal) => {
      return {
        ...preVal,
        formShow: "d-block",
        saveBtnShow: "d-inline",
        submitBtnShow: "d-none",
      };
    });
    setUserIdTable(()=>editUserId)
    for (let i = 0; i < editArr.length; i++) {
      if (editArr[i].id == id) {
        setUserData(() => {
          return {
            uname: editArr[i].name,
            phone: editArr[i].mobile,
            mail: editArr[i].mail
          };
        });
        setEditIndex(i);
      }
    }
  };


  const saveUserData = () => {
    const { uname, phone, mail  } = userData;
    console.log(userIdOfTable)
    
    console.log(editIndex);
    if (formValidation(uname, phone, mail, editIndex) !== false) {
      console.log('tbData :>> ', tbData);
      const admineditDataArr = tbData?.filter(data => data.id === userIdOfTable)
      console.log(admineditDataArr)
      const saveArr = admineditDataArr[0].tableData

     console.log(saveArr)

      let editVal = (saveArr[editIndex] = {
        id: saveArr[editIndex].id,
        name: uname,
        mobile: phone,
        mail: mail,
      });
      
      console.log(editVal)
      console.log(tbData)
      saveArr.splice(editIndex, 1, editVal);

      setUserData(() => {
        return { uname: "", phone: "", mail: ""  };
      });
      setShow((preVal) => {
        return {
          ...preVal,
          formShow: "d-none",
          saveBtnShow: "d-none",
          submitBtnShow: "d-inline",
        };
      });
      dispatch(addUserDataTable(userIdOfTable, saveArr));
    }

    
    // console.log(saveArr);
  };

  const deleteRow = (id ,deleteUserId) => {
    const adminDeleteDataArr = tbData?.filter(data => data.id === deleteUserId)
      console.log(adminDeleteDataArr)
      const saveArr = adminDeleteDataArr[0].tableData

    if (window.confirm("are you sure want to delete") == true) {
      let updateData = saveArr.filter((data) => data.id !== id);
      dispatch(addUserDataTable(deleteUserId, updateData));
      console.log(updateData);
    } else {
      return false;
    }
  };

  
  const atrrArr = [
    show,
    setShow,
    setInpError,
    inpError,
    addUserData,
    userData,
    setUserData,
    saveUserData,
    loginRole
  ];


const navigate = useNavigate();
  const searchVal = (e) => {
    setSearch(e.target.value);
    console.log(searchChar);
  };

  useEffect(() => {
    dispatch(getTableData(mail,loginRole));
  },[ accessToken]);
  
  useEffect(() => {
    if (accessToken) {
      navigate("/home");
    }else{
      navigate("/signin");
    }
  },[accessToken, navigate]);

  return (
    <div className="container mt-5">
      <Userform atrrArr={atrrArr} />
      <div className="mt-5 d-flex  justify-content-between">
      <button
          className="btn btn-danger ms-3"
          onClick={() =>
          dispatch(logOut())
          }
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
       {loginRole=== "user" &&<button
          className="btn btn-primary ms-3"
          onClick={() =>
            setShow((preVal) => {
              return { ...preVal, formShow: "d-block" };
            })
          }
        >
          ADD USER
        </button>}
        </div>
       
      </div>
      {loginRole=== "user" && userArrayData?.map((arrayData)=>{
        return<Datatable
        editForm={editUserData}
        newFirebaseData={arrayData}
        deleteRow={deleteRow}
        searchChar={searchChar.trim()}
      />})}
      {/* {loginRole=== "admin" && 
      userArrayData?.map((arrayData)=>{
        return<AdminDatatable
        editForm={editUserData}
        newFirebaseData={arrayData}
        deleteRow={deleteRow}
        searchChar={searchChar.trim()}
      />})
      
      } */}
      {loginRole=== "admin" && 
     
      <AdminOneTable
        editForm={editUserData}
        newFirebaseData={userArrayData}
        deleteRow={deleteRow}
        searchChar={searchChar.trim()}
        addUser={addUserData}
        setUserIdTable={setUserIdTable}
        setShow={setShow}
      />
      }



    </div>
  );
}

export default Home;
