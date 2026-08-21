export function getEventStatus(event) {
  const today = new Date();
  const eventDate = new Date(event.date);

  if (event.status === "Draft") {
    return "Draft";
  }

  if (today > eventDate) {
    return "Completed";
  }

  if (
    event.status === "Registration Open" &&
    event.availableSeats === 0
  ) {
    return "Registration Closed";
  }

  return event.status;
}