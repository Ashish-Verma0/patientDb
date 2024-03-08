const Patient = require("../models/patiend.model");

const createPatient = async (req, res) => {
  try {
    const isCrnExists = await Patient.findOne({ crn: req.body.crn });
    const isPhoneExists = await Patient.findOne({ phone: req.body.phone });
    if (isCrnExists) {
      return res.status(201).json({
        success: false,
        message: "Crn Already Exists",
      });
    }

    if (isPhoneExists) {
      return res.status(201).json({
        success: false,
        message: "phone Already Exists",
      });
    }

    const patient = await Patient.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Patient Created Successfully",
      data: patient,
    });
  } catch (error) {
    console.log(error);
  }
};

// const updatePatient = async (req, res) => {
//   try {
//     console.log(req.body)
//     const getDiagnosis = await Patient.findById(req.params.id);
//     const patientUpdate = await Patient.findByIdAndUpdate(
//       req.params.id,
//       {
//         $push: {
//           diagnosis: { ...req.body.diagnosis },
//         },
//       },
//       {
//         new: true,
//       }
//     );

//     return res.status(200).json({
//       success: true,
//       message: "Patient Updated Successfully",
//       data: patientUpdate,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

const updatePatient = async (req, res) => {
  try {
    console.log(req.body);
    const { name, age, sex, crn, desc, doctor_id, nextApointmentDate } =
      req.body;
    const patientId = req.params.id;
    const newDiagnosisData = req.body.diagnosis;

    const patient = await Patient.findById(patientId);
    if (desc) patient.desc = desc;
    if (nextApointmentDate) patient.nextApointmentDate = nextApointmentDate;
    patient.diagnosis.push(...newDiagnosisData);

    const patientUpdate = await patient.save();
    console.log("patientUpdate", patientUpdate);
    return res.status(200).json({
      success: true,
      message: "Patient Updated Successfully",
      data: patientUpdate,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating the patient.",
      error: error.message,
    });
  }
};

const searchPatient = async (req, res) => {
  try {
    const searchKey = req.params.searchKey;
    const result = await Patient.find({
      doctor_id: req.params.doctor_id,
      $or: [{ crn: { $regex: searchKey } }, { phone: { $regex: searchKey } }],
    }).populate("doctor_id");
    return res.status(200).json({
      success: true,
      message: "Patient Found Successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

// const getPatient = async (req, res) => {
//   try {
//     const patient = await Patient.find();
//     return res.status(200).json({
//       success: true,
//       message: "Patient Found Successfully",
//       data: patient,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

const getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findOne({ _id: req.params.id });
    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient Not Found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Patient Found Successfully",
      data: patient,
    });
  } catch (error) {
    console.error("Error fetching patient:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  createPatient,
  searchPatient,
  updatePatient,
  getPatientById,
  // getPatient,
};
