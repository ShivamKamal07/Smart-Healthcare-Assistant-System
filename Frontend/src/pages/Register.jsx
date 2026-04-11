import { useState } from "react";
import API from "../api";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const register = async () => {
    try {
      await API.post("/auth/register", form);
      alert("Registered Successfully!");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: "400px" }}>
        
        <h3 className="text-center mb-4 text-primary">Create Account</h3>

        {/* Name */}
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            className="form-control"
            placeholder="Enter name"
            onChange={e => setForm({ ...form, name: e.target.value })}
          />
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            className="form-control"
            placeholder="Enter email"
            onChange={e => setForm({ ...form, email: e.target.value })}
          />
        </div>

        {/* Password */}
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={e => setForm({ ...form, password: e.target.value })}
          />
        </div>

        {/* Role */}
        <div className="mb-3">
          <label className="form-label">Role</label>
          <select
            className="form-select"
            onChange={e => setForm({ ...form, role: e.target.value })}
          >
            <option value="">Select Role</option>
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
          </select>
        </div>

        {/* Button */}
        <button className="btn btn-primary w-100 mb-3" onClick={register}>
          Register
        </button>

        {/* Login Link */}
        <p className="text-center">
          Already have an account?{" "}
          <Link to="/" className="text-decoration-none">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}