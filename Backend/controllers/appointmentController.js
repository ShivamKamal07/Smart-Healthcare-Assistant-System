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


exports.nextPatient = async (req, res) => {
  try {
    const { doctorId } = req.body;

    // current ko complete karo
    await Appointment.findOneAndUpdate(
      { doctorId, status: "serving" },
      { status: "completed" }
    );

    // next patient ko serving bana do
    const next = await Appointment.findOneAndUpdate(
      { doctorId, status: "waiting" },
      { status: "serving" },
      { sort: { tokenNumber: 1 }, new: true }
    );

    res.json({
      message: "Next patient called",
      next
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error in next patient" });
  }
};