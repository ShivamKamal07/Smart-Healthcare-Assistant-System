const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Doctor = require("../models/doctor");

const Appointment = require("../models/appointment");
const { bookAppointment ,  getPatientHistory } = require("../controllers/appointmentController");



router.post("/book", bookAppointment);


router.get("/queue/:doctorId", async (req, res) => {
  try {
    const { doctorId } = req.params;

    const current = await Appointment.findOne({
      doctorId,
      status: "serving"
    });

    const waiting = await Appointment.find({
      doctorId,
      status: "waiting"
    }).sort({ tokenNumber: 1 });

    // 🔥 NEW
    const waitingCount = waiting.length;

    const doctor = await Doctor.findById(doctorId);

    const estimatedWaitingTime =
      waitingCount * (doctor?.avgConsultationTime || 10);

    res.json({
      currentToken: current?.tokenNumber || 0,
      queue: waiting,
      waitingCount,
      estimatedWaitingTime
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/history/:userId", getPatientHistory);


module.exports = router;