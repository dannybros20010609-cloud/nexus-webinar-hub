import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Plus, 
  Search, 
  Filter, 
  Calendar, 
  Clock, 
  Users, 
  MoreHorizontal,
  Play,
  Edit,
  Trash2,
  Copy
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const WebinarsPage = () => {
  const navigate = useNavigate();
  // Mock webinars data
  const webinars = [
    {
      id: 1,
      title: "Future of AI in Business Operations",
      description: "Explore how artificial intelligence is transforming modern business operations and workflows.",
      host: "Dr. Sarah Chen",
      scheduledAt: "2024-01-15T14:00:00Z",
      duration: 60,
      status: "scheduled",
      registrations: 234,
      maxAttendees: 500,
      tags: ["AI", "Business", "Technology"]
    },
    {
      id: 2,
      title: "Building Scalable SaaS Products",
      description: "Learn the fundamentals of creating and scaling successful software-as-a-service applications.",
      host: "Mike Rodriguez",
      scheduledAt: "2024-01-18T15:30:00Z",
      duration: 45,
      status: "scheduled",
      registrations: 189,
      maxAttendees: 300,
      tags: ["SaaS", "Development", "Scaling"]
    },
    {
      id: 3,
      title: "DevOps Best Practices Workshop",
      description: "Hands-on workshop covering modern DevOps practices, CI/CD, and infrastructure automation.",
      host: "Alex Kim",
      scheduledAt: "2024-01-10T16:00:00Z",
      duration: 90,
      status: "completed",
      registrations: 201,
      attendees: 178,
      tags: ["DevOps", "Workshop", "Infrastructure"]
    },
    {
      id: 4,
      title: "Data Privacy & Security in 2024",
      description: "Understanding GDPR, data protection laws, and implementing security best practices.",
      host: "Emma Watson",
      scheduledAt: "2024-01-12T13:00:00Z",
      duration: 75,
      status: "live",
      registrations: 156,
      attendees: 142,
      tags: ["Security", "Privacy", "Compliance"]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live': return 'bg-success text-success-foreground';
      case 'scheduled': return 'bg-warning text-warning-foreground';
      case 'completed': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'live': return 'Live Now';
      case 'scheduled': return 'Scheduled';
      case 'completed': return 'Completed';
      default: return status;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Webinars</h1>
          <p className="text-muted-foreground">Manage and monitor all your webinar sessions</p>
        </div>
        <Button className="gap-2" onClick={() => navigate('/webinars/create')}>
          <Plus className="w-4 h-4" />
          Create Webinar
        </Button>
      </div>

      {/* Filters & Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input 
                placeholder="Search webinars..." 
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="w-4 h-4" />
                Filter
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Calendar className="w-4 h-4" />
                Date Range
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Webinars Grid */}
      <div className="grid gap-6">
        {webinars.map((webinar, index) => (
          <Card key={webinar.id} className="hover:shadow-lg transition-all duration-300 animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Main Info */}
                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <h3 className="text-xl font-semibold text-foreground hover:text-primary transition-colors cursor-pointer">
                          {webinar.title}
                        </h3>
                        <Badge className={getStatusColor(webinar.status)}>
                          {getStatusText(webinar.status)}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground text-sm line-clamp-2">
                        {webinar.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {webinar.host}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(webinar.scheduledAt).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {webinar.duration} min
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {webinar.registrations} registered
                      {webinar.attendees && ` • ${webinar.attendees} attended`}
                    </span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {webinar.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  {webinar.status === 'live' && (
                    <Button 
                      className="gap-2 bg-success hover:bg-success/90"
                      onClick={() => navigate(`/webinars/live/${webinar.id}`)}
                    >
                      <Play className="w-4 h-4" />
                      Join Live
                    </Button>
                  )}
                  {webinar.status === 'scheduled' && (
                    <Button 
                      className="gap-2"
                      onClick={() => navigate(`/webinars/live/${webinar.id}`)}
                    >
                      <Play className="w-4 h-4" />
                      Start Webinar
                    </Button>
                  )}
                  {webinar.status === 'completed' && (
                    <Button variant="outline" className="gap-2">
                      <Play className="w-4 h-4" />
                      View Recording
                    </Button>
                  )}
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem className="gap-2">
                        <Edit className="w-4 h-4" />
                        Edit Webinar
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2">
                        <Copy className="w-4 h-4" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2">
                        <Users className="w-4 h-4" />
                        View Attendees
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2 text-destructive">
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-primary">4</p>
            <p className="text-sm text-muted-foreground">Total Webinars</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-success">1</p>
            <p className="text-sm text-muted-foreground">Live Now</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-warning">2</p>
            <p className="text-sm text-muted-foreground">Scheduled</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-muted-foreground">780</p>
            <p className="text-sm text-muted-foreground">Total Registrations</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WebinarsPage;