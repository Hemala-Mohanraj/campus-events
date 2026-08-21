const Event = require("../models/Event");
const Registration = require("../models/Registration");

const createEvent = async (req, res) => {
  try {
    const {
      name,
      type,
      resourcePerson,
      date,
      venue,
      maxParticipants,
      status
    } = req.body;

    if (
      !name ||
      !type ||
      !resourcePerson ||
      !date ||
      !venue ||
      !maxParticipants
    ) {
      return res.status(400).json({
        message: "All event fields are required"
      });
    }

    if (Number(maxParticipants) <= 0) {
      return res.status(400).json({
        message:
          "Maximum participants must be positive"
      });
    }

    const eventDate = new Date(date);

    if (isNaN(eventDate.getTime())) {
      return res.status(400).json({
        message: "Invalid event date"
      });
    }

    if (eventDate < new Date()) {
      return res.status(400).json({
        message: "Event date cannot be in the past"
      });
    }

    const event = await Event.create({
      name,
      type,
      resourcePerson,
      date: eventDate,
      venue,
      maxParticipants,
      availableSeats: maxParticipants,
      status: status || "Draft"
    });

    res.status(201).json({
      message: "Event created successfully",
      event
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to create event",
      error: error.message
    });
  }
};

const getEvents = async (req, res) => {
  try {
    const {
      search,
      type,
      status,
      sort,
      page = 1,
      limit = 6
    } = req.query;

    const filter = {};

    if (search) {
      filter.$or = [
        {
          name: {
            $regex: search,
            $options: "i"
          }
        },
        {
          resourcePerson: {
            $regex: search,
            $options: "i"
          }
        },
        {
          venue: {
            $regex: search,
            $options: "i"
          }
        }
      ];
    }

    if (type) {
      filter.type = type;
    }

    if (status) {
      filter.status = status;
    }

    let sortOption = {};

    if (sort === "date") {
      sortOption.date = 1;
    }

    if (sort === "seats") {
      sortOption.availableSeats = -1;
    }

    const skip =
      (Number(page) - 1) *
      Number(limit);

    const events = await Event.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit));

    const total = await Event.countDocuments(filter);

    res.status(200).json({
      events,
      currentPage: Number(page),
      totalPages: Math.ceil(
        total / Number(limit)
      ),
      total
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve events",
      error: error.message
    });
  }
};

const getEvent = async (req, res) => {
  try {
    const event = await Event.findById(
      req.params.id
    );

    if (!event) {
      return res.status(404).json({
        message: "Event not found"
      });
    }

    res.status(200).json(event);

  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve event",
      error: error.message
    });
  }
};

const updateEvent = async (req, res) => {
  try {
    const event =
      await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        message: "Event not found"
      });
    }

    const {
      name,
      type,
      resourcePerson,
      date,
      venue,
      maxParticipants,
      status
    } = req.body;

    if (maxParticipants !== undefined) {
      if (Number(maxParticipants) <= 0) {
        return res.status(400).json({
          message:
            "Maximum participants must be positive"
        });
      }

      const registered =
        event.maxParticipants -
        event.availableSeats;

      if (Number(maxParticipants) < registered) {
        return res.status(400).json({
          message:
            "Maximum participants cannot be less than registered participants"
        });
      }

      event.availableSeats =
        Number(maxParticipants) -
        registered;

      event.maxParticipants =
        Number(maxParticipants);
    }

    if (date) {
      const newDate = new Date(date);

      if (isNaN(newDate.getTime())) {
        return res.status(400).json({
          message: "Invalid event date"
        });
      }

      event.date = newDate;
    }

    if (name) event.name = name;
    if (type) event.type = type;
    if (resourcePerson)
      event.resourcePerson = resourcePerson;
    if (venue) event.venue = venue;
    if (status) event.status = status;

    await event.save();

    res.status(200).json({
      message: "Event updated successfully",
      event
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to update event",
      error: error.message
    });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const event =
      await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        message: "Event not found"
      });
    }

    await Registration.deleteMany({
      event: event._id
    });

    await event.deleteOne();

    res.status(200).json({
      message: "Event deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to delete event",
      error: error.message
    });
  }
};

const getUpcomingEvents = async (req, res) => {
  try {
    const events = await Event.find({
      date: {
        $gte: new Date()
      },
      status: {
        $in: [
          "Published",
          "Registration Open"
        ]
      }
    })
      .sort({ date: 1 })
      .limit(10);

    res.status(200).json(events);

  } catch (error) {
    res.status(500).json({
      message:
        "Failed to retrieve upcoming events"
    });
  }
};

const getEventStatistics = async (req, res) => {
  try {
    const totalEvents =
      await Event.countDocuments();

    const upcomingEvents =
      await Event.countDocuments({
        date: { $gte: new Date() }
      });

    const openEvents =
      await Event.countDocuments({
        status: "Registration Open"
      });

    const completedEvents =
      await Event.countDocuments({
        status: "Completed"
      });

    res.status(200).json({
      totalEvents,
      upcomingEvents,
      openEvents,
      completedEvents
    });

  } catch (error) {
    res.status(500).json({
      message:
        "Failed to retrieve statistics"
    });
  }
};

module.exports = {
  createEvent,
  getEvents,
  getEvent,
  updateEvent,
  deleteEvent,
  getUpcomingEvents,
  getEventStatistics
};