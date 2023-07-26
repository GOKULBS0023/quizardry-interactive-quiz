import React from "react";
import Logo from "../Logo/Logo";
import { Link } from "react-router-dom";
import Styles from "./Navbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";

const Navbar = ({ handleDifficulty, difficultyLevel }) => {
  return (
    <nav className={Styles["nav"]}>
      <Logo />
      <Link
        to="/"
        className={`${Styles["nav-list"]} ${
          difficultyLevel === "easy" && Styles.active
        }`}
        onClick={() => {
          handleDifficulty("easy");
        }}
      >
        Easy
      </Link>
      <Link
        to="/"
        className={`${Styles["nav-list"]} ${
          difficultyLevel === "medium" && Styles.active
        }`}
        onClick={() => {
          handleDifficulty("medium");
        }}
      >
        Medium
      </Link>
      <Link
        to="/"
        className={`${Styles["nav-list"]} ${
          difficultyLevel === "hard" && Styles.active
        }`}
        onClick={() => {
          handleDifficulty("hard");
        }}
      >
        Hard
      </Link>

      <Link to="/user" className={Styles["nav-icon"]}>
        <FontAwesomeIcon icon={faUser} />
      </Link>
    </nav>
  );
};

export default Navbar;
