import React from "react";
import Styles from "./Logo.module.css";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className={Styles["logo"]}>
      <span className={Styles["logo-spl"]}>Quiz</span>ardry
    </Link>
  );
};

export default Logo;
