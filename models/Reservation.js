const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant", required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  people: { type: Number, required: true, min: 1 }
});

module.exports = mongoose.model("Reservation", reservationSchema);