const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const { nextPatient , createDoctorProfile, searchDoctors ,getDoctorAppointments } = require("../controllers/doctor.controller");

//  Create doctor profile
router.post("/create", createDoctorProfile);

// Get doctors
router.get("/", async (req, res) => {
  const doctors = await Doctor.find().populate("userId");
  res.json(doctors);
});

// Protect route
router.put("/next/:doctorId", authMiddleware, nextPatient);
// Next patient
router.put("/next/:doctorId", nextPatient);


// Search doctors
router.get("/search", searchDoctors);

// DoctorAppointments
router.get("/appointments/:doctorId", getDoctorAppointments);



module.exports = router;