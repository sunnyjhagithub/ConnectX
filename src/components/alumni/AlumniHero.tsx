
import { Search } from "lucide-react";

const AlumniHero = () => {
  return (
    <div className="text-center space-y-6 mb-12">
      <h1 className="text-4xl font-bold tracking-tight">Alumni Directory</h1>
      <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
        Connect with experienced alumni mentors who can guide you on your career journey. 
        Use our AI-powered matching system to find the perfect mentor.
      </p>
      <div className="max-w-md mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by name, industry, or expertise..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-connectx-primary"
          />
        </div>
      </div>
    </div>
  );
};

export default AlumniHero;
