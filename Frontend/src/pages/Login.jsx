import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    const res = await API.post("/auth/login", { email, password });
    localStorage.setItem("userId", res.data.user._id);

    if (res.data.user.role === "doctor") {
      navigate(`/dashboard/${res.data.user._id}`);
    } else {
      navigate("/symptoms");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: "350px" }}>
        <h3 className="text-center mb-3">Login</h3>

        <input className="form-control mb-2" placeholder="Email" onChange={e => setEmail(e.target.value)} />
        <input className="form-control mb-3" type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />

        <button className="btn btn-primary w-100" onClick={login}>Login</button>
      </div>
    </div>
  );
}