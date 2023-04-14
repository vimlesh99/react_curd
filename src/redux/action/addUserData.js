/** @format */

import { db } from "../../firebaseConfig";
import {
  ADDUSER_DATA_FAIL,
  ADDUSER_DATA_REQUEST,
  ADDUSER_DATA_SUCCESS,
} from "../actionType";
import {
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
export const addUserDataTable = (id, newUser) => async (dispatch) => {
  try {
    dispatch({
      type: ADDUSER_DATA_REQUEST,
    });

    const docToUpdate = doc(db, "users", id);

          const successUpdate = await updateDoc(docToUpdate, {
          tableData: newUser,
        });
        // console.log('updatedData :>> ', updatedData);
        // dispatch({
        //   type: ADDUSER_DATA_SUCCESS,
        //   payload:""
        // })
  } catch (err) {
    dispatch({
      type: ADDUSER_DATA_FAIL,
      payload: err.message,
    });
  }
};
