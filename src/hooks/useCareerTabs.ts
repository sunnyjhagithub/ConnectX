
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export const useCareerTabs = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("jobs");

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tabParam = searchParams.get('tab');
    
    if (tabParam === 'mentorship') {
      setActiveTab('mentorship');
    } else if (tabParam === 'resources') {
      setActiveTab('resources');
    }
  }, [location]);

  return {
    activeTab,
    setActiveTab,
  };
};

