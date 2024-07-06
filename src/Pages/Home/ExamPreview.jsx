import React, { useEffect, useState } from "react";
import Exam from "../../Components/Exam";
import img from "../../Images/dudes-not-sure-if-guy-squinting.png";
import { Axios } from "../../Base/Axios";
import Cookies from "universal-cookie";
import { COOKIE_USER_ID_ALIAS } from "../../Base/Variables";
import Loading from "../../Components/Loading";

function ExamPreview() {
  let [data, setData] = useState([]);
  let [role, setRole] = useState("");
  let [loading, setLoading] = useState(true);
  let id = new Cookies().get(COOKIE_USER_ID_ALIAS);
  useEffect(() => {
    Axios.get("/exams/user/" + id)
      .then((res) => {
        setData(res.data);

        Axios.get("/users/role/" + id).then((user) => {
          setRole(user.data.role);
          setLoading(false);
        });
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="exam-preview">
      {loading && <Loading></Loading>}
      <h2 className="g-title">Exams</h2>
      {data.length !== 0 ? (
        data?.map((m, i) => (
          <Exam
            title={m.title}
            user={m.creator.username}
            userId={m.creator._id}
            questionsNumber={m.questions?.length}
            difficulty={m.difficulty}
            time={m.time}
            createdAt={m.createdAt}
            rate={m.rate}
            id={m._id}
            btn={"Get Started"}
            btnLink={"/exam/" + m._id}
            displayBtn={role === "Student"}
          ></Exam>
        ))
      ) : (
        <div className="empty-data">
          <img src={img} width={"500px"} alt="" />
          <p>There is no Exams For the Moment Please come back later</p>
        </div>
      )}
    </div>
  );
}

export default ExamPreview;
