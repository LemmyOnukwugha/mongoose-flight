const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const destinationSchema = new Schema({
  airport: {
    type: String,
    enum: ["AUS", "DFW", "DEN", "LAX", "SAN"],
  },
  arrival: {
    type: Date,
    require: true,
  },
});

const flightSchema = new Schema({
  airline: {
    type: String,
    enum: ["American", "Southwest", "United"],
  },
  airport: {
    type: String,
    enum: ["AUS", "DFW", "DEN", "LAX", "SAN"],
  },
  flightNo: {
    type: Number,
    // required: true,
  },

  departs: {
    type: Date,
    required: true,
  },
  destinations: [destinationSchema],
});

module.exports = mongoose.model("Flight", flightSchema);
