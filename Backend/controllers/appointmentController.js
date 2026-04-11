const Appointment = require("../models/appointment");

// ✅ Book appointment
exports.bookAppointment = async (req, res) => {
  try {
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

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// ✅ Patient history (OUTSIDE function)
exports.getPatientHistory = async (req, res) => {
  try {
    const { userId } = req.params;

    const history = await Appointment.find({ patientId: userId })
      .populate("doctorId", "specialization location")
      .sort({ createdAt: -1 });

    res.json(history);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};