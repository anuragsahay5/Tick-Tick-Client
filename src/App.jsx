import Todo from "./pages/Todo";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute
              path1={<Todo />}
              path2={<Navigate to={"/login"}></Navigate>}
            />
          }
        />
        <Route
          path="/login"
          element={
            <ProtectedRoute
              path1={<Navigate to={"/"}></Navigate>}
              path2={<Login />}
            />
          }
        />
        <Route
          path="/register"
          element={
            <ProtectedRoute
              path1={<Navigate to={"/"}></Navigate>}
              path2={<Register />}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );

  function ProtectedRoute({ path1, path2 }) {
    if (
      localStorage.getItem("auth-token") &&
      localStorage.getItem("uname")
    ) {
      return path1;
    } else {
      return path2;
    }
  }
}
