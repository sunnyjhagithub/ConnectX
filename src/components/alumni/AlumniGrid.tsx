
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Award, Briefcase } from "lucide-react";
import { useMemo } from "react";
import { useAuth } from "@/contexts/AuthContext";

// Expanded mock alumni data with more filter fields
const mockAlumni = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Senior Product Manager",
    company: "Google",
    industry: "Tech",
    expertise: ["Product Management", "UX Design", "Agile"],
    verified: true,
    college: "Stanford University",
    batch: "2018",
    skills: ["Leadership", "Product Strategy", "User Research"],
    domain: "Product Development",
  },
  {
    id: 2,
    name: "Michael Roberts",
    role: "Investment Analyst",
    company: "Morgan Stanley",
    industry: "Finance",
    expertise: ["Investment Banking", "Market Analysis", "Fintech"],
    verified: true,
    college: "Harvard University",
    batch: "2019",
    skills: ["Financial Modeling", "Market Research", "Data Analysis"],
    domain: "Investment Banking",
  },
  {
    id: 3,
    name: "Dr. Emily Watson",
    role: "Research Scientist",
    company: "Pfizer",
    industry: "Healthcare",
    expertise: ["Biotechnology", "Clinical Research", "Data Analysis"],
    verified: true,
    college: "MIT",
    batch: "2017",
    skills: ["Scientific Research", "Clinical Trials", "Bioinformatics"],
    domain: "Pharmaceutical Research",
  },
  {
    id: 4,
    name: "David Kim",
    role: "Software Engineer",
    company: "Amazon",
    industry: "Tech",
    expertise: ["Backend Development", "Cloud Computing", "Algorithms"],
    verified: false,
    college: "Stanford University",
    batch: "2020",
    skills: ["Java", "AWS", "Distributed Systems"],
    domain: "Software Engineering",
  },
  {
    id: 5,
    name: "Lisa Patel",
    role: "Marketing Director",
    company: "Apple",
    industry: "Tech",
    expertise: ["Brand Management", "Digital Marketing", "Market Strategy"],
    verified: true,
    college: "NYU",
    batch: "2016",
    skills: ["Marketing Strategy", "Brand Development", "Market Analysis"],
    domain: "Marketing",
  },
  {
    id: 6,
    name: "James Wilson",
    role: "Management Consultant",
    company: "McKinsey",
    industry: "Consulting",
    expertise: ["Strategy Consulting", "Business Transformation", "Leadership"],
    verified: true,
    college: "Harvard University",
    batch: "2018",
    skills: ["Strategy Development", "Problem Solving", "Client Management"],
    domain: "Management Consulting",
  },
];

type AlumniFilterProps = {
  college?: string;
  batch?: string;
  skills?: string;
  company?: string;
  domain?: string;
  role?: string;
}

const AlumniGrid = ({ college, batch, skills, company, domain, role }: AlumniFilterProps) => {
  const { isAuthenticated, userRole } = useAuth();
  
  const filteredAlumni = useMemo(() => {
    return mockAlumni.filter((alumni) => {
      // Filter by college
      if (college && alumni.college !== college) {
        return false;
      }
      // Filter by batch
      if (batch && alumni.batch !== batch) {
        return false;
      }
      // Filter by skills
      if (skills && !alumni.skills.some(skill => 
        skill.toLowerCase().includes(skills.toLowerCase()))) {
        return false;
      }
      // Filter by company
      if (company && alumni.company !== company) {
        return false;
      }
      // Filter by domain
      if (domain && alumni.domain !== domain) {
        return false;
      }
      // Filter by job title (role)
      if (role && !alumni.role.toLowerCase().includes(role.toLowerCase())) {
        return false;
      }
      return true;
    });
  }, [college, batch, skills, company, domain, role]);

  const renderActionButton = (alumniId: number) => {
    if (!isAuthenticated) {
      return (
        <Link to="/login">
          <Button className="w-full">Login to Connect</Button>
        </Link>
      );
    }

    switch (userRole) {
      case 'student':
        return (
          <Link to={`/mentorship/request/${alumniId}`}>
            <Button className="w-full">Request Mentorship</Button>
          </Link>
        );
      case 'alumni':
        return (
          <Link to={`/alumni/connect/${alumniId}`}>
            <Button className="w-full">Connect</Button>
          </Link>
        );
      case 'admin':
        return (
          <div className="grid grid-cols-2 gap-2">
            <Link to={`/admin/users/${alumniId}`}>
              <Button className="w-full" variant="outline">Edit</Button>
            </Link>
            <Button className="w-full" variant="destructive">Verify</Button>
          </div>
        );
      default:
        return (
          <Link to={`/alumni/view/${alumniId}`}>
            <Button className="w-full">View Profile</Button>
          </Link>
        );
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredAlumni.map((alumni) => (
        <Card key={alumni.id} className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex flex-col space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    {alumni.name}
                    {alumni.verified && (
                      <Award className="h-4 w-4 text-connectx-primary" />
                    )}
                  </h3>
                  <p className="text-sm text-muted-foreground">{alumni.role}</p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Briefcase className="h-4 w-4" />
                    {alumni.company}
                  </p>
                </div>
              </div>
              
              <div className="space-y-2">
                <Badge variant="secondary">{alumni.industry}</Badge>
                <div className="flex flex-wrap gap-1">
                  {alumni.expertise.map((skill) => (
                    <Badge key={skill} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              {renderActionButton(alumni.id)}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AlumniGrid;
