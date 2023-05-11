const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
  seat: { type: String, match: /[A-F][1-9]\d?/ },
  price: {
    type: Number,
  },
  flight: [{ type: Schema.Types.ObjectId, ref: "flight" }],
});

module.exports = mongoose.model("Ticket", ticketSchema);
