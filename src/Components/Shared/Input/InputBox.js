import React from "react";
import Styles from "./InputBox.module.css";

const InputBox = ({
  htmlFor,
  value,
  id,
  name,
  placeholder,
  type,
  required,
  onChange,
  inputValue,
  min
}) => {
  return (
    <div className={Styles["form__input"]}>
      <label htmlFor={htmlFor} className={Styles["label"]}>{value}</label>
      <input
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        required={required}
        onChange={onChange}
        value={inputValue}
        autoComplete="off"
        className={Styles["input"]}
      />
    </div>
  );
};

export default InputBox;
