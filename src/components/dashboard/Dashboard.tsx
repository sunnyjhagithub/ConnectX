
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Award, Book, Calendar, MessageCircle, Search, User, Users } from "lucide-react";

const userProfile = {
  name: "Jane Smith",
  role: "Student",
  major: "Computer Science",
  university: "Tech University",
  year: "Senior",
  profileComplete: 75
};

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="container px-4 py-6 mx-auto max-w-7xl">
      <div className="grid grid-cols-1 md:grid-cols-7 gap-6">
        {/* Sidebar */}
        <div className="md:col-span-2">
          <Card className="sticky top-20">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center">
                  <User className="h-12 w-12 text-gray-500" />
                </div>
              </div>
              <CardTitle>{userProfile.name}</CardTitle>
              <CardDescription>
                {userProfile.role} • {userProfile.university}
                <div className="mt-2">
                  {userProfile.major}, {userProfile.year}
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="text-sm text-gray-500 flex justify-between">
                  <span>Profile Completion</span>
                  <span>{userProfile.profileComplete}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-connectx-primary h-2 rounded-full"
                    style={{ width: `${userProfile.profileComplete}%` }}
                  ></div>
                </div>
              </div>

              <Button variant="outline" className="w-full">
                Edit Profile
              </Button>

              <div className="pt-2">
                <h4 className="text-sm font-semibold mb-3">Quick Actions</h4>
                <ul className="space-y-2">
                  <li>
                    <Button variant="ghost" className="w-full justify-start hover:text-connectx-primary">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Messages
                    </Button>
                  </li>
                  <li>
                    <Button variant="ghost" className="w-full justify-start hover:text-connectx-primary">
                      <Calendar className="h-4 w-4 mr-2" />
                      Upcoming Sessions
                    </Button>
                  </li>
                  <li>
                    <Button variant="ghost" className="w-full justify-start hover:text-connectx-primary">
                      <Users className="h-4 w-4 mr-2" />
                      My Network
                    </Button>
                  </li>
                  <li>
                    <Button variant="ghost" className="w-full justify-start hover:text-connectx-primary">
                      <Book className="h-4 w-4 mr-2" />
                      Learning Resources
                    </Button>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="md:col-span-5">
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="mentors">Find Mentors</TabsTrigger>
              <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
            </TabsList>
            
            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Welcome Back, Jane!</CardTitle>
                  <CardDescription>
                    Here's what's happening with your ConnectX account today.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Card className="bg-gradient-to-br from-connectx-primary/10 to-connectx-secondary/10">
                      <CardHeader className="pb-2">
                        <CardDescription>Upcoming</CardDescription>
                        <CardTitle className="text-lg">Career Workshop</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">Tomorrow, 2:00 PM</p>
                        <Button variant="link" className="p-0 h-auto text-connectx-primary">
                          View Details
                        </Button>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-gradient-to-br from-connectx-primary/10 to-connectx-secondary/10">
                      <CardHeader className="pb-2">
                        <CardDescription>New</CardDescription>
                        <CardTitle className="text-lg">3 Mentorship Opportunities</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">Matched based on your interests</p>
                        <Button variant="link" className="p-0 h-auto text-connectx-primary">
                          Explore Mentors
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <h3 className="text-lg font-medium pt-4">Recent Activity</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 p-4 border rounded-lg">
                      <div className="bg-connectx-primary/10 p-2 rounded-full">
                        <MessageCircle className="h-5 w-5 text-connectx-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">New Message from Alex Chen</h4>
                        <p className="text-sm text-gray-500">
                          "Hi Jane, I'd be happy to discuss career opportunities in data science..."
                        </p>
                        <Button variant="link" className="p-0 h-auto text-connectx-primary mt-1">
                          Reply
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4 p-4 border rounded-lg">
                      <div className="bg-connectx-primary/10 p-2 rounded-full">
                        <Award className="h-5 w-5 text-connectx-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Achievement Unlocked</h4>
                        <p className="text-sm text-gray-500">
                          You've completed 5 networking activities this month!
                        </p>
                        <Button variant="link" className="p-0 h-auto text-connectx-primary mt-1">
                          View Achievements
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Recommended for You</CardTitle>
                  <CardDescription>
                    Based on your profile and interests
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="p-4 border rounded-lg flex justify-between items-center">
                      <div className="flex items-center space-x-4">
                        <div className="bg-connectx-primary/10 p-2 rounded-full">
                          <Calendar className="h-5 w-5 text-connectx-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">AI in Healthcare Webinar</h4>
                          <p className="text-sm text-gray-500">Friday, 3:00 PM</p>
                        </div>
                      </div>
                      <Button variant="outline" className="shrink-0">
                        Register
                      </Button>
                    </div>
                    
                    <div className="p-4 border rounded-lg flex justify-between items-center">
                      <div className="flex items-center space-x-4">
                        <div className="bg-connectx-primary/10 p-2 rounded-full">
                          <Book className="h-5 w-5 text-connectx-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">Tech Interview Preparation Guide</h4>
                          <p className="text-sm text-gray-500">New resource by Career Services</p>
                        </div>
                      </div>
                      <Button variant="outline" className="shrink-0">
                        View
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Mentors Tab */}
            <TabsContent value="mentors" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Find Your Mentor</CardTitle>
                  <CardDescription>
                    Connect with alumni who can guide you in your career journey
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2 mb-6">
                    <div className="relative flex-grow">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <input
                        type="text"
                        placeholder="Search mentors by name, expertise or industry..."
                        className="pl-10 w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                      />
                    </div>
                    <Button className="bg-connectx-primary hover:bg-connectx-secondary">
                      Search
                    </Button>
                  </div>
                  
                  <div className="space-y-6">
                    {/* Sample Mentor Cards */}
                    <div className="border rounded-lg p-4">
                      <div className="flex items-start md:items-center flex-col md:flex-row md:justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center">
                            <User className="h-8 w-8 text-gray-500" />
                          </div>
                          <div>
                            <h4 className="font-medium">Dr. Emily Richardson</h4>
                            <p className="text-sm text-gray-500">Data Scientist at Google</p>
                            <div className="flex items-center mt-1">
                              <span className="text-xs bg-connectx-primary/10 text-connectx-primary px-2 py-1 rounded-full mr-2">
                                Machine Learning
                              </span>
                              <span className="text-xs bg-connectx-primary/10 text-connectx-primary px-2 py-1 rounded-full">
                                Career Guidance
                              </span>
                            </div>
                          </div>
                        </div>
                        <Button className="bg-connectx-primary hover:bg-connectx-secondary w-full md:w-auto">
                          Request Mentorship
                        </Button>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <div className="flex items-start md:items-center flex-col md:flex-row md:justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center">
                            <User className="h-8 w-8 text-gray-500" />
                          </div>
                          <div>
                            <h4 className="font-medium">Michael Chang</h4>
                            <p className="text-sm text-gray-500">Software Engineer at Microsoft</p>
                            <div className="flex items-center mt-1">
                              <span className="text-xs bg-connectx-primary/10 text-connectx-primary px-2 py-1 rounded-full mr-2">
                                Web Development
                              </span>
                              <span className="text-xs bg-connectx-primary/10 text-connectx-primary px-2 py-1 rounded-full">
                                Interview Prep
                              </span>
                            </div>
                          </div>
                        </div>
                        <Button className="bg-connectx-primary hover:bg-connectx-secondary w-full md:w-auto">
                          Request Mentorship
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Opportunities Tab */}
            <TabsContent value="opportunities" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Career Opportunities</CardTitle>
                  <CardDescription>
                    Discover jobs, internships, and other opportunities
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="border rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium">Software Engineering Intern</h4>
                          <p className="text-sm text-gray-500">TechCorp • San Francisco, CA (Remote)</p>
                          <div className="flex items-center mt-2">
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                              New
                            </span>
                            <span className="mx-2 text-gray-300">•</span>
                            <span className="text-xs text-gray-500">
                              Posted 2 days ago
                            </span>
                          </div>
                        </div>
                        <Button className="bg-connectx-primary hover:bg-connectx-secondary">
                          Apply
                        </Button>
                      </div>
                      <div className="mt-4 text-sm">
                        <p>
                          Looking for talented computer science students for our summer internship program. Gain hands-on experience with our engineering team.
                        </p>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">
                          React
                        </span>
                        <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">
                          Node.js
                        </span>
                        <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">
                          MongoDB
                        </span>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium">Data Analyst</h4>
                          <p className="text-sm text-gray-500">AnalyticsPro • Boston, MA (Hybrid)</p>
                          <div className="flex items-center mt-2">
                            <span className="text-xs text-gray-500">
                              Posted 1 week ago
                            </span>
                          </div>
                        </div>
                        <Button className="bg-connectx-primary hover:bg-connectx-secondary">
                          Apply
                        </Button>
                      </div>
                      <div className="mt-4 text-sm">
                        <p>
                          Join our analytics team to help derive insights from large datasets. Perfect opportunity for statistics or data science graduates.
                        </p>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">
                          SQL
                        </span>
                        <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">
                          Python
                        </span>
                        <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">
                          Tableau
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
