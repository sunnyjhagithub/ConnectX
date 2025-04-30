
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Calendar, BookmarkPlus, Mail, FileText } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useToast } from "@/hooks/use-toast";

interface Resource {
  id: number;
  title: string;
  type: 'article' | 'video' | 'podcast' | 'ebook';
  author: string;
  date: string;
  description: string;
  readTime?: string;
  category: string[];
  thumbnail?: string;
  url: string;
  featured?: boolean;
}

const mockResources: Resource[] = [
  {
    id: 1,
    title: "10 Essential Resume Tips from Top Recruiters",
    type: 'article',
    author: "Career Success Team",
    date: "Apr 15, 2025",
    description: "Learn the insider secrets that make recruiters notice your resume. This comprehensive guide covers formatting, keywords, and common mistakes to avoid.",
    readTime: "8 min read",
    category: ["resume", "job-search"],
    url: "/resources/resume-tips",
    featured: true
  },
  {
    id: 2,
    title: "How to Ace Your Technical Interview",
    type: 'article',
    author: "Tech Hiring Experts",
    date: "Apr 10, 2025",
    description: "Prepare for coding challenges, system design questions, and behavioral interviews with this comprehensive guide for software engineers.",
    readTime: "12 min read",
    category: ["interview", "tech"],
    url: "/resources/tech-interview"
  },
  {
    id: 3,
    title: "The Art of Negotiating Your Salary",
    type: 'video',
    author: "Jane Smith, Negotiation Coach",
    date: "Apr 3, 2025",
    description: "Learn proven techniques to confidently negotiate your compensation package and get the salary you deserve.",
    category: ["career-growth", "negotiation"],
    thumbnail: "https://placehold.co/600x400/9b87f5/fff?text=Salary+Negotiation",
    url: "/resources/salary-negotiation"
  },
  {
    id: 4,
    title: "Building a Personal Brand on LinkedIn",
    type: 'article',
    author: "Social Media Career Experts",
    date: "Mar 28, 2025",
    description: "Discover how to optimize your LinkedIn profile and create content that attracts recruiters and builds your professional reputation.",
    readTime: "10 min read",
    category: ["networking", "personal-brand"],
    url: "/resources/linkedin-branding"
  },
  {
    id: 5,
    title: "Career Transitions: Finding Your New Path",
    type: 'podcast',
    author: "Career Change Podcast",
    date: "Mar 20, 2025",
    description: "Stories and advice from professionals who successfully changed careers, with actionable tips for your own transition.",
    category: ["career-change", "inspiration"],
    url: "/resources/career-transitions"
  },
  {
    id: 6,
    title: "The Complete Guide to Remote Work Success",
    type: 'ebook',
    author: "Remote Work Institute",
    date: "Mar 15, 2025",
    description: "Everything you need to know about finding, securing, and excelling in remote positions in today's digital workplace.",
    category: ["remote-work", "productivity"],
    thumbnail: "https://placehold.co/600x400/9b87f5/fff?text=Remote+Work",
    url: "/resources/remote-work-guide",
    featured: true
  },
  {
    id: 7,
    title: "Mastering Behavioral Interview Questions",
    type: 'video',
    author: "Interview Coaching Team",
    date: "Mar 10, 2025",
    description: "Learn the STAR method and how to craft compelling stories that showcase your skills and experience in any interview.",
    category: ["interview", "soft-skills"],
    thumbnail: "https://placehold.co/600x400/9b87f5/fff?text=Interview+Tips",
    url: "/resources/behavioral-interviews"
  },
  {
    id: 8,
    title: "Networking Strategies for Introverts",
    type: 'article',
    author: "Professional Development Center",
    date: "Mar 5, 2025",
    description: "You don't have to be the life of the party to build a powerful professional network. Learn comfortable networking strategies for quieter professionals.",
    readTime: "7 min read",
    category: ["networking", "soft-skills"],
    url: "/resources/introvert-networking"
  }
];

const categories = [
  "All",
  "Resume",
  "Interview",
  "Networking",
  "Career Growth",
  "Job Search",
  "Tech",
  "Remote Work"
];

const CareerResources = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { toast } = useToast();

  const filteredResources = mockResources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.author.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = selectedTab === "all" || resource.type === selectedTab;
    const matchesCategory = selectedCategory === "All" || 
                           resource.category.some(cat => cat.toLowerCase() === selectedCategory.toLowerCase().replace(" ", "-"));
    
    return matchesSearch && matchesType && matchesCategory;
  });

  const handleBookmark = (resourceId: number) => {
    toast({
      title: "Resource Bookmarked",
      description: "This resource has been saved to your bookmarks.",
    });
  };

  const handleResourceClick = (resource: Resource) => {
    toast({
      title: "Resource Loading",
      description: `Opening: ${resource.title}`,
    });
  };

  const getFeaturedResources = () => {
    return mockResources.filter(resource => resource.featured);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4">
        <h2 className="text-2xl font-bold">Career Resources</h2>
        <p className="text-muted-foreground">
          Browse our curated collection of career development resources to help you succeed in your professional journey.
        </p>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search resources by title, author, or keywords" 
          className="pl-10" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {searchTerm === "" && (
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4">Featured Resources</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {getFeaturedResources().map((resource) => (
              <Card key={resource.id} className="overflow-hidden hover-scale">
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <div>
                      <span className="text-xs uppercase text-muted-foreground">
                        {resource.type}
                      </span>
                      <CardTitle className="text-lg">{resource.title}</CardTitle>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => handleBookmark(resource.id)}>
                      <BookmarkPlus className="h-5 w-5" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm line-clamp-2">{resource.description}</p>
                </CardContent>
                <CardFooter className="flex justify-between pt-0">
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3 mr-1" />
                    {resource.date}
                    {resource.readTime && (
                      <span className="ml-2">• {resource.readTime}</span>
                    )}
                  </div>
                  <Button variant="link" size="sm" className="text-primary" onClick={() => handleResourceClick(resource)}>
                    Read More
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}

      <Tabs defaultValue="all" value={selectedTab} onValueChange={setSelectedTab}>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="article">Articles</TabsTrigger>
            <TabsTrigger value="video">Videos</TabsTrigger>
            <TabsTrigger value="podcast">Podcasts</TabsTrigger>
            <TabsTrigger value="ebook">E-Books</TabsTrigger>
          </TabsList>

          <div className="flex items-center space-x-2">
            <span className="text-sm">Filter:</span>
            <ToggleGroup type="single" value={selectedCategory} onValueChange={(value) => value && setSelectedCategory(value)}>
              {categories.slice(0, 3).map((category) => (
                <ToggleGroupItem key={category} value={category} aria-label={category} size="sm">
                  {category}
                </ToggleGroupItem>
              ))}
              {/* More button for additional categories could be added here */}
            </ToggleGroup>
          </div>
        </div>
        
        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 gap-4">
            {filteredResources.length > 0 ? (
              filteredResources.map((resource) => (
                <Card key={resource.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:flex-row">
                    {resource.thumbnail && (
                      <div className="md:w-1/4">
                        <div 
                          className="h-40 md:h-full bg-cover bg-center" 
                          style={{backgroundImage: `url(${resource.thumbnail})`}}
                        ></div>
                      </div>
                    )}
                    <div className={`flex-1 flex flex-col ${resource.thumbnail ? 'md:w-3/4' : 'w-full'}`}>
                      <CardHeader className="pb-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="text-xs px-2 py-1 bg-secondary rounded-full">
                                {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                              </span>
                              {resource.readTime && (
                                <span className="text-xs text-muted-foreground">
                                  {resource.readTime}
                                </span>
                              )}
                            </div>
                            <CardTitle className="text-lg">{resource.title}</CardTitle>
                            <CardDescription className="flex items-center mt-1">
                              By {resource.author} • {resource.date}
                            </CardDescription>
                          </div>
                          <Button variant="ghost" size="icon" onClick={() => handleBookmark(resource.id)}>
                            <BookmarkPlus className="h-5 w-5" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2 flex-grow">
                        <p className="text-sm">{resource.description}</p>
                      </CardContent>
                      <CardFooter className="flex justify-between border-t pt-3">
                        <div className="flex flex-wrap gap-1">
                          {resource.category.map((cat) => (
                            <span 
                              key={cat} 
                              className="text-xs bg-muted px-2 py-1 rounded"
                            >
                              {cat.replace('-', ' ')}
                            </span>
                          ))}
                        </div>
                        <Button onClick={() => handleResourceClick(resource)}>
                          {resource.type === 'article' ? 'Read' : 
                           resource.type === 'video' ? 'Watch' : 
                           resource.type === 'podcast' ? 'Listen' : 
                           'Download'}
                        </Button>
                      </CardFooter>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <div className="text-center py-10">
                <h3 className="text-lg font-medium">No resources found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </div>
        </TabsContent>
        
        {/* The other tab contents would be similar in structure */}
        <TabsContent value="article" className="mt-0">
          {/* Similar structure as "all" tab but filtered for articles */}
          <div className="grid grid-cols-1 gap-4">
            {filteredResources.length > 0 ? (
              filteredResources.map((resource) => (
                <Card key={resource.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  {/* Similar card structure as in "all" tab */}
                </Card>
              ))
            ) : (
              <div className="text-center py-10">
                <h3 className="text-lg font-medium">No articles found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </div>
        </TabsContent>

        {/* Additional tab contents would go here */}
      </Tabs>

      <div className="flex justify-center mt-8">
        <Card className="w-full max-w-md bg-muted/50">
          <CardHeader>
            <CardTitle>Subscribe to Career Resources</CardTitle>
            <CardDescription>
              Get the latest career tips and resources delivered to your inbox weekly
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-2">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Your email address" className="pl-10" />
              </div>
              <Button>Subscribe</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CareerResources;
