const express = require("express");
const router = express.Router();
const {getAllReservations, createReservation, getMyReservations, updateReservation, deleteReservation} = require("../controllers/reservationController");
const auth = require("../middleware/auth");

router.get("/", auth, getAllReservations);
router.post("/", auth, createReservation);
router.get("/:userId", auth, getMyReservations);
router.put("/:id", auth, updateReservation);
router.delete("/:id", auth, deleteReservation);

module.exports = router;