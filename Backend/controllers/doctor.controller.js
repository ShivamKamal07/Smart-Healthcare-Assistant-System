

const Appointment = require("../models/appointment.model");

// Create doctor profile
exports.createDoctorProfile = async (req, res) => {
  try {
    const { userId, specialization, fee, location, availableSlots } = req.body;

    const doctor = await Doctor.create({
      userId,
      specialization,
      fee,
      location,
      availableSlots
    });

    res.json({
      message: "Doctor profile created",
      doctor
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 👉 Next Patient
exports.nextPatient = async (req, res) => {
  try {
    const { doctorId } = req.params;

    // Current serving ko complete karo
    await Appointment.findOneAndUpdate(
      { doctorId, status: "serving" },
      { status: "done" }
    );

    // Next waiting patient ko serving banao
    const next = await Appointment.findOneAndUpdate(
      { doctorId, status: "waiting" },
      { status: "serving" },
      { sort: { token: 1 }, new: true }
    );

    if (!next) {
      return res.json({ message: "No patients in queue" });
    }

    res.json({
      message: "Next patient called",
      currentToken: next.token,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};