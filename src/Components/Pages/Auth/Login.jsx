import React, { useState } from "react";
import Styles from "./Auth.module.css";
import InputBox from "../../Shared/Input/InputBox";
import Button from "../../Shared/Button/Button";
import AuthPageWrapper from "./AuthPageWrapper/AuthPageWrapper";
import { db, googleProvider, auth } from "../../../Config/firebase";
import { onValue, ref, set } from "firebase/database";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    await signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        const errorCode = err.code;
        if (errorCode === "auth/wrong-password") {
          alert("Kindly enter the valid password!");
        } else if (errorCode === "auth/user-not-found") {
          alert("Kindly register to continue!");
          navigate("/signup");
        }
        setPassword("");
      });
  };
  const handleGoogleProviderLogin = (e) => {
    e.preventDefault();
    signInWithPopup(auth, googleProvider)
      .then((userDetail) => {
        const userID = userDetail.user.uid;
        const userRef = ref(db, "users" + auth.currentUser["uid"]);
        onValue(userRef, (snapshot) => {
          const userData = snapshot.val();

          !userData &&
            set(ref(db, "users" + userID), {
              userID: userID,
              username: userDetail.user.displayName,
              email: userDetail.user.email,
              createdAt: new Date().toISOString(),
              questionTaken: 0,
              correctAnswers: 0,
            });
        });

        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <AuthPageWrapper>
      <h2 className={Styles["back__to-home"]}>
        Continue with out login &nbsp;
        <Link to="/" className={Styles.link} style={{ fontSize: "1.8rem" }}>
          Click here
        </Link>
      </h2>
      <form onSubmit={handleLogin} className={Styles["form"]}>
        <h2 className={Styles["auth__type"]}>Login with password</h2>
        <InputBox
          htmlFor="emailId"
          value="Email ID"
          id="emailId"
          name="emailId"
          placeholder="Enter your Email Id ..."
          type="email"
          required={true}
          inputValue={email}
          onChange={handleEmailChange}
        ></InputBox>
        <InputBox
          htmlFor="password"
          value="Password"
          id="password"
          name="password"
          placeholder="Enter your password ..."
          type="password"
          required={true}
          inputValue={password}
          onChange={handlePasswordChange}
        ></InputBox>
        <Button type="submit" value="Login" />
      </form>
      <form className={Styles["form"]} onSubmit={handleGoogleProviderLogin}>
        <h2 className={Styles["auth__type"]}>Login with Google</h2>
        <Button type="submit" value="Login with Google" />
      </form>
      <h3 className={Styles["auth__change"]}>
        Don't have an account?{" "}
        <Link to="/signup" className={Styles.link}>
          Signup
        </Link>
      </h3>
    </AuthPageWrapper>
  );
};
export default Login;
