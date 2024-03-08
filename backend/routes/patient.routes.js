const express = require("express");
const {
  createPatient,
  searchPatient,
  updatePatient,
  getPatientById,
  getPatient,
} = require("../controllers/patient.controller");

const patientRoutes = express.Router();

patientRoutes.post("/create", createPatient);
patientRoutes.get("/:searchKey/:doctor_id", searchPatient);
patientRoutes.put("/update/:id", updatePatient);
patientRoutes.get("/:id", getPatientById);
// patientRoutes.get("/", getPatient);
module.exports = patientRoutes;
