import React, { useEffect, useRef, useState } from "react";
import { Axios } from "../../Base/Axios";
import Cookies from "universal-cookie";
import { COOKIE_USER_ID_ALIAS } from "../../Base/Variables";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../Components/Loading";

function PersonalInfo() {
  let [form, setForm] = useState({ username: "", bio: "" });
  let [profile, setProfile] = useState("");
  let fileInp = useRef(null);
  let [loading, setLoading] = useState(false);
  let handelChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  let id = new Cookies().get(COOKIE_USER_ID_ALIAS);
  useEffect(() => {
    Axios.get("/users/settings/personal-info/" + id)
      .then((res) => {
        setForm({ username: res.data.username, bio: res.data.bio });
        setProfile(res.data.profile);
      })
      .catch((err) => console.log(err));
  }, []);

  let updatePersonalInfo = async () => {
    setLoading(true);
    try {
      let res = await Axios.post("/users/settings/personal-info", {
        profile,
        ...form,
        id,
      });
      console.log(res);
      setLoading(false);
      window.location.pathname = "/settings";
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="personal-info">
      {loading && <Loading tr={true}></Loading>}
      <h1 className="g-title">Personal Info</h1>
      <div className="form-controle">
        <label htmlFor="">
          <i className="fa-solid fa-image"></i> Change Profile
        </label>
        <div className="f-c">
          <div
            className="settings-profile"
            style={{ backgroundImage: `url(${profile})` }}
            onClick={() => fileInp?.current?.click()}
          ></div>
          <input
            type="file"
            ref={fileInp}
            hidden
            onChange={(e) => {
              let img = e.target.files.item(0);
              let reader = new FileReader();
              reader.readAsDataURL(img);
              reader.addEventListener("load", () => {
                setProfile(reader.result);
              });
            }}
          />
        </div>
      </div>
      <div className="form-controle">
        <label htmlFor="">
          {" "}
          <i className="fas fa-user"></i> Username
        </label>
        <input
          type="text"
          name="username"
          value={form.username}
          placeholder="Username..."
          required
          onChange={handelChange}
        />
      </div>
      <div className="form-controle">
        <label htmlFor="">
          {" "}
          <i class="fa-solid fa-user-tag"></i> Bio
        </label>
        <textarea
          name="bio"
          value={form.bio}
          onChange={handelChange}
          id=""
        ></textarea>
      </div>
      <div className="f-end">
        <Link to={"/settings"}>
          <button className="cancel">Cancel</button>
        </Link>
        <button onClick={updatePersonalInfo}>Save</button>
      </div>
    </div>
  );
}

export default PersonalInfo;
