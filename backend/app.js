const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/user.routes");
const patientRoutes = require("./routes/patient.routes");
const departmentRoutes = require("./routes/deparment.routes");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use("/api/user", userRoutes);
app.use("/api/patient", patientRoutes);
app.use("/api/department", departmentRoutes);

app.get("/", (req, res) => {
  res.send("Hello world");
});

module.exports = app;
