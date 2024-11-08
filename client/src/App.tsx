import { Route, Routes } from "react-router-dom";
import Home from "./home/Home";
import Login from "./auth/page/Login";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login /> } />
      </Routes>
    </div>
  )
}
