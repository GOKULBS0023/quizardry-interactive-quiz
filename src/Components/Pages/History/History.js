import Styles from "./History.module.css";
import React, { useEffect, useContext, useState } from "react";
import AuthContext from "../../../Context/AuthContext";
import { onValue, ref } from "firebase/database";
import { db } from "../../../Config/firebase";
import { Link } from "react-router-dom";
import Button from "../../Shared/Button/Button";

const History = () => {
  const user = useContext(AuthContext);

  const [history, setHistory] = useState();
  useEffect(() => {
    if (user) {
      const userRef = ref(db, "users" + user["uid"]);
      const getUserHistory = async () => {
        await onValue(userRef, (snap) => {
          const userData = snap.val();
          setHistory(userData.userHistory);
        });
      };
      getUserHistory();
    }
  }, [user]);

  return (
    <main className={Styles["main"]}>
      <Link to="/" style={{position:"fixed" ,left:"5rem", top:"3rem"}}>
          <Button
            type={"button"}
            value={"Back to Quiz Page"}
            color={"#1478bb"}
          />
        </Link>
      {history?.length > 0 && (
        <>
          {history.map((item) => (
            <div className={Styles["quiz__section"]}>
              <div key={item.id} className={Styles["question"]}>
                <h2 dangerouslySetInnerHTML={{ __html: item.question }} />
              </div>
              <div className={Styles["options"]}>
                {item.answer !== item.entry ? (
                  <>
                    <button
                      type="button"
                      value={item.answer}
                      key={item.answer}
                      id={item.answer}
                      className={Styles.btn}
                      style={{
                        backgroundColor: "#116D6E",
                        border: "1px solid #116D6E",
                      }}
                      dangerouslySetInnerHTML={{ __html: item.answer }}
                    />
                    <button
                      type="button"
                      value={item.entry}
                      key={item.entry}
                      id={item.entry}
                      className={Styles.btn}
                      style={{
                        backgroundColor: "#EF6262",
                        border: "1px solid #EF6262",
                      }}
                      dangerouslySetInnerHTML={{ __html: item.entry }}
                    />
                  </>
                ) : (
                  <button
                    type="button"
                    value={item.answer}
                    key={item.answer}
                    id={item.answer}
                    className={Styles.btn}
                    style={{
                      backgroundColor: "#116D6E",
                      border: "1px solid #116D6E",
                    }}
                    dangerouslySetInnerHTML={{ __html: item.answer }}
                  />
                )}
              </div>
            </div>
          ))}
        </>
      )}
    </main>
  );
};

export default History;
