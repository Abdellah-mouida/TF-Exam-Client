import React from "react";
import { Link } from "react-router-dom";
import { secondToMinOrHour } from "../Base/Variables";

function Exam(props) {
  return (
    <div className="exam">
      <header>
        <div className="exam-title">{props.title} </div>
        <div className="exam-date">
          {" "}
          {new Date(props.createdAt).toLocaleDateString()}
        </div>
      </header>
      <p>
        Released By :
        <Link to={"/profile/" + props.userId} className="creator">
          {props.user}
        </Link>{" "}
      </p>
      <div className="exam-info">
        <div>
          <div
            className="diff-state"
            style={{
              backgroundColor:
                props.difficulty === "easy"
                  ? "#00ffa5"
                  : props.difficulty === "hard"
                  ? "#ff2020"
                  : "#ffb000",
            }}
          ></div>
          {props.difficulty}
        </div>
        <div>
          <i className="fas fa-star"></i> {props?.rate}/10{" "}
        </div>
        <div>
          <span>{props.questionsNumber} </span> Qestions
        </div>
        {props?.time && (
          <div>
            <i className="fas fa-clock"></i> {secondToMinOrHour(props.time)}
          </div>
        )}
        {(props.score || props.score === 0) && (
          <div>
            Result : <b>{props.score}/20</b>
          </div>
        )}
      </div>
      {props?.displayBtn && (
        <Link to={props.btnLink}>
          <button>
            {props.btn}
            <i className="fas fa-arrow-right"></i>
          </button>
        </Link>
      )}
      <div className="start-exam"></div>
    </div>
  );
}

export default Exam;
