import React from "react";
import Styles from "./AuthPageWrapper.module.css";

const AuthPageWrapper = ({ children }) => {
  return <section className={Styles["wrapper"]}>{children}</section>;
};

export default AuthPageWrapper;
