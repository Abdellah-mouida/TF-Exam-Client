import React, { useEffect, useState, useRef } from "react";
import { Navigate, useParams } from "react-router-dom";
import { Axios } from "../../Base/Axios";
import Cookies from "universal-cookie";
import { COOKIE_USER_ID_ALIAS, secondToMinOrHour } from "../../Base/Variables";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Loading from "../../Components/Loading";

function Score() {
  // Stats
  let { id } = useParams();
  let [exam, setExam] = useState({});
  let [get, setGet] = useState(false);
  let [mistakes, setMistakes] = useState([]);
  let [score, setScore] = useState(0);
  let [showReview, setShowReview] = useState(false);
  let [user, setUser] = useState("");
  const pdfRef = useRef();
  let [rate, setRate] = useState(5);
  let [loading, setLoading] = useState(true);

  // Get Mistaks

  let getMistaks = (correctAnswer, studentAnswer) => {
    let mistakes = [];
    for (let i = 0; i < correctAnswer?.length; i++) {
      if (correctAnswer[i].answer !== studentAnswer[i].answer)
        mistakes.push({
          your: studentAnswer[i] === null ? "NO ANSWER" : studentAnswer[i],
          correct: correctAnswer[i],
        });
    }
    return mistakes;
  };
  // Generate PDF

  const generatePDF = () => {
    const input = pdfRef.current;
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgWidth = 210; // A4 size width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("user-info.pdf");
    });
  };

  // Get Exam Info

  useEffect((e) => {
    Axios.get(
      "/exams/score/" + id + "/" + new Cookies().get(COOKIE_USER_ID_ALIAS)
    )
      .then((res) => {
        setExam(res.data);
        setShowReview(true);
        setLoading(false);
        setGet(true);
        setMistakes(
          getMistaks(
            res.data.questions,
            res.data?.whoPassIt?.find(
              (x) => x.user === new Cookies().get(COOKIE_USER_ID_ALIAS)
            ).studentAnswers
          )
        );
        setScore(
          res.data?.whoPassIt?.find(
            (x) => x.user === new Cookies().get(COOKIE_USER_ID_ALIAS)
          ).score
        );
      })
      .then(() => {
        Axios.get("/users/" + new Cookies().get(COOKIE_USER_ID_ALIAS)).then(
          (res) => setUser(res.data.username)
        );
      })
      .catch((err) => console.log(err));
  }, []);

  // let studentAnswers = exam?.whoPassIt.find(
  //   (x) => x.user === new Cookies().get(COOKIE_USER_ID_ALIAS)
  // ).studentAnswers;
  return get ? (
    exam.whoPassIt.find(
      (x) => x.user === new Cookies().get(COOKIE_USER_ID_ALIAS)
    ) ? (
      <>
        <div className="score-page">
          {loading && <Loading></Loading>}
          <h2>You Result is</h2>
          <h1
            style={{
              color: score
                ? score > 15
                  ? "#00bf7f"
                  : score <= 15 && score >= 10
                  ? "#ffb000"
                  : "#ff2020"
                : "var(--Dark)",
              boxShadow: score
                ? score > 15
                  ? "0 0 10px 1px #00bf7f"
                  : score <= 15 && score >= 10
                  ? "0 0 10px 1px #ffb000"
                  : "0 0 10px 1px #ff2020"
                : "0 0 10px 1px var(--Dark)",
            }}
          >
            {score}/20
          </h1>
          <p>
            {score > 15
              ? "Congratulations on your excellent performance! Scoring up to 15 is a remarkable achievement. Keep up the great work and continue striving for excellence"
              : score <= 15 && score >= 10
              ? "Great job! Scoring between 10 and 15 shows a strong effort and good understanding. Keep pushing yourself and you'll reach even higher Results in no time!"
              : "Don't be discouraged by your Result. Every attempt is a step toward improvement. Review the material, focus on areas where you can improve, and you'll see your Results increase. Keep going, and don't give up!"}
          </p>
          <h3>Your Mistake(s)</h3>
          <div className="mistakes">
            {mistakes.map((m, i) => (
              <div className="mistake">
                {m.correct.qestion} : <span> {String(m.your.answer)}</span>
                <div>
                  <i className="fas fa-arrow-right"></i> Correct answer :
                  <span
                    style={{
                      color: "green",
                      textDecoration: "none",
                      fontWeight: "600",
                    }}
                  >
                    {String(m.correct.answer)}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="f-c">
            <button onClick={generatePDF}>
              <i className="fa-solid fa-download"></i>
              Donwload You Answers
            </button>
          </div>
        </div>
        <div className="pdf pdf-score" ref={pdfRef}>
          <header>
            <p>
              {" "}
              {new Date().toDateString()} at {new Date().toLocaleTimeString()}
            </p>
            <h1>TF-Exam</h1>
          </header>
          <main>
            <h2>{exam?.title} </h2>
            <div className="pdf-exam-info">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th> {user}</th>
                    <th>Exam difficulty</th>
                    <th>
                      {
                        <div
                          style={{
                            backgroundColor:
                              exam?.difficulty === "easy"
                                ? "#00ffa5"
                                : exam?.difficulty === "hard"
                                ? "#ff2020"
                                : "#ffb000",
                            width: "15px",
                            height: "15px",
                            borderRadius: "50%",
                            display: "inline-block",
                            marginRight: "10px",
                          }}
                        ></div>
                      }
                      {exam?.difficulty}{" "}
                    </th>
                  </tr>
                  <tr>
                    <th>Prof</th>
                    <th>{exam?.creator.username} </th>
                    <th>Time</th>
                    <th>
                      {exam?.time ? secondToMinOrHour(exam?.time) : "no Time"}
                    </th>
                  </tr>
                </thead>
              </table>
            </div>
            <div className="pdf-title">
              <p>Stats</p>
              <span></span>
            </div>
            <div className="pdf-stats-container">
              <div className="pdf-stats-box">
                <i className="fas fa-question"></i>
                {exam?.questions.length} Question
              </div>
              <div className="pdf-stats-box">
                <i className="fas fa-check"></i>
                {exam?.questions.length - mistakes?.length} True Answer
              </div>
              <div className="pdf-stats-box">
                {" "}
                <i className="fas fa-xmark"></i> {mistakes?.length} false Answer
              </div>
              <div className="pdf-stats-box">
                <i className="fas fa-clock"></i> Time spend :{" "}
                {secondToMinOrHour(
                  exam.whoPassIt.find(
                    (x) => x.user === new Cookies().get(COOKIE_USER_ID_ALIAS)
                  ).timeSpend
                )}
              </div>
            </div>
          </main>{" "}
          <div className="pdf-note">
            {" "}
            {score < 10 ? "0" + score : score} <div className="line"></div> 20
          </div>
        </div>
        <div
          className="review-container"
          style={{ visibility: showReview ? "visible" : "hidden" }}
        >
          <div
            className="review"
            style={{
              top: showReview ? "50%" : "-100%",
            }}
          >
            <i
              className="fas fa-xmark"
              onClick={() => setShowReview(false)}
            ></i>
            <h3>Review</h3>
            <p>Rate This Exam</p>
            <span>
              <i className="fas fa-star"></i>
              {rate.toString().padStart(2, "0")}/10
            </span>
            <div className="range-controle">
              {" "}
              0
              <input
                type="range"
                name="review"
                step="1"
                max="10"
                value={rate}
                min={"0"}
                onChange={(e) => setRate(e.target.value)}
              />
              10
            </div>
            <div className="f-end">
              <button
                onClick={async () => {
                  try {
                    let res = await Axios.post("/exams/rate/" + exam._id, {
                      rate,
                    });
                    setShowReview(false);
                  } catch (err) {
                    console.log(err);
                  }
                }}
              >
                Sned
              </button>
            </div>
          </div>
        </div>
      </>
    ) : (
      <Navigate to={"/"}></Navigate>
    )
  ) : (
    ""
  );
}

export default Score;
