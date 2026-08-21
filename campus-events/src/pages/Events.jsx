import { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import { registerForEvent } from "../utils/registration";

function Events({ role }) {
  const [events, setEvents] = useState([]);

  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [sort, setSort] = useState("");
  const [date, setDate] = useState("");

  const userId = "student1";


const handleRegister = (eventId) => {
  const result = registerForEvent(eventId, userId);

  alert(result.message);

  if (result.success) {
    const updatedEvents =
      JSON.parse(localStorage.getItem("events")) || [];

    setEvents(updatedEvents);
  }
};

  useEffect(() => {
    const savedEvents = localStorage.getItem("events");

    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    } else {
      const defaultEvents = [
        {
          id: 1,
          name: "React Workshop",
          type: "Workshop",
          resourcePerson: "John Kumar",
          date: "2026-09-10",
          venue: "Seminar Hall",
          maxParticipants: 100,
          availableSeats: 40,
          status: "Registration Open",
        },
        {
          id: 2,
          name: "AI Seminar",
          type: "Seminar",
          resourcePerson: "Priya Sharma",
          date: "2026-09-15",
          venue: "Auditorium",
          maxParticipants: 200,
          availableSeats: 120,
          status: "Published",
        },
        {
          id: 3,
          name: "Web Hackathon",
          type: "Hackathon",
          resourcePerson: "Rahul Kumar",
          date: "2026-10-01",
          venue: "Computer Lab",
          maxParticipants: 50,
          availableSeats: 10,
          status: "Registration Open",
        },
      ];

      setEvents(defaultEvents);
      localStorage.setItem("events", JSON.stringify(defaultEvents));
    }
  }, []);

  const filteredEvents = events
    .filter((event) => {
      const text =
        event.name +
        " " +
        event.resourcePerson +
        " " +
        event.venue;

      return text.toLowerCase().includes(search.toLowerCase());
    })
    .filter((event) => {
      return type === "" || event.type === type;
    })
    .filter((event) => {
      return status === "" || event.status === status;
    })
    .filter((event) => {
      return date === "" || event.date === date;
    })
    .sort((a, b) => {
      if (sort === "name") {
        return a.name.localeCompare(b.name);
      }

      if (sort === "seats") {
        return b.availableSeats - a.availableSeats;
      }

      if (sort === "upcoming") {
        return new Date(a.date) - new Date(b.date);
      }

      return 0;
    });

  const deleteEvent = (id) => {
    const updated = events.filter((event) => event.id !== id);

    setEvents(updated);
    localStorage.setItem("events", JSON.stringify(updated));
  };

  const [page, setPage] = useState(1);

const eventsPerPage = 6;

const startIndex =
  (page - 1) * eventsPerPage;

const paginatedEvents =
  filteredEvents.slice(
    startIndex,
    startIndex + eventsPerPage
  );

const totalPages =
  Math.ceil(
    filteredEvents.length / eventsPerPage
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4">

      <h1 className="mb-5 text-2xl font-bold">
        Campus Events
      </h1>

      <div className="mb-6 grid gap-3 md:grid-cols-2 lg:grid-cols-5">

        <input
          type="text"
          placeholder="Search event..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded border p-3"
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="rounded border p-3"
        >
          <option value="">All Types</option>
          <option value="Workshop">Workshop</option>
          <option value="Seminar">Seminar</option>
          <option value="Hackathon">Hackathon</option>
        </select>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded border p-3"
        >
          <option value="">All Status</option>
          <option value="Draft">Draft</option>
          <option value="Published">Published</option>
          <option value="Registration Open">
            Registration Open
          </option>
          <option value="Registration Closed">
            Registration Closed
          </option>
          <option value="Completed">Completed</option>
        </select>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="rounded border p-3"
        />

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="rounded border p-3"
        >
          <option value="">Sort By</option>
          <option value="upcoming">Upcoming Events</option>
          <option value="name">Event Name</option>
          <option value="seats">Available Seats</option>
        </select>

      </div>
      <div className="mt-6 flex justify-center gap-3">

  <button
    disabled={page === 1}
    onClick={() => setPage(page - 1)}
    className="rounded bg-gray-700 px-4 py-2 text-white disabled:bg-gray-300"
  >
    Previous
  </button>

  <span className="rounded bg-white px-4 py-2">
    Page {page} of {totalPages}
  </span>

  <button
    disabled={page === totalPages}
    onClick={() => setPage(page + 1)}
    className="rounded bg-gray-700 px-4 py-2 text-white disabled:bg-gray-300"
  >
    Next
  </button>

</div>

      <p className="mb-4">
        Showing {filteredEvents.length} events
      </p>


      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

        {paginatedEvents.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            role={role}
            onDelete={deleteEvent}
            onRegister={handleRegister}
          />
        ))}

      </div>

    </div>
  );
}

export default Events;