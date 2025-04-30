
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Award, Briefcase, Calendar, Mail, MapPin, MessageCircle } from "lucide-react";

const ProfileView = () => {
  const profile = {
    name: "Alex Johnson",
    title: "Software Engineer",
    company: "Google",
    location: "San Francisco, CA",
    email: "alex.johnson@example.com",
    bio: "Experienced software engineer with a passion for building scalable applications and mentoring junior developers. I specialize in full-stack development with expertise in React, Node.js, and cloud architecture.",
    experience: [
      {
        role: "Senior Software Engineer",
        company: "Google",
        duration: "2020 - Present",
        description: "Working on Google Cloud Platform services and developer tools."
      },
      {
        role: "Software Engineer",
        company: "Microsoft",
        duration: "2016 - 2020",
        description: "Developed features for Office 365 and collaborated on Azure integrations."
      }
    ],
    education: [
      {
        degree: "M.S. Computer Science",
        institution: "Stanford University",
        year: "2016"
      },
      {
        degree: "B.S. Computer Science",
        institution: "University of California, Berkeley",
        year: "2014"
      }
    ],
    skills: ["JavaScript", "React", "Node.js", "Python", "AWS", "System Design", "Mentoring"],
    mentorshipAreas: ["Web Development", "Career Transitions", "Tech Interviews", "Graduate School Applications"],
    availability: {
      status: "Available",
      sessions: ["One-on-one Mentoring", "Resume Reviews", "Mock Interviews"]
    },
    achievements: [
      "Published 3 research papers on distributed systems",
      "Speaker at React Conference 2022",
      "Mentored over 25 junior developers"
    ]
  };
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Overview */}
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto h-32 w-32 rounded-full bg-connectx-primary/10 flex items-center justify-center mb-4">
                <span className="text-4xl font-bold text-connectx-primary">
                  {profile.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <CardTitle className="text-2xl">{profile.name}</CardTitle>
              <CardDescription className="text-base">
                {profile.title} at {profile.company}
              </CardDescription>
              <div className="flex items-center justify-center mt-2">
                <MapPin className="h-4 w-4 mr-1 text-gray-500" />
                <span className="text-sm text-gray-500">{profile.location}</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-t pt-4">
                <h3 className="text-sm font-semibold mb-2">Mentorship Status</h3>
                <div className="flex items-center">
                  <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                    {profile.availability.status}
                  </Badge>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h3 className="text-sm font-semibold mb-2">Contact</h3>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-sm">{profile.email}</span>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h3 className="text-sm font-semibold mb-2">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="bg-connectx-primary/10 text-connectx-primary border-none">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="pt-4 flex flex-col gap-2">
                <Button className="w-full bg-connectx-primary hover:bg-connectx-secondary">
                  <MessageCircle className="h-4 w-4 mr-2" /> Request Mentorship
                </Button>
                <Button variant="outline" className="w-full">
                  <Calendar className="h-4 w-4 mr-2" /> View Availability
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Mentorship Areas</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {profile.mentorshipAreas.map((area, index) => (
                  <li key={index} className="flex items-center">
                    <Award className="h-4 w-4 mr-2 text-connectx-primary" />
                    <span>{area}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
        
        {/* Detailed Information */}
        <div className="md:col-span-2">
          <Tabs defaultValue="about">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="sessions">Sessions</TabsTrigger>
            </TabsList>
            <div className="mt-6">
              <TabsContent value="about" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Bio</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">{profile.bio}</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Education</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {profile.education.map((edu, index) => (
                        <div key={index} className="border-l-2 border-connectx-primary pl-4 py-1">
                          <h4 className="font-medium">{edu.degree}</h4>
                          <p className="text-sm text-gray-600">{edu.institution}</p>
                          <p className="text-sm text-gray-500">{edu.year}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Achievements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {profile.achievements.map((achievement, index) => (
                        <li key={index} className="flex items-start">
                          <Award className="h-5 w-5 mr-2 text-connectx-primary shrink-0 mt-0.5" />
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="experience" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Work Experience</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-8">
                      {profile.experience.map((exp, index) => (
                        <div key={index} className="relative pl-8 border-l-2 border-connectx-primary pb-8 last:pb-0">
                          <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-connectx-primary"></div>
                          <div>
                            <div className="flex items-center">
                              <h4 className="font-medium text-lg">{exp.role}</h4>
                            </div>
                            <div className="flex items-center mb-2">
                              <Briefcase className="h-4 w-4 mr-2 text-gray-500" />
                              <span className="text-sm text-gray-600">{exp.company}</span>
                              <span className="mx-2 text-gray-300">•</span>
                              <span className="text-sm text-gray-500">{exp.duration}</span>
                            </div>
                            <p className="text-gray-700">{exp.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="sessions" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Available Sessions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {profile.availability.sessions.map((session, index) => (
                        <div key={index} className="p-4 border rounded-lg flex justify-between items-center">
                          <div>
                            <h4 className="font-medium">{session}</h4>
                            <p className="text-sm text-gray-500">45-60 minutes</p>
                          </div>
                          <Button className="bg-connectx-primary hover:bg-connectx-secondary">
                            Book Session
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Reviews</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center mb-2">
                          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                            <span className="font-medium text-xs">SM</span>
                          </div>
                          <div>
                            <h4 className="font-medium">Sarah Miller</h4>
                            <div className="flex items-center">
                              {Array(5).fill(0).map((_, i) => (
                                <svg key={i} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M8 1L10 5.5L15 6L11.5 9.5L12.5 14L8 12L3.5 14L4.5 9.5L1 6L6 5.5L8 1Z" fill={i < 4 ? "#9b87f5" : "#e2e8f0"} />
                                </svg>
                              ))}
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-gray-700">
                          "Alex was incredibly helpful during our mentorship session. He provided great insights about the industry and gave me practical advice about my career path. I highly recommend booking a session with him!"
                        </p>
                      </div>
                      
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center mb-2">
                          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                            <span className="font-medium text-xs">RJ</span>
                          </div>
                          <div>
                            <h4 className="font-medium">Ryan Jackson</h4>
                            <div className="flex items-center">
                              {Array(5).fill(0).map((_, i) => (
                                <svg key={i} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M8 1L10 5.5L15 6L11.5 9.5L12.5 14L8 12L3.5 14L4.5 9.5L1 6L6 5.5L8 1Z" fill={i < 5 ? "#9b87f5" : "#e2e8f0"} />
                                </svg>
                              ))}
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-gray-700">
                          "The mock interview session with Alex was extremely valuable. He asked challenging questions and provided constructive feedback. After our session, I felt much more confident and ended up landing my dream job!"
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
