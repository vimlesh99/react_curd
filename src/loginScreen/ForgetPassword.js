/** @format */

import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "../../node_modules/react-toastify/dist/ReactToastify.css";
import "./formStyle.css";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select, Divider } from "antd";
const ForgetScreen = () => {
  const navigate = useNavigate();

  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [inputData, setInputeData] = useState({
    email: "",
  });

  const [inpError, setInpError] = useState({
    errp: "d-none",
    errp2: "",
    errm: "d-none",
    errm2: "",
    errL: "d-none",
    errLogin: "",
  });

  // form validation
  function formValidation(inputEmail) {
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

    function IsEmail(email) {
      var regex =
        /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      if (!regex.test(email)) {
        return false;
      }
    }

    return returnValue;
  }

  const handelSubmitReset = () => {
    if (formValidation(inputData.email) !== false) {
      const auth = getAuth();
      sendPasswordResetEmail(auth, inputData.email)
        .then(() => {
          toast.success("mail request success for forget password", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });

          navigate("/signin");
          setInputeData({
            email: "",
          });
        })
        .catch((error) => {
          toast.success(error.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          // ..
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
    console.log("values.email :>> ", values.email);
    console.log("Received values of form: ", values);
  };

  return (
    <div className="login_Container w-50 d-flex justify-content-center m-auto mt-5">
      <div>
        <h1 className="main_heading">Forget password</h1>
        <small className="light_font"></small>
        <br />

        {false && (
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

            <br />
            <small className={`text-danger ms-1 ${inpError.errL}`}>
              {inpError.errLogin}
            </small>
            <br />
            <button
              className=" login_button input_button"
              type="submit"
              onClick={() => handelSubmitReset()}
            >
              Reset password
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
        )}
        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          style={{
            maxWidth: 800,
          }}
          scrollToFirstError
        >
          <Form.Item
            name="email"
            extra="Forget password then input your mail and get a reset mail"
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
            <Input placeholder="email" prefix={<MailOutlined />} />
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" block>
              <span style={{ color: "white" }}>Reset</span>
            </Button>
          </Form.Item>
        </Form>

        <span className="d-flex justify-content-center mt-5 pb-5 ">
          <Link to="/signin">Sign in</Link>
        </span>
      </div>
      {/* <div className="right_div"></div> */}
    </div>
  );
};

export default ForgetScreen;
