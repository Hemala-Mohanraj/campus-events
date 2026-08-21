import { useEffect, useState } from "react";

function Countdown({ date }) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      const difference =
        new Date(date).getTime() -
        new Date().getTime();

      if (difference <= 0) {
        setTime("Event started");
        return;
      }

      const days = Math.floor(
        difference / (1000 * 60 * 60 * 24)
      );

      const hours = Math.floor(
        (difference / (1000 * 60 * 60)) % 24
      );

      const minutes = Math.floor(
        (difference / (1000 * 60)) % 60
      );

      const seconds = Math.floor(
        (difference / 1000) % 60
      );

      setTime(
        `${days}d ${hours}h ${minutes}m ${seconds}s`
      );
    }, 1000);

    return () => clearInterval(timer);
  }, [date]);

  return (
    <p className="mt-2 font-semibold text-blue-600">
      Starts in: {time}
    </p>
  );
}

export default Countdown;