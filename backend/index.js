const app = require("./app");
const startDatabase = require("./config/db");
require("dotenv").config()
const port = 8090;

const startServer = async () => {
  try {
    await startDatabase();
    app.listen(port, () => {
      console.log(`server is running on port:-${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
