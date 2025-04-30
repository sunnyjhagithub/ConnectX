
import { Award, Book, Calendar, MessageCircle, Search, User } from "lucide-react";
import { Link } from "react-router-dom";

const Features = () => {
  const features = [
    {
      icon: <User className="h-6 w-6" />,
      title: "Smart Mentor Matching",
      description: "Our AI algorithm matches students with alumni mentors based on career goals, skills, and interests for personalized guidance.",
      link: "/alumni-directory"
    },
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: "Discussion Forums",
      description: "Engage in topic-based conversations with peers and experts. AI moderation ensures quality content.",
      link: "/webinars/discussions"
    },
    {
      icon: <Calendar className="h-6 w-6" />,
      title: "Webinars & Events",
      description: "Access live and recorded webinars led by industry experts with AI-generated summaries for quick insights.",
      link: "/events"
    },
    {
      icon: <Search className="h-6 w-6" />,
      title: "Job Recommendations",
      description: "Receive personalized job and internship opportunities based on your profile, skills, and career interests.",
      link: "/career-guidance?tab=jobs"
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Resume Analysis",
      description: "AI-powered resume scanner provides feedback to help you create application materials that stand out.",
      link: "/career-guidance?tab=resume"
    },
    {
      icon: <Book className="h-6 w-6" />,
      title: "Learning Resources",
      description: "Access a curated library of resources, guides, and learning materials recommended for your specific goals.",
      link: "/career-guidance?tab=resources"
    },
  ];

  return (
    <div className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            AI-Powered Features Designed for{" "}
            <span className="bg-gradient-to-br from-connectx-primary to-connectx-tertiary bg-clip-text text-transparent">
              Your Success
            </span>
          </h2>
          <p className="text-xl text-gray-600">
            ConnectX combines cutting-edge AI technology with human expertise to create a powerful platform for career development.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Link to={feature.link} key={index}>
              <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100 h-full">
                <div className="h-12 w-12 rounded-lg bg-connectx-primary/10 flex items-center justify-center text-connectx-primary mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
