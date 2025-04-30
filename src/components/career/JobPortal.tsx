
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Briefcase, BookmarkPlus, MapPin, Building, Calendar, Search } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

// Mock job data
const mockJobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "TechSolutions Inc.",
    location: "San Francisco, CA",
    type: "Full-time",
    experience: "2-4 years",
    posted: "3 days ago",
    description: "Join our team to create amazing user experiences with React, TypeScript and modern frontend tools.",
    skills: ["React", "TypeScript", "Tailwind CSS", "RESTful APIs"]
  },
  {
    id: 2,
    title: "Data Analyst",
    company: "DataWorks",
    location: "Remote",
    type: "Full-time",
    experience: "1-3 years",
    posted: "1 day ago",
    description: "Help us analyze customer data and provide insights to drive business decisions.",
    skills: ["SQL", "Python", "Data Visualization", "Statistics"]
  },
  {
    id: 3,
    title: "Product Marketing Intern",
    company: "GrowthMarketing",
    location: "New York, NY",
    type: "Internship",
    experience: "Entry Level",
    posted: "1 week ago",
    description: "Learn how to develop and execute marketing strategies for tech products.",
    skills: ["Content Creation", "Social Media", "Market Research", "Analytics"]
  },
  {
    id: 4,
    title: "UX Designer",
    company: "CreativeDesigns",
    location: "Chicago, IL",
    type: "Contract",
    experience: "3+ years",
    posted: "2 days ago",
    description: "Design intuitive and beautiful user experiences for web and mobile applications.",
    skills: ["Figma", "User Research", "Prototyping", "Wireframing"]
  },
  {
    id: 5,
    title: "Machine Learning Engineer",
    company: "AI Solutions",
    location: "Austin, TX",
    type: "Full-time",
    experience: "4+ years",
    posted: "Just now",
    description: "Develop cutting-edge ML models for computer vision applications.",
    skills: ["Python", "TensorFlow", "Computer Vision", "Deep Learning"]
  }
];

const JobPortal = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [industry, setIndustry] = useState("");
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState("");
  const { toast } = useToast();

  const filteredJobs = mockJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesIndustry = !industry || job.skills.some(skill => skill.toLowerCase().includes(industry.toLowerCase()));
    const matchesLocation = !location || job.location.toLowerCase().includes(location.toLowerCase());
    const matchesExperience = !experience || job.experience.toLowerCase().includes(experience.toLowerCase());
    
    return matchesSearch && matchesIndustry && matchesLocation && matchesExperience;
  });

  const handleApply = (jobId: number) => {
    toast({
      title: "Application Submitted",
      description: "Your application has been sent to the employer.",
    });
  };

  const handleBookmark = (jobId: number) => {
    toast({
      title: "Job Bookmarked",
      description: "This job has been saved to your bookmarks.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4">
        <h2 className="text-2xl font-bold">Job Portal</h2>
        <p className="text-muted-foreground">
          Find your next career opportunity with AI-powered job recommendations tailored to your skills and experience.
        </p>
      </div>

      {/* Search and filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative md:col-span-2">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search jobs by title, company, or keywords" 
            className="pl-10" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Select value={industry} onValueChange={setIndustry}>
          <SelectTrigger>
            <SelectValue placeholder="Industry" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="tech">Technology</SelectItem>
            <SelectItem value="finance">Finance</SelectItem>
            <SelectItem value="marketing">Marketing</SelectItem>
            <SelectItem value="design">Design</SelectItem>
            <SelectItem value="all">All Industries</SelectItem>
          </SelectContent>
        </Select>

        <Select value={location} onValueChange={setLocation}>
          <SelectTrigger>
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="remote">Remote</SelectItem>
            <SelectItem value="san francisco">San Francisco</SelectItem>
            <SelectItem value="new york">New York</SelectItem>
            <SelectItem value="chicago">Chicago</SelectItem>
            <SelectItem value="austin">Austin</SelectItem>
            <SelectItem value="all">All Locations</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          Showing {filteredJobs.length} jobs
        </p>
        <Select value={experience} onValueChange={setExperience}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Experience Level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="entry">Entry Level</SelectItem>
            <SelectItem value="1-3">1-3 years</SelectItem>
            <SelectItem value="3+">3+ years</SelectItem>
            <SelectItem value="5+">5+ years</SelectItem>
            <SelectItem value="all">All Experience Levels</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Job listings */}
      <div className="space-y-4">
        {filteredJobs.map((job) => (
          <Card key={job.id} className="overflow-hidden">
            <CardHeader>
              <div className="flex justify-between">
                <div>
                  <CardTitle className="text-lg">{job.title}</CardTitle>
                  <CardDescription className="flex items-center mt-1">
                    <Building className="h-4 w-4 mr-1" />
                    {job.company}
                  </CardDescription>
                </div>
                <Button variant="ghost" size="icon" onClick={() => handleBookmark(job.id)}>
                  <BookmarkPlus className="h-5 w-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center text-sm">
                  <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Briefcase className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{job.type}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>Posted {job.posted}</span>
                </div>
              </div>
              <p className="text-sm mb-4">{job.description}</p>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill, index) => (
                  <span 
                    key={index} 
                    className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-md"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </CardContent>
            <CardFooter className="border-t bg-muted/50 px-6 py-3">
              <div className="flex justify-between items-center w-full">
                <span className="text-sm">{job.experience} experience</span>
                <Button onClick={() => handleApply(job.id)}>Apply Now</Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default JobPortal;
