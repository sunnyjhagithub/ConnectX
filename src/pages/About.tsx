
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Users, Info } from "lucide-react";

const About = () => {
  return (
    <Layout>
      <div className="container max-w-7xl mx-auto px-4 py-12">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-gray-900">About ConnectX</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Bridging the gap between education and career success through mentorship, 
              knowledge sharing, and community engagement.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <Card className="transition-all hover:shadow-lg">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <div className="mx-auto bg-connectx-primary/10 w-12 h-12 flex items-center justify-center rounded-full">
                    <BookOpen className="text-connectx-primary w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold">Our Mission</h3>
                  <p className="text-gray-600">
                    To empower students and alumni through continuous learning, 
                    meaningful connections, and career development opportunities.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="transition-all hover:shadow-lg">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <div className="mx-auto bg-connectx-primary/10 w-12 h-12 flex items-center justify-center rounded-full">
                    <Users className="text-connectx-primary w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold">Community First</h3>
                  <p className="text-gray-600">
                    Building a vibrant community where knowledge sharing and 
                    mentorship create lasting professional relationships.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="transition-all hover:shadow-lg">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <div className="mx-auto bg-connectx-primary/10 w-12 h-12 flex items-center justify-center rounded-full">
                    <Info className="text-connectx-primary w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold">Our Impact</h3>
                  <p className="text-gray-600">
                    Facilitating career growth through expert-led events, 
                    personalized guidance, and cutting-edge resources.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-16 text-center">
            <h2 className="text-3xl font-bold mb-8">Join Our Community</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Whether you're a student seeking guidance, an alumnus wanting to give back, 
              or a faculty member looking to share expertise, ConnectX is your platform 
              for professional growth and meaningful connections.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
