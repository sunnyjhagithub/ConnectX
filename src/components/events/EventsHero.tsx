
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const EventsHero = () => {
  return (
    <div className="py-10 md:py-16 text-center space-y-6 animate-fade-in">
      <h1 className="text-4xl md:text-5xl font-bold">
        Connect, Learn, and Grow Together
      </h1>
      <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
        Join live events and webinars hosted by experts from our community. 
        Network with peers, gain insights, and expand your knowledge.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-4">
        <Button size="lg" className="bg-connectx-primary hover:bg-connectx-secondary">
          <Link to="/events" className="flex items-center">
            Browse All Events
          </Link>
        </Button>
        <Button size="lg" variant="outline">
          <Link to="/recorded-webinars" className="flex items-center">
            Recorded Webinars
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default EventsHero;
