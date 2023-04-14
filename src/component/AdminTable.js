/** @format */

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  IoChevronForwardOutline,
  IoCaretDownOutline,
  IoCaretUpOutline,
  IoChevronBack,
} from "react-icons/io5";
import { AiFillDelete, AiFillEdit, AiFillFileAdd } from "react-icons/ai";

const AdminNextTable = ({
  editForm,
  deleteRow,
  searchChar,
  newFirebaseData,
  addUser,
  setUserIdTable,
  setShow,
}) => {



  
  const adminFilterData = newFirebaseData.map((val) => {
    return val?.tableData.filter(
      (data) =>
        data.name?.toLowerCase().includes(searchChar) ||
        data.mobile?.toLowerCase().includes(searchChar) ||
        data.mail?.toLowerCase().includes(searchChar)
    );
  });
  console.log("adminFilterData :>> ", adminFilterData);
    console.log(newFirebaseData[0]?.id);




  return (
    <div>
      <div className="text-secondary mt-3 px-5 bg-body d-flex justify-content-between gap-5">
        <h3>Login role : Admin </h3>
        <h3></h3>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">User name</th>
            <th scope="col">ID</th>
            <th scope="col">
              <span className="d-flex align-items-center  gap-1 text-dark fw-bold">
                Name
                <span
                  className="d-flex flex-column "
                >
                  <IoCaretUpOutline />
                  <IoCaretDownOutline />
                </span>
              </span>
            </th>
            <th scope="col">Mobile No.</th>
            <th scope="col">
              <span className="d-flex align-items-center   gap-1 text-dark fw-bold">
                Gmail
                <span
                  className="d-flex flex-column "
                >
                  <IoCaretUpOutline />
                  <IoCaretDownOutline />
                </span>
              </span>
            </th>
            <th scope="col" className="text-center">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {adminFilterData.map((data, mainIndex) => {

            return   data.length ? 

           data.map((val, ind) => {
                return (
                  <tr key={val.id}>
                    <td>{newFirebaseData[mainIndex].username}</td>
                    <th scope="row">{val.id}</th>
                    <td>{val.name}</td>
                    <td>{val.mobile}</td>
                    <td>{val.mail}</td>
                    <td className="text-center">
                      <button
                        className="btn btn-warning me-2"
                        onClick={() => editForm(val.id, newFirebaseData[mainIndex].id)}
                      >
                        <AiFillEdit size={22} />
                      </button>
                      <button
                        className="btn btn-danger me-2"
                        onClick={() => deleteRow(val.id, newFirebaseData[mainIndex].id)}
                      >
                        <AiFillDelete size={22} />
                      </button>
                      <button
                        type="button"
                        className="btn btn-success  me-2"
                        onClick={() => {
                          setShow((preVal) => {
                            return { ...preVal, formShow: "d-block" };
                          });
                          setUserIdTable(() => newFirebaseData[mainIndex].id);
                        }}
                      >
                        <AiFillFileAdd size={22} />
                      </button>
                    </td>
                  </tr>
                );
              }):<tr>
                    <td>{data.username}</td>
                    <th scope="row">no data</th>
                    <td>no data</td>
                    <td>no data</td>
                    <td>user dose not have data</td>
                    <td className="text-center">
                      <button
                        type="button"
                        className="btn btn-success  me-2"
                        onClick={() => {
                          setShow((preVal) => {
                            return { ...preVal, formShow: "d-block" };
                          });
                          setUserIdTable(() => newFirebaseData[mainIndex].id);
                        }}
                      >
                        <AiFillFileAdd size={22} />
                      </button>
                    </td>
                  </tr>
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AdminNextTable;
