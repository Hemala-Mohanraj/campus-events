import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EventForm from "../components/EventForm";

function CreateEvent() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    type: "",
    resourcePerson: "",
    date: "",
    venue: "",
    maxParticipants: "",
    status: "Upcoming",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(form);

    alert("Event created successfully");

    navigate("/events");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <h1 className="mb-5 text-center text-2xl font-bold">
        Create Event
      </h1>

      <EventForm
        form={form}
        setForm={setForm}
        onSubmit={handleSubmit}
        buttonText="Create Event"
      />
    </div>
  );
}

export default CreateEvent;