/** @format */

import {
  GET_TABLE_DATA_REQUEST,
  GET_TABLE_DATA_FAIL,
  GET_TABLE_DATA_SUCCESS,
} from "../actionType";

const initialState = {
  tableAllData: [],
  loading: false,
  error: "",
};

const getDataReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_TABLE_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_TABLE_DATA_SUCCESS:
      return {
        ...state,
        tableAllData: payload,
        loading: false,
      };

    case GET_TABLE_DATA_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
};

export default getDataReducer;