

const Appointment = require("../models/appointment");

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
 
if (req.user?.role !== "doctor") {
  return res.status(403).json({ message: "Only doctor allowed" });
}
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

// Search doctors with filters
exports.searchDoctors = async (req, res) => {
  try {
    const { specialization, maxFee, location } = req.query;

    let filter = {};

    // Filter by specialization
    if (specialization) {
      filter.specialization = specialization;
    }

    // Filter by fee
    if (maxFee) {
      filter.fee = { $lte: Number(maxFee) };
    }

    // Filter by location
    if (location) {
      filter.location = location;
    }

    const doctors = await Doctor.find(filter).populate("userId", "name");

    res.json({
      count: doctors.length,
      doctors
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getDoctorAppointments = async (req, res) => {
  try {
    const { doctorId } = req.params;

    const appointments = await Appointment.find({ doctorId })
      .sort({ tokenNumber: 1 })
      .populate("patientId", "name");

    res.json(appointments);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};