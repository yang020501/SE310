import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import AuthLayout from "./layout/AuthLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import Profile from "./pages/User/Profile";
import Landing from "./pages/Landing";
import Login from './pages/Login'
import Register from './pages/Register'
import PageNotFound from "./pages/PageNotFound";
import Accounts from "./pages/Admin/Accounts";
import Courses from "./pages/User/Courses";
import Course from "./pages/User/Course";
import Class from "./pages/User/Class";
import Classes from "./pages/User/Classes";
import ClassDetail from "./pages/User/ClassDetail";
import { useSelector } from 'react-redux';
import React from "react";
function App() {
  const role = useSelector(state => state.userState.user ? state.userState.user.role : "")
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Landing />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />

          {

            role === "admin" ? <Route path="/admin" element={<Accounts />} /> :
              role === "mod" ?
                <React.Fragment>
                  <Route path="/courses" element={<Courses />} />
                  <Route path="/courses/:id" element={<Course />} />
                </React.Fragment> :
                (role === "lecturer" || role === "student") ?
                  <React.Fragment>
                    <Route path="/classes" element={<Classes />} />
                    <Route path="/classes/:id" element={<Class />} />
                    <Route path="/classes/:id/:id" element={<ClassDetail />} />
                  </React.Fragment> :
                  <></>
          }
          
        </Route>

        <Route element={<AuthLayout />} >
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>

        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
    </BrowserRouter >
  );
}

export default App;
