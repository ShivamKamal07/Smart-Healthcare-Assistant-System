import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Symptom() {
  const [symptoms, setSymptoms] = useState("");
  const navigate = useNavigate();

  const analyze = async () => {
    const res = await API.post("/symptoms/analyze", {
      symptoms: symptoms.split(",")
    });

    localStorage.setItem("doctors", JSON.stringify(res.data.doctors));
    navigate("/doctors");
  };

  return (
    <div className="container mt-5 text-center">
      <div className="card p-4 shadow">
        <h3>Enter Symptoms</h3>
        <input className="form-control my-3" placeholder="fever,cough" onChange={e => setSymptoms(e.target.value)} />
        <button className="btn btn-success" onClick={analyze}>Analyze</button>
      </div>
    </div>
  );
}