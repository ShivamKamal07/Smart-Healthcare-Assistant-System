import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";

export default function Dashboard() {
  const { doctorId } = useParams();
  const [appointments, setAppointments] = useState([]);

  const fetchData = () => {
    API.get(`/doctors/appointments/${doctorId}`)
      .then(res => setAppointments(res.data));
  };

  useEffect(() => {
    fetchData();
  }, [doctorId]);

  const nextPatient = async () => {
    await API.put(`/doctors/next/${doctorId}`);
    fetchData();
  };

  return (
    <div className="container mt-4">

      <h2 className="text-center text-primary mb-4">
        👨‍⚕️ Doctor Dashboard
      </h2>

      <div className="text-center mb-3">
        <button className="btn btn-success px-4" onClick={nextPatient}>
          Call Next Patient
        </button>
      </div>

      <div className="row">
        {appointments.map((a, index) => (
          <div className="col-md-4" key={a._id}>
            <div className="card shadow border-0 p-3 mb-3 rounded-4">

              <h5>Token #{a.tokenNumber}</h5>

              <p>
                Status:{" "}
                <span className={
                  a.status === "waiting"
                    ? "text-warning"
                    : a.status === "serving"
                    ? "text-success"
                    : "text-muted"
                }>
                  {a.status}
                </span>
              </p>

            </div>
          </div>
        ))}
      </div>

    </div>
  );
}