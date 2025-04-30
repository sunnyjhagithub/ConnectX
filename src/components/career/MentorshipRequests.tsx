
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Building, Calendar, Briefcase, Mail, Clock, Filter } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface Mentor {
  id: number;
  name: string;
  title: string;
  company: string;
  location: string;
  industry: string;
  experience: string;
  expertise: string[];
  bio: string;
  availability: string;
  avatarUrl?: string;
  rating: number;
  sessions: number;
  responseRate: number;
}

const mockMentors: Mentor[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    title: "Senior Product Manager",
    company: "TechCorp",
    location: "San Francisco, CA",
    industry: "Technology",
    experience: "8 years",
    expertise: ["Product Strategy", "UX/UI", "Agile", "Team Leadership"],
    bio: "Experienced product leader with a focus on user-centered design and data-driven decision making. Passionate about helping new product managers develop their skills and career paths.",
    availability: "2-3 sessions per month",
    avatarUrl: "https://placehold.co/400x400/9b87f5/fff?text=SJ",
    rating: 4.9,
    sessions: 45,
    responseRate: 95
  },
  {
    id: 2,
    name: "Michael Chen",
    title: "Engineering Director",
    company: "InnoSoft Solutions",
    location: "Remote",
    industry: "Software",
    experience: "12 years",
    expertise: ["Software Architecture", "Engineering Management", "Cloud Infrastructure", "Scaling Teams"],
    bio: "Technical leader guiding engineering teams through complex projects and organizational growth. Focused on mentoring the next generation of tech leaders.",
    availability: "Weekends only",
    avatarUrl: "https://placehold.co/400x400/9b87f5/fff?text=MC",
    rating: 4.8,
    sessions: 38,
    responseRate: 88
  },
  {
    id: 3,
    name: "Amelia Rodriguez",
    title: "Marketing Director",
    company: "Global Brands Inc.",
    location: "New York, NY",
    industry: "Marketing",
    experience: "10 years",
    expertise: ["Digital Marketing", "Brand Strategy", "Content Marketing", "Analytics"],
    bio: "Strategic marketing professional with experience across B2B and B2C sectors. Specializing in helping marketing professionals develop comprehensive growth strategies.",
    availability: "Weekly sessions available",
    avatarUrl: "https://placehold.co/400x400/9b87f5/fff?text=AR",
    rating: 5.0,
    sessions: 52,
    responseRate: 98
  },
  {
    id: 4,
    name: "David Wilson",
    title: "Data Science Lead",
    company: "Analytics Partners",
    location: "Chicago, IL",
    industry: "Data Science",
    experience: "7 years",
    expertise: ["Machine Learning", "Data Visualization", "Python", "Statistical Analysis"],
    bio: "Data scientist with a background in finance and healthcare analytics. Passionate about mentoring aspiring data professionals and career changers.",
    availability: "1-2 sessions per week",
    avatarUrl: "https://placehold.co/400x400/9b87f5/fff?text=DW",
    rating: 4.7,
    sessions: 31,
    responseRate: 90
  },
  {
    id: 5,
    name: "Lisa Kumar",
    title: "UX Research Manager",
    company: "DesignHub",
    location: "Seattle, WA",
    industry: "Design",
    experience: "9 years",
    expertise: ["User Research", "Usability Testing", "Design Thinking", "Journey Mapping"],
    bio: "UX researcher dedicated to creating human-centered products. Experienced in mentoring designers transitioning into research roles.",
    availability: "Monthly sessions",
    avatarUrl: "https://placehold.co/400x400/9b87f5/fff?text=LK",
    rating: 4.9,
    sessions: 27,
    responseRate: 93
  }
];

const MentorshipRequests = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [industry, setIndustry] = useState("");
  const [expertise, setExpertise] = useState("");
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [messageText, setMessageText] = useState("");
  const { toast } = useToast();

  const filteredMentors = mockMentors.filter(mentor => {
    const matchesSearch = mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mentor.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mentor.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mentor.bio.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesIndustry = !industry || mentor.industry.toLowerCase() === industry.toLowerCase();
    const matchesExpertise = !expertise || mentor.expertise.some(exp => exp.toLowerCase().includes(expertise.toLowerCase()));
    
    return matchesSearch && matchesIndustry && matchesExpertise;
  });

  const handleRequestMentorship = () => {
    if (!messageText.trim()) {
      toast({
        title: "Message Required",
        description: "Please include a message with your mentorship request.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Mentorship Request Sent",
      description: `Your request to ${selectedMentor?.name} has been sent successfully.`,
    });
    
    setMessageText("");
    setSelectedMentor(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4">
        <h2 className="text-2xl font-bold">Alumni Mentorship</h2>
        <p className="text-muted-foreground">
          Connect with experienced alumni mentors for personalized career guidance, industry insights, and professional development.
        </p>
      </div>

      {!selectedMentor ? (
        <>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search mentors by name, title, or company" 
                className="pl-10" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={industry} onValueChange={setIndustry}>
              <SelectTrigger className="md:w-[180px]">
                <SelectValue placeholder="Industry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-industries">All Industries</SelectItem>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="software">Software</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="data science">Data Science</SelectItem>
                <SelectItem value="design">Design</SelectItem>
              </SelectContent>
            </Select>
            <Select value={expertise} onValueChange={setExpertise}>
              <SelectTrigger className="md:w-[180px]">
                <SelectValue placeholder="Expertise" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-expertise">All Expertise</SelectItem>
                <SelectItem value="leadership">Leadership</SelectItem>
                <SelectItem value="product">Product</SelectItem>
                <SelectItem value="engineering">Engineering</SelectItem>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="data">Data Analysis</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-4">
            {filteredMentors.map((mentor) => (
              <Card key={mentor.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row">
                  <CardHeader className="md:w-1/4 flex justify-center items-center p-6">
                    <div className="text-center">
                      <Avatar className="h-24 w-24 mb-3 mx-auto">
                        <AvatarImage src={mentor.avatarUrl} />
                        <AvatarFallback>{mentor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <h3 className="text-lg font-semibold">{mentor.name}</h3>
                      <p className="text-sm text-muted-foreground">{mentor.title}</p>
                      <div className="flex items-center justify-center mt-2">
                        <span className="text-amber-500">★</span>
                        <span className="font-medium ml-1">{mentor.rating}</span>
                        <span className="text-muted-foreground text-xs ml-2">({mentor.sessions} sessions)</span>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <div className="flex-1 border-t md:border-t-0 md:border-l">
                    <CardContent className="p-6 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center text-sm">
                          <Building className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{mentor.company}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{mentor.location}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Briefcase className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{mentor.experience} experience</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{mentor.availability}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="font-medium">About</h4>
                        <p className="text-sm">{mentor.bio}</p>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="font-medium">Expertise</h4>
                        <div className="flex flex-wrap gap-2">
                          {mentor.expertise.map((skill, index) => (
                            <Badge key={index} variant="outline">{skill}</Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                    
                    <CardFooter className="p-6 border-t bg-muted/50 flex justify-between">
                      <div className="text-sm">
                        <span className="font-medium">{mentor.responseRate}%</span> response rate
                      </div>
                      <Button onClick={() => setSelectedMentor(mentor)}>Request Mentorship</Button>
                    </CardFooter>
                  </div>
                </div>
              </Card>
            ))}
            
            {filteredMentors.length === 0 && (
              <div className="text-center py-10">
                <h3 className="text-lg font-medium">No mentors found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search criteria
                </p>
              </div>
            )}
          </div>
        </>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Request Mentorship Session</CardTitle>
            <CardDescription>
              Send a message to {selectedMentor.name} requesting mentorship guidance
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={selectedMentor.avatarUrl} />
                <AvatarFallback>{selectedMentor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">{selectedMentor.name}</h3>
                <p className="text-sm text-muted-foreground">{selectedMentor.title} at {selectedMentor.company}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Subject</label>
              <Input 
                placeholder="e.g., Career Advice Request" 
                defaultValue={`Mentorship Request: Career Guidance in ${selectedMentor.industry}`}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Message</label>
              <Textarea 
                placeholder="Introduce yourself and explain what you're looking for help with..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                className="min-h-[150px]"
              />
              <p className="text-xs text-muted-foreground">
                Tips: Briefly introduce yourself, be specific about what you're seeking advice on, 
                and suggest potential times for a session based on the mentor's availability.
              </p>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Preferred Session Format</label>
              <Select defaultValue="video">
                <SelectTrigger>
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="video">Video Call</SelectItem>
                  <SelectItem value="audio">Audio Call</SelectItem>
                  <SelectItem value="chat">Text Chat</SelectItem>
                  <SelectItem value="email">Email Exchange</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Suggested Dates</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select date range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week1">Next 7 days</SelectItem>
                  <SelectItem value="week2">8-14 days from now</SelectItem>
                  <SelectItem value="week3">15-21 days from now</SelectItem>
                  <SelectItem value="flexible">Flexible / To be determined</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                This mentor's availability: {selectedMentor.availability}
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t p-6">
            <Button variant="outline" onClick={() => setSelectedMentor(null)}>
              Cancel
            </Button>
            <Button onClick={handleRequestMentorship}>
              <Mail className="mr-2 h-4 w-4" />
              Send Request
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default MentorshipRequests;
