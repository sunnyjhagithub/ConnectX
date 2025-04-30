
import { BookOpen, Briefcase, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const CareerHero = () => {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-purple-600 via-violet-500 to-indigo-500 bg-clip-text text-transparent">
          Career Guidance Center
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Use AI-powered tools to advance your career journey with personalized job recommendations, resume review, interview practice, and mentorship connections.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <Card className="hover-scale">
          <CardContent className="pt-6 flex flex-col items-center text-center">
            <Briefcase className="h-12 w-12 text-purple-500 mb-4" />
            <h3 className="text-lg font-medium">Find Your Dream Job</h3>
            <p className="text-sm text-muted-foreground">
              AI-matched job recommendations based on your skills and experience.
            </p>
          </CardContent>
        </Card>
        
        <Card className="hover-scale">
          <CardContent className="pt-6 flex flex-col items-center text-center">
            <BookOpen className="h-12 w-12 text-purple-500 mb-4" />
            <h3 className="text-lg font-medium">Prepare & Practice</h3>
            <p className="text-sm text-muted-foreground">
              Resume review, mock interviews, and skill assessments.
            </p>
          </CardContent>
        </Card>
        
        <Card className="hover-scale">
          <CardContent className="pt-6 flex flex-col items-center text-center">
            <Users className="h-12 w-12 text-purple-500 mb-4" />
            <h3 className="text-lg font-medium">Connect with Mentors</h3>
            <p className="text-sm text-muted-foreground">
              Get guidance from alumni in your desired industry.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CareerHero;
