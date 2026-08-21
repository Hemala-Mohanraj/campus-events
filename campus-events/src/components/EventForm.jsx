import { useState } from "react";

function EventForm({ form, setForm, onSubmit, buttonText }) {
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Event name is required";
    }

    if (!form.type) {
      newErrors.type = "Please select an event type";
    }

    if (!form.resourcePerson.trim()) {
      newErrors.resourcePerson = "Resource person is required";
    }

    if (!form.date) {
      newErrors.date = "Event date is required";
    } else if (
      new Date(form.date) < new Date().setHours(0, 0, 0, 0)
    ) {
      newErrors.date = "Event date cannot be in the past";
    }

    if (!form.venue.trim()) {
      newErrors.venue = "Venue is required";
    }

    if (!form.maxParticipants) {
      newErrors.maxParticipants =
        "Number of participants is required";
    } else if (Number(form.maxParticipants) <= 0) {
      newErrors.maxParticipants =
        "Number of participants must be positive";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      onSubmit(e);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-lg space-y-4 rounded-lg bg-white p-5 shadow"
    >

      <div>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Event Name"
          className="w-full rounded border p-3"
        />

        {errors.name && (
          <p className="text-sm text-red-600">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="w-full rounded border p-3"
        >
          <option value="">Select Event Type</option>
          <option value="Workshop">Workshop</option>
          <option value="Seminar">Seminar</option>
          <option value="Hackathon">Hackathon</option>
          <option value="Conference">Conference</option>
        </select>

        {errors.type && (
          <p className="text-sm text-red-600">
            {errors.type}
          </p>
        )}
      </div>

      <div>
        <input
          name="resourcePerson"
          value={form.resourcePerson}
          onChange={handleChange}
          placeholder="Resource Person"
          className="w-full rounded border p-3"
        />

        {errors.resourcePerson && (
          <p className="text-sm text-red-600">
            {errors.resourcePerson}
          </p>
        )}
      </div>

      <div>
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="w-full rounded border p-3"
        />

        {errors.date && (
          <p className="text-sm text-red-600">
            {errors.date}
          </p>
        )}
      </div>

      <div>
        <input
          name="venue"
          value={form.venue}
          onChange={handleChange}
          placeholder="Venue"
          className="w-full rounded border p-3"
        />

        {errors.venue && (
          <p className="text-sm text-red-600">
            {errors.venue}
          </p>
        )}
      </div>

      <div>
        <input
          type="number"
          name="maxParticipants"
          value={form.maxParticipants}
          onChange={handleChange}
          placeholder="Maximum Participants"
          min="1"
          className="w-full rounded border p-3"
        />

        {errors.maxParticipants && (
          <p className="text-sm text-red-600">
            {errors.maxParticipants}
          </p>
        )}
      </div>

      <select
        name="status"
        value={form.status}
        onChange={handleChange}
        className="w-full rounded border p-3"
      >
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

      <button
        type="submit"
        className="w-full rounded bg-blue-600 p-3 text-white"
      >
        {buttonText}
      </button>

    </form>
  );
}

export default EventForm;