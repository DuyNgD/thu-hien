import 'antd/dist/antd.css';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ExcelPage from '../Pages/ExcelPage/ExcelPage';
import "./css.css";

const App = () => {
  return (
    <main>
      <ExcelPage />
      <ToastContainer
        position="top-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </main>
  );
};

export default App;
