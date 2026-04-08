const express = require("express");
const router = express.Router();
const { bookAppointment } = require("../controllers/appointmentController");

router.post("/book", bookAppointment);

router.get("/queue/:doctorId", async (req, res) => {
  const { doctorId } = req.params;

  const current = await Appointment.findOne({
    doctorId,
    status: "serving"
  });

  const waiting = await Appointment.find({
    doctorId,
    status: "waiting"
  }).sort({ tokenNumber: 1 });

  res.json({
    currentToken: current?.tokenNumber || 0,
    queue: waiting
  });
});

module.exports = router;