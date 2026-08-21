import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge";
import { getEventStatus } from "../utils/eventLifecycle";
import Countdown from "./Countdown";

function EventCard({ event, role, onDelete, onRegister }) {
  const percentage =
    (event.availableSeats / event.maxParticipants) * 100;

  let seatColor = "bg-green-500";

  if (percentage <= 30) {
    seatColor = "bg-red-500";
  } else if (percentage <= 60) {
    seatColor = "bg-yellow-500";
  }

  return (
    <div className="rounded-lg bg-white p-5 shadow-md">

      <div className="mb-3 flex items-center justify-between gap-2">
        <h2 className="text-xl font-bold">
          {event.name}
        </h2>

        <StatusBadge status={getEventStatus(event)} />
      </div>

      <p>
        <b>Type:</b> {event.type}
      </p>

      <p>
        <b>Resource Person:</b> {event.resourcePerson}
      </p>

      <p>
        <b>Date:</b> {event.date}
        <Countdown date={event.date} />
      </p>

      <p>
        <b>Venue:</b> {event.venue}
      </p>

      <p>
        <b>Max Participants:</b> {event.maxParticipants}
      </p>

      <p className="mt-2">
        <b>Available Seats:</b>{" "}
        {event.availableSeats}
      </p>

      <div className="mt-2 h-2 rounded bg-gray-200">
        <div
          className={`${seatColor} h-2 rounded`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      <p className="mt-1 text-sm">
        {percentage.toFixed(0)}% seats available
      </p>

      <div className="mt-4 flex flex-wrap gap-2">

        <Link
          to={`/events/${event.id}`}
          className="rounded bg-blue-600 px-3 py-2 text-white"
        >
          View
        </Link>

        {role === "admin" && (
          <>
            <Link
              to={`/edit-event/${event.id}`}
              className="rounded bg-yellow-500 px-3 py-2 text-white"
            >
              Edit
            </Link>

            <button
              onClick={() => onDelete(event.id)}
              className="rounded bg-red-600 px-3 py-2 text-white"
            >
              Delete
            </button>
          </>
        )}

        {role === "student" &&
          event.status === "Registration Open" && (
            <button
              onClick={() => onRegister(event.id)}
              disabled={event.availableSeats === 0}
              className="rounded bg-green-600 px-3 py-2 text-white disabled:bg-gray-400"
            >
              {event.availableSeats === 0
                ? "Full"
                : "Register"}
            </button>
          )}

      </div>

    </div>
  );
}

export default EventCard;