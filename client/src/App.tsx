import { Route, Routes } from "react-router-dom";
import Home from "./home/pages/Home";
import Login from "./auth/page/Login";
import Register from "./auth/page/Register";
import ProtectedRoutes from "./components/ProtectedRoutes";

export default function App() {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}
