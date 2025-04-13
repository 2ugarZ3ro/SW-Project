const express = require("express");
const router = express.Router();
const {createRestaurant, getAllRestaurants, getRestaurantById, updateRestaurant, deleteRestaurant} = require("../controllers/restaurantController");
const auth = require("../middleware/auth");

router.post("/", auth, createRestaurant);
router.get("/", auth, getAllRestaurants);
router.get("/:id", auth, getRestaurantById);
router.put("/:id", auth, updateRestaurant);
router.delete("/:id", auth, deleteRestaurant);

module.exports = router;