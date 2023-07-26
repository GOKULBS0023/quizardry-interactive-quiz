import React from "react";
import Styles from "./User.module.css";
import { auth, db } from "../../../Config/firebase";
import { useState, useEffect, useContext } from "react";
import { signOut } from "firebase/auth";
import AuthContext from "../../../Context/AuthContext";
import Button from "../../Shared/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import { onValue, ref } from "firebase/database";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceFrownOpen } from "@fortawesome/free-regular-svg-icons";

const User = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [quizTaken, setQuizTaken] = useState();
  const [correctAnswer, setCorrectAnswers] = useState();
  const user = useContext(AuthContext);
  const handleLogout = async (e) => {
    e.preventDefault();
    await signOut(auth)
      .then(() => {
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
      const userRef = ref(db, "users" + user["uid"]);
      onValue(userRef, (snapshot) => {
        const userData = snapshot.val();
        // setEmail(userData["email"]);
        setName(userData["username"]);
        setQuizTaken(userData["questionTaken"]);
        setCorrectAnswers(userData["correctAnswers"]);
      });
    } else {
      setIsLoggedIn(false);
    }
  }, [user]);
  return (
    <div className={Styles["user__wrapper"]}>
      <div className={Styles["user__profile"]}>
        <span>
          {isLoggedIn ? (
            name.charAt(0).toUpperCase()
          ) : (
            <FontAwesomeIcon icon={faFaceFrownOpen} />
          )}
        </span>
      </div>
      {isLoggedIn ? (
        <div className={Styles["score__section"]}>
          {quizTaken === 0 ? (
            <>
              <h2>
                Hey {name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()}
                , wanna take a quiz and get your score rollin'? <br />
                <Link to="/" className={Styles.link}>
                  Let's have some fun!
                </Link>
              </h2>
            </>
          ) : (
            <>
              <h2 className={Styles["username"]}>
                Hey!{" "}
                {name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()}
              </h2>
              <h2 className={Styles["quiz__score"]}>
                Your score on Quizardry:{" "}
                <span>
                  {correctAnswer} / {quizTaken}
                </span>
              </h2>
              <h2>
                We'll update these as you take more quizzes and answer
                questions. <br />
                <Link to="/" className={Styles.link}>
                  Have fun and good luck!
                </Link>
              </h2>
            </>
          )}
        </div>
      ) : (
        <h2>
          Check your scores and deets! Log in or sign up now! Let's have a
          blast!
        </h2>
      )}
      {isLoggedIn ? (
        <Button type={"button"} value={"Sign out"} onClick={handleLogout} />
      ) : (
        <div>
          <div className={Styles["user__auth-btn"]}>
            <Link to="/login">
              <Button type={"button"} value={"Login"} />
            </Link>
            <Link to="/signup">
              <Button type={"button"} value={"Sign up"} />
            </Link>
          </div>
        </div>
      )}
      <Link to="/">
        <Button type={"button"} value={"Back to Quiz Page"} color={"#1478bb"} />
      </Link>
    </div>
  );
};

export default User;
