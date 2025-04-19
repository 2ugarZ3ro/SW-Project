const Reservation = require("../models/Reservation");

exports.createReservation = async (req, res) => {
  try {
    const { restaurantId, date, time, people } = req.body;
    const userId = req.user._id;

    if (req.user.role === "user") {
      const count = await Reservation.countDocuments({ user: userId });
      if (count >= 3) {
        return res.status(400).json({ message: "Limit 3 reservations" });
      }
    }

    const reservation = await Reservation.create({
      user: userId,
      restaurant: restaurantId,
      date,
      time,
      people
    });

    res.status(201).json(reservation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllReservations = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Only admin can access this" });
    }

    const reservations = await Reservation.find().populate("user").populate("restaurant");
    res.status(200).json({
      total: reservations.length,
      reservations
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMyReservations = async (req, res) => {
  try {
    let reservations;

    if (req.user.role === "admin") {
      reservations = await Reservation.find().populate("user").populate("restaurant");
    } else {
      reservations = await Reservation.find({ user: req.user.userId }).populate("restaurant");
    }

    res.status(200).json({
      total: reservations.length,
      reservations
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);

    if (!reservation) return res.status(404).json({ message: "Reservation not found" });

    if (req.user.role !== "admin" && reservation.user.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Not allowed to update this reservation" });
    }

    const updated = await Reservation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);

    if (!reservation) return res.status(404).json({ message: "Reservation not found" });

    if (req.user.role !== "admin" && reservation.user.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Not allowed to delete this reservation" });
    }

    await Reservation.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Reservation deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};