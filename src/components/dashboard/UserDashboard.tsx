import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Calendar, 
  Clock, 
  Users, 
  Video, 
  BookOpen, 
  PlayCircle,
  CheckCircle,
  Star
} from "lucide-react";

const UserDashboard = () => {
  // Mock user data
  const userStats = {
    webinarsAttended: 12,
    totalWatchTime: 720, // minutes
    vaultItemsViewed: 8,
    currentStreak: 3
  };

  const upcomingWebinars = [
    {
      id: 1,
      title: "Future of AI in Business",
      host: "Dr. Sarah Chen",
      date: "2024-01-15",
      time: "2:00 PM EST",
      registered: true
    },
    {
      id: 2,
      title: "Building Scalable SaaS Products",
      host: "Mike Rodriguez", 
      date: "2024-01-18",
      time: "3:30 PM EST",
      registered: false
    }
  ];

  const recentVaultContent = [
    {
      id: 1,
      title: "DevOps Fundamentals",
      type: "webinar-recording",
      duration: "45 min",
      watchProgress: 75,
      thumbnail: "/api/placeholder/300/200"
    },
    {
      id: 2,
      title: "React Best Practices Guide",
      type: "pdf",
      pages: 24,
      readProgress: 50,
      thumbnail: "/api/placeholder/300/200"
    },
    {
      id: 3,
      title: "Leadership in Tech",
      type: "webinar-recording",
      duration: "60 min",
      watchProgress: 100,
      thumbnail: "/api/placeholder/300/200"
    }
  ];

  const achievements = [
    { id: 1, title: "First Webinar", description: "Attended your first webinar", completed: true },
    { id: 2, title: "Knowledge Seeker", description: "Viewed 5 vault items", completed: true },
    { id: 3, title: "Regular Attendee", description: "Attend 10 webinars", completed: true },
    { id: 4, title: "Expert Learner", description: "Complete 20 vault items", completed: false }
  ];

  const getContentIcon = (type: string) => {
    switch (type) {
      case 'webinar-recording': return <Video className="w-4 h-4" />;
      case 'pdf': return <BookOpen className="w-4 h-4" />;
      default: return <PlayCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Welcome Back!</h1>
          <p className="text-muted-foreground">Continue your learning journey</p>
        </div>
        <Button>
          <Calendar className="w-4 h-4 mr-2" />
          Browse Webinars
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">{userStats.webinarsAttended}</p>
              <p className="text-sm text-muted-foreground">Webinars Attended</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">{Math.floor(userStats.totalWatchTime / 60)}h</p>
              <p className="text-sm text-muted-foreground">Watch Time</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">{userStats.vaultItemsViewed}</p>
              <p className="text-sm text-muted-foreground">Vault Items</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">{userStats.currentStreak}</p>
              <p className="text-sm text-muted-foreground">Day Streak</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Upcoming Webinars */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Upcoming Webinars
              <Button variant="outline" size="sm">View All</Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingWebinars.map((webinar) => (
                <div key={webinar.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-foreground">{webinar.title}</h4>
                      {webinar.registered && (
                        <Badge variant="secondary" className="bg-success-light text-success">
                          Registered
                        </Badge>
                      )}
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
                        <Clock className="w-3 h-3 mr-1" />
                        {webinar.time}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {webinar.registered ? (
                      <Button size="sm">Join</Button>
                    ) : (
                      <Button size="sm" variant="outline">Register</Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle>Achievements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {achievements.map((achievement) => (
                <div key={achievement.id} className="flex items-start gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    achievement.completed ? 'bg-success text-success-foreground' : 'bg-muted'
                  }`}>
                    {achievement.completed ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <Star className="w-4 h-4" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{achievement.title}</p>
                    <p className="text-xs text-muted-foreground">{achievement.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content Vault */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Continue Learning
            <Button variant="outline" size="sm">Browse Vault</Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentVaultContent.map((item) => (
              <div key={item.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-2">
                  {getContentIcon(item.type)}
                  <h4 className="font-medium text-foreground text-sm">{item.title}</h4>
                </div>
                
                <div className="mb-3">
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>Progress</span>
                    <span>{item.watchProgress || item.readProgress}%</span>
                  </div>
                  <Progress 
                    value={item.watchProgress || item.readProgress} 
                    className="h-2"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {item.duration || `${item.pages} pages`}
                  </span>
                  <Button size="sm" variant="outline">
                    {(item.watchProgress || item.readProgress) === 100 ? 'Review' : 'Continue'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserDashboard;