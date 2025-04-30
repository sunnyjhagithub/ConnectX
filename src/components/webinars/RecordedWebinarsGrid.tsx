
import { Link } from "react-router-dom";
import { Play, Clock, Award, Badge as BadgeIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Card,
  CardContent,
  CardHeader,
  CardFooter
} from "@/components/ui/card";

const WebinarCard = ({ webinar }) => {
  return (
    <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-md hover:-translate-y-1">
      <div className="relative aspect-video overflow-hidden bg-muted">
        <img 
          src={webinar.thumbnail || "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"} 
          alt={webinar.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity opacity-0 hover:opacity-100 flex items-center justify-center">
          <Button variant="secondary" size="sm" className="rounded-full">
            <Play className="h-4 w-4 mr-1" /> Play
          </Button>
        </div>
      </div>
      <CardHeader className="p-4 pb-0">
        <div className="flex justify-between items-start">
          <Badge variant="outline" className="bg-connectx-primary/10 hover:bg-connectx-primary/20">
            {webinar.category}
          </Badge>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">{webinar.duration}</span>
          </div>
        </div>
        <Link to={`/recorded-webinars/${webinar.id}`} className="hover:underline">
          <h3 className="font-semibold text-lg mt-2">{webinar.title}</h3>
        </Link>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {webinar.description}
        </p>
        
        <div className="flex items-center gap-2 text-sm">
          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-muted overflow-hidden">
            <img 
              src={webinar.presenter?.avatar} 
              alt={webinar.presenter?.name}
              className="w-full h-full object-cover"
            />
          </div>
          <span>{webinar.presenter?.name}</span>
          {webinar.presenter?.verified && (
            <Award className="h-3.5 w-3.5 text-connectx-primary" />
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 mt-auto">
        <div className="w-full flex flex-col gap-2">
          <Link to={`/recorded-webinars/${webinar.id}`} className="w-full">
            <Button variant="outline" className="w-full">
              Watch Now
            </Button>
          </Link>
          <Link to={`/webinars/${webinar.id}/discussion`} className="w-full">
            <Button variant="ghost" className="w-full text-xs">
              Join Discussion ({webinar.commentCount})
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

const RecordedWebinarsGrid = ({ webinars }) => {
  if (webinars.length === 0) {
    return (
      <div className="text-center py-16">
        <h3 className="text-xl font-medium mb-2">No webinars found</h3>
        <p className="text-muted-foreground">Try adjusting your filters or check back later.</p>
      </div>
    );
  }

  return (
    <div className="py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {webinars.map((webinar) => (
          <WebinarCard key={webinar.id} webinar={webinar} />
        ))}
      </div>
    </div>
  );
};

export default RecordedWebinarsGrid;
