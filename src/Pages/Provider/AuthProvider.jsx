import React from "react";
import Cookies from "universal-cookie";
import { COOKIE_USER_ID_ALIAS } from "../../Base/Variables";
import { Navigate, Outlet } from "react-router-dom";

function AuthProvider() {
  let id = new Cookies().get(COOKIE_USER_ID_ALIAS);
  return !id ? <Outlet></Outlet> : <Navigate to={"/"}></Navigate>;
}

export default AuthProvider;
