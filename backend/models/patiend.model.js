const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  age: {
    type: Number,
  },
  sex: {
    type: String,
  },
  crn: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
  },
  nextApointmentDate: {
    type: Date,
  },
  diagnosis: [
    {
      problem: {
        name: String,
        scale1: String,
        scale2: String,
        scale3: String,
      },
      date: String,
      // desc: String,
    },
  ],
  //   department_id: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Department",
  //   },
  doctor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Patient", patientSchema);
