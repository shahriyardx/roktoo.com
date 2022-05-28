const mongoose = require("mongoose");

if (mongoose.connection.readyState !== 1) {
  console.log("Connecting to mongodb");
  mongoose.connect(process.env.MONGO_URL);
}
