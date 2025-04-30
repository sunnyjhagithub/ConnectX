import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-connectx-primary/30 to-connectx-tertiary/30 blur-3xl rounded-bl-full" />
      
      <div className="container mx-auto px-4 pt-16 pb-24 md:pt-24 md:pb-32">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="w-full md:w-1/2 space-y-8 text-center md:text-left">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Connect, learn, and grow with{" "}
                <span className="bg-gradient-to-br from-connectx-primary to-connectx-tertiary bg-clip-text text-transparent">
                  alumni mentors
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-lg mx-auto md:mx-0">
                An AI-powered platform connecting students with alumni mentors for personalized career guidance and professional development.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link to="/register">
                <Button size="lg" className="bg-connectx-primary hover:bg-connectx-secondary text-white font-medium px-8 pulse-button">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </Link>
            </div>
            
            <div className="flex items-center justify-center md:justify-start space-x-8 pt-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-connectx-primary">5K+</p>
                <p className="text-sm text-gray-500">Alumni Mentors</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-connectx-primary">25K+</p>
                <p className="text-sm text-gray-500">Students</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-connectx-primary">100+</p>
                <p className="text-sm text-gray-500">Universities</p>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 relative">
            <div className="bg-gray-100 rounded-2xl p-6 shadow-lg relative z-10 max-w-md mx-auto">
              <Link to="/alumni-directory" className="block">
                <div className="bg-white rounded-xl shadow-sm p-4 mb-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-connectx-primary/10 text-connectx-primary flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="8" r="5" />
                        <path d="M20 21a8 8 0 0 0-16 0" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">Find the right mentor</h3>
                      <p className="text-xs text-gray-500">AI matches you with alumni mentors</p>
                    </div>
                  </div>
                </div>
              </Link>
              
              <Link to="/career-guidance" className="block">
                <div className="bg-white rounded-xl shadow-sm p-4 mb-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-connectx-primary/10 text-connectx-primary flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z" />
                        <path d="M10 2c1 .5 2 2 2 5" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">Get personalized guidance</h3>
                      <p className="text-xs text-gray-500">One-on-one mentorship sessions</p>
                    </div>
                  </div>
                </div>
              </Link>
              
              <Link to="/events" className="block">
                <div className="bg-white rounded-xl shadow-sm p-4 mb-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-connectx-primary/10 text-connectx-primary flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
                        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                        <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
                        <path d="M2 7h20" />
                        <path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">Access job opportunities</h3>
                      <p className="text-xs text-gray-500">Exclusive listings from alumni network</p>
                    </div>
                  </div>
                </div>
              </Link>
              
              <Link to="/career-guidance?tab=resources" className="block">
                <div className="bg-white rounded-xl shadow-sm p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-connectx-primary/10 text-connectx-primary flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 3v16h16" />
                        <path d="m5 19 6-6" />
                        <path d="m2 6 3-3 3 3" />
                        <path d="m18 16 3-3 3 3" />
                        <path d="m19 5-7 7-4-4-3 3" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">Track your progress</h3>
                      <p className="text-xs text-gray-500">Analytics and career development tools</p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-connectx-tertiary/10 rounded-full blur-2xl" />
            <div className="absolute top-1/2 -left-10 w-20 h-20 bg-connectx-primary/20 rounded-full blur-xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
