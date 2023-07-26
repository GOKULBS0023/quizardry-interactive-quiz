import React, { useState } from "react";
import Styles from "./Auth.module.css";
import InputBox from "../../Shared/Input/InputBox";
import Button from "../../Shared/Button/Button";
import AuthPageWrapper from "./AuthPageWrapper/AuthPageWrapper";
import { db, auth, googleProvider } from "../../../Config/firebase";
import { signInWithPopup, createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set, onValue } from "firebase/database";
import { Link, useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    await createUserWithEmailAndPassword(auth, email, password, name)
      .then((userDetails) => {
        const userID = userDetails.user.uid;
        set(ref(db, "users" + userID), {
          userID: userID,
          username: name,
          email: email,
          createdAt: new Date().toISOString(),
          questionTaken: 0,
          correctAnswers: 0,
        });
        navigate("/home");
      })
      .catch((err) => {
        const errorCode = err.code;
        if (errorCode === "auth/email-already-in-use") {
          alert(
            "Entered email id already registered with us. Kindly try login or use another email id to signup!"
          );
          setEmail("");
        } else if (errorCode === "auth/weak-password") {
          alert("Kindly enter a strong password!");
          setPassword("");
        }
      });
  };
  const handleGoogleProviderSignup = async (e) => {
    e.preventDefault();
    await signInWithPopup(auth, googleProvider)
      .then((userDetail) => {
        const userID = userDetail.user.uid;
        const userRef = ref(db, "users" + auth.currentUser["uid"]);
        onValue(userRef, (snapshot) => {
          const userData = snapshot.val();
          {
            !userData &&
              set(ref(db, "users" + userID), {
                userID: userID,
                username: userDetail.user.displayName,
                email: userDetail.user.email,
                createdAt: new Date().toISOString(),
                questionTaken: 0,
                correctAnswers: 0,
              });
          }
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
        Continue with out signup &nbsp;
        <Link to="/" className={Styles.link} style={{ fontSize: "1.8rem" }}>
          Click here
        </Link>
      </h2>

      <form onSubmit={handleSignupSubmit} className={Styles["form"]}>
        <h2 className={Styles["auth__type"]}>Signup with password</h2>
        <InputBox
          htmlFor="name"
          value="Name"
          id="name"
          name="name"
          placeholder="Enter your name..."
          type="text"
          required={true}
          inputValue={name}
          onChange={handleNameChange}
        ></InputBox>
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
        <Button type="submit" value="Sign up" />
      </form>
      <form onSubmit={handleGoogleProviderSignup} className={Styles["form"]}>
        <h2 className={Styles["auth__type"]}>Signup with Google</h2>
        <Button type="submit" value="Sign up with Google" />
      </form>
      <h3 className={Styles["auth__change"]}>
        Already have an account?{" "}
        <Link to="/login" className={Styles.link}>
          Login
        </Link>
      </h3>
    </AuthPageWrapper>
  );
};
export default Login;
