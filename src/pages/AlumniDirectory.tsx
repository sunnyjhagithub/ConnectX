
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import AlumniHero from "@/components/alumni/AlumniHero";
import AlumniGrid from "@/components/alumni/AlumniGrid";
import AlumniFilters from "@/components/alumni/AlumniFilters";

type AlumniFilters = {
  college?: string;
  batch?: string;
  skills?: string;
  company?: string;
  domain?: string;
  role?: string;
}

const AlumniDirectory = () => {
  const [filters, setFilters] = useState<AlumniFilters>({});

  const handleFilterChange = (newFilters: AlumniFilters) => {
    setFilters(newFilters);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <AlumniHero />
        <AlumniFilters onFilterChange={handleFilterChange} />
        <AlumniGrid 
          college={filters.college}
          batch={filters.batch}
          skills={filters.skills}
          company={filters.company}
          domain={filters.domain}
          role={filters.role}
        />
      </div>
    </Layout>
  );
};

export default AlumniDirectory;
