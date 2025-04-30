
import { Button } from "@/components/ui/button";

const WebinarsHero = () => {
  return (
    <div className="py-10 md:py-16 text-center space-y-6 animate-fade-in">
      <h1 className="text-4xl md:text-5xl font-bold">
        Learn at Your Own Pace
      </h1>
      <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
        Explore our library of recorded webinars and sessions from industry experts, alumni, and faculty.
        Watch anytime, anywhere, and join the post-webinar discussions.
      </p>
      <div className="mt-4">
        <Button size="lg" className="bg-connectx-primary hover:bg-connectx-secondary">
          Browse All Webinars
        </Button>
      </div>
    </div>
  );
};

export default WebinarsHero;
