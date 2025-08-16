import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Play, 
  Users, 
  Calendar, 
  Zap, 
  Shield, 
  Globe,
  ArrowRight,
  CheckCircle,
  Star,
  Clock
} from "lucide-react";

const Hero = () => {
  const features = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "Global Reach",
      description: "Connect with audiences worldwide through scalable webinar technology"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Enterprise Security",
      description: "Bank-grade security ensures your content and data stay protected"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Real-time Engagement",
      description: "Interactive features keep your audience engaged throughout sessions"
    }
  ];

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
      category: "Technology"
    },
    {
      id: 2,
      title: "Building Scalable SaaS Products",
      host: "Mike Rodriguez",
      date: "2024-01-18",
      time: "3:30 PM EST",
      duration: "45 min",
      registrations: 189,
      category: "Business"
    },
    {
      id: 3,
      title: "Leadership in Remote Teams",
      host: "Emma Watson",
      date: "2024-01-22",
      time: "1:00 PM EST", 
      duration: "90 min",
      registrations: 156,
      category: "Management"
    }
  ];

  const testimonials = [
    {
      name: "Alex Thompson",
      role: "CTO, TechCorp",
      content: "NexusHub transformed how we conduct technical training. The engagement tools are incredible.",
      rating: 5
    },
    {
      name: "Maria Garcia", 
      role: "Marketing Director, StartupXYZ",
      content: "Best webinar platform we've used. The analytics help us understand our audience better.",
      rating: 5
    }
  ];

  const stats = [
    { value: "10K+", label: "Active Users" },
    { value: "500+", label: "Webinars Hosted" },
    { value: "98%", label: "Uptime" },
    { value: "4.9/5", label: "User Rating" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero py-24 lg:py-32">
        <div className="absolute inset-0 bg-black/5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8 animate-fade-in">
            <div className="space-y-4">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                ✨ Welcome to the Future of Virtual Events
              </Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Host Powerful 
                <span className="block gradient-text bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  Webinar Experiences
                </span>
              </h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                Connect, engage, and inspire your audience with our comprehensive webinar platform. 
                From intimate workshops to large-scale conferences, we've got you covered.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 gap-2 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all">
                <Play className="w-5 h-5" />
                Start Free Trial
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 gap-2 px-8 py-4 text-lg">
                Watch Demo
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 pt-12 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl lg:text-4xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-white/80 text-sm lg:text-base">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16 animate-fade-in">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              Everything You Need for Success
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Powerful features designed to help you create, manage, and optimize your webinar experience
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center p-8 hover:shadow-lg transition-all duration-300 border-0 bg-gradient-card animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="space-y-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Webinars */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16 animate-fade-in">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              Upcoming Webinars
            </h2>
            <p className="text-xl text-muted-foreground">
              Join industry experts in live sessions designed to accelerate your growth
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {upcomingWebinars.map((webinar, index) => (
              <Card key={webinar.id} className="hover:shadow-lg transition-all duration-300 animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                      {webinar.category}
                    </Badge>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Users className="w-4 h-4" />
                      {webinar.registrations} registered
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-foreground line-clamp-2">
                    {webinar.title}
                  </h3>
                  
                  <p className="text-muted-foreground">
                    Hosted by {webinar.host}
                  </p>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(webinar.date).toLocaleDateString()}
                    </span>
                    <span>{webinar.time}</span>
                  </div>
                  
                  <Button className="w-full gap-2 mt-4">
                    Register Now
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16 animate-fade-in">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              Trusted by Industry Leaders
            </h2>
            <p className="text-xl text-muted-foreground">
              See what our community has to say about their experience
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-8 hover:shadow-lg transition-all duration-300 animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-warning text-warning" />
                    ))}
                  </div>
                  
                  <blockquote className="text-lg text-foreground leading-relaxed">
                    "{testimonial.content}"
                  </blockquote>
                  
                  <div className="flex items-center gap-3 pt-4 border-t">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-primary font-semibold">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 animate-fade-in">
          <h2 className="text-3xl lg:text-4xl font-bold">
            Ready to Transform Your Events?
          </h2>
          <p className="text-xl opacity-90 leading-relaxed">
            Join thousands of organizations who trust NexusHub to deliver exceptional webinar experiences.
            Start your free trial today and see the difference.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="gap-2 px-8 py-4 text-lg font-semibold">
              <CheckCircle className="w-5 h-5" />
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 gap-2 px-8 py-4 text-lg">
              Contact Sales
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;