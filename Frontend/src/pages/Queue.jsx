import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";

export default function Queue() {
  const { doctorId } = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchQueue = () => {
      API.get(`/appointments/queue/${doctorId}`)
        .then(res => setData(res.data));
    };

    fetchQueue();

    // 🔥 Auto refresh every 5 sec
    const interval = setInterval(fetchQueue, 5000);

    return () => clearInterval(interval);
  }, [doctorId]);

  return (
    <div className="container mt-5">

      <h2 className="text-center mb-4 text-primary">
        🏥 Live Queue Status
      </h2>

      <div className="row text-center">

        {/* Current Token */}
        <div className="col-md-4 mb-3">
          <div className="card shadow border-0 p-4">
            <h5>Current Token</h5>
            <h1 className="text-success">{data.currentToken || 0}</h1>
          </div>
        </div>

        {/* Waiting Count */}
        <div className="col-md-4 mb-3">
          <div className="card shadow border-0 p-4">
            <h5>Waiting Patients</h5>
            <h2 className="text-warning">{data.waitingCount || 0}</h2>
          </div>
        </div>

        {/* Estimated Time */}
        <div className="col-md-4 mb-3">
          <div className="card shadow border-0 p-4">
            <h5>Estimated Time</h5>
            <h2 className="text-danger">
              {data.estimatedWaitingTime || 0} mins
            </h2>
          </div>
        </div>

      </div>

      {/* Queue List */}
      <div className="card shadow mt-4 p-3">
        <h5 className="mb-3">Queue List</h5>

        {data.queue && data.queue.length > 0 ? (
          data.queue.map((q, index) => (
            <div
              key={q._id}
              className="d-flex justify-content-between align-items-center border-bottom py-2"
            >
              <span>Token #{q.tokenNumber}</span>

              {q.isEmergency ? (
                <span className="badge bg-danger">Emergency</span>
              ) : (
                <span className="badge bg-secondary">Normal</span>
              )}
            </div>
          ))
        ) : (
          <p className="text-muted">No patients in queue</p>
        )}
      </div>

    </div>
  );
}