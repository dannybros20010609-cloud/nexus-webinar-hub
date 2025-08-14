import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users, Play } from "lucide-react";

const Hero = () => {
  // Mock upcoming webinars
  const upcomingWebinars = [
    {
      id: 1,
      title: "Future of AI in Business",
      host: "Dr. Sarah Chen",
      date: "2024-01-15",
      time: "2:00 PM EST",
      duration: "60 min",
      registrations: 234,
      thumbnail: "/api/placeholder/400/225"
    },
    {
      id: 2,
      title: "Building Scalable SaaS Products",
      host: "Mike Rodriguez",
      date: "2024-01-18",
      time: "3:30 PM EST",
      duration: "45 min",
      registrations: 189,
      thumbnail: "/api/placeholder/400/225"
    }
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Hero Background */}
      <div className="bg-gradient-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
              Professional Webinars & 
              <span className="block bg-gradient-to-r from-primary-foreground to-primary-foreground/80 bg-clip-text">
                Knowledge Sharing
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 mb-10 max-w-4xl mx-auto leading-relaxed">
              Join industry experts, expand your knowledge, and connect with professionals 
              in live interactive webinars and exclusive content.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <Button size="lg" variant="secondary" className="text-lg px-8 py-4 hover:scale-105 transition-transform">
                Browse Webinars
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 text-lg px-8 py-4 hover:scale-105 transition-transform">
                View Free Preview
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Webinars Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Upcoming Webinars</h2>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
            Don't miss these exclusive sessions with industry leaders
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {upcomingWebinars.map((webinar, index) => (
            <Card 
              key={webinar.id} 
              className="bg-gradient-card border shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 animate-fade-in-up group"
              style={{ animationDelay: `${0.7 + index * 0.2}s` }}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <Badge variant="secondary" className="bg-warning-light text-warning">
                    Upcoming
                  </Badge>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="w-4 h-4 mr-1" />
                    {webinar.registrations} registered
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {webinar.title}
                </h3>
                
                <p className="text-muted-foreground mb-4">
                  Hosted by {webinar.host}
                </p>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(webinar.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {webinar.time}
                  </div>
                  <div className="flex items-center">
                    <Play className="w-4 h-4 mr-1" />
                    {webinar.duration}
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Button className="flex-1">
                    Register Now
                  </Button>
                  <Button variant="outline">
                    Preview
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="bg-gradient-card p-8">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Ready to Join Our Community?
            </h3>
            <p className="text-muted-foreground mb-6">
              Get access to all webinars, exclusive content vault, and connect with industry professionals.
            </p>
            <Button size="lg">
              Start Free Trial
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Hero;