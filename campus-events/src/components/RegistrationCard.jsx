function RegistrationCard({ registration }) {
  return (
    <div className="rounded-lg bg-white p-5 shadow-md">
      <h2 className="text-xl font-bold">{registration.eventName}</h2>

      <p className="mt-2">
        Registration ID: {registration.id}
      </p>

      <p>
        Date: {registration.date}
      </p>

      <p>
        Status: {registration.status}
      </p>
    </div>
  );
}

export default RegistrationCard;