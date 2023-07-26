import React from "react";
import Styles from "./Button.module.css";

const Button = ({ value, type, onClick, color, hoverColor, id }) => {
  return (
    <button
      id={id}
      type={type}
      onClick={onClick}
      className={Styles.btn}
      style={
        color && {
          backgroundColor: color,
          borderColor: color,
          color: "#F0F5F9",
        }
      }
      dangerouslySetInnerHTML={{ __html: value }}
    />
  );
};

export default Button;
