import React, { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Axios } from "../../Base/Axios";
import { COOKIE_USER_ID_ALIAS, secondToMinOrHour } from "../../Base/Variables";
import Cookies from "universal-cookie";
import Loading from "../../Components/Loading";

function PasseExam() {
  let { id } = useParams();
  let [exam, setExam] = useState({});
  let [studentAnswers, setStudentAnswers] = useState([]);
  let [counter, setCounter] = useState(0);
  const intervalRef = useRef(null);
  let [loading, setLoading] = useState(true);

  let nav = useNavigate();
  let [get, setGet] = useState(false);
  let btnREF = useRef();
  useEffect(() => {
    let isMounted = true;

    const fetchExamData = async () => {
      try {
        const res = await Axios.get(`/exams/${id}`);
        const examData = res.data;
        if (isMounted) {
          setGet(true);
          setExam(examData);
          setLoading(false);
          setStudentAnswers(
            examData.questions.map((m) => ({
              question: m.qestion,
              answer: null,
            }))
          );
          setCounter(examData.time);
          let timerId;
          if (examData?.time) {
            timerId = setTimeout(() => {
              btnREF?.current?.click();
            }, examData.time * 1000 + 100);
            intervalRef.current = setInterval(() => {
              setCounter((prevCounter) => {
                if (prevCounter <= 0) {
                  clearInterval(intervalRef.current);
                  console.log("Interval stopped");
                  return 0;
                }
                return prevCounter - 1;
              });
            }, 1000);
          } else {
            intervalRef.current = setInterval(() => {
              setCounter((prevCounter) => prevCounter + 1);
            }, 1000);
          }

          return () => {
            if (examData?.time) {
              clearInterval(intervalRef.current);
              clearTimeout(timerId);
            }
          };
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchExamData();

    return () => {
      isMounted = false;
      clearInterval(intervalRef.current);
    };
  }, [id]);
  console.log(counter);
  let handleSendScore = async () => {
    console.log(exam?.time - counter);
    try {
      let res = await Axios.post("/exams/" + id, {
        userId: new Cookies().get(COOKIE_USER_ID_ALIAS),
        studentAnswers,
        timeSpend: exam?.time
          ? Number(exam?.time) - Number(counter)
          : Number(counter),
      });
      // nav("/exam/score/" + id, { replace: true });
      window.location.pathname = "/exam/score/" + id;
    } catch (err) {
      console.log(err);
    }
  };

  return get ? (
    !exam?.whoPassIt.find(
      (x) => x.user === new Cookies().get(COOKIE_USER_ID_ALIAS)
    ) ? (
      <div className="pass-exam">
        {loading && <Loading></Loading>}
        {exam?.time && (
          <div
            className="timer"
            style={{
              color: exam?.time
                ? counter > Math.floor(exam.time / 3) * 2
                  ? "#00bf7f"
                  : counter > Math.floor(exam.time / 3) * 1
                  ? "#ffb000"
                  : "#ff2020"
                : "var(--Dark)",
              boxShadow: exam?.time
                ? counter > Math.floor(exam.time / 3) * 2
                  ? "0 0 10px 1px #00bf7f"
                  : counter > Math.floor(exam.time / 3) * 1
                  ? "0 0 10px 1px #ffb000"
                  : "0 0 10px 1px #ff2020"
                : "0 0 10px 1px var(--Dark)",
            }}
          >
            {" "}
            <i className="fas fa-clock"></i>
            {secondToMinOrHour(counter)}
          </div>
        )}
        <div
          className="exam-date"
          style={{ textAlign: "end", padding: " 25px 10px" }}
        >
          {new Date(exam.createdAt).toLocaleDateString()}{" "}
        </div>
        <h2 className="g-title">{exam?.title} </h2>
        <div className="exam-info">
          <div>
            <div
              className="diff-state"
              style={{
                backgroundColor:
                  exam?.difficulty === "easy"
                    ? "#00ffa5"
                    : exam?.difficulty === "hard"
                    ? "#ff2020"
                    : "#ffb000",
              }}
            ></div>
            {exam?.difficulty}
          </div>
          <div>
            <i className="fas fa-star"></i> {exam?.rate}/10{" "}
          </div>

          {exam?.time && (
            <div>
              <i className="fas fa-clock"></i> {secondToMinOrHour(exam?.time)}
            </div>
          )}
          <div>Released By : {exam?.creator?.username}</div>
        </div>
        <div className="qestions">
          {exam.questions?.map((m, i) => (
            <div className="qestion" key={i}>
              <p> {m.qestion} </p>
              <div className="TF-btn">
                <button
                  className={
                    studentAnswers[i].answer === false
                      ? "false-btn false"
                      : "false-btn"
                  }
                  onClick={() => {
                    setStudentAnswers((p) => {
                      let newArr = [...p];
                      newArr[i].answer = false;
                      return newArr;
                    });
                  }}
                >
                  <i className="fa-solid fa-xmark"></i> False
                </button>
                <button
                  className={
                    studentAnswers[i].answer ? "true-btn true" : "true-btn"
                  }
                  onClick={() => {
                    setStudentAnswers((p) => {
                      let newArr = [...p];
                      newArr[i].answer = true;
                      return newArr;
                    });
                  }}
                >
                  {" "}
                  <i className="fa-solid fa-check"></i>True
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="f-c">
          <button ref={btnREF} onClick={handleSendScore}>
            {" "}
            Done !! Get Resulte
          </button>
        </div>
      </div>
    ) : (
      <Navigate to={"/"}></Navigate>
    )
  ) : (
    ""
  );
}

export default PasseExam;
