import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Axios } from "../../Base/Axios";
import { COOKIE_USER_ID_ALIAS, secondToMinOrHour } from "../../Base/Variables";
import Cookies from "universal-cookie";
import Loading from "../../Components/Loading";

function HistroyPreview() {
  let { id } = useParams();
  let [exam, setExam] = useState({});
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get("/exams/" + id)
      .then((res) => {
        setExam(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  });
  console.log(exam);
  return (
    <div className="history">
      {loading && <Loading></Loading>}{" "}
      <h2 className="g-title">{exam?.title} </h2>
      <div
        className="exam-info"
        style={{
          margin: "1rem auto",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "15px",
        }}
      >
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
        <div>
          Result :{" "}
          <b>
            {
              exam?.whoPassIt?.find(
                (x) => x.user === new Cookies().get(COOKIE_USER_ID_ALIAS)
              ).score
            }{" "}
          </b>
        </div>
        <div>
          Time Spend :{" "}
          <b>
            {secondToMinOrHour(
              exam?.whoPassIt?.find(
                (x) => x.user === new Cookies().get(COOKIE_USER_ID_ALIAS)
              ).timeSpend
            )}{" "}
          </b>
        </div>
      </div>
      <div className="answers">
        <table>
          <thead>
            <tr>
              <th>Question</th>
              <th>Answer</th>
              <th>Correction</th>
            </tr>
          </thead>
          <tbody>
            {exam?.questions?.map((m, i) => (
              <tr
                className={
                  exam?.whoPassIt?.find(
                    (x) => x.user === new Cookies().get(COOKIE_USER_ID_ALIAS)
                  ).studentAnswers[i].answer === m.answer
                    ? "history-true-answer"
                    : "history-false-answer"
                }
              >
                <td>{m.qestion} </td>
                <td>
                  {String(
                    exam?.whoPassIt?.find(
                      (x) => x.user === new Cookies().get(COOKIE_USER_ID_ALIAS)
                    ).studentAnswers[i].answer
                  )}{" "}
                </td>
                <td>
                  {exam?.whoPassIt?.find(
                    (x) => x.user === new Cookies().get(COOKIE_USER_ID_ALIAS)
                  ).studentAnswers[i].answer === m.answer ? (
                    <i className="fas fa-check"></i>
                  ) : (
                    <i className="fas fa-xmark"></i>
                  )}{" "}
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan={"2"}>
                <b>Total</b>
              </td>
              <td>
                <b>
                  {
                    exam?.whoPassIt?.find(
                      (x) => x.user === new Cookies().get(COOKIE_USER_ID_ALIAS)
                    ).score
                  }{" "}
                </b>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HistroyPreview;
