import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { Axios } from "../../Base/Axios";
import { COOKIE_USER_ID_ALIAS } from "../../Base/Variables";
import Exam from "../../Components/Exam";
import img from "../../Images/dudes-not-sure-if-guy-squinting.png";
import Loading from "../../Components/Loading";
function History() {
  let [data, setData] = useState([]);
  let id = new Cookies().get(COOKIE_USER_ID_ALIAS);
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get("/users/passedExam/" + id)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);
  console.log(data);

  return (
    <div className="exam-preview">
      {loading && <Loading></Loading>}
      <h2 className="g-title">Exams</h2>
      {data.length !== 0 ? (
        data?.map((m, i) => (
          <Exam
            title={m.title}
            user={m.creator.username}
            questionsNumber={m.questions?.length}
            difficulty={m.difficulty}
            time={m.time}
            createdAt={m.createdAt}
            userId={m.creator._id}
            id={m._id}
            score={m?.whoPassIt.find((x) => x.user === id)?.score}
            btn={"Exam Preview"}
            rate={m.rate}
            btnLink={"/history/" + m._id}
            displayBtn={true}
          ></Exam>
        ))
      ) : (
        <div className="empty-data">
          <img src={img} width={"500px"} alt="" />
          <p>You did not pass any Exam Yet</p>
        </div>
      )}
    </div>
  );
}
export default History;
