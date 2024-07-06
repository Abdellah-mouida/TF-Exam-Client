import React, { useState } from "react";
import { Axios } from "../../Base/Axios";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../Components/Loading";
import Popup from "../../Components/Popup";
import Cookies from "universal-cookie";
import { COOKIE_USER_ID_ALIAS } from "../../Base/Variables";

function ChangePassword() {
  let [password, setPassword] = useState("");
  let [passwordRep, setPasswordRep] = useState("");
  let [loading, setLoading] = useState(false);
  let [err, setErr] = useState("");
  let nav = useNavigate();
  let changePsw = async () => {
    if (password.length < 7)
      setErr("Password should have 8 characters or more");
    else if (password !== passwordRep) {
      setErr("Passwords Does Not Match");
    } else {
      setLoading(true);
      try {
        let res = await Axios.post(
          "/users/settings/changePsw/" +
            new Cookies().get(COOKIE_USER_ID_ALIAS),
          {
            password,
          }
        );
        setLoading(false);
        nav("/settings");
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    }
  };
  if (err) {
    setTimeout(() => {
      setErr("");
    }, 5000);
  }
  return (
    <div className="change-psw">
      <Popup message={err} state="error" show={err?.length !== 0}></Popup>
      {loading && <Loading tr={true}></Loading>}
      <div className="g-title">Change Password</div>
      <div className="form-controle">
        <label htmlFor="">New Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="form-controle">
        <label htmlFor="">Repeat Password</label>
        <input
          type="password"
          value={passwordRep}
          onChange={(e) => setPasswordRep(e.target.value)}
        />
      </div>

      <div className="f-end">
        <Link to={"/settings"}>
          <button className="cancel">Cancel</button>
        </Link>
        <button onClick={changePsw}>Save</button>
      </div>
    </div>
  );
}

export default ChangePassword;
