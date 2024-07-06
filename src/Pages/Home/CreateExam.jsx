import React, { useState } from "react";
import Popup from "../../Components/Popup";
import { Axios } from "../../Base/Axios";
import Cookies from "universal-cookie";
import { COOKIE_USER_ID_ALIAS } from "../../Base/Variables";

function CreateExam() {
  const [difficulty, setDifficulty] = useState("");
  let [err, setErr] = useState("");
  let [arr, setArr] = useState([{ qestion: "", answer: null }]);
  let [title, setTitle] = useState("");
  let [time, setTime] = useState("");
  const handleChange = (event) => {
    setDifficulty(event.target.value);
  };
  // Clean Up the empty question or the empty answer
  let cleanUp = (arr) => {
    return arr
      .map((m, i) => {
        return {
          qestion: m.qestion.replace(/^[\s]+|[\s]+$/g, ""),
          answer: m.answer,
        };
      })
      .filter(
        (element, i) =>
          (element.qestion.length >= 4) & (element.answer !== null)
      );
  };

  if (err) {
    setTimeout(() => {
      setErr("");
    }, 5000);
  }

  // Create Exam
  let handelCreateExam = async () => {
    if (title.length < 4)
      setErr("Title is Required and Must be 4 Character or more");
    else if (!difficulty) setErr("Difficutly is Required");
    else if (cleanUp(arr).length < 4)
      setErr("The Exam should Have at least 4 Qestions");
    else {
      try {
        let res = await Axios.post("/exams/create", {
          creator: new Cookies().get(COOKIE_USER_ID_ALIAS),
          title,
          time,
          difficulty,
          questions: cleanUp(arr),
        });
        window.location.pathname = "/";
        console.log(res);
      } catch (err) {
        setErr("Internal Server ERR");
        console.log(err);
      }
    }
  };

  return (
    <div className="create-exam">
      <Popup message={err} state="error" show={err?.length !== 0}></Popup>
      <h2 className="g-title">Create Exam</h2>
      <div className="create-exam-container">
        <div className="form-controle">
          <h3>Title</h3>
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div className="form-controle">
          <h3>Set Time (optional)</h3>
          <input
            type="number"
            placeholder="Set The number of Secondes ( s ) where the student should finish the Exam"
            value={time}
            onChange={(e) => {
              setTime(e.target.value);
            }}
          />
        </div>
        <div className="form-controle">
          <h3>Select Difficulty:</h3>
          <div className="radio-controle">
            <input
              type="radio"
              id="easy"
              name="difficulty"
              value="easy"
              checked={difficulty === "easy"}
              onChange={handleChange}
            />
            <label htmlFor="easy">Easy</label>
          </div>
          <div className="radio-controle">
            <input
              type="radio"
              id="normal"
              name="difficulty"
              value="normal"
              checked={difficulty === "normal"}
              onChange={handleChange}
            />
            <label htmlFor="normal">Normal</label>
          </div>
          <div className="radio-controle">
            <input
              type="radio"
              id="hard"
              name="difficulty"
              value="hard"
              checked={difficulty === "hard"}
              onChange={handleChange}
            />
            <label htmlFor="hard">Hard</label>
          </div>
        </div>
        <div className="qestions">
          <h3>Questions</h3>

          {arr.map((m, i) => (
            <div className="qestion">
              <div className="form-controle">
                <input
                  type="text"
                  onChange={(e) => {
                    setArr((p) => {
                      let newArr = [...p];
                      newArr[i].qestion = e.target.value;
                      return newArr;
                    });
                  }}
                />
              </div>
              <div className="TF-btn">
                <button
                  className={
                    arr[i].answer === false ? "false-btn false" : "false-btn"
                  }
                  onClick={() => {
                    setArr((p) => {
                      let newArr = [...p];
                      newArr[i].answer = false;
                      return newArr;
                    });
                  }}
                >
                  <i className="fa-solid fa-xmark"></i> False
                </button>
                <button
                  className={arr[i].answer ? "true-btn true" : "true-btn"}
                  onClick={() => {
                    setArr((p) => {
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
        <div className="add-q">
          <button
            onClick={() => {
              setArr((p) => [...p, { qestion: "", answer: null }]);
            }}
          >
            <i className="fas fa-plus"></i> Add Qestion
          </button>
        </div>
        <p>
          {" "}
          <i className="fas fa-exclamtion-mark"></i>{" "}
          <b style={{ color: "#ff2020" }}>
            <i className="fa-solid fa-circle-exclamation"></i> Note{" "}
          </b>
          : Every Question
          <b> does not has an answer</b> (True or False) or it has{" "}
          <b>less than 4 Characters</b>
          it will be ignored !!
        </p>
        <div className="f-c">
          <button onClick={handelCreateExam}>Create Exam</button>
        </div>
      </div>
    </div>
  );
}

export default CreateExam;
