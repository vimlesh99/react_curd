
import {
    LOGIN_FAIL,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
   
  } from "../actionType";
  
  let accessToken=sessionStorage.getItem("user-access-token");
  let mail=sessionStorage.getItem("user-mail");
  let loginRole=sessionStorage.getItem("login-role");
  const accessTokenData = {accessToken ,mail,loginRole}
  const initialState = {
    accessToken:sessionStorage.getItem("user-access-token")?accessTokenData:{},
    loading: false,
    error:""
  };
  
  export const loginReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
      case LOGIN_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case LOGIN_SUCCESS:
        return {
          ...state,
          accessToken: payload,
          loading: false,
        };
      case LOGIN_FAIL:
        return {
          
          ...state,
          loading: false,
          error: payload,
        };

        case LOGOUT_SUCCESS:
          return{
             ...state,
             accessToken:{},
             error:null
          } 
      
      default:
        return state;
    }
  };
  
  