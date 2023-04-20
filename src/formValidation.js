
 export default  function formValidation(
    userName,
    mobieNo,
    inputEmail,
    indexOfSaveRow,
    arrayCheck,
    setInpError
  ) {
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
      for (let i = 0; i < arrayCheck.length; i++) {
        if (gmail === arrayCheck[i].mail && i !== indexOfSaveRow) {
          return false;
        }
      }
    }

    return returnValue;
  }