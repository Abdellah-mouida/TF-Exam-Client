import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Axios } from "../../Base/Axios";
import Cookies from "universal-cookie";
import { COOKIE_USER_ID_ALIAS } from "../../Base/Variables";
import Loading from "../../Components/Loading";

function RoleProvider(props) {
  let id = new Cookies().get(COOKIE_USER_ID_ALIAS);
  let [role, setRole] = useState("");

  useEffect(() => {
    Axios.get("/users/role/" + id)
      .then((res) => {
        setRole(res.data.role);
      })
      .catch((err) => console.log(err));
  }, []);
  return role ? (
    props.role.includes(role) ? (
      <Outlet></Outlet>
    ) : (
      <Navigate to={"/"}></Navigate>
    )
  ) : (
    <Loading></Loading>
  );
}

export default RoleProvider;
