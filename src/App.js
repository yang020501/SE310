import { BrowserRouter, Route, Routes } from "react-router-dom";

import AuthLayout from "./layout/AuthLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import Profile from "./pages/User/Profile";
import Landing from "./pages/Landing";
import Login from './pages/Login'
import PageNotFound from "./pages/PageNotFound";
import Accounts from "./pages/Admin/Accounts";
import Courses from "./pages/User/Courses";
import Course from "./pages/User/Course";
import Class from "./pages/User/Class";
import Classes from "./pages/User/Classes";
import ClassDetail from "./pages/User/ClassDetail";
import CourseRegister from "./pages/User/CourseRegister";
import { useSelector } from 'react-redux';
import React, { useEffect } from "react";
import HookTesting from "./pages/HookTesting";
import Timetable from "./components/Timetable";
import Schedule from "./pages/User/Schedule";

function App() {

  const role = useSelector(state => state.userState.user ? state.userState.user.role : "")
  useEffect(() => {

  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/test" element={<HookTesting />} />
        <Route index path="/" element={<Landing />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />

          {

            role === "admin" ? <Route path="/admin" element={<Accounts />} /> :
              role === "mod" ?
                <React.Fragment>
                  <Route path="/courses" element={<Courses />} />
                  <Route path="/courses/:courseId" element={<Course />} />
                </React.Fragment> :
                (role === "lecturer" || role === "student") ?
                  <React.Fragment>
                    <Route path="/courses" element={<Classes />} />
                    <Route path="/courses/:courseId" element={<Class />} />
                    <Route path="/courses/:courseId/:blockId" element={<ClassDetail />} />
                    <Route path="/schedule" element={<Schedule />} />
                    {role === "student" ? <Route path="/courses/register" element={<CourseRegister />} /> : <></>}
                  </React.Fragment> :
                  <></>
          }

        </Route>

        <Route element={<AuthLayout />} >
          <Route path="/login" element={<Login />} />
        </Route>

        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
    </BrowserRouter >
  );
}

export default App;
