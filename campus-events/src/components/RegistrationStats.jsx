function RegistrationStats({ events }) {
  const totalSeats = events.reduce(
    (sum, event) =>
      sum + Number(event.maxParticipants),
    0
  );

  const availableSeats = events.reduce(
    (sum, event) =>
      sum + Number(event.availableSeats),
    0
  );

  const registered = totalSeats - availableSeats;

  return (
    <div className="mb-6 grid gap-4 sm:grid-cols-3">

      <div className="rounded bg-white p-5 shadow">
        <h2 className="font-bold">
          Total Seats
        </h2>
        <p className="text-2xl">
          {totalSeats}
        </p>
      </div>

      <div className="rounded bg-white p-5 shadow">
        <h2 className="font-bold">
          Registered
        </h2>
        <p className="text-2xl">
          {registered}
        </p>
      </div>

      <div className="rounded bg-white p-5 shadow">
        <h2 className="font-bold">
          Available
        </h2>
        <p className="text-2xl">
          {availableSeats}
        </p>
      </div>

    </div>
  );
}

export default RegistrationStats;