import { useEffect, useState } from "react";
import RegCard from "../components/RegistrationCard";

function MyRegistrations() {
  const [registrations, setRegistrations] = useState([]);

  const userId = "student1";

  useEffect(() => {
    const data =
      JSON.parse(
        localStorage.getItem("registrations")
      ) || [];

    setRegistrations(
      data.filter(
        (registration) =>
          registration.userId === userId
      )
    );
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-5">

      <h1 className="mb-5 text-2xl font-bold">
        My Registrations
      </h1>

      {registrations.length === 0 ? (
        <p>No registrations found.</p>
      ) : (
        <div className="grid gap-5 md:grid-cols-2">
          {registrations.map((registration) => (
            <RegCard
              key={registration.id}
              registration={registration}
            />
          ))}
        </div>
      )}

    </div>
  );
}

export default MyRegistrations;