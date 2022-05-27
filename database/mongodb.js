const mongoose = require("mongoose");

if (mongoose.connection.readyState !== 1) {
  console.log("Connecting ", process.env.MONGO_URL);
  mongoose.connect(process.env.MONGO_URL);
}
