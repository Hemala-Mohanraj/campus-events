export const registerForEvent = (eventId, userId) => {
  const registrations =
    JSON.parse(
      localStorage.getItem("registrations")
    ) || [];

  const alreadyRegistered = registrations.some(
    (registration) =>
      registration.eventId === eventId &&
      registration.userId === userId
  );

  if (alreadyRegistered) {
    return {
      success: false,
      message: "You are already registered for this event",
    };
  }

  const events =
    JSON.parse(localStorage.getItem("events")) || [];

  const event = events.find(
    (event) => event.id === eventId
  );

  if (!event) {
    return {
      success: false,
      message: "Event not found",
    };
  }

  if (event.availableSeats <= 0) {
    return {
      success: false,
      message: "Event is full",
    };
  }

  const updatedEvents = events.map((event) =>
    event.id === eventId
      ? {
          ...event,
          availableSeats: event.availableSeats - 1,
        }
      : event
  );

  const newRegistration = {
    id: Date.now(),
    eventId: event.id,
    eventName: event.name,
    date: event.date,
    userId,
    status: "Registered",
  };

  registrations.push(newRegistration);

  localStorage.setItem(
    "events",
    JSON.stringify(updatedEvents)
  );

  localStorage.setItem(
    "registrations",
    JSON.stringify(registrations)
  );

  return {
    success: true,
    message: "Registration successful",
  };
};