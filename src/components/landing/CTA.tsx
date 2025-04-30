
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <div className="bg-gradient-to-br from-connectx-primary to-connectx-tertiary py-20 text-white">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Connect with Alumni Mentors?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Join ConnectX today and take advantage of AI-powered mentorship matching, career guidance, and professional networking opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="bg-white text-connectx-primary hover:bg-gray-100 font-medium px-8">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/features">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Learn More
              </Button>
            </Link>
          </div>
          <p className="mt-6 text-sm text-white/70">
            No credit card required. Get started in minutes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CTA;
