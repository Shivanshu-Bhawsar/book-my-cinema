
const express = require("express");
const { getRevenueDetails } = require("./controllers/revenueController");

const router = express.Router();

// ...existing code...

router.get("/revenue-details", getRevenueDetails);

// ...existing code...

module.exports = router;