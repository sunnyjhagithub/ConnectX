
import { useState, useEffect } from "react";
import { useWebinars } from "./useWebinars";

// Mock comments data
const mockComments = [
  {
    id: "1",
    webinarId: "1",
    author: {
      name: "Jessica Lee",
      role: "Student",
      avatar: "",
    },
    content: "The explanation of supervised vs unsupervised learning was really clear. I finally understand the difference!",
    timestamp: "2025-04-10T13:45:00Z",
  },
  {
    id: "2",
    webinarId: "1",
    author: {
      name: "David Kim",
      role: "Graduate Student",
      avatar: "",
    },
    content: "Could you recommend any resources for diving deeper into neural networks? The introduction in this webinar was great but I'd like to learn more.",
    timestamp: "2025-04-10T14:22:00Z",
  },
  {
    id: "3",
    webinarId: "2",
    author: {
      name: "Tyler Johnson",
      role: "Alumni",
      avatar: "",
    },
    content: "The tips on student loan refinancing were incredibly helpful. I've already started looking into the options mentioned!",
    timestamp: "2025-04-05T09:17:00Z",
  },
  {
    id: "4",
    webinarId: "3",
    author: {
      name: "Ana Rodriguez",
      role: "Student",
      avatar: "",
    },
    content: "I've been implementing the accessibility guidelines mentioned in this webinar to my current project, and it's making a huge difference in usability!",
    timestamp: "2025-04-12T16:05:00Z",
  },
];

export const useWebinarDiscussion = (id) => {
  const { webinars } = useWebinars();
  const [webinar, setWebinar] = useState(null);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    // Simulate API call with timeout
    const timer = setTimeout(() => {
      const foundWebinar = webinars.find((w) => w.id === id);
      setWebinar(foundWebinar || null);

      // Get comments for this webinar
      const webinarComments = mockComments.filter((comment) => comment.webinarId === id);
      setComments(webinarComments);

      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [id, webinars]);

  const addComment = (newComment) => {
    setComments((prevComments) => [newComment, ...prevComments]);
  };

  return {
    webinar,
    comments,
    addComment,
    isLoading,
  };
};
