
import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import CareerHero from "@/components/career/CareerHero";
import CareerTabs from "@/components/career/CareerTabs";
import { useCareerTabs } from "@/hooks/useCareerTabs";

const CareerGuidance = () => {
  const { activeTab, setActiveTab } = useCareerTabs();

  useEffect(() => {
    document.title = "Career Guidance | ConnectX";
  }, []);

  return (
    <Layout>
      <div className="container max-w-7xl mx-auto px-4 py-8">
        <CareerHero />
        <CareerTabs activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </Layout>
  );
};

export default CareerGuidance;
