import React, { useState } from "react";
import { Axios } from "../../Base/Axios";
import Popup from "../../Components/Popup";
import Loading from "../../Components/Loading";

function ForgetPassword() {
  let [email, setEmail] = useState("");
  let [err, setErr] = useState("");
  let [sucs, setSucs] = useState("");
  let [loading, setLoading] = useState(false);
  if (err) {
    setTimeout(() => {
      setErr("");
    }, 5000);
  }
  if (sucs) {
    setTimeout(() => {
      setSucs("");
    }, 5000);
  }
  let sendCode = async () => {
    try {
      let res = await Axios.post("/auth/forgetPassword", { email });
      console.log(res);
      setSucs("Code Sent Sucssfully");
    } catch (err) {
      if ([404, 500, 401, 400, 421].includes(err?.response?.status)) {
        setErr(err?.response?.data);
      }
    }
  };
  return (
    <div className="sing forget-psw">
      <Popup message={err} state="error" show={err?.length !== 0}></Popup>
      <Popup message={sucs} state="succss" show={sucs?.length !== 0}></Popup>
      {loading && <Loading tr={true} exp={true}></Loading>}
      <div className="auth-container">
        <div className="form-controle">
          <label htmlFor="">
            <i className="fas fa-envelope"></i> Email
          </label>
          <input
            type="email"
            name="email"
            id=""
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <p className="note-code">
            You will resive a code in your Email Box that can be used insted of
            Password , (the code expire in 5 min){" "}
          </p>
          <button onClick={sendCode}>Send Code</button>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;
