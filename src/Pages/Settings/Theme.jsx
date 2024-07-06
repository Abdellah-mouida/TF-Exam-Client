import React, { useEffect, useState } from "react";
import { Axios } from "../../Base/Axios";
import Cookies from "universal-cookie";
import {
  COOKIE_USER_ID_ALIAS,
  DarkThemes,
  LightThemes,
} from "../../Base/Variables";
import { useNavigate } from "react-router-dom";
import Loading from "../../Components/Loading";

function Theme() {
  let [loading, setLoading] = useState(true);

  let id = new Cookies().get(COOKIE_USER_ID_ALIAS);

  let [theme, setTheme] = useState("");
  useEffect(() => {
    Axios.get("/users/settings/theme/" + id)
      .then((res) => {
        setTheme(res.data.theme);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="theme">
      {loading && <Loading tr={true}></Loading>}
      <h1 className="g-title">Theme</h1>
      <div className="form-controle">
        <label htmlFor="">Chose Your Theme</label>
        <h2>Dark</h2>
        <div className="theme-container">
          {DarkThemes.map((m, i) => (
            <div
              onClick={() => setTheme(m.name)}
              className="theme-box"
              key={i}
              style={{
                backgroundColor: m.state,
                outline: m.name === theme && "solid 5px var(--Prcl)",
              }}
            >
              <button style={{ backgroundColor: m.Prcl, color: m.btn }}>
                {m.name}
              </button>
            </div>
          ))}
        </div>
        <h2>Light</h2>
        <div className="theme-container">
          {LightThemes.map((m, i) => (
            <div
              className="theme-box"
              key={i}
              onClick={() => setTheme(m.name)}
              style={{
                backgroundColor: m.state,
                outline: m.name === theme && "solid 5px var(--Prcl)",
              }}
            >
              <button style={{ backgroundColor: m.Prcl, color: m.btn }}>
                {m.name}
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="f-end">
        <button
          onClick={async () => {
            try {
              let res = await Axios.post("/users/settings/theme", {
                theme,
                id,
              });
              window.location.pathname = "/settings";
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

export default Theme;
