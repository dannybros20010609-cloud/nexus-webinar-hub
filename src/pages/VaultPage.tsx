import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { 
  Search, 
  Filter, 
  Play, 
  Download, 
  BookOpen, 
  Video, 
  FileText,
  Clock,
  Star,
  Grid,
  List,
  Plus
} from "lucide-react";
import { useState } from "react";

const VaultPage = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Mock vault content
  const vaultContent = [
    {
      id: 1,
      title: "AI in Business Operations - Complete Workshop",
      type: "webinar-recording",
      duration: "120 min",
      uploadDate: "2024-01-10",
      downloadCount: 45,
      rating: 4.8,
      tags: ["AI", "Business", "Workshop"],
      progress: 75,
      thumbnail: "/api/placeholder/400/225",
      description: "Complete workshop recording covering AI implementation in business operations."
    },
    {
      id: 2,
      title: "SaaS Development Best Practices Guide",
      type: "pdf",
      pages: 28,
      uploadDate: "2024-01-08",
      downloadCount: 67,
      rating: 4.9,
      tags: ["SaaS", "Development", "Guide"],
      progress: 50,
      thumbnail: "/api/placeholder/400/225",
      description: "Comprehensive guide to building and scaling SaaS products effectively."
    },
    {
      id: 3,
      title: "DevOps Fundamentals Course",
      type: "course",
      duration: "8 hours",
      uploadDate: "2024-01-05",
      downloadCount: 89,
      rating: 4.7,
      tags: ["DevOps", "Course", "Infrastructure"],
      progress: 100,
      thumbnail: "/api/placeholder/400/225",
      description: "Complete course covering DevOps practices, tools, and methodologies."
    },
    {
      id: 4,
      title: "Data Security Implementation Checklist",
      type: "pdf",
      pages: 12,
      uploadDate: "2024-01-03",
      downloadCount: 34,
      rating: 4.6,
      tags: ["Security", "Checklist", "Data"],
      progress: 0,
      thumbnail: "/api/placeholder/400/225",
      description: "Essential security checklist for protecting sensitive data and systems."
    },
    {
      id: 5,
      title: "Leadership in Tech - Expert Panel",
      type: "webinar-recording",
      duration: "90 min",
      uploadDate: "2024-01-01",
      downloadCount: 123,
      rating: 4.9,
      tags: ["Leadership", "Panel", "Management"],
      progress: 100,
      thumbnail: "/api/placeholder/400/225",
      description: "Expert panel discussion on leadership challenges in technology companies."
    },
    {
      id: 6,
      title: "React Performance Optimization",
      type: "course",
      duration: "4 hours",
      uploadDate: "2023-12-28",
      downloadCount: 156,
      rating: 4.8,
      tags: ["React", "Performance", "Development"],
      progress: 25,
      thumbnail: "/api/placeholder/400/225",
      description: "Advanced techniques for optimizing React application performance."
    }
  ];

  const getContentIcon = (type: string) => {
    switch (type) {
      case 'webinar-recording': return <Video className="w-5 h-5" />;
      case 'pdf': return <FileText className="w-5 h-5" />;
      case 'course': return <BookOpen className="w-5 h-5" />;
      default: return <Play className="w-5 h-5" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'webinar-recording': return 'Recording';
      case 'pdf': return 'PDF Guide';
      case 'course': return 'Course';
      default: return type;
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? 'fill-warning text-warning' : 'text-muted-foreground'
            }`}
          />
        ))}
        <span className="text-sm text-muted-foreground ml-1">{rating}</span>
      </div>
    );
  };

  const GridView = () => (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {vaultContent.map((item, index) => (
        <Card key={item.id} className="group hover:shadow-lg transition-all duration-300 animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
          <CardContent className="p-6">
            <div className="space-y-4">
              {/* Type Icon & Badge */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getContentIcon(item.type)}
                  <Badge variant="secondary" className="text-xs">
                    {getTypeLabel(item.type)}
                  </Badge>
                </div>
                {item.progress > 0 && (
                  <Badge variant="outline" className="text-xs">
                    {item.progress}% complete
                  </Badge>
                )}
              </div>

              {/* Title & Description */}
              <div>
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {item.description}
                </p>
              </div>

              {/* Metadata */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {item.duration || `${item.pages} pages`}
                  </span>
                  <span>{item.downloadCount} downloads</span>
                </div>
                
                {renderStars(item.rating)}
                
                {item.progress > 0 && (
                  <div className="space-y-1">
                    <Progress value={item.progress} className="h-2" />
                  </div>
                )}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1">
                {item.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <Button className="flex-1 gap-2">
                  <Play className="w-4 h-4" />
                  {item.progress === 100 ? 'Review' : item.progress > 0 ? 'Continue' : 'Start'}
                </Button>
                <Button variant="outline" size="icon">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const ListView = () => (
    <div className="space-y-4">
      {vaultContent.map((item, index) => (
        <Card key={item.id} className="hover:shadow-md transition-all duration-300 animate-fade-in-up" style={{ animationDelay: `${index * 0.05}s` }}>
          <CardContent className="p-6">
            <div className="flex items-center gap-6">
              {/* Icon & Type */}
              <div className="flex items-center gap-3">
                {getContentIcon(item.type)}
                <div className="space-y-1">
                  <Badge variant="secondary" className="text-xs">
                    {getTypeLabel(item.type)}
                  </Badge>
                  <p className="text-xs text-muted-foreground">
                    {new Date(item.uploadDate).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Content Info */}
              <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground hover:text-primary transition-colors cursor-pointer">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {item.description}
                    </p>
                  </div>
                  {renderStars(item.rating)}
                </div>
                
                {item.progress > 0 && (
                  <div className="max-w-xs">
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                      <span>Progress</span>
                      <span>{item.progress}%</span>
                    </div>
                    <Progress value={item.progress} className="h-2" />
                  </div>
                )}
              </div>

              {/* Metadata */}
              <div className="text-right space-y-1">
                <p className="text-sm text-muted-foreground">
                  {item.duration || `${item.pages} pages`}
                </p>
                <p className="text-xs text-muted-foreground">
                  {item.downloadCount} downloads
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button className="gap-2">
                  <Play className="w-4 h-4" />
                  {item.progress === 100 ? 'Review' : item.progress > 0 ? 'Continue' : 'Start'}
                </Button>
                <Button variant="outline" size="icon">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Content Vault</h1>
          <p className="text-muted-foreground">Access your exclusive webinar recordings, courses, and resources</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => navigate('/vault/upload')}
            className="gap-2"
          >
            <Plus className="w-4 h-4" />
            Upload Content
          </Button>
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="icon"
            onClick={() => setViewMode('grid')}
          >
            <Grid className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="icon"
            onClick={() => setViewMode('list')}
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Search & Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input 
                placeholder="Search content..." 
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="w-4 h-4" />
                Filter by Type
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                Progress
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content */}
      {viewMode === 'grid' ? <GridView /> : <ListView />}

      {/* Stats Summary */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Your Learning Stats</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">6</p>
              <p className="text-sm text-muted-foreground">Total Items</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-success">2</p>
              <p className="text-sm text-muted-foreground">Completed</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-warning">3</p>
              <p className="text-sm text-muted-foreground">In Progress</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-muted-foreground">12h</p>
              <p className="text-sm text-muted-foreground">Total Watch Time</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VaultPage;