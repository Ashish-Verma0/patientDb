const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema({
  problemName: [
    {
      name: {
        type: String,
      },
    },
  ],
  department_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
  },

});

module.exports = mongoose.model("Problem", problemSchema);
