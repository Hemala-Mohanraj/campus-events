function Recommendations({ events, type }) {
  const recommended = events.filter(
    (event) => event.type === type
  );

  return (
    <div className="mt-6">
      <h2 className="mb-3 text-xl font-bold">
        Recommended Events
      </h2>

      <div className="grid gap-3 md:grid-cols-2">
        {recommended.map((event) => (
          <div
            key={event.id}
            className="rounded bg-white p-4 shadow"
          >
            <h3 className="font-bold">
              {event.name}
            </h3>

            <p>{event.type}</p>

            <p>{event.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Recommendations;