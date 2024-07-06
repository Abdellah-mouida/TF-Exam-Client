import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Axios } from "../../Base/Axios";
import Exam from "../../Components/Exam";
import img from "../../Images/unkown.jpeg";
import Cookies from "universal-cookie";
import { COOKIE_USER_ID_ALIAS } from "../../Base/Variables";
import Loading from "../../Components/Loading";

function Profile() {
  let { id } = useParams();
  let [loading, setLoading] = useState(true);
  let [user, setUser] = useState();
  useEffect(() => {
    Axios.get("/users/profile/" + id)
      .then((res) => {
        setUser(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);
  let currentUser = new Cookies().get(COOKIE_USER_ID_ALIAS);

  return (
    <div className="profile-page">
      {loading && <Loading></Loading>}
      <section>
        <div className="profile-info">
          <div
            className="profile-img"
            style={{
              backgroundImage: `url(${
                currentUser === user?.user?._id ||
                user?.user?.privacy === "public"
                  ? user?.user?.profile
                  : img
              })`,
            }}
          ></div>
          <div className="profile-username">
            <h4>
              {user?.user?.username}{" "}
              {user?.user?.role === "Student" ? (
                <i class="fa-solid fa-graduation-cap"></i>
              ) : user?.user?.role === "Teacher" ? (
                <i class="fa-solid fa-chalkboard-user"></i>
              ) : (
                <i class="fa-solid fa-user-tie"></i>
              )}
            </h4>
            <p>{user?.user?.bio}</p>
          </div>
        </div>
      </section>
      {user?.user?.privacy === "public" || user?.user?._id === currentUser ? (
        <section>
          {user?.user?.role === "Teacher" && (
            <div className="profile-user-stats">
              <div className="profile-box">
                <h3>Created Exam</h3>
                <span>{user?.ownExams?.length}</span>
              </div>
              <div className="profile-box">
                <h3>Sudents who Passed Exam</h3>
                <span>{user?.studentPassedExam} Student</span>
              </div>
            </div>
          )}
          {user?.user?.role === "Student" && (
            <div className="profile-user-stats">
              <div className="profile-box">
                <h3>Rank</h3>
                <span>#{user?.rank}</span>
              </div>
              <div className="profile-box">
                <h3>Score</h3>
                <span>{user?.user?.score} Points</span>
              </div>
              <div className="profile-box">
                <h3>Passed Exam</h3>
                <span>{user?.user?.passedExam?.length}</span>
              </div>
            </div>
          )}
          {user?.user?.role === "Student" && (
            <div className="profile-history exam-preview">
              <h4>Passed Exam</h4>
              {user?.user?.passedExam.length !== 0 ? (
                user?.user?.passedExam?.map((m, i) => (
                  <Exam
                    title={m.title}
                    user={m.creator.username}
                    userId={m.creator._id}
                    questionsNumber={m.questions?.length}
                    difficulty={m.difficulty}
                    time={m.time}
                    createdAt={m.createdAt}
                    id={m._id}
                    score={m?.whoPassIt.find((x) => x.user === id)?.score}
                    btn={"Exam Preview"}
                    rate={m.rate}
                    btnLink={"/history/" + m._id}
                    displayBtn={false}
                  ></Exam>
                ))
              ) : (
                <div className="empty-data">
                  <p>He did not pass any Exam Yet</p>
                </div>
              )}
            </div>
          )}
          {user?.user?.role === "Teacher" && (
            <div className="profile-history exam-preview">
              <h4>Created Exam</h4>
              {user?.ownExams?.length !== 0 ? (
                user?.ownExams?.map((m, i) => (
                  <Exam
                    title={m.title}
                    user={user?.user?.username}
                    userId={user?.user?._id}
                    questionsNumber={m.questions?.length}
                    difficulty={m.difficulty}
                    time={m.time}
                    createdAt={m.createdAt}
                    id={m._id}
                    rate={m.rate}
                    btnLink={"/history/" + m._id}
                    displayBtn={false}
                  ></Exam>
                ))
              ) : (
                <div className="empty-data">
                  <p>He did not Create any Exam Yet</p>
                </div>
              )}
            </div>
          )}
        </section>
      ) : (
        <div className="empty-data">
          <p>
            <i className="fas fa-lock"></i>
          </p>{" "}
          Private Account
        </div>
      )}
    </div>
  );
}

export default Profile;
