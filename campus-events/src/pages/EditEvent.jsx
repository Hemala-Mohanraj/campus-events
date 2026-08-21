import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EventForm from "../components/EventForm";

function EditEvent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "React Workshop",
    type: "Workshop",
    resourcePerson: "John Kumar",
    date: "2026-09-10",
    venue: "Seminar Hall",
    maxParticipants: "100",
    status: "Open",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Updated Event:", form);

    alert("Event updated successfully");

    navigate("/events");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <h1 className="mb-2 text-center text-2xl font-bold">
        Edit Event
      </h1>

      <p className="mb-5 text-center">
        Event ID: {id}
      </p>

      <EventForm
        form={form}
        setForm={setForm}
        onSubmit={handleSubmit}
        buttonText="Update Event"
      />
    </div>
  );
}

export default EditEvent;