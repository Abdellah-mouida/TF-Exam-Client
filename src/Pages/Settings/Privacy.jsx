import React, { useEffect, useState } from "react";
import { Axios } from "../../Base/Axios";
import Cookies from "universal-cookie";
import { Link, useNavigate } from "react-router-dom";
import { COOKIE_USER_ID_ALIAS } from "../../Base/Variables";
import Loading from "../../Components/Loading";

function Privacy() {
  let [privacy, setPrivacy] = useState("");
  console.log(privacy);
  let nav = useNavigate();
  let [loading, setLoading] = useState(false);

  let id = new Cookies().get(COOKIE_USER_ID_ALIAS);
  useEffect(() => {
    Axios.get("/users/settings/privacy/" + id)
      .then((res) => {
        setPrivacy(res.data.privacy);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="privacy">
      {loading && <Loading tr={true}></Loading>}
      <h1 className="g-title">Privacy</h1>
      <div className="form-controle">
        <label htmlFor="">Set Your privacy</label>
        <div className="radio-controle">
          <input
            type="radio"
            checked={privacy === "public"}
            onChange={() => setPrivacy("public")}
          />
          <label htmlFor="">
            <i class="fa-solid fa-user-large"></i> Public
          </label>
        </div>
        <div className="radio-controle">
          <input
            type="radio"
            name=""
            id=""
            checked={privacy === "private"}
            onChange={() => setPrivacy("private")}
          />
          <label htmlFor="">
            <i class="fa-solid fa-user-large-slash"></i> Private
          </label>
        </div>
        <p>
          If you set the Privacy to "Private", No one will see You Profile ,
          score , passed Exam
        </p>
      </div>
      <div className="f-end">
        <Link to={"/settings"}>
          <button className="cancel">Cancel</button>
        </Link>
        <button
          onClick={async () => {
            setLoading(true);
            try {
              let res = await Axios.post("/users/settings/privacy", {
                privacy,
                id,
              });
              setLoading(false);
              nav("/settings");
            } catch (err) {
              console.log(err);
            }
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default Privacy;
