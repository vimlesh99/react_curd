/** @format */

import { collection, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_FAIL, LOGOUT_SUCCESS } from "../actionType";
// import { app, db } from "./firebaseConfig";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { db } from "../../firebaseConfig";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_REQUEST,
    });

    const auth = getAuth();
    const signInReq = await signInWithEmailAndPassword(auth, email, password);
    
    const accessToken = await signInReq.user.accessToken;
    console.log(accessToken);
   const mail =   signInReq.user.email;
  

    const collectionRef = collection(db, "users");
    const mailQuery = query(collectionRef, where("email", "==", mail));

          const roleData = await getDocs(mailQuery)
           const rdata = roleData.docs.map((role)=>{
            return role.data().role
          })

    console.log('rdata :>> ', rdata);
    console.log('roleData :>> ', roleData);

    // onSnapshot(mailQuery, (data) => {
    
    //    const loginRoleData = data.docs.map((items) => {
    //       return {...items.data()}
    //     })
     
    //     let loginRole  = loginRoleData[0].role;

    //     sessionStorage.setItem("user-access-token",accessToken);
    //     sessionStorage.setItem("user-mail",email);
    //     sessionStorage.setItem("login-role",loginRole);

    //     dispatch({
    //         type: LOGIN_SUCCESS,
    //         payload: {accessToken,mail:email,loginRole},
    //       });
        
    // });
    let loginRole  = rdata[0];

    sessionStorage.setItem("user-access-token",accessToken);
    sessionStorage.setItem("user-mail",email);
    sessionStorage.setItem("login-role",loginRole);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: {accessToken,mail:email,loginRole},
    });
  




   
    // navigate("/home");


  }catch (error) {
    console.log(error.message);
    dispatch({
      type: LOGIN_FAIL,
      payload: error.message,
    });
  }
};



export const logOut = () =>async (dispatch)=>{

try{   const auth = getAuth();
        const logOutUser =await signOut(auth)
        
             
         sessionStorage.removeItem("user-access-token");
         sessionStorage.removeItem("user-mail");
         sessionStorage.removeItem("login-role");
       dispatch({
        type:LOGOUT_SUCCESS,
        payload:"user logout"
       })

}catch  (error){
  dispatch({
    type:LOGOUT_FAIL,
    payload:error.message
   })
}


}


