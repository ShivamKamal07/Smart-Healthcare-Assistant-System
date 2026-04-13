const express = require("express");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/doctors", require("./routes/doctor.routes"));
app.use("/api/symptoms", require("./routes/symptomRoutes"));
app.use("/api/appointments", require("./routes/appointmentRoutes"));

// DB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

server.listen(5000, () => {
  console.log("Server running on port 5000");
});


// cors
const cors = require("cors");

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());