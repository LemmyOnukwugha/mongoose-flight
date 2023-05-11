const mongoose = require("mongoose");

mongoose.connect(PROCESS.ENV.MONGO_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("connected", function () {
  console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
});

module.exports = db;
