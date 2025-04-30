
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import JobPortal from "./JobPortal";
import ResumeReview from "./ResumeReview";
import MockInterview from "./MockInterview";
import SkillsAssessment from "./SkillsAssessment";
import CareerResources from "./CareerResources";
import MentorshipRequests from "./MentorshipRequests";

interface CareerTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

const CareerTabs = ({ activeTab, onTabChange }: CareerTabsProps) => {
  return (
    <Tabs 
      defaultValue="jobs" 
      value={activeTab} 
      onValueChange={onTabChange} 
      className="mt-8"
    >
      <TabsList className="grid grid-cols-3 md:grid-cols-6 w-full mb-8">
        <TabsTrigger value="jobs">Jobs</TabsTrigger>
        <TabsTrigger value="resume">Resume Review</TabsTrigger>
        <TabsTrigger value="interview">Mock Interview</TabsTrigger>
        <TabsTrigger value="skills">Skills Tests</TabsTrigger>
        <TabsTrigger value="resources">Resources</TabsTrigger>
        <TabsTrigger value="mentorship">Mentorship</TabsTrigger>
      </TabsList>
      
      <TabsContent value="jobs" className="animate-fade-in">
        <JobPortal />
      </TabsContent>
      
      <TabsContent value="resume" className="animate-fade-in">
        <ResumeReview />
      </TabsContent>
      
      <TabsContent value="interview" className="animate-fade-in">
        <MockInterview />
      </TabsContent>
      
      <TabsContent value="skills" className="animate-fade-in">
        <SkillsAssessment />
      </TabsContent>
      
      <TabsContent value="resources" className="animate-fade-in">
        <CareerResources />
      </TabsContent>
      
      <TabsContent value="mentorship" className="animate-fade-in">
        <MentorshipRequests />
      </TabsContent>
    </Tabs>
  );
};

export default CareerTabs;
