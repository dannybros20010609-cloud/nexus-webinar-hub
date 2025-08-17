import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Play, 
  Users, 
  Calendar,
  Video,
  BarChart3,
  Zap, 
  Shield, 
  Globe,
  ArrowRight,
  CheckCircle,
  Star,
  Clock
} from "lucide-react";
import FeatureCard from "./FeatureCard";

const Hero = () => {
  const [isHovered, setIsHovered] = useState(false);

  const features = [
    {
      icon: Video,
      title: "HD Video Streaming",
      description: "Crystal clear video quality with adaptive streaming for audiences of any size"
    },
    {
      icon: Users,
      title: "Interactive Engagement", 
      description: "Built-in chat, polls, Q&A, and breakout rooms to keep your audience engaged"
    },
    {
      icon: Calendar,
      title: "Smart Scheduling",
      description: "Automated reminders and timezone detection ensure perfect attendance"
    },
    {
      icon: BarChart3,
      title: "Detailed Analytics",
      description: "Track attendance, engagement metrics, and gather actionable insights"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "End-to-end encryption and enterprise-grade security for your peace of mind"
    },
    {
      icon: Zap,
      title: "One-Click Recording",
      description: "Automatically record sessions and share them instantly with your audience"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Hero Section */}
      <div className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-black/5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8 animate-fade-in">
            <div className="space-y-4">
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
              <div 
                className="relative inline-block cursor-pointer"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <Button 
                  size="lg" 
                  className={`px-8 py-6 text-lg font-semibold transition-all duration-300 ${
                    isHovered ? 'shadow-glow scale-105' : ''
                  }`}
                >
                  Start Your First Webinar
                </Button>
                {isHovered && (
                  <div className="absolute inset-0 bg-gradient-primary opacity-20 rounded-lg animate-pulse" />
                )}
              </div>
              <Button variant="outline" size="lg" className="px-8 py-6 text-lg border-primary/20 hover:border-primary/40 transition-all duration-300">
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-primary/10">
              <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
                <div className="text-2xl font-bold text-primary">10,000+</div>
                <div className="text-sm text-muted-foreground">Webinars Hosted</div>
              </div>
              <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.9s' }}>
                <div className="text-2xl font-bold text-primary">500K+</div>
                <div className="text-sm text-muted-foreground">Attendees</div>
              </div>
              <div className="text-center animate-fade-in-up" style={{ animationDelay: '1s' }}>
                <div className="text-2xl font-bold text-primary">98%</div>
                <div className="text-sm text-muted-foreground">Uptime</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Everything You Need for Professional Webinars
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From scheduling to analytics, NexusHub provides a complete platform for hosting engaging webinars
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={Video}
            title="HD Video Streaming"
            description="Crystal clear video quality with adaptive streaming for audiences of any size"
            delay="0.3s"
          />
          <FeatureCard
            icon={Users}
            title="Interactive Engagement"
            description="Built-in chat, polls, Q&A, and breakout rooms to keep your audience engaged"
            delay="0.4s"
          />
          <FeatureCard
            icon={Calendar}
            title="Smart Scheduling"
            description="Automated reminders and timezone detection ensure perfect attendance"
            delay="0.5s"
          />
          <FeatureCard
            icon={BarChart3}
            title="Detailed Analytics"
            description="Track attendance, engagement metrics, and gather actionable insights"
            delay="0.6s"
          />
          <FeatureCard
            icon={Shield}
            title="Enterprise Security"
            description="End-to-end encryption and enterprise-grade security for your peace of mind"
            delay="0.7s"
          />
          <FeatureCard
            icon={Zap}
            title="One-Click Recording"
            description="Automatically record sessions and share them instantly with your audience"
            delay="0.8s"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;