const express = require("express");

const router = express.Router();

const {
  protect,
  adminOnly
} = require("../middleware/authMiddleware");

const {
  registerEvent,
  getMyRegistrations,
  cancelRegistration,
  getRegistrationStatistics
} = require("../controllers/registrationController");

router.post(
  "/events/:eventId",
  protect,
  registerEvent
);

router.get(
  "/my",
  protect,
  getMyRegistrations
);

router.delete(
  "/:id",
  protect,
  cancelRegistration
);

router.get(
  "/statistics",
  protect,
  adminOnly,
  getRegistrationStatistics
);

module.exports = router;