import 'antd/dist/antd.css';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdSense from '../Components/AdSense/AdSense';
import ExcelPage from '../Pages/ExcelPage/ExcelPage';
import "./css.css";

const App = () => {
  return (
    <main>
      <ExcelPage />
      <AdSense
        data-ad-client="ca-pub-4286779444709342"
        data-ad-slot="9579230091"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
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
