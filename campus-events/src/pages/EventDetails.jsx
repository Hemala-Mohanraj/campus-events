import { useParams } from "react-router-dom";

function EventDetails() {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <div className="mx-auto max-w-lg rounded-lg bg-white p-6 shadow">
        <h1 className="text-2xl font-bold">
          Event Details
        </h1>

        <p className="mt-4">
          Event ID: {id}
        </p>

        <p className="mt-2">
          More event information will be displayed here.
        </p>
      </div>
    </div>
  );
}

export default EventDetails;