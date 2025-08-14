import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Video, 
  Clock, 
  MessageSquare 
} from "lucide-react";

const AnalyticsPage = () => {
  // Mock data for charts
  const attendanceData = [
    { month: 'Jan', webinars: 12, attendees: 1240, avgDuration: 45 },
    { month: 'Feb', webinars: 15, attendees: 1580, avgDuration: 48 },
    { month: 'Mar', webinars: 18, attendees: 1920, avgDuration: 52 },
    { month: 'Apr', webinars: 22, attendees: 2150, avgDuration: 49 },
    { month: 'May', webinars: 19, attendees: 1850, avgDuration: 51 },
    { month: 'Jun', webinars: 25, attendees: 2400, avgDuration: 55 }
  ];

  const engagementData = [
    { day: 'Mon', chatMessages: 156, handRaises: 23, qaQuestions: 12 },
    { day: 'Tue', chatMessages: 189, handRaises: 31, qaQuestions: 18 },
    { day: 'Wed', chatMessages: 167, handRaises: 28, qaQuestions: 15 },
    { day: 'Thu', chatMessages: 203, handRaises: 35, qaQuestions: 22 },
    { day: 'Fri', chatMessages: 178, handRaises: 29, qaQuestions: 16 },
    { day: 'Sat', chatMessages: 134, handRaises: 19, qaQuestions: 9 },
    { day: 'Sun', chatMessages: 98, handRaises: 14, qaQuestions: 7 }
  ];

  const categoryData = [
    { name: 'Technology', value: 35, color: '#3B82F6' },
    { name: 'Business', value: 28, color: '#8B5CF6' },
    { name: 'Marketing', value: 20, color: '#10B981' },
    { name: 'Design', value: 17, color: '#F59E0B' }
  ];

  const topWebinars = [
    {
      title: "AI in Business Operations",
      attendees: 234,
      rating: 4.8,
      engagement: 92,
      date: "2024-01-15"
    },
    {
      title: "Building Scalable SaaS",
      attendees: 189,
      rating: 4.6,
      engagement: 87,
      date: "2024-01-18"
    },
    {
      title: "DevOps Best Practices",
      attendees: 178,
      rating: 4.9,
      engagement: 94,
      date: "2024-01-10"
    },
    {
      title: "Data Security Workshop",
      attendees: 142,
      rating: 4.7,
      engagement: 89,
      date: "2024-01-12"
    }
  ];

  const kpiCards = [
    {
      title: "Total Attendees",
      value: "12,847",
      change: "+15.3%",
      trend: "up",
      icon: Users,
      color: "text-primary"
    },
    {
      title: "Avg Watch Time",
      value: "51 min",
      change: "+8.2%",
      trend: "up",
      icon: Clock,
      color: "text-success"
    },
    {
      title: "Engagement Rate",
      value: "89.4%",
      change: "-2.1%",
      trend: "down",
      icon: MessageSquare,
      color: "text-warning"
    },
    {
      title: "Webinars Hosted",
      value: "111",
      change: "+23.1%",
      trend: "up",
      icon: Video,
      color: "text-secondary"
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>
        <p className="text-muted-foreground">Comprehensive insights into your webinar performance</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiCards.map((kpi, index) => (
          <Card key={kpi.title} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">{kpi.title}</p>
                  <p className="text-2xl font-bold text-foreground">{kpi.value}</p>
                  <div className="flex items-center gap-1 text-sm">
                    {kpi.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4 text-success" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-destructive" />
                    )}
                    <span className={kpi.trend === 'up' ? 'text-success' : 'text-destructive'}>
                      {kpi.change}
                    </span>
                    <span className="text-muted-foreground">vs last month</span>
                  </div>
                </div>
                <kpi.icon className={`w-8 h-8 ${kpi.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Attendance Trends */}
        <Card className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <CardHeader>
            <CardTitle>Attendance Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="attendees" 
                  stroke="#3B82F6" 
                  fill="#3B82F6" 
                  fillOpacity={0.1}
                  name="Total Attendees"
                />
                <Area 
                  type="monotone" 
                  dataKey="webinars" 
                  stroke="#8B5CF6" 
                  fill="#8B5CF6" 
                  fillOpacity={0.1}
                  name="Webinars Hosted"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card className="animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          <CardHeader>
            <CardTitle>Content Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Engagement Metrics */}
        <Card className="lg:col-span-2 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <CardHeader>
            <CardTitle>Weekly Engagement</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="chatMessages" fill="#3B82F6" name="Chat Messages" />
                <Bar dataKey="handRaises" fill="#10B981" name="Hand Raises" />
                <Bar dataKey="qaQuestions" fill="#F59E0B" name="Q&A Questions" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Performing Webinars */}
        <Card className="animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
          <CardHeader>
            <CardTitle>Top Webinars</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topWebinars.map((webinar, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium text-sm line-clamp-2">{webinar.title}</h4>
                    <Badge variant="secondary" className="text-xs ml-2">
                      {webinar.rating}★
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{webinar.attendees} attendees</span>
                      <span>{webinar.engagement}% engagement</span>
                    </div>
                    <Progress value={webinar.engagement} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Average Watch Time Trend */}
      <Card className="animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
        <CardHeader>
          <CardTitle>Average Watch Time Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="avgDuration" 
                stroke="#8B5CF6" 
                strokeWidth={3}
                dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 6 }}
                name="Avg Duration (minutes)"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsPage;