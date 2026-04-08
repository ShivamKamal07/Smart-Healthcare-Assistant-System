const Appointment = require("../models/appointment");

exports.bookAppointment = async (req, res) => {
  const { patientId, doctorId, isEmergency } = req.body;

  // Find last token
  const last = await Appointment.findOne({ doctorId })
    .sort({ tokenNumber: -1 });

  const newToken = last ? last.tokenNumber + 1 : 1;

  const appointment = await Appointment.create({
    patientId,
    doctorId,
    tokenNumber: newToken,
    isEmergency
  });

  res.json(appointment);
};