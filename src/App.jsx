import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Sing from "./Pages/Authentication/Sing";
import Log from "./Pages/Authentication/Login";
import Home from "./Pages/Home/Home";
import ExamPreview from "./Pages/Home/ExamPreview";
import CreateExam from "./Pages/Home/CreateExam";
import Authenticator from "./Pages/Authentication/Authenticator";
import PasseExam from "./Pages/Home/PasseExam";
import Score from "./Pages/Home/Score";
import History from "./Pages/Home/History";
import HistroyPreview from "./Pages/Home/HistroyPreview";
import Users from "./Pages/User/Users";
import UpdateUser from "./Pages/User/UpdateUser";
import Leaderboard from "./Pages/Leaderboard/Leaderboard";
import Settings from "./Pages/Settings/Settings";
import PersonalInfo from "./Pages/Settings/PersonalInfo";
import Language from "./Pages/Settings/Language";
import Privacy from "./Pages/Settings/Privacy";
import Theme from "./Pages/Settings/Theme";
import { Axios } from "./Base/Axios";
import { COOKIE_USER_ID_ALIAS, Themes } from "./Base/Variables";
import Cookies from "universal-cookie";
import RoleProvider from "./Pages/Provider/RoleProvider";
import Profile from "./Pages/User/Profile";
import About from "./Pages/Settings/About";
import NotFound from "./Pages/Error/NotFound";
import AuthProvider from "./Pages/Provider/AuthProvider";
import ForgetPassword from "./Pages/Authentication/ForgetPassword";
import ChangePassword from "./Pages/Settings/ChangePassword";

function App() {
  let [theme, setTheme] = useState({});
  let id = new Cookies().get(COOKIE_USER_ID_ALIAS);
  useEffect(() => {
    Axios.get("/users/settings/theme/" + id)
      .then((res) => {
        let dataTheme = res.data.theme;
        setTheme(Themes.find((x) => x.name === dataTheme));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route element={<AuthProvider></AuthProvider>}>
          <Route path="/singin" element={<Sing></Sing>}></Route>
          {/* <Route
            path="/forget-password"
            element={<ForgetPassword></ForgetPassword>}
          ></Route> */}
          <Route path="/login" element={<Log></Log>}></Route>
        </Route>
        <Route path="/*" element={<NotFound></NotFound>}></Route>
        <Route element={<Authenticator></Authenticator>}>
          <Route path="/" element={<Home></Home>}>
            {/* ADMIN ROLE PROTECTION */}
            <Route element={<RoleProvider role={["Admin"]}></RoleProvider>}>
              <Route path="/users" element={<Users></Users>}></Route>
              <Route
                path="/users/update/:id"
                element={<UpdateUser></UpdateUser>}
              ></Route>
            </Route>

            {/* ----------------------------------- */}

            {/* STUDENT ROLE PROTECTION */}

            <Route element={<RoleProvider role={["Student"]}></RoleProvider>}>
              <Route path="/exam/:id" element={<PasseExam></PasseExam>}></Route>
              <Route path="/history" element={<History></History>}></Route>
              <Route
                path="/history/:id"
                element={<HistroyPreview></HistroyPreview>}
              ></Route>
              <Route path="/exam/score/:id" element={<Score></Score>}></Route>
            </Route>

            {/* -------------------------------------- */}

            {/* TEACHER ROLE PROTECTION */}

            <Route element={<RoleProvider role={["Teacher"]}></RoleProvider>}>
              <Route
                path="/create-exam"
                element={<CreateExam></CreateExam>}
              ></Route>
            </Route>

            {/* -------------------------------------- */}

            <Route path="/" element={<ExamPreview></ExamPreview>}></Route>
            <Route path="/profile/:id" element={<Profile></Profile>}></Route>
            <Route
              path="/leaderboard"
              element={<Leaderboard></Leaderboard>}
            ></Route>
            <Route path="/settings" element={<Settings></Settings>}></Route>
            <Route
              path="/settings/personal-info"
              element={<PersonalInfo></PersonalInfo>}
            ></Route>
            <Route
              path="/settings/change-password"
              element={<ChangePassword></ChangePassword>}
            ></Route>
            {/* <Route
              path="/settings/language"
              element={<Language></Language>}
            ></Route> */}
            <Route
              path="/settings/privacy"
              element={<Privacy></Privacy>}
            ></Route>
            <Route path="/settings/theme" element={<Theme></Theme>}></Route>
            <Route path="/settings/about" element={<About></About>}></Route>
          </Route>
        </Route>
      </Routes>
      <style>
        {theme?.name
          ? theme.name?.split(" ")[0] === "Light"
            ? `:root{  --Prcl:${theme.Prcl};--Btn:${theme.btn} ;--TR-Prcl:${theme.Prcl}33;  --Black: #000;
  --White: #fff;
  --Dark: #111;
  --Light: #eee;
  --TR-Black: #0000006b;}`
            : `:root{--Prcl:${theme.Prcl};--Btn:${theme.btn} ; --Black: #fff;--TR-Prcl: ${theme.Prcl}33;
  --White: #000;
  --Dark: #eee;
  --Light: #111;
  --TR-Black: #ffffff6b;}`
          : `:root{--Prcl:#ffb0000;--Btn:#000 ; --Black: #fff;--TR-Prcl:#00ff0033;
  --White: #000;
  --Dark: #eee;
  --Light: #111;
  --TR-Black: #ffffff6b;}`}
      </style>
    </div>
  );
}

export default App;
