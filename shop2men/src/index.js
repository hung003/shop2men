import 'bootstrap-icons/font/bootstrap-icons.css';
import "bootstrap/dist/css/bootstrap.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // Điều này phải phù hợp với đường dẫn của tệp App.js hoặc tương tự
import reportWebVitals from './reportWebVitals'; // Đảm bảo đường dẫn là đúng


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
