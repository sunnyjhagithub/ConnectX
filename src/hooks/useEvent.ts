
import { useState, useEffect } from "react";
import { useEvents } from "./useEvents";

export const useEvent = (id) => {
  const { events } = useEvents();
  const [event, setEvent] = useState(null);
  const [relatedEvents, setRelatedEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    // Simulate API call with timeout
    const timer = setTimeout(() => {
      const foundEvent = events.find((e) => e.id === id);
      setEvent(foundEvent || null);

      if (foundEvent) {
        // Find related events (same category or by same host)
        const related = events
          .filter(
            (e) =>
              e.id !== id &&
              (e.category === foundEvent.category ||
                (foundEvent.host && e.host && e.host.name === foundEvent.host.name))
          )
          .slice(0, 3);
        setRelatedEvents(related);
      }

      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [id, events]);

  return {
    event,
    relatedEvents,
    isLoading,
  };
};
