import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Axios } from "../../Base/Axios";
import Cookies from "universal-cookie";
import { COOKIE_USER_ID_ALIAS } from "../../Base/Variables";

function Settings() {
  let [data, setData] = useState({});

  useEffect(() => {
    Axios.get(
      "/users/settings/all/" + new Cookies().get(COOKIE_USER_ID_ALIAS)
    ).then((res) => setData(res.data));
  }, []);
  console.log(data);
  return (
    <div className="settings">
      <h1 className="g-title">Settings</h1>
      <div className="settings-container">
        <Link to={"personal-info"} className="settings-link">
          <i className="fa-solid fa-address-card"></i>
          <div>
            <h3>Personal Info</h3>
            <p>Image Profile , username , Bio</p>
          </div>
        </Link>
        {!data.googleId && (
          <Link to={"change-password"} className="settings-link">
            <i className="fa-solid fa-key"></i>
            <div>
              <h3>Change Password</h3>
              <p>Your Password</p>
            </div>
          </Link>
        )}
        {/* <Link to={"language"} className="settings-link">
          <i className="fa-solid fa-language"></i>
          <div>
            <h3>Language</h3>
            <p>
              {data?.language === "an"
                ? "English"
                : data?.language === "ar"
                ? "Arabic"
                : "French"}
            </p>
          </div>
        </Link> */}
        <Link to={"privacy"} className="settings-link">
          <i className="fa-solid fa-lock"></i>
          <div>
            <h3>Privacy</h3>
            <p>{data?.privacy}</p>
          </div>
        </Link>

        <Link to={"theme"} className="settings-link">
          <i class="fa-solid fa-palette"></i>
          <div>
            <h3>Theme</h3>
            <p>{data?.theme}</p>
          </div>
        </Link>
        <Link to={"/settings/about"} className="settings-link">
          <i className="fa-solid fa-circle-info"></i>
          <div>
            <h3>About</h3>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Settings;
