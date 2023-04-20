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
import { useNavigate } from "react-router-dom";

const AdminOneTable = ({
  editForm,
  deleteRow,
  searchChar,
  newFirebaseData,
  addUser,
  setUserIdTable,
  setShow,
}) => {
  const [pageInd, setPageInd] = useState(0);
  const [pageArr, setPageArr] = useState([]);
  const [isDesending, setIsDesending] = useState(true);
  const [isDesendingMail, setIsDesendingMail] = useState(true);

  const [filterData, setfilterData] = useState([]);

  const userArrayData = newFirebaseData?.tableData;

  const filterDataFunc = () => {
    const filterDt = userArrayData?.filter(
      (data) =>
        data.name?.toLowerCase().includes(searchChar) ||
        data.mobile?.toLowerCase().includes(searchChar) ||
        data.mail?.toLowerCase().includes(searchChar)
    );
    setfilterData(() => filterDt);
  };

  const adminFilterData = newFirebaseData.map((val) => {
    return val?.tableData.filter(
      (data) =>
        data.name?.toLowerCase().includes(searchChar) ||
        data.mobile?.toLowerCase().includes(searchChar) ||
        data.mail?.toLowerCase().includes(searchChar)
    );
  });
  console.log("adminFilterData :>> ", adminFilterData);
  console.log(newFirebaseData[0].id);

  useEffect(() => {
    filterDataFunc();
    console.log("run filterfunc");
  }, [searchChar, userArrayData]);

  const paginationData = () => {
    const chunkSize = 2;
    let chunk = [];
    for (let i = 0; i < filterData?.length; i += chunkSize) {
      chunk = [...chunk, filterData.slice(i, i + chunkSize)];
    }
    setPageArr(chunk);
    setPageInd(0);
  };

  useEffect(() => {
    console.log("run pagination");
    console.log(pageInd);
    paginationData();
  }, [filterData, userArrayData]);

  const previous = () => {
    if (pageInd > 0) {
      setPageInd(pageInd - 1);
    }
  };
  const next = () => {
    if (pageInd < pageArr?.length - 1) {
      setPageInd(() => pageInd + 1);
    }
  };
       const navigate = useNavigate();
  const shortByName = (array, property) => {
    if (isDesending) {
      console.log("hii short");
      userArrayData.sort((a, b) => (a[property] > b[property] ? -1 : 1));
      setIsDesending(false);
      console.log(userArrayData);
      filterDataFunc();
    } else {
      userArrayData.sort((a, b) => (a[property] > b[property] ? 1 : -1));
      setIsDesending(true);
      console.log(userArrayData);
      filterDataFunc();
    }
  };

  const shortByMail = (array, property) => {
    if (isDesendingMail) {
      userArrayData.sort((a, b) => (a[property] > b[property] ? -1 : 1));
      setIsDesendingMail(false);
      filterDataFunc();
    } else {
      userArrayData.sort((a, b) => (a[property] > b[property] ? 1 : -1));
      setIsDesendingMail(true);
      filterDataFunc();
    }
  };

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
          {newFirebaseData.map((data, ind) => {

            return   data.tableData.length ? 

           data.tableData
              .filter(
                (data) =>
                  data.name?.toLowerCase().includes(searchChar) ||
                  data.mobile?.toLowerCase().includes(searchChar) ||
                  data.mail?.toLowerCase().includes(searchChar)
              )
              .map((val, ind) => {
                return (
                  <tr key={val.id}>
                    <td>{data.username}</td>
                    <th scope="row">{val.id}</th>
                    <td>{val.name}</td>
                    <td>{val.mobile}</td>
                    <td>{val.mail}</td>
                    <td className="text-center">
                      <button
                        className="btn btn-warning me-2"
                        onClick={() => editForm(val.id, data.id)}
                      >
                        <AiFillEdit size={22} />
                      </button>
                      <button
                        className="btn btn-danger me-2"
                        onClick={() => deleteRow(val.id, data.id)}
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
                          setUserIdTable(() => data.id);
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
                          setUserIdTable(() => data.id);
                          
                        }}
                      >
                        <AiFillFileAdd size={22} />
                      </button>
                    </td>
                  </tr>
          })}
        </tbody>
      </table>
      {/* {pageArr?.length ? (
        <div className="d-flex justify-content-center col-12 gap-2 mt-5">
          <button
            className="btn btn-secondary"
            disabled={pageInd == 0 ? true : false}
            onClick={previous}
          >
            <IoChevronBack size={20} />
          </button>
          {pageArr?.map((data, val) => {
            return (
              <button
                key={val}
                type="button "
                className={`px-2 ${
                  val == pageInd ? "btn-outline-primary active" : "none"
                }`}
                onClick={() => setPageInd(val)}
              >
                {val + 1}
              </button>
            );
          })}
          <button
            className={`btn btn-secondary `}
            disabled={pageInd == pageArr?.length - 1 ? true : false}
            onClick={next}
          >
            <IoChevronForwardOutline size={20} />
          </button>
        </div>
      ) : (
        <h1 className="text-center text-secondary mt-5">NOT DATA FOUND</h1>
      )} */}
    </div>
  );
};

export default AdminOneTable;
