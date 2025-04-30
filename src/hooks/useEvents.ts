
import { useState, useEffect } from "react";

// Mock data for demonstration
const mockEvents = [
  {
    id: "1",
    title: "Career Development Workshop",
    description: "Join us for a hands-on workshop focused on resume building, interview skills, and career planning strategies.",
    date: "May 10, 2025",
    time: "2:00 PM - 4:00 PM",
    category: "workshop",
    isVirtual: false,
    location: "Main Campus, Building A",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    isFree: true,
    price: 0,
    spotsLeft: 15,
    attendees: 45,
    host: {
      name: "Dr. Sarah Johnson",
      role: "Career Counselor",
      avatar: "",
      bio: "Dr. Johnson has over 15 years of experience in career counseling and professional development. She specializes in helping students transition into successful careers.",
    },
    agenda: [
      { time: "2:00 PM", description: "Introduction & Welcome" },
      { time: "2:15 PM", description: "Resume Workshop" },
      { time: "3:00 PM", description: "Interview Techniques" },
      { time: "3:45 PM", description: "Q&A Session" },
    ],
  },
  {
    id: "2",
    title: "Tech Industry Panel Discussion",
    description: "Hear from alumni working at top tech companies about career paths, industry trends, and advice for new graduates.",
    date: "May 15, 2025",
    time: "6:00 PM - 8:00 PM",
    category: "webinar",
    isVirtual: true,
    location: "",
    image: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    isFree: true,
    price: 0,
    spotsLeft: 86,
    attendees: 114,
    host: {
      name: "Alex Chen",
      role: "Alumni Relations",
      avatar: "",
      bio: "Alex coordinates alumni engagement programs and industry partnerships. He works to create meaningful connections between current students and successful graduates.",
    },
    agenda: [
      { time: "6:00 PM", description: "Welcome & Introductions" },
      { time: "6:15 PM", description: "Panel Discussion Begins" },
      { time: "7:30 PM", description: "Audience Q&A" },
      { time: "7:50 PM", description: "Closing Remarks" },
    ],
  },
  {
    id: "3",
    title: "Spring Networking Mixer",
    description: "Connect with fellow alumni, industry professionals, and recruiters at our seasonal networking event.",
    date: "May 20, 2025",
    time: "5:30 PM - 7:30 PM",
    category: "networking",
    isVirtual: false,
    location: "Downtown Conference Center",
    image: "https://images.unsplash.com/photo-1511795409834-432e51f2a480?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    isFree: false,
    price: 10,
    spotsLeft: 23,
    attendees: 77,
    host: {
      name: "Alumni Association",
      role: "Organization",
      avatar: "",
      bio: "The Alumni Association works to keep graduates connected with each other and the university through events, programs, and ongoing engagement opportunities.",
    },
    agenda: [
      { time: "5:30 PM", description: "Check-in & Welcome" },
      { time: "5:45 PM", description: "Networking Session Begins" },
      { time: "6:30 PM", description: "Brief Presentations" },
      { time: "7:00 PM", description: "Open Networking" },
    ],
  },
  {
    id: "4",
    title: "Annual Career Fair",
    description: "Meet with representatives from over 50 companies looking to hire for internships and full-time positions.",
    date: "May 25, 2025",
    time: "10:00 AM - 3:00 PM",
    category: "career-fair",
    isVirtual: false,
    location: "University Gymnasium",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    isFree: true,
    price: 0,
    spotsLeft: 120,
    attendees: 280,
    host: {
      name: "Career Services",
      role: "Department",
      avatar: "",
      bio: "The Career Services department provides resources and support to help students and alumni achieve their career goals through counseling, workshops, and employer connections.",
    },
    agenda: [
      { time: "10:00 AM", description: "Doors Open" },
      { time: "10:30 AM", description: "Welcome Address" },
      { time: "11:00 AM - 3:00 PM", description: "Company Booths Open" },
      { time: "12:00 PM - 1:00 PM", description: "Lunch Break (Food Available)" },
    ],
  },
  {
    id: "5",
    title: "Leadership Development Conference",
    description: "A full-day conference featuring workshops and keynote speakers on various aspects of leadership and professional growth.",
    date: "June 5, 2025",
    time: "9:00 AM - 4:00 PM",
    category: "conference",
    isVirtual: true,
    location: "",
    image: "https://images.unsplash.com/photo-1560523160-754a9e25c68f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    isFree: false,
    price: 25,
    spotsLeft: 42,
    attendees: 108,
    host: {
      name: "Dr. Michael Reynolds",
      role: "Leadership Professor",
      avatar: "",
      bio: "Dr. Reynolds is an expert in organizational leadership and has published several books on effective leadership strategies in the modern workplace.",
    },
    agenda: [
      { time: "9:00 AM", description: "Registration & Coffee" },
      { time: "9:30 AM", description: "Opening Keynote" },
      { time: "10:30 AM", description: "Breakout Sessions (3 tracks)" },
      { time: "12:00 PM", description: "Lunch" },
      { time: "1:00 PM", description: "Afternoon Workshops" },
      { time: "3:00 PM", description: "Closing Keynote" },
    ],
  },
  {
    id: "6",
    title: "International Alumni Meetup",
    description: "A virtual gathering for international alumni to connect, share experiences, and network across borders.",
    date: "June 10, 2025",
    time: "8:00 AM - 9:30 AM",
    category: "networking",
    isVirtual: true,
    location: "",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    isFree: true,
    price: 0,
    spotsLeft: 65,
    attendees: 35,
    host: {
      name: "International Student Office",
      role: "Department",
      avatar: "",
      bio: "The International Student Office provides support and resources for international students and alumni, fostering a global community within our university network.",
    },
    agenda: [
      { time: "8:00 AM", description: "Welcome & Introductions" },
      { time: "8:15 AM", description: "Alumni Spotlight Presentations" },
      { time: "8:45 AM", description: "Breakout Networking Rooms" },
      { time: "9:15 AM", description: "Final Remarks & Future Events" },
    ],
  },
];

export const useEvents = () => {
  const [filters, setFilters] = useState({
    search: "",
    category: "all",
    date: null,
    type: "all",
  });

  const [events, setEvents] = useState(mockEvents);
  const [filteredEvents, setFilteredEvents] = useState(mockEvents);

  useEffect(() => {
    // Apply filters
    let result = [...mockEvents];

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        (event) =>
          event.title.toLowerCase().includes(searchLower) ||
          event.description.toLowerCase().includes(searchLower)
      );
    }

    // Category filter
    if (filters.category && filters.category !== "all") {
      result = result.filter((event) => event.category === filters.category);
    }

    // Date filter
    if (filters.date) {
      const filterDate = new Date(filters.date).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
      result = result.filter((event) => event.date === filterDate);
    }

    // Type filter
    if (filters.type && filters.type !== "all") {
      if (filters.type === "virtual") {
        result = result.filter((event) => event.isVirtual);
      } else if (filters.type === "in-person") {
        result = result.filter((event) => !event.isVirtual);
      }
    }

    setFilteredEvents(result);
  }, [filters]);

  return {
    events: filteredEvents,
    filters,
    setFilters,
  };
};
