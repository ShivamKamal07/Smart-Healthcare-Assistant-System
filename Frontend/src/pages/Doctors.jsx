import { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("doctors"));
    setDoctors(data || []);
  }, []);

  const book = async (doctorId) => {
    const userId = localStorage.getItem("userId");

    await API.post("/appointments/book", {
      patientId: userId,
      doctorId
    });

    navigate(`/queue/${doctorId}`);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Doctors Available</h2>

      <div className="row">
        {doctors.map(d => (
          <div className="col-md-4" key={d._id}>
            <div className="card p-3 shadow mb-3">
              <h5>{d.specialization}</h5>
              <p>Fee: ₹{d.fee}</p>
              <p>Next Available: {d.nextAvailableDay}</p>
              <button className="btn btn-primary" onClick={() => book(d._id)}>
                Book Appointment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}