/** @format */
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'antd/dist/reset.css';

import AllRoutes from "./component/AllRoutes";

function App() {
  

  return (
    <>
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
   
      <AllRoutes/>
    </>
  );
}

export default App;
