const Event = require("../models/Event");
const Registration = require("../models/Registration");

const registerEvent = async (req, res) => {
  try {
    const event =
      await Event.findById(req.params.eventId);

    if (!event) {
      return res.status(404).json({
        message: "Event not found"
      });
    }

    if (
      event.status !== "Registration Open"
    ) {
      return res.status(400).json({
        message:
          "Registration is not currently open"
      });
    }

    if (event.availableSeats <= 0) {
      event.status = "Registration Closed";

      await event.save();

      return res.status(400).json({
        message: "Event is full"
      });
    }

    const existing =
      await Registration.findOne({
        user: req.user.id,
        event: event._id,
        status: "Registered"
      });

    if (existing) {
      return res.status(400).json({
        message:
          "You are already registered for this event"
      });
    }

    const registration =
      await Registration.create({
        user: req.user.id,
        event: event._id
      });

    event.availableSeats -= 1;

    if (event.availableSeats === 0) {
      event.status =
        "Registration Closed";
    }

    await event.save();

    res.status(201).json({
      message:
        "Event registration successful",
      registration
    });

  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message:
          "You are already registered for this event"
      });
    }

    res.status(500).json({
      message:
        "Registration failed",
      error: error.message
    });
  }
};

const getMyRegistrations = async (
  req,
  res
) => {
  try {
    const registrations =
      await Registration.find({
        user: req.user.id
      })
        .populate("event")
        .sort({ createdAt: -1 });

    res.status(200).json(
      registrations
    );

  } catch (error) {
    res.status(500).json({
      message:
        "Failed to retrieve registrations"
    });
  }
};

const cancelRegistration = async (
  req,
  res
) => {
  try {
    const registration =
      await Registration.findOne({
        _id: req.params.id,
        user: req.user.id,
        status: "Registered"
      });

    if (!registration) {
      return res.status(404).json({
        message:
          "Registration not found"
      });
    }

    const event =
      await Event.findById(
        registration.event
      );

    if (!event) {
      return res.status(404).json({
        message:
          "Event not found"
      });
    }

    registration.status = "Cancelled";

    await registration.save();

    event.availableSeats += 1;

    if (
      event.status ===
      "Registration Closed"
    ) {
      event.status =
        "Registration Open";
    }

    await event.save();

    res.status(200).json({
      message:
        "Registration cancelled successfully"
    });

  } catch (error) {
    res.status(500).json({
      message:
        "Failed to cancel registration"
    });
  }
};

const getRegistrationStatistics =
  async (req, res) => {
    try {
      const total =
        await Registration.countDocuments({
          status: "Registered"
        });

      const cancelled =
        await Registration.countDocuments({
          status: "Cancelled"
        });

      const registrations =
        await Registration.aggregate([
          {
            $match: {
              status: "Registered"
            }
          },
          {
            $group: {
              _id: "$event",
              count: {
                $sum: 1
              }
            }
          }
        ]);

      res.status(200).json({
        totalRegistrations: total,
        cancelledRegistrations: cancelled,
        registrationsPerEvent:
          registrations
      });

    } catch (error) {
      res.status(500).json({
        message:
          "Failed to retrieve registration statistics"
      });
    }
  };

module.exports = {
  registerEvent,
  getMyRegistrations,
  cancelRegistration,
  getRegistrationStatistics
};