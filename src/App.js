import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Components/Pages/Auth/Login";
import Signup from "./Components/Pages/Auth/Signup";
import Home from "./Components/Pages/Home/Home";
import User from "./Components/Pages/User/User";
function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/user" element={<User />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
