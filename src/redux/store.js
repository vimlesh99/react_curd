/** @format */

import { createStore, applyMiddleware, combineReducers } from "redux";

import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { loginReducer } from "./reducer/loginReducer";
import getDataReducer from "./reducer/getTableDtReducer";
const initialState = [];

const rootReducer = combineReducers({
  login: loginReducer,
  tableData:getDataReducer,
});
const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
