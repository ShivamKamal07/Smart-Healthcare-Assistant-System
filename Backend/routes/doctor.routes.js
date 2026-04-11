const express = require("express");
const router = express.Router();
const { nextPatient , createDoctorProfile} = require("../controllers/doctor.controller");

//  Create doctor profile
router.post("/create", createDoctorProfile);

// Get doctors
router.get("/", async (req, res) => {
  const doctors = await Doctor.find().populate("userId");
  res.json(doctors);
});

// Next patient
router.put("/next/:doctorId", nextPatient);



module.exports = router;