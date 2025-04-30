
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { useWebinarDiscussion } from "@/hooks/useWebinarDiscussion";

const WebinarDiscussion = () => {
  const { id } = useParams();
  const { webinar, comments, addComment, isLoading } = useWebinarDiscussion(id);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (webinar) {
      document.title = `${webinar.title} | Discussion | ConnectX`;
    }
  }, [webinar]);

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      addComment({
        id: String(Math.random()),
        webinarId: id,
        author: {
          name: "Current User",
          role: "Student",
          avatar: "",
        },
        content: comment,
        timestamp: new Date().toISOString(),
      });
      setComment("");
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container max-w-5xl mx-auto px-4 py-16 text-center">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded-md w-3/4 mx-auto"></div>
            <div className="h-4 bg-muted rounded-md w-1/2 mx-auto"></div>
            <div className="h-64 bg-muted rounded-lg w-full mx-auto"></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!webinar) {
    return (
      <Layout>
        <div className="container max-w-5xl mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Webinar not found</h1>
          <p className="mb-8">The webinar discussion you're looking for doesn't exist or has been removed.</p>
          <Link to="/recorded-webinars">
            <Button>Back to Webinars</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container max-w-5xl mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Link to={`/recorded-webinars/${id}`}>
                <Button variant="outline" size="sm">Back to webinar</Button>
              </Link>
            </div>
            <h1 className="text-3xl font-bold">Discussion: {webinar.title}</h1>
            <p className="text-muted-foreground">
              Join the conversation about this webinar. Share your thoughts, ask questions, and connect with others.
            </p>
          </div>

          <Separator />

          {/* Comment Form */}
          <div className="rounded-lg border p-4">
            <h2 className="text-lg font-medium mb-4">Add to the discussion</h2>
            <form onSubmit={handleSubmitComment} className="space-y-4">
              <Textarea
                placeholder="Share your thoughts or questions..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="min-h-32"
              />
              <div className="flex justify-end">
                <Button type="submit" className="bg-connectx-primary hover:bg-connectx-secondary">
                  Post Comment
                </Button>
              </div>
            </form>
          </div>

          {/* Comments */}
          <div className="space-y-6">
            <h2 className="text-xl font-medium">{comments.length} Comments</h2>
            {comments.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Be the first to start the discussion!</p>
              </div>
            ) : (
              <div className="space-y-6">
                {comments.map((comment) => (
                  <div key={comment.id} className="rounded-lg border p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <Avatar>
                        <AvatarImage src={comment.author?.avatar} />
                        <AvatarFallback>{comment.author?.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{comment.author?.name}</p>
                        <p className="text-xs text-muted-foreground">{comment.author?.role}</p>
                      </div>
                      <span className="text-xs text-muted-foreground ml-auto">
                        {new Date(comment.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <p>{comment.content}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default WebinarDiscussion;
