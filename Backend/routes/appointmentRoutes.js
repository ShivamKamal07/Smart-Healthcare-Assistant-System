const express = require("express");
const router = express.Router();
const { bookAppointment } = require("../controllers/appointmentController");
const Appointment = require("../models/appointment");
const { nextPatient } = require("../controllers/appointmentController");

router.post("/book", bookAppointment);

// Queue Status API
router.get("/queue/:doctorId/:patientId", async (req, res) => {
  try {
    const { doctorId, patientId } = req.params;

    // current serving patient
    const current = await Appointment.findOne({
      doctorId,
      status: "serving"
    });

    // current user ka appointment
    const userAppointment = await Appointment.findOne({
      doctorId,
      patientId
    });

    // waiting list
    const waiting = await Appointment.find({
      doctorId,
      status: "waiting"
    }).sort({ tokenNumber: 1 });

    // kitne log aage hai
    const patientsAhead = waiting.filter(
      a => a.tokenNumber < userAppointment.tokenNumber
    ).length;

    const avgTime = 10; // abhi fix rakho

    const waitingTime = patientsAhead * avgTime;

    res.json({
      currentToken: current?.tokenNumber || 0,
      yourToken: userAppointment.tokenNumber,
      patientsAhead,
      waitingTime
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error in queue API" });
  }
});

// new route for doctor button 

router.post("/queue/next", nextPatient);

module.exports = router;