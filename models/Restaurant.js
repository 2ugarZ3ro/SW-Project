const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema({
  name: String,
  address: String,
  phone: String,
  openTime: String,
  closeTime: String
});

module.exports = mongoose.model("Restaurant", RestaurantSchema);