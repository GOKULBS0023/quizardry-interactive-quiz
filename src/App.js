import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Components/Pages/Auth/Login";
import Signup from "./Components/Pages/Auth/Signup";
import Home from "./Components/Pages/Home/Home";
import User from "./Components/Pages/User/User";
import History from "./Components/Pages/History/History";
import ProfileUpdate from "./Components/Pages/User/ProfileUpdate";
function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/user" element={<User />} />
        <Route path="/profile" element={<ProfileUpdate />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
