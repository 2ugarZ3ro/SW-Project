const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  name: String,
  address: String,
  phone: String,
  openTime: String,
  closeTime: String,
});

module.exports = mongoose.model("Restaurant", restaurantSchema);