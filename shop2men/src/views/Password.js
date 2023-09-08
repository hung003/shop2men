import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./Home"; // Đảm bảo bạn đã import Home component
import Register from "./Register"; // Đảm bảo bạn đã import Register component

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
