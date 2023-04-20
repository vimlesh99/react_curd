import { useEffect, useState } from "react";
import { Route, Routes, useNavigate, } from 'react-router-dom'
import SignUpScreen from '../loginScreen/SignUpscreen'
import SignInScreen from '../loginScreen/SignInScreen'
import ResetPassword from '../loginScreen/Resetpassword'
import AdminAddUserData from './AdminAddUser'
import Home from '../homeScreen/Home';
import { addUserDataTable } from "../redux/action/addUserData";
import formValidation from "../formValidation";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import getTableData from "../redux/action/getTableData";
import ForgetScreen from "../loginScreen/ForgetPassword";

const AllRoutes = () => {

    const [show, setShow] = useState({
        formShow: "d-none",
        saveBtnShow: "d-none",
        submitBtnShow: "d-inline-block",
      });
    
      const [userIdOfTable, setUserIdTable] = useState("");
    
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
    
      const [userData, setUserData] = useState({
        uname: "",
        phone: "",
        mail: "",
        userId: "",
      });
    
     
    
      // use redux
      const { accessToken, mail, loginRole } = useSelector(
        (state) => state.login.accessToken
      );
    
      const tbData = useSelector((state) => state.tableData?.tableAllData);
    
      let userDataId = tbData[0]?.id;
    
      const dispatch = useDispatch();
    
      // add user  data
      const addUserData = () => {
        setShow((preVal) => {
          return {
            ...preVal,
            formShow: "d-block",
            saveBtnShow: "d-none",
            submitBtnShow: "d-inline",
          };
        });
        const { uname, phone, mail } = userData;
    
        let userDataId = loginRole == "user" ? tbData[0]?.id : userIdOfTable;
    
        const adminPrevDataArr = tbData?.filter((data) => data.id == userDataId);
    
        let prevData = adminPrevDataArr[0]?.tableData;
    
        if (formValidation(uname, phone, mail, editIndex, prevData ,setInpError) !== false) {
          const newUser = [
            ...prevData,
            {
              id: Math.floor(phone.toString().slice(0, 5) * Math.random()),
              name: uname,
              mobile: phone,
              mail,
            },
          ];
    
          dispatch(addUserDataTable(userDataId, newUser));
          toast.success("Add data successfully", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
    
          setUserData(() => {
            return { uname: "", phone: "", mail: "", userId: "" };
          });
          setShow((preVal) => {
            return { ...preVal, formShow: "d-none" };
          });
          navigate("/home");
        }
      };
      // edit user data
      const editUserData = (id, editUserId) => {
    
        const adminPrevDataArr = tbData?.filter((data) => data.id == editUserId);
        const editArr = adminPrevDataArr[0]?.tableData;
        setShow((preVal) => {
          return {
            formShow: "d-block",
            saveBtnShow: "d-inline",
            submitBtnShow: "d-none",
          };
        });
        setUserIdTable(() => editUserId);
        for (let i = 0; i < editArr?.length; i++) {
          if (editArr[i].id == id) {
            setUserData(() => {
              return {
                uname: editArr[i].name,
                phone: editArr[i].mobile,
                mail: editArr[i].mail,
              };
            });
            setEditIndex(i);
          }
        }
      };
    
      // save user data
    
      const saveUserData = () => {
        const { uname, phone, mail } = userData;
        const adminPrevDataArr = tbData?.filter((data) => data.id == userDataId);
    
        let prevData = adminPrevDataArr[0]?.tableData;
        if (formValidation(uname, phone, mail, editIndex, prevData) !== false) {
          const admineditDataArr = tbData?.filter(
            (data) => data.id === userIdOfTable
          );
          const saveArr = admineditDataArr[0].tableData;
    
    
          let editVal = (saveArr[editIndex] = {
            id: saveArr[editIndex].id,
            name: uname,
            mobile: phone,
            mail: mail,
          });
    
          saveArr.splice(editIndex, 1, editVal);
    
          setUserData(() => {
            return { uname: "", phone: "", mail: "" };
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
          navigate("/home");
        }
    
      };
    
      // delete user data
      const deleteRow = (id, deleteUserId) => {
        const adminDeleteDataArr = tbData?.filter(
          (data) => data.id === deleteUserId
        );
        const saveArr = adminDeleteDataArr[0].tableData;
    
        if (window.confirm("are you sure want to delete") == true) {
          let updateData = saveArr.filter((data) => data.id !== id);
          dispatch(addUserDataTable(deleteUserId, updateData));
        } else {
          return false;
        }
      };
    
      const navigate = useNavigate();
    
      useEffect(() => {
        dispatch(getTableData(mail, loginRole));
      }, [accessToken]);
    
      useEffect(() => {
        if (!accessToken) {
          navigate("/signin");
        }
      }, [accessToken]);
    
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
        setUserIdTable,
        editUserData,
      ];
    
      const requiredArrib = [
        setUserIdTable,
        show,
        setShow,
        userData,
        setUserData,
        inpError,
        setInpError,
        searchChar,
        setSearch,
        addUserData,
        editUserData,
        saveUserData,
        deleteRow,
      ];
  return (
    <div>
      <Routes>
        <Route
          path="/signup"
          exact
          element={<SignUpScreen toast={toast} />}
        ></Route>
        <Route
          path="/signin"
          exact
          element={<SignInScreen toast={toast} />}
        ></Route>
        <Route path="/forgetpassword" exact element={<ForgetScreen />}></Route>
        <Route
          path="/reset-password"
          exact
          element={<ResetPassword toast={toast} />}
        ></Route>
        <Route
          path="/home"
          exact
          element={<Home requiredArrib={requiredArrib} />}
        ></Route>
        <Route
          path="/adduser/:id"
          exact
          element={
            <div className="container mt-5">
              <AdminAddUserData atrrArr={atrrArr} />
            </div>
          }
        ></Route>
        <Route
          path="/editdata/:id/:tableid"
          exact
          element={
            <div className="container mt-5">
              <AdminAddUserData atrrArr={atrrArr} />
            </div>
          }
        ></Route>
      </Routes>
    </div>
  )
}

export default AllRoutes
