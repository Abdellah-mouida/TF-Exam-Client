import React, { useEffect, useState } from "react";
import { Axios } from "../../Base/Axios";
import Cookies from "universal-cookie";
import Loading from "../../Components/Loading";
import { COOKIE_USER_ID_ALIAS } from "../../Base/Variables";
import notFoundBlue from "../../Images/blue.svg";
import notFoundRed from "../../Images/red.svg";
import notFoundOrange from "../../Images/orange.svg";
import notFoundGreen from "../../Images/green.svg";
import { Link, useNavigate } from "react-router-dom";

function NotFound() {
  let [loading, setLoading] = useState(true);

  let id = new Cookies().get(COOKIE_USER_ID_ALIAS);
  let nav = useNavigate();

  let [theme, setTheme] = useState("");
  useEffect(() => {
    setTimeout(() => {
      nav("/", { replace: true });
    }, 3000);
    Axios.get("/users/settings/theme/" + id)
      .then((res) => {
        setTheme(res.data.theme);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);
  console.log(theme);

  return (
    <div className="not-found">
      <img
        src={
          theme
            ? theme.includes("Red")
              ? notFoundRed
              : theme.includes("Orange")
              ? notFoundOrange
              : theme.includes("Green")
              ? notFoundGreen
              : notFoundBlue
            : notFoundBlue
        }
        alt=""
        width="500px"
      />
      <Link to={"/"}>
        <div className="form-controle">
          <button>Home Page</button>
        </div>
      </Link>
    </div>
  );
}

export default NotFound;
