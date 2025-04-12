const Reservation = require("../models/Reservation");

exports.createReservation = async (req, res) => {
  try {
    const { userId, restaurantId, date } = req.body;

    const count = await Reservation.countDocuments({ userId });
    if (count >= 3) return res.status(400).json({ message: "Limit 3 reservations" });

    const reservation = await Reservation.create({ userId, restaurantId, date });
    res.json(reservation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMyReservations = async (req, res) => {
  try {
    const { userId } = req.params;
    const reservations = await Reservation.find({ userId }).populate("restaurantId");
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const { date } = req.body;

    const updated = await Reservation.findByIdAndUpdate(id, { date }, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteReservation = async (req, res) => {
  try {
    const { id } = req.params;
    await Reservation.findByIdAndDelete(id);
    res.json({ message: "Reservation deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};