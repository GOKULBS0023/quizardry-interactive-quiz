import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { onValue, ref, set } from "firebase/database";
import { db } from "../../../Config/firebase";
import AuthContext from "../../../Context/AuthContext";
import Button from "../../Shared/Button/Button";

import Styles from "./ProfileUpdate.module.css";

const ProfileUpdate = () => {
  const navigate = useNavigate();
  const user = useContext(AuthContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isChange, setIsChange] = useState(false);
  const [userData, setUserData] = useState("");
  const currentDate = new Date(
    new Date().getFullYear() - 6,
    new Date().getMonth(),
    new Date().getDate()
  )
    .toISOString()
    .split("T")[0];
  const handleUserDataChange = (name, value) => {
    setIsChange(true);
    setUserData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleClear = () => {
    setIsChange(false);
  };
  const takeToHome = (e) => {
    e.preventDefault();
    navigate("/");
  };
  const handleSave = async (e) => {
    e.preventDefault();
    setIsChange(false);
    const userRef = ref(db, "users" + user?.uid);
    await set(userRef, userData)
      .then(() => {
        alert("User data changed and saved successfully!");
      })
      .catch(() => {
        alert("Something went wrong know try after sometimes");
      });
  };
  useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
      const userRef = ref(db, "users" + user["uid"]);
      onValue(userRef, (snapshot) => {
        setUserData(snapshot.val());
      });
    } else {
      setIsLoggedIn(false);
    }
  }, [user]);
  return (
    <div className={Styles["profile__wrapper"]}>
      {isLoggedIn ? (
        <form onSubmit={handleSave}>
          <div className={Styles["data"]}>
            <label htmlFor="username">User Name</label>
            <input
              name="username"
              id="username"
              type="text"
              value={userData.username}
              onChange={(e) => {
                handleUserDataChange("username", e.target.value);
              }}
            />
          </div>
          <div className={Styles["data"]}>
            <label htmlFor="number">Mobile Number</label>
            <input
              id="number"
              name="number"
              type="number"
              value={userData?.mobile}
              minLength="10"
              maxLength="10"
              onChange={(e) => {
                handleUserDataChange("mobile", e.target.value);
              }}
            />
          </div>
          <div className={Styles["data"]}>
            <label htmlFor="dob">Birth Date</label>
            <input
              id="dob"
              name="dob"
              type="date"
              max={currentDate}
              value={userData?.dob}
              onChange={(e) => {
                handleUserDataChange("dob", e.target.value);
              }}
            />
          </div>
          <div className={Styles["gender__data"]}>
            <label>Gender</label>
            <div>
              <input
                type="radio"
                name="gender"
                id="male"
                value="Male"
                checked={userData.gender === "Male"}
                onChange={(e) => {
                  handleUserDataChange("gender", e.target.value);
                }}
              />
              <label htmlFor="male">Male</label>
            </div>
            <div>
              <input
                type="radio"
                name="gender"
                id="female"
                value="Female"
                checked={userData.gender === "Female"}
                onChange={(e) => {
                  handleUserDataChange("gender", e.target.value);
                }}
              />
              <label htmlFor="female">Female</label>
            </div>
            <div>
              <input
                type="radio"
                name="gender"
                id="not__prefer"
                value="Not Prefer to Say"
                checked={userData.gender === "Not Prefer to Say"}
                onChange={(e) => {
                  handleUserDataChange("gender", e.target.value);
                }}
              />
              <label htmlFor="not__prefer">Not Prefer to Say</label>
            </div>
          </div>
          <div className={Styles["data"]}>
            <label htmlFor="fav">Favorite Topic</label>
            <select
              className={Styles["category"]}
              onChange={(e) => {
                handleUserDataChange("fav", e.target.value);
              }}
              defaultValue={userData.fav}
            >
              <option selected disabled>
                Select Fav
              </option>
              <option value={"General Knowledge"}>General Knowledge</option>
              <option value={"Books"}>Books</option>
              <option value={"Film"}>Film</option>
              <option value={"Music"}>Music</option>
              <option value={"Nature"}>Nature</option>
              <option value={"Computer"}>Computer</option>
              <option value={"Math"}>Math</option>
              <option value={"Sports"}>Sports</option>
              <option value={"History"}>History</option>
              <option value={"Politics"}>Politics</option>
              <option value={"Art"}>Art</option>
              <option value={"Cartoon"}>Cartoon</option>
            </select>
          </div>
          <div className={Styles["form__btn"]}>
            <Button
              type={"reset"}
              value={isChange ? "Clear Changes" : "Back to home"}
              onClick={isChange ? handleClear : takeToHome}
            />
            {isChange && (
              <Button
                type={"submit"}
                value={"Save Change"}
                color={isChange ? "#116D6E" : "#52616B"}
                disabled={isChange ? "false" : "true"}
              />
            )}
          </div>
        </form>
      ) : (
        <div>
          <h2 style={{ marginBottom: "2rem" }}>
            Kindly Login or Signup to update your profile!
          </h2>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <Link to="/login">
              <Button type={"button"} value={"Login"} color={"#1478bb"} />
            </Link>
            <Link to="/signup">
              <Button type={"button"} value={"Signup"} color={"#1478bb"} />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileUpdate;
