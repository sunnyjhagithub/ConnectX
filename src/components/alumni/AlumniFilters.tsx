
import { useState } from "react";
import { School, Calendar, Award, Briefcase, Globe, Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

// Get unique values for each filter from mock data
const collegeOptions = ["All", "Stanford University", "Harvard University", "MIT", "NYU"];
const batchOptions = ["All", "2016", "2017", "2018", "2019", "2020"];
const skillsOptions = ["All", "Leadership", "Product Strategy", "User Research", "Financial Modeling", "Market Research", "Data Analysis", "Scientific Research", "Clinical Trials", "Bioinformatics", "Java", "AWS", "Distributed Systems", "Marketing Strategy", "Brand Development", "Strategy Development", "Problem Solving", "Client Management"];
const companyOptions = ["All", "Google", "Morgan Stanley", "Pfizer", "Amazon", "Apple", "McKinsey"];
const domainOptions = ["All", "Product Development", "Investment Banking", "Pharmaceutical Research", "Software Engineering", "Marketing", "Management Consulting"];
const roleOptions = ["All", "Senior Product Manager", "Investment Analyst", "Research Scientist", "Software Engineer", "Marketing Director", "Management Consultant"];

type AlumniFiltersProps = {
  onFilterChange: (filters: {
    college?: string;
    batch?: string;
    skills?: string;
    company?: string;
    domain?: string;
    role?: string;
  }) => void;
};

const AlumniFilters = ({ onFilterChange }: AlumniFiltersProps) => {
  const [college, setCollege] = useState<string | undefined>();
  const [batch, setBatch] = useState<string | undefined>();
  const [skills, setSkills] = useState<string | undefined>();
  const [company, setCompany] = useState<string | undefined>();
  const [domain, setDomain] = useState<string | undefined>();
  const [role, setRole] = useState<string | undefined>();

  const [collegeOpen, setCollegeOpen] = useState(false);
  const [batchOpen, setBatchOpen] = useState(false);
  const [skillsOpen, setSkillsOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const [domainOpen, setDomainOpen] = useState(false);
  const [roleOpen, setRoleOpen] = useState(false);

  // Handle filter changes
  const handleFilterChange = (
    type: "college" | "batch" | "skills" | "company" | "domain" | "role",
    value: string | undefined
  ) => {
    switch (type) {
      case "college":
        setCollege(value === "All" ? undefined : value);
        break;
      case "batch":
        setBatch(value === "All" ? undefined : value);
        break;
      case "skills":
        setSkills(value === "All" ? undefined : value);
        break;
      case "company":
        setCompany(value === "All" ? undefined : value);
        break;
      case "domain":
        setDomain(value === "All" ? undefined : value);
        break;
      case "role":
        setRole(value === "All" ? undefined : value);
        break;
    }
    
    onFilterChange({
      college: type === "college" ? (value === "All" ? undefined : value) : college,
      batch: type === "batch" ? (value === "All" ? undefined : value) : batch,
      skills: type === "skills" ? (value === "All" ? undefined : value) : skills,
      company: type === "company" ? (value === "All" ? undefined : value) : company,
      domain: type === "domain" ? (value === "All" ? undefined : value) : domain,
      role: type === "role" ? (value === "All" ? undefined : value) : role,
    });
  };

  const createFilterPopover = (
    label: string,
    options: string[],
    value: string | undefined,
    onChange: (value: string) => void,
    open: boolean,
    setOpen: (open: boolean) => void,
    icon: React.ReactNode
  ) => (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium">{label}</label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="justify-between w-full"
          >
            <div className="flex items-center gap-2">
              {icon}
              <span>{value || `Select ${label}`}</span>
            </div>
            <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder={`Search ${label.toLowerCase()}...`} />
            <CommandEmpty>No {label.toLowerCase()} found.</CommandEmpty>
            <CommandGroup>
              <ScrollArea className="h-64">
                {options.map((option) => (
                  <CommandItem
                    key={option}
                    value={option}
                    onSelect={() => {
                      onChange(option);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === option ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {option}
                  </CommandItem>
                ))}
              </ScrollArea>
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );

  return (
    <div className="mb-8 bg-white p-5 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Filter Alumni</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {createFilterPopover(
          "College",
          collegeOptions,
          college,
          (value) => handleFilterChange("college", value),
          collegeOpen,
          setCollegeOpen,
          <School className="h-4 w-4" />
        )}
        
        {createFilterPopover(
          "Batch",
          batchOptions,
          batch,
          (value) => handleFilterChange("batch", value),
          batchOpen,
          setBatchOpen,
          <Calendar className="h-4 w-4" />
        )}
        
        {createFilterPopover(
          "Skills",
          skillsOptions,
          skills,
          (value) => handleFilterChange("skills", value),
          skillsOpen,
          setSkillsOpen,
          <Award className="h-4 w-4" />
        )}
        
        {createFilterPopover(
          "Company",
          companyOptions,
          company,
          (value) => handleFilterChange("company", value),
          companyOpen,
          setCompanyOpen,
          <Briefcase className="h-4 w-4" />
        )}
        
        {createFilterPopover(
          "Domain",
          domainOptions,
          domain,
          (value) => handleFilterChange("domain", value),
          domainOpen,
          setDomainOpen,
          <Globe className="h-4 w-4" />
        )}
        
        {createFilterPopover(
          "Job Title",
          roleOptions,
          role,
          (value) => handleFilterChange("role", value),
          roleOpen,
          setRoleOpen,
          <Briefcase className="h-4 w-4" />
        )}
      </div>
      
      <div className="mt-4 flex justify-end">
        <Button
          variant="outline"
          onClick={() => {
            setCollege(undefined);
            setBatch(undefined);
            setSkills(undefined);
            setCompany(undefined);
            setDomain(undefined);
            setRole(undefined);
            onFilterChange({});
          }}
          className="mr-2"
        >
          Reset Filters
        </Button>
      </div>
    </div>
  );
};

export default AlumniFilters;
