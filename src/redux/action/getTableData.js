/** @format */

import { db } from "../../firebaseConfig";
import {
  GET_TABLE_DATA_REQUEST,
  GET_TABLE_DATA_FAIL,
  GET_TABLE_DATA_SUCCESS,
} from "../actionType";
import { collection, where, query, onSnapshot } from "firebase/firestore";

const getTableData = (mail, role) => async (dispatch) => {
  console.log("role :>> ", role);
  try {
    dispatch({
      type: GET_TABLE_DATA_REQUEST,
    });

    const collectionRef = collection(db, "users");
    // const tableDt = await getDocs(collectionRef);

    if (role === "admin") {
      console.log("role :>> ", role);
      const mailQuery = query(collectionRef, where("role", "==", "user"));
      onSnapshot(mailQuery, (data) => {
        const tableItems = data.docs.map((items) => {
          return { ...items.data(), id: items.id };
        });
        console.log(tableItems);
        dispatch({
          type: GET_TABLE_DATA_SUCCESS,
          payload: tableItems,
        });
      });
    } else if (role === "user") {
      console.log("role :>> ", role);
      const mailQuery = query(collectionRef, where("email", "==", mail));

      onSnapshot(mailQuery, (data) => {
        const tableItems = data.docs.map((items) => {
          return { ...items.data(), id: items.id };
        });
        dispatch({
          type: GET_TABLE_DATA_SUCCESS,
          payload: tableItems,
        });
      });
    }

    // const tableItems = tableDt.docs.map((item) => {
    //   return {
    //     ...item.data(),
    //     id: item.id,
    //   };
    // });
    // console.log(tableItems);
  } catch (err) {
    console.log(err.message);
    dispatch({
      type: GET_TABLE_DATA_FAIL,
      payload: err.message,
    });
  }
};

export default getTableData;
