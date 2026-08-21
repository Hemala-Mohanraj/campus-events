const express = require("express");

const router = express.Router();

const {
  protect,
  adminOnly
} = require("../middleware/authMiddleware");

const {
  createEvent,
  getEvents,
  getEvent,
  updateEvent,
  deleteEvent,
  getUpcomingEvents,
  getEventStatistics
} = require("../controllers/eventController");

router.get(
  "/upcoming",
  protect,
  getUpcomingEvents
);

router.get(
  "/statistics",
  protect,
  adminOnly,
  getEventStatistics
);

router.get("/", protect, getEvents);

router.get("/:id", protect, getEvent);

router.post(
  "/",
  protect,
  adminOnly,
  createEvent
);

router.put(
  "/:id",
  protect,
  adminOnly,
  updateEvent
);

router.delete(
  "/:id",
  protect,
  adminOnly,
  deleteEvent
);

module.exports = router;