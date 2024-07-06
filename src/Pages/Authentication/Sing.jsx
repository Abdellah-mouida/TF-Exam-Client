import React, { useEffect, useState } from "react";
import GoogleIcon from "../../Images/google.png";
import Popup from "../../Components/Popup";
import { Axios } from "../../Base/Axios";
import Cookies from "universal-cookie";
import { COOKIE_USER_ID_ALIAS } from "../../Base/Variables";
import Loading from "../../Components/Loading";
import GoogleSignIn from "../../Components/GoogleSingIn";
import GoogleLogin from "react-google-login";

function Sing() {
  let [show, setShow] = useState(false);
  let [form, setForm] = useState({ username: "", email: "", password: "" });
  let [err, setErr] = useState("");
  let [sucs, setSucs] = useState("");
  let [loading, setLoading] = useState(false);
  let cookie = new Cookies();
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
  // Sing in

  let handelSingin = async () => {
    if (form.username.length < 3)
      setErr("Username Should have at least 4 Characters");
    else if (!form.email) setErr("Email is Required");
    else if (!form.password) setErr("Password is Required");
    else if (form.password.length < 7)
      setErr("Password should have 8 characters or more");
    else
      try {
        setLoading(true);
        let res = await Axios.post("/auth/singin", form);
        cookie.set(COOKIE_USER_ID_ALIAS, res.data.USER_ID);
        console.log(res);
        setSucs("You are Singed in Succssfully");
        setTimeout(() => {
          setLoading(false);
          window.location.pathname = "/";
        }, 1000);
      } catch (err) {
        if ([400, 500, 411].includes(err?.response?.status)) {
          setErr(err?.response?.data);
        }
      }
  };
  // Google Sign in

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
          </div>
          <div className="form-controle">
            <button
              onClick={(e) => {
                e.preventDefault();
                handelSingin();
              }}
            >
              Sing in
            </button>
            <span>or</span>
            <div className="google-sing" id="google-sign-in-button">
              {/* <img src={GoogleIcon} alt="Google" />
              Sing with Google */}
            </div>
            <div className="form-controle">
              <p>
                Have already an acount ?<a href="/login">Log in</a>
              </p>
            </div>
          </div>
        </form>
        <div className="auth-img"></div>
      </div>
    </div>
  );
}

export default Sing;
