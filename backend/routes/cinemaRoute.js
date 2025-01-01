const express = require("express");
const router = express.Router();

const { addCity, getCities } = require("../controllers/City");
const {
  addCinema,
  updateScreen,
  findCinemaDetailes,
  getShowCinema,
} = require("../controllers/Cinema");
const { auth, isAdmin, isSuperAdmin } = require("../middlewares/auth");
const { getRevenueDetails } = require("../controllers/revenueController");

router.post("/addCity", auth, isSuperAdmin, addCity);
router.post("/addCinema", auth, isAdmin, addCinema);
router.post("/updateScreen", auth, isAdmin, updateScreen);
router.get("/getCinemaDetailes", auth, isAdmin, findCinemaDetailes);
router.post("/getShowCinema", getShowCinema);
router.get("/getCities", auth, getCities);
router.get("/revenue-details", getRevenueDetails);

module.exports = router;
