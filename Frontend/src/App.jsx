import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Symptom from "./pages/Symptom";
import Doctors from "./pages/Doctors";
import Queue from "./pages/Queue";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";

// import './App.css'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/symptoms" element={<Symptom />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/queue/:doctorId" element={<Queue />} />
        <Route path="/dashboard/:doctorId" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App
