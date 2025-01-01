const express = require("express");
const router = express.Router();

const { login, signup, sendOTP } = require("../controllers/Auth");
const { getAdminRevenueDetails, getRevenueDetailsByCity } = require("../controllers/revenueController");
const { auth, isAdmin, isSuperAdmin } = require("../middlewares/auth");

router.post("/signup", signup);
router.post("/sendotp", sendOTP);
router.post("/login", login);
router.get("/admin-revenue-details", auth, isAdmin, getAdminRevenueDetails);
router.get("/superadmin-revenue-details", auth, isSuperAdmin, getRevenueDetailsByCity);

module.exports = router;
