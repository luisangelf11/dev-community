import { Route, Routes } from "react-router-dom";
import Home from "./home/Home";
import Login from "./auth/page/Login";
import Register from "./auth/page/Register";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login /> } />
        <Route path="/register" element={<Register /> } />
      </Routes>
    </div>
  )
}
