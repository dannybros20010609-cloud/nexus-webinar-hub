import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Users, 
  Video, 
  BarChart3, 
  Plus,
  Clock,
  Eye,
  MessageSquare
} from "lucide-react";

const AdminDashboard = () => {
  // Mock data
  const stats = {
    totalWebinars: 24,
    totalUsers: 1248,
    thisMonthAttendees: 3420,
    avgEngagement: 78
  };

  const recentWebinars = [
    {
      id: 1,
      title: "Future of AI in Business",
      date: "2024-01-15",
      status: "scheduled",
      registrations: 234,
      host: "Dr. Sarah Chen"
    },
    {
      id: 2,
      title: "Building Scalable SaaS",
      date: "2024-01-12",
      status: "completed",
      registrations: 189,
      host: "Mike Rodriguez",
      attendees: 156
    },
    {
      id: 3,
      title: "DevOps Best Practices",
      date: "2024-01-10",
      status: "live",
      registrations: 201,
      host: "Alex Kim",
      attendees: 178
    }
  ];

  const recentUsers = [
    { id: 1, name: "Emma Wilson", email: "emma@company.com", joined: "2024-01-14", webinarsAttended: 3 },
    { id: 2, name: "David Chen", email: "david@startup.io", joined: "2024-01-13", webinarsAttended: 1 },
    { id: 3, name: "Sarah Jones", email: "sarah@tech.co", joined: "2024-01-12", webinarsAttended: 5 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live': return 'bg-success-light text-success';
      case 'scheduled': return 'bg-warning-light text-warning';
      case 'completed': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage webinars, users, and platform analytics</p>
        </div>
        <div className="flex gap-3">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create Webinar
          </Button>
          <Button variant="outline">
            <Users className="w-4 h-4 mr-2" />
            Manage Users
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Webinars</p>
                <p className="text-2xl font-bold text-foreground">{stats.totalWebinars}</p>
              </div>
              <Video className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                <p className="text-2xl font-bold text-foreground">{stats.totalUsers.toLocaleString()}</p>
              </div>
              <Users className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">This Month Attendees</p>
                <p className="text-2xl font-bold text-foreground">{stats.thisMonthAttendees.toLocaleString()}</p>
              </div>
              <Calendar className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Engagement</p>
                <p className="text-2xl font-bold text-foreground">{stats.avgEngagement}%</p>
              </div>
              <BarChart3 className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Webinars */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Recent Webinars
              <Button variant="outline" size="sm">View All</Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentWebinars.map((webinar) => (
                <div key={webinar.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-foreground">{webinar.title}</h4>
                      <Badge className={getStatusColor(webinar.status)}>
                        {webinar.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Hosted by {webinar.host}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(webinar.date).toLocaleDateString()}
                      </span>
                      <span className="flex items-center">
                        <Users className="w-3 h-3 mr-1" />
                        {webinar.registrations} registered
                      </span>
                      {webinar.attendees && (
                        <span className="flex items-center">
                          <Eye className="w-3 h-3 mr-1" />
                          {webinar.attendees} attended
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">Edit</Button>
                    {webinar.status === 'scheduled' && (
                      <Button size="sm">Start</Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Users */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Recent Users
              <Button variant="outline" size="sm">View All</Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-light rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-primary">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{user.name}</h4>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">
                      {user.webinarsAttended} webinars
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Joined {new Date(user.joined).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;