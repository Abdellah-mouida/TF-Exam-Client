import React, { useEffect, useState } from "react";
import { Axios } from "../../Base/Axios";
import Cookies from "universal-cookie";
import { COOKIE_USER_ID_ALIAS } from "../../Base/Variables";
import img from "../../Images/king.png";
import { Link } from "react-router-dom";
import Loading from "../../Components/Loading";

function Leaderboard() {
  let [loading, setLoading] = useState(true);

  let [data, setData] = useState([]);
  let [currentUser, setCurrentUser] = useState({});
  useEffect(() => {
    Axios.get("/leaderboard").then((res) => {
      setCurrentUser(res.data.find((x) => x?._id === id));
      setData(res.data.filter((x, i) => x.role === "Student"));
      setLoading(false);
    });
  }, []);

  let id = new Cookies().get(COOKIE_USER_ID_ALIAS);

  return (
    <div className="leaderboard">
      {loading && <Loading></Loading>}
      <section>
        <h1 className="g-title">
          <div>
            {currentUser?.role === "Student" ? "Your Score is" : "Hello"}
          </div>{" "}
          {currentUser?.role == "Student" ? (
            <div>
              {" "}
              <b>{currentUser?.score} Points</b>
              <p>#{data.findIndex((user) => user._id === id) + 1}</p>
            </div>
          ) : (
            <div>
              <b>{currentUser?.role}</b>
            </div>
          )}
        </h1>
      </section>
      <section>
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Student</th>
              <th>Exam Passed</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {data?.map(
              (m, i) =>
                m?.role === "Student" && (
                  <tr
                    key={i}
                    style={{
                      backgroundColor:
                        currentUser._id === m._id
                          ? "var(--TR-Prcl)"
                          : "transparent",
                    }}
                  >
                    <td>
                      {(i === 0 || i === 1 || i === 2) && (
                        <i className="fas fa-crown"></i>
                      )}
                      {"  "} #{i + 1}
                    </td>
                    <td>
                      <Link
                        style={{
                          color: "var(--Black)",
                          textDecoration: "none",
                        }}
                        to={"/profile/" + m._id}
                      >
                        {m?.username} {currentUser._id === m._id ? "(You)" : ""}
                      </Link>
                    </td>
                    <td>{m?.passedExam?.length}</td>
                    <td>{m?.score} pts</td>
                  </tr>
                )
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default Leaderboard;
