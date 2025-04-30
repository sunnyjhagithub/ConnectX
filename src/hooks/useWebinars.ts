import { useState, useEffect } from "react";

// Mock data for demonstration
const mockWebinars = [
  {
    id: "1",
    title: "Introduction to Machine Learning",
    description: "Learn the fundamentals of machine learning algorithms and their applications in solving real-world problems.",
    duration: "45 min",
    category: "tech",
    thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    views: 1245,
    commentCount: 32,
    presenter: {
      name: "Dr. Emily Zhang",
      role: "Professor, Computer Science",
      avatar: "",
      verified: true,
      bio: "Dr. Zhang has been researching and teaching machine learning for over a decade. Her work focuses on making ML accessible to students across disciplines."
    },
    publishDate: "2025-01-15",
    transcript: true,
    featured: true,
  },
  {
    id: "2",
    title: "Financial Planning for Recent Graduates",
    description: "Essential financial advice for new graduates, including student loan management, budgeting, and starting to invest.",
    duration: "38 min",
    category: "business",
    thumbnail: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    views: 876,
    commentCount: 28,
    presenter: {
      name: "Marcus Williams",
      role: "Financial Advisor",
      avatar: "",
      verified: true,
      bio: "Marcus has helped hundreds of recent graduates develop sound financial strategies. He specializes in debt management and early-career investing."
    },
    publishDate: "2025-02-03",
    transcript: true,
    featured: false,
  },
  {
    id: "3",
    title: "UI/UX Design Principles",
    description: "Explore the fundamental principles of effective user interface and experience design for web and mobile applications.",
    duration: "55 min",
    category: "design",
    thumbnail: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    views: 1032,
    commentCount: 45,
    presenter: {
      name: "Sofia Garcia",
      role: "Lead UX Designer",
      avatar: "",
      verified: true,
      bio: "Sofia has led design teams at several major tech companies. She combines practical industry experience with a strong foundation in design theory."
    },
    publishDate: "2025-02-17",
    transcript: false,
    featured: true,
  },
  {
    id: "4",
    title: "Social Media Marketing Strategies",
    description: "Learn effective strategies for building brand presence and engagement across various social media platforms.",
    duration: "42 min",
    category: "marketing",
    thumbnail: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    views: 768,
    commentCount: 19,
    presenter: {
      name: "Ryan Thompson",
      role: "Digital Marketing Consultant",
      avatar: "",
      verified: false,
      bio: "Ryan specializes in helping small businesses and startups develop effective social media presences on limited budgets."
    },
    publishDate: "2025-03-05",
    transcript: true,
    featured: false,
  },
  {
    id: "5",
    title: "Networking for Introverts",
    description: "Strategies and approaches for building professional relationships when networking doesn't come naturally.",
    duration: "36 min",
    category: "career",
    thumbnail: "https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    views: 1542,
    commentCount: 87,
    presenter: {
      name: "Dr. Lisa Chen",
      role: "Career Psychologist",
      avatar: "",
      verified: true,
      bio: "Dr. Chen's research focuses on professional development and relationship-building for individuals with introverted personalities."
    },
    publishDate: "2025-03-15",
    transcript: true,
    featured: true,
  },
  {
    id: "6",
    title: "Cybersecurity Essentials",
    description: "Fundamental cybersecurity practices and protocols that every professional should know in today's digital workplace.",
    duration: "65 min",
    category: "tech",
    thumbnail: "https://images.unsplash.com/photo-1510511233900-1982d92bd835?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    views: 892,
    commentCount: 23,
    presenter: {
      name: "James Wilson",
      role: "Information Security Specialist",
      avatar: "",
      verified: true,
      bio: "James has worked in cybersecurity for over 15 years across government, finance, and healthcare sectors."
    },
    publishDate: "2025-04-02",
    transcript: false,
    featured: false,
  },
];

export const useWebinars = () => {
  const [filters, setFilters] = useState({
    search: "",
    category: "all",
    duration: "all",
  });

  const [webinars, setWebinars] = useState(mockWebinars);
  const [filteredWebinars, setFilteredWebinars] = useState(mockWebinars);

  useEffect(() => {
    // Apply filters
    let result = [...mockWebinars];

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        (webinar) =>
          webinar.title.toLowerCase().includes(searchLower) ||
          webinar.description.toLowerCase().includes(searchLower) ||
          webinar.presenter.name.toLowerCase().includes(searchLower)
      );
    }

    // Category filter
    if (filters.category && filters.category !== "all") {
      result = result.filter((webinar) => webinar.category === filters.category);
    }

    // Duration filter
    if (filters.duration && filters.duration !== "all") {
      result = result.filter((webinar) => {
        const minutes = parseInt(webinar.duration);
        
        if (filters.duration === "short") {
          return !isNaN(minutes) && minutes < 30;
        } else if (filters.duration === "medium") {
          return !isNaN(minutes) && minutes >= 30 && minutes <= 60;
        } else if (filters.duration === "long") {
          return !isNaN(minutes) && minutes > 60;
        }
        
        return true;
      });
    }

    setFilteredWebinars(result);
  }, [filters]);

  return {
    webinars: filteredWebinars,
    filters,
    setFilters,
  };
};
