
import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import EventsHero from "@/components/events/EventsHero";
import EventsGrid from "@/components/events/EventsGrid";
import EventsFilters from "@/components/events/EventsFilters";
import { useEvents } from "@/hooks/useEvents";

const Events = () => {
  const { events, filters, setFilters } = useEvents();

  useEffect(() => {
    document.title = "Events & Webinars | ConnectX";
  }, []);

  return (
    <Layout>
      <div className="container max-w-7xl mx-auto px-4 py-8">
        <EventsHero />
        <EventsFilters filters={filters} setFilters={setFilters} />
        <EventsGrid events={events} />
      </div>
    </Layout>
  );
};

export default Events;
