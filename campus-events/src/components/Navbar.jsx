import { Link } from "react-router-dom";

function Navbar({ role }) {
  return (
    <nav className="bg-blue-700 p-4 text-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3">
        <Link to="/events" className="text-xl font-bold">
          Campus Events
        </Link>

        <div className="flex flex-wrap gap-3">
          <Link to="/events">Events</Link>

          {role === "admin" && (
            <Link to="/create-event">Create Event</Link>
          )}

          {role === "student" && (
            <Link to="/my-registrations">
              My Registrations
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
