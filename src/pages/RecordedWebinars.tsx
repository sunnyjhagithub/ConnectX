
import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import WebinarsHero from "@/components/webinars/WebinarsHero";
import RecordedWebinarsGrid from "@/components/webinars/RecordedWebinarsGrid";
import WebinarsFilters from "@/components/webinars/WebinarsFilters";
import { useWebinars } from "@/hooks/useWebinars";

const RecordedWebinars = () => {
  const { webinars, filters, setFilters } = useWebinars();

  useEffect(() => {
    document.title = "Recorded Webinars | ConnectX";
  }, []);

  return (
    <Layout>
      <div className="container max-w-7xl mx-auto px-4 py-8">
        <WebinarsHero />
        <WebinarsFilters filters={filters} setFilters={setFilters} />
        <RecordedWebinarsGrid webinars={webinars} />
      </div>
    </Layout>
  );
};

export default RecordedWebinars;
