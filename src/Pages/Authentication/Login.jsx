import React, { useEffect, useState } from "react";
import GoogleIcon from "../../Images/google.png";
import Popup from "../../Components/Popup";
import { Axios } from "../../Base/Axios";
import Cookies from "universal-cookie";
import { COOKIE_USER_ID_ALIAS } from "../../Base/Variables";
import Loading from "../../Components/Loading";

function Log() {
  let [show, setShow] = useState(false);
  let [form, setForm] = useState({ email: "", password: "" });
  let [err, setErr] = useState("");
  let [sucs, setSucs] = useState("");
  let cookie = new Cookies();
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

  let handelChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  // Log in

  let handelLogin = async () => {
    if (!form.email) setErr("Email is Required");
    else if (!form.password) setErr("Password is Required");
    else if (form.password.length <= 7)
      setErr("Password should have 8 characters or more");
    else
      try {
        setLoading(true);
        let res = await Axios.post("/auth/login", form);
        cookie.set(COOKIE_USER_ID_ALIAS, res.data.USER_ID);
        setSucs("You are Logged in Succssfully");
        setTimeout(() => {
          setLoading(false);
          window.location.pathname = "/";
        }, 1000);
        console.log(res);
      } catch (err) {
        setLoading(false);
        if ([404, 500, 401, 400].includes(err?.response?.status)) {
          setErr(err?.response?.data);
        }
      }
  };
  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "83353260242-mhni8tt14mp9i3mhi790j7luv8dh9mr1.apps.googleusercontent.com",
      callback: handleCredentialResponse,
    });

    google.accounts.id.renderButton(
      document.getElementById("google-sign-in-button"),
      { size: "large", shape: "pill", text: "signin_with" } // customization options
    );
  }, []);

  const handleCredentialResponse = async (response) => {
    setLoading(true);
    try {
      const res = await Axios.post("/auth/google", {
        credential: response.credential,
      });
      cookie.set(COOKIE_USER_ID_ALIAS, res.data.user._id);
      console.log(res);
      setSucs("You are Singed in Succssfully");
      setTimeout(() => {
        setLoading(false);
        window.location.pathname = "/";
      }, 1000);
    } catch (error) {
      console.log("Login error:", error);
    }
  };
  return (
    <div className="sing">
      <Popup message={err} state="error" show={err?.length !== 0}></Popup>
      <Popup message={sucs} state="succss" show={sucs?.length !== 0}></Popup>
      {loading && <Loading tr={true} exp={true}></Loading>}
      <div className="auth-container">
        <form>
          <h2>TF Exam</h2>
          <p>Welcome to True and False Exam</p>
          <div className="form-controle">
            <label htmlFor="">
              {" "}
              <i className="fas fa-envelope"></i> Email
            </label>
            <input
              onChange={handelChange}
              type="email"
              value={form.email}
              name="email"
              placeholder="Email..."
              required
            />
          </div>
          <div className="form-controle">
            <label htmlFor="">
              {" "}
              <i className="fas fa-lock"></i> Password
            </label>
            <input
              type="password"
              value={form.password}
              name="password"
              onChange={handelChange}
              placeholder="Password..."
              required
            />
            {/* <p style={{ textAlign: "start", marginTop: "10px" }}>
              Forget your Password ? <a href="/forget-password">Click Here</a>
            </p> */}
          </div>
          <div className="form-controle">
            <button
              onClick={(e) => {
                e.preventDefault();
                handelLogin();
              }}
            >
              Log in
            </button>
            <span>or</span>
            <div className="google-sing" id="google-sign-in-button">
              {/* <img src={GoogleIcon} alt="Google" />
              Log with Google */}
            </div>
            <div className="form-controle">
              <p>
                New to TF Exam ?<a href="/singin">Sing in</a>
              </p>
            </div>
          </div>
        </form>
        <div className="auth-img login-img"></div>
      </div>
    </div>
  );
}

export default Log;
