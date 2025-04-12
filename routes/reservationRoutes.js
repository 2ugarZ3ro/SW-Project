const express = require("express");
const router = express.Router();
const {createReservation, getMyReservations, updateReservation, deleteReservation} = require("../controllers/reservationController");

router.post("/", createReservation);
router.get("/:userId", getMyReservations);
router.put("/:id", updateReservation);
router.delete("/:id", deleteReservation);

module.exports = router;