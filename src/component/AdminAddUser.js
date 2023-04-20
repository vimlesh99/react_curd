/** @format */

import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Form,
  Input,
  Select,
  Divider,
  InputNumber
} from "antd";

import {
  MailOutlined,
  LockOutlined,
  UserOutlined

} from "@ant-design/icons";

const AdminAddUserData = ({ atrrArr }) => {
  const [
    show,
    setShow,
    setInpError,
    inpError,
    addUserData,
    userData,
    setUserData,
    saveUserData,
    loginRole,setUserIdTable,editUserData
  ] = atrrArr;


  const {id,tableid} = useParams();
  console.log('tableid :>> ', tableid);
 


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
 console.log('path.pathname :>> ', path.pathname);

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

  const tableData = useSelector((state) => state.tableData?.tableAllData);
  console.log('tbData :>> ', tableData);

  const cancelForm = () => {
    setInpError((preVal) => {
      return { ...preVal, err1: "d-none", errp: "d-none", errm: "d-none" };
    });
    navigate("/home")
    setShow((preVal) => {
      return { formShow: "d-none",
      saveBtnShow: "d-none",
      submitBtnShow: "d-block",};
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
    setUserIdTable(()=>id)
   

},[ ])

useEffect(()=>{
  editUserData(tableid,id)
},[tableData])

  useEffect(()=>{
    if(loginRole=="admin" && path.pathname == `/adduser/${id}`){
      setShow((preVal) => {
        return {
          formShow: "d-block",
          saveBtnShow: "d-none",
          submitBtnShow: "d-inline",
        };
      });
    }else if(loginRole=="admin" && path.pathname == `/editdata/${id}/${tableid}`){
        
            setShow((preVal) => {
              return {
                ...preVal,
                formShow: "d-block",
                saveBtnShow: "d-inline",
                submitBtnShow: "d-none",
              };
            });
          
    }
    else{
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

  // use antd 
  const { Option } = Select;

  const formItemLayout = {
   
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 24,
      },
      md:{
        span:24,
      },
      lg:{
        span:24,
      }
    },
  };

  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 10,
      },
      sm: {
        span: 24,
        offset: 0,
      },
    },
  };

  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('values.email :>> ', values.email);
    console.log("Received values of form: ", values);
  
  };

  return (
    <div
      className={`container d-flex justify-content-center flex-column align-items-center gap-5 mb-5 ${show.formShow}`}
    >
   {loginRole =="admin" &&( path.pathname == `/adduser/${id}`?<h1 className="text-"> Add user data</h1>:<h1 className="text-"> Edit user data</h1>)}
   <Form
    {...formItemLayout}
    form={form}
    name="register"
    onFinish={onFinish}
    style={{
      maxWidth: 1200,
      
    }}
    scrollToFirstError
  >
   <Form.Item
      name="name"
      rules={[
        {
          type: "text",
          message: "The input is not valid username!",
        },
        {
          required: true,
          message: "Please input your name!",
        },
      ]}
    >
      <Input placeholder="name" prefix={<UserOutlined />} />
    </Form.Item>

    <Form.Item
      name="phone"
      rules={[
        {
          type: "number",
          message: "The input is not valid mobile number!",
        },
        {
          required: true,
          message: "Please input your mobile number!",
        },
      ]}
    >
      <Input placeholder="mobile number"  max={10} prefix={<UserOutlined />} />
    </Form.Item>
      
   <Form.Item
      name="email"
      
      rules={[
        {
          type: "email",
          message: "The input is not valid E-mail!",
        },
        {
          required: true,
          message: "Please input your E-mail!",
        },
      ]}
    >
      <Input placeholder="email" prefix={<MailOutlined />}  />
    </Form.Item>



    <Divider orientation="right" plain>
    <span className="text-end"><Link  to="/forgetpassword">Forget password?</Link></span>
    </Divider>
   
    <Form.Item {...tailFormItemLayout}>
      <Button type="primary" htmlType="submit" block >
        <span style={{color:"white"}}>Sign In</span>
      </Button>
    </Form.Item>
  </Form>

    {false &&  <form className="row g-3 col-6">
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
                 addUserData(id)
                 }}
            >
              Submit
            </button>
            <button
             type="button"
              className={`btn btn-primary ms-2 ${show.saveBtnShow}`}
              onClick={() => saveUserData(id)}
            >
              Save
            </button>
          </div>
        </div>
      </form>}
    </div>
  );
};

export default AdminAddUserData;
