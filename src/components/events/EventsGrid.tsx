
import { Link } from "react-router-dom";
import { Calendar, MapPin, Video } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader 
} from "@/components/ui/card";

const EventCard = ({ event }) => {
  return (
    <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-md hover:-translate-y-1">
      <div className="aspect-video overflow-hidden bg-muted">
        <img 
          src={event.image || "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80"} 
          alt={event.title}
          className="w-full h-full object-cover"
        />
      </div>
      <CardHeader className="p-4 pb-0">
        <div className="flex justify-between items-start">
          <Badge variant="outline" className="bg-connectx-primary/10 hover:bg-connectx-primary/20">
            {event.category}
          </Badge>
          <span className="text-sm text-muted-foreground">
            {event.spotsLeft} spots left
          </span>
        </div>
        <Link to={`/events/${event.id}`} className="hover:underline">
          <h3 className="font-semibold text-lg mt-2">{event.title}</h3>
        </Link>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {event.description}
        </p>
        
        <div className="text-sm space-y-2">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{event.date}, {event.time}</span>
          </div>
          <div className="flex items-center gap-2">
            {event.isVirtual ? (
              <>
                <Video className="h-4 w-4 text-muted-foreground" />
                <span>Virtual Event</span>
              </>
            ) : (
              <>
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{event.location}</span>
              </>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 mt-auto">
        <Link to={`/events/${event.id}`} className="w-full">
          <Button variant="outline" className="w-full">
            {event.isFree ? "Register (Free)" : `Register ($${event.price})`}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

const EventsGrid = ({ events }) => {
  if (events.length === 0) {
    return (
      <div className="text-center py-16">
        <h3 className="text-xl font-medium mb-2">No events found</h3>
        <p className="text-muted-foreground">Try adjusting your filters or check back later.</p>
      </div>
    );
  }

  return (
    <div className="py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default EventsGrid;
