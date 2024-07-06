import React, { useEffect, useState } from "react";
import { Axios } from "../../Base/Axios";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { COOKIE_USER_ID_ALIAS } from "../../Base/Variables";
import Loading from "../../Components/Loading";

function Language() {
  let [language, setLanguage] = useState("");
  console.log(language);
  let nav = useNavigate();
  let id = new Cookies().get(COOKIE_USER_ID_ALIAS);
  let [loading, setLoading] = useState(false);

  useEffect(() => {
    Axios.get("/users/settings/language/" + id)
      .then((res) => {
        setLanguage(res.data.language);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="language">
      {loading && <Loading tr={true}></Loading>}
      <h1 className="g-title">Language</h1>
      <div className="form-controle">
        <label htmlFor="">Chose Your language</label>
        <div className="radio-controle">
          <input
            type="radio"
            checked={language === "ar"}
            onChange={() => setLanguage("ar")}
          />
          <label htmlFor="">Arabic</label>
        </div>
        <div className="radio-controle">
          <input
            type="radio"
            name=""
            id=""
            checked={language === "an"}
            onChange={() => setLanguage("an")}
          />
          <label htmlFor="">English</label>
        </div>
        <div className="radio-controle">
          <input
            type="radio"
            name=""
            id=""
            checked={language === "fr"}
            onChange={() => setLanguage("fr")}
          />
          <label htmlFor="">French</label>
        </div>
      </div>
      <div className="f-end">
        <Link to={"/settings"}>
          <button className="cancel">Cancel</button>
        </Link>
        <button
          onClick={async () => {
            setLoading(true);
            try {
              let res = await Axios.post("/users/settings/language", {
                language,
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

export default Language;
