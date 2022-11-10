import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminLayout from "./layout/AdminLayout";
import AuthLayout from "./layout/AuthLayout";
import UserLayout from "./layout/UserLayout";
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from "./pages/Admin/Dashboard"
import PageNotFound from "./pages/PageNotFound";
import Accounts from "./pages/Admin/Accounts";
import Courses from "./pages/User/Courses";
import Course from "./pages/User/Course";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<UserLayout />} >
          <Route path="/courses" element={<Courses/>} />
          <Route path="/courses/:id" element={<Course/>} />
        </Route>
        <Route element={<AuthLayout />} >
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path='/admin' element={<AdminLayout />} >
          <Route path="" element={<Dashboard />} />
          <Route path="accounts" element={<Accounts />} />
        </Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
