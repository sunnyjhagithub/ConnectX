
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Calendar, MapPin, Users, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { useEvent } from "@/hooks/useEvent";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

const EventDetail = () => {
  const { id } = useParams();
  const { event, relatedEvents, isLoading } = useEvent(id);

  useEffect(() => {
    if (event) {
      document.title = `${event.title} | ConnectX Events`;
    }
  }, [event]);

  if (isLoading) {
    return (
      <Layout>
        <div className="container max-w-5xl mx-auto px-4 py-16 text-center">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded-md w-3/4 mx-auto"></div>
            <div className="h-4 bg-muted rounded-md w-1/2 mx-auto"></div>
            <div className="h-64 bg-muted rounded-lg w-full mx-auto"></div>
            <div className="h-32 bg-muted rounded-md w-full mx-auto"></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!event) {
    return (
      <Layout>
        <div className="container max-w-5xl mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Event not found</h1>
          <p className="mb-8">The event you're looking for doesn't exist or has been removed.</p>
          <Link to="/events">
            <Button>Back to Events</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container max-w-5xl mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Event Header */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className="bg-connectx-primary/10 hover:bg-connectx-primary/20">
                {event.category}
              </Badge>
              <span className="text-muted-foreground text-sm">#{event.id}</span>
            </div>
            
            <h1 className="text-4xl font-bold">{event.title}</h1>
            
            <div className="flex items-center flex-wrap gap-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>{event.date}, {event.time}</span>
              </div>
              
              <div className="flex items-center gap-2 text-muted-foreground">
                {event.isVirtual ? (
                  <>
                    <Video className="h-4 w-4" />
                    <span>Virtual Event</span>
                  </>
                ) : (
                  <>
                    <MapPin className="h-4 w-4" />
                    <span>{event.location}</span>
                  </>
                )}
              </div>
              
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>{event.attendees} attendees</span>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              {/* Event Image */}
              <div className="rounded-lg overflow-hidden aspect-video bg-muted">
                <img
                  src={event.image || "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=1200&q=80"}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Description */}
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">About this event</h2>
                <div className="prose prose-sm max-w-none">
                  <p>{event.description}</p>
                </div>
              </div>
              
              {/* Agenda */}
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Agenda</h2>
                <div className="space-y-3">
                  {event.agenda?.map((item, index) => (
                    <div key={index} className="border-l-2 border-connectx-primary pl-4 py-2">
                      <p className="font-medium">{item.time}</p>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Discussion Link */}
              <div className="pt-4 border-t">
                <Link to={`/events/${event.id}/discussion`}>
                  <Button variant="outline" className="w-full">
                    Join the discussion
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="space-y-6">
              {/* Registration Card */}
              <Card className="overflow-hidden shadow-md">
                <div className="bg-gradient-to-r from-connectx-primary to-connectx-secondary p-4">
                  <h3 className="font-semibold text-white">Reserve your spot</h3>
                </div>
                <CardContent className="p-4">
                  <div className="space-y-4 pt-2">
                    <p className="text-lg">{event.isFree ? "Free event" : `$${event.price}`}</p>
                    <Button className="w-full bg-connectx-primary hover:bg-connectx-secondary">
                      Register Now
                    </Button>
                    <p className="text-xs text-center text-muted-foreground">
                      {event.spotsLeft} spots remaining
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              {/* Host Information */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-4">Hosted by</h3>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={event.host?.avatar} />
                      <AvatarFallback>{event.host?.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{event.host?.name}</p>
                      <p className="text-sm text-muted-foreground">{event.host?.role}</p>
                    </div>
                  </div>
                  <div className="mt-3 text-sm">
                    <p>{event.host?.bio}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EventDetail;
