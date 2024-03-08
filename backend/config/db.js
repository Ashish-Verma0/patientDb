const mongoose = require("mongoose");

mongoose.connection.on("open", () => {
  console.log("Database connected Successfully");
});

mongoose.connection.on("end", () => {
  console.log("Database disConnected");
});

const url = "mongodb://127.0.0.1:27017/doctor";

const startDatabase = async () => {
  try {
    await mongoose.connect(url);
  } catch (error) {
    console.log(error);
  }
};
module.exports = startDatabase;
