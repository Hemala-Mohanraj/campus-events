const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    type: {
      type: String,
      required: true
    },

    resourcePerson: {
      type: String,
      required: true
    },

    date: {
      type: Date,
      required: true
    },

    venue: {
      type: String,
      required: true
    },

    maxParticipants: {
      type: Number,
      required: true,
      min: 1
    },

    availableSeats: {
      type: Number,
      required: true,
      min: 0
    },

    status: {
      type: String,
      enum: [
        "Draft",
        "Published",
        "Registration Open",
        "Registration Closed",
        "Completed"
      ],
      default: "Draft"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Event", eventSchema);