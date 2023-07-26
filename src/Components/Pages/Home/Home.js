import React, { useContext, useEffect, useState } from "react";
import Styles from "./Home.module.css";
import Navbar from "../../Shared/Navbar/Navbar";
import Button from "../../Shared/Button/Button";
import axios from "axios";
import { db } from "../../../Config/firebase";
import { onValue, set, ref } from "firebase/database";
import AuthContext from "../../../Context/AuthContext";
const Home = () => {
  const [difficultyLevel, setDifficultyLevel] = useState("easy");
  const [category, setCategory] = useState("random");
  const [isAnswered, setIsAnswered] = useState(false);
  const [url, setUrl] = useState(
    `https://opentdb.com/api.php?amount=1&difficulty=${difficultyLevel}&type=multiple`
  );

  const [username, setUsername] = useState();
  const [userId, setUserId] = useState();
  const [createdAt, setCreatedAt] = useState();
  const [email, setEmail] = useState();
  const [quizData, setQuizData] = useState();
  const [question, setQuestion] = useState();
  const [options, setOptions] = useState();
  const [answer, setAnswer] = useState();
  const [userAnswer, setUserAnswer] = useState();
  const [numberOfQuestions, setNumberOfQuestion] = useState(0);
  const [numberOfCorrect, setNumberOfCorrect] = useState(0);
  const user = useContext(AuthContext);
  useEffect(() => {
    if (user) {
      const userRef = ref(db, "users" + user["uid"]);
      const getScore = async () => {
        await onValue(userRef, (snap) => {
          const userData = snap.val();
          setNumberOfCorrect(userData.correctAnswers);
          setNumberOfQuestion(userData.questionTaken);
          setEmail(userData.email);
          setUsername(userData.username);
          setUserId(userData.userID);
          setCreatedAt(userData.createdAt);
        });
      };
      getScore();
    }
  }, [quizData, user]);

  useEffect(() => {
    if (user) {
      const userRef = ref(db, "users" + user?.uid);
      const setScore = async () => {
        if (username && email && createdAt && userId) {
          const userDetails = {
            username: username,
            email: email,
            createdAt: createdAt,
            userID: userId,
            correctAnswers: numberOfCorrect,
            questionTaken: numberOfQuestions,
          };
          await set(userRef, userDetails);
        }
      };
      setScore();
    }
  }, [numberOfCorrect, numberOfQuestions, username, email, createdAt, userId, user]);
  const handleDifficulty = (difficulty) => {
    setDifficultyLevel(difficulty);
  };
  const handleCategory = (e) => {
    setCategory(e.target.value);
  };
  const handleUserEntry = (value) => {
    setIsAnswered(true);
    setUserAnswer(value);
    setNumberOfQuestion((prev) => {
      return prev + 1;
    });
    setNumberOfCorrect((prev) => {
      if (value === answer) {
        return prev + 1;
      } else {
        return prev;
      }
    });
  };

  useEffect(() => {
    if (category === "random") {
      setUrl(
        `https://opentdb.com/api.php?amount=1&difficulty=${difficultyLevel}&type=multiple`
      );
    } else {
      setUrl(
        `https://opentdb.com/api.php?amount=1&difficulty=${difficultyLevel}&category=${category}&type=multiple`
      );
    }
  }, [category, difficultyLevel]);
  const getNextQuestion = async () => {
    await axios
      .get(url)
      .then((data) => {
        setQuizData(data.data.results[0]);
      })
      .catch((err) => {
        console.log(err);
      });
    setIsAnswered(false);
  };
  useEffect(() => {
    axios
      .get(url)
      .then((data) => {
        setQuizData(data.data.results[0]);
      })
      .catch((err) => {
        console.log(err);
      });
    setIsAnswered(false);
  }, [url, difficultyLevel]);
  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    let currentIndex = shuffledArray.length,
      randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [shuffledArray[currentIndex], shuffledArray[randomIndex]] = [
        shuffledArray[randomIndex],
        shuffledArray[currentIndex],
      ];
    }

    return shuffledArray;
  };
  useEffect(() => {
    if (quizData) {
      setAnswer(quizData?.["correct_answer"]);
      setQuestion(quizData?.question);
      const allOptions = [
        ...quizData?.incorrect_answers,
        quizData?.correct_answer,
      ];
      const shuffledOptions = shuffleArray(allOptions);
      setOptions(shuffledOptions);
    }
  }, [quizData]);
  return (
    <React.Fragment>
      <Navbar
        handleDifficulty={handleDifficulty}
        difficultyLevel={difficultyLevel}
      />
      <main className={Styles["main"]}>
        <select
          onChange={handleCategory}
          defaultValue={"random"}
          className={Styles["category"]}
        >
          <option value={"random"}>Random</option>
          <option value={9}>General Knowledge</option>
          <option value={10}>Books</option>
          <option value={11}>Film</option>
          <option value={12}>Music</option>
          <option value={17}>Nature</option>
          <option value={18}>Computer</option>
          <option value={19}>Math</option>
          <option value={21}>Sports</option>
          <option value={23}>History</option>
          <option value={24}>Politics</option>
          <option value={25}>Art</option>
          <option value={32}>Cartoon</option>
        </select>
        <form
          className={Styles["quiz__section"]}
          style={{
            borderColor:
              isAnswered && (userAnswer === answer ? "#116D6E" : "#EF6262"),
          }}
        >
          <div className={Styles["question"]}>
            {quizData && <h2 dangerouslySetInnerHTML={{ __html: question }} />}
          </div>
          {!isAnswered && (
            <div className={Styles["options"]}>
              {options?.map((option, index) => {
                return (
                  <Button
                    type={"button"}
                    value={option}
                    key={index}
                    id={index}
                    onClick={() => {
                      handleUserEntry(option);
                    }}
                  />
                );
              })}
            </div>
          )}
          {isAnswered && (
            <div>
              {userAnswer === answer ? (
                <>
                  <h3 className={Styles["info"]}>
                    Hey there! You got it right! Nice job!{" "}
                  </h3>
                  <div className={Styles["options"]}>
                    <Button
                      value={userAnswer}
                      type={"button"}
                      color={"#116D6E"}
                    />
                  </div>
                </>
              ) : (
                <>
                  <h3 className={Styles["info"]}>
                    Oops! That's not quite right. Take a look below to check the
                    correct answer.{" "}
                  </h3>
                  <div className={Styles["options"]}>
                    <Button value={answer} type={"button"} color={"#116D6E"} />
                    <Button
                      value={userAnswer}
                      type={"button"}
                      color={"#EF6262"}
                    />
                  </div>
                </>
              )}
            </div>
          )}
        </form>
        <div className={Styles["skip-btn"]}>
          <Button
            type={"button"}
            value={isAnswered ? "Move to next..." : "Skip this question..."}
            color={"#1478bb"}
            hoverColor={"#F0F5F9"}
            onClick={() => {
              getNextQuestion();
            }}
          />
          {numberOfQuestions > 0 ? (
            <h3 className={Styles["score"]}>
              Score:{" "}
              <span>
                {numberOfCorrect}/{numberOfQuestions}
              </span>
            </h3>
          ) : (
            <h3 className={Styles["score"]}>
              Take a quiz and get start to your score.
            </h3>
          )}
        </div>
      </main>
    </React.Fragment>
  );
};

export default Home;
