import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Cookies from "universal-cookie";
import { COOKIE_USER_ID_ALIAS } from "../Base/Variables";
import { Axios } from "../Base/Axios";

function Menu() {
  let id = new Cookies().get(COOKIE_USER_ID_ALIAS);
  let [data, setData] = useState({});
  useEffect(() => {
    Axios.get("/users/settings/personal-info/" + id)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <menu>
      <header>TF Exam</header>
      <div className="profile">
        <div
          className="menu-img"
          style={{ backgroundImage: `url(${data.profile})` }}
        ></div>
        {data.username}
      </div>
      <div className="navigation">
        <NavLink className="Link" to="/">
          <i className="fas fa-home"></i> Home
        </NavLink>
        <NavLink className="Link" to={"/profile/" + id}>
          <i className="fas fa-user"></i>Profile
        </NavLink>
        {data?.role === "Admin" && (
          <NavLink className="Link" to={"/users"}>
            <i className="fas fa-users"></i>Users
          </NavLink>
        )}
        {data?.role === "Teacher" && (
          <NavLink className="Link" to={"/create-exam"}>
            <i className="fas fa-plus"></i>Create Exam
          </NavLink>
        )}
        <NavLink className="Link" to={"/settings"}>
          <i className="fa-solid fa-gear"></i> Settings
        </NavLink>
        <NavLink className="Link" to={"/leaderboard"}>
          <i className="fa-solid fa-ranking-star"></i> Leaderboard
        </NavLink>
        {data?.role === "Student" && (
          <NavLink className="Link" to="history">
            <i className="fa-solid fa-clock-rotate-left"></i>Passed Exams
          </NavLink>
        )}
      </div>
      <button
        onClick={() => {
          new Cookies().remove(COOKIE_USER_ID_ALIAS);
          window.location.pathname = "/login";
          // window.location.reload();
        }}
      >
        <i className="fa-solid fa-arrow-right-from-bracket"></i>Log out
      </button>
    </menu>
  );
}

export default Menu;
