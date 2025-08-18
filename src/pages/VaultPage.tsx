import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
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
  Plus,
  SortAsc,
  SortDesc,
  Bookmark,
  Share2,
  MoreHorizontal,
  Eye,
  Calendar,
  TrendingUp,
  Users
} from "lucide-react";
import { useState, useMemo } from "react";

interface VaultItem {
  id: number;
  title: string;
  type: string;
  category: string;
  duration?: string;
  pages?: number;
  uploadDate: string;
  downloadCount: number;
  rating: number;
  tags: string[];
  progress: number;
  thumbnail: string;
  description: string;
  instructor: string;
  level: string;
  views: number;
  lastViewed: string | null;
  bookmarked: boolean;
}

const VaultPage = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'recent' | 'popular' | 'title' | 'rating'>('recent');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [progressFilter, setProgressFilter] = useState<'all' | 'not-started' | 'in-progress' | 'completed'>('all');

  // Mock vault content with enhanced data
  const vaultContent: VaultItem[] = [
    {
      id: 1,
      title: "AI in Business Operations - Complete Workshop",
      type: "webinar-recording",
      category: "Technology",
      duration: "120 min",
      uploadDate: "2024-01-10",
      downloadCount: 45,
      rating: 4.8,
      tags: ["AI", "Business", "Workshop"],
      progress: 75,
      thumbnail: "/api/placeholder/400/225",
      description: "Complete workshop recording covering AI implementation in business operations.",
      instructor: "Dr. Sarah Chen",
      level: "Advanced",
      views: 234,
      lastViewed: "2024-01-15",
      bookmarked: true
    },
    {
      id: 2,
      title: "SaaS Development Best Practices Guide",
      type: "pdf",
      category: "Development",
      pages: 28,
      uploadDate: "2024-01-08",
      downloadCount: 67,
      rating: 4.9,
      tags: ["SaaS", "Development", "Guide"],
      progress: 50,
      thumbnail: "/api/placeholder/400/225",
      description: "Comprehensive guide to building and scaling SaaS products effectively.",
      instructor: "Michael Torres",
      level: "Intermediate",
      views: 156,
      lastViewed: "2024-01-12",
      bookmarked: false
    },
    {
      id: 3,
      title: "DevOps Fundamentals Course",
      type: "course",
      category: "Infrastructure",
      duration: "8 hours",
      uploadDate: "2024-01-05",
      downloadCount: 89,
      rating: 4.7,
      tags: ["DevOps", "Course", "Infrastructure"],
      progress: 100,
      thumbnail: "/api/placeholder/400/225",
      description: "Complete course covering DevOps practices, tools, and methodologies.",
      instructor: "Alex Rodriguez",
      level: "Beginner",
      views: 342,
      lastViewed: "2024-01-10",
      bookmarked: true
    },
    {
      id: 4,
      title: "Data Security Implementation Checklist",
      type: "pdf",
      category: "Security",
      pages: 12,
      uploadDate: "2024-01-03",
      downloadCount: 34,
      rating: 4.6,
      tags: ["Security", "Checklist", "Data"],
      progress: 0,
      thumbnail: "/api/placeholder/400/225",
      description: "Essential security checklist for protecting sensitive data and systems.",
      instructor: "Emma Watson",
      level: "Intermediate",
      views: 89,
      lastViewed: null,
      bookmarked: false
    },
    {
      id: 5,
      title: "Leadership in Tech - Expert Panel",
      type: "webinar-recording",
      category: "Business",
      duration: "90 min",
      uploadDate: "2024-01-01",
      downloadCount: 123,
      rating: 4.9,
      tags: ["Leadership", "Panel", "Management"],
      progress: 100,
      thumbnail: "/api/placeholder/400/225",
      description: "Expert panel discussion on leadership challenges in technology companies.",
      instructor: "Various Experts",
      level: "Advanced",
      views: 445,
      lastViewed: "2024-01-14",
      bookmarked: true
    },
    {
      id: 6,
      title: "React Performance Optimization",
      type: "course",
      category: "Development",
      duration: "4 hours",
      uploadDate: "2023-12-28",
      downloadCount: 156,
      rating: 4.8,
      tags: ["React", "Performance", "Development"],
      progress: 25,
      thumbnail: "/api/placeholder/400/225",
      description: "Advanced techniques for optimizing React application performance.",
      instructor: "David Kim",
      level: "Advanced",
      views: 278,
      lastViewed: "2024-01-13",
      bookmarked: false
    }
  ];

  // Categories for filtering
  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'Technology', label: 'Technology' },
    { value: 'Development', label: 'Development' },
    { value: 'Business', label: 'Business' },
    { value: 'Infrastructure', label: 'Infrastructure' },
    { value: 'Security', label: 'Security' }
  ];

  // Filter and sort content
  const filteredAndSortedContent = useMemo(() => {
    let filtered = vaultContent.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
                           item.instructor.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      
      const matchesProgress = progressFilter === 'all' ||
                             (progressFilter === 'not-started' && item.progress === 0) ||
                             (progressFilter === 'in-progress' && item.progress > 0 && item.progress < 100) ||
                             (progressFilter === 'completed' && item.progress === 100);
      
      return matchesSearch && matchesCategory && matchesProgress;
    });

    // Sort content
    filtered.sort((a, b) => {
      let aValue: any, bValue: any;
      
      switch (sortBy) {
        case 'recent':
          aValue = new Date(a.uploadDate);
          bValue = new Date(b.uploadDate);
          break;
        case 'popular':
          aValue = a.views;
          bValue = b.views;
          break;
        case 'title':
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
          break;
        case 'rating':
          aValue = a.rating;
          bValue = b.rating;
          break;
        default:
          return 0;
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [vaultContent, searchQuery, selectedCategory, sortBy, sortOrder, progressFilter]);

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
      {filteredAndSortedContent.map((item, index) => (
        <Card key={item.id} className="group hover:shadow-lg transition-all duration-300 animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
          <CardContent className="p-6">
            <div className="space-y-4">
              {/* Header with bookmark and more options */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getContentIcon(item.type)}
                  <Badge variant="secondary" className="text-xs">
                    {getTypeLabel(item.type)}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {item.level}
                  </Badge>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Bookmark className={`w-4 h-4 ${item.bookmarked ? 'fill-current text-primary' : ''}`} />
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{item.title}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium">Instructor:</span>
                            <p className="text-muted-foreground">{item.instructor}</p>
                          </div>
                          <div>
                            <span className="font-medium">Level:</span>
                            <p className="text-muted-foreground">{item.level}</p>
                          </div>
                          <div>
                            <span className="font-medium">Views:</span>
                            <p className="text-muted-foreground">{item.views}</p>
                          </div>
                          <div>
                            <span className="font-medium">Category:</span>
                            <p className="text-muted-foreground">{item.category}</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button className="flex-1 gap-2">
                            <Play className="w-4 h-4" />
                            {item.progress === 100 ? 'Review' : item.progress > 0 ? 'Continue' : 'Start'}
                          </Button>
                          <Button variant="outline" className="gap-2">
                            <Share2 className="w-4 h-4" />
                            Share
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              {/* Title & Instructor */}
              <div>
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-muted-foreground">by {item.instructor}</p>
              </div>

              {/* Metadata row */}
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {item.duration || `${item.pages} pages`}
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  {item.views}
                </span>
              </div>
              
              {/* Rating */}
              {renderStars(item.rating)}
              
              {/* Progress */}
              {item.progress > 0 && (
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{item.progress}%</span>
                  </div>
                  <Progress value={item.progress} className="h-2" />
                </div>
              )}

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
      {filteredAndSortedContent.map((item, index) => (
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

      {/* Enhanced Search & Filters */}
      <Card>
        <CardContent className="p-6">
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="bookmarked">Bookmarked</TabsTrigger>
              <TabsTrigger value="in-progress">In Progress</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Search Bar */}
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input 
                    placeholder="Search content, tags, or instructors..." 
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                {/* Filters */}
                <div className="flex flex-wrap gap-2">
                  <Select value={selectedCategory} onValueChange={(value: string) => setSelectedCategory(value)}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Select value={progressFilter} onValueChange={(value: string) => setProgressFilter(value as any)}>
                    <SelectTrigger className="w-[130px]">
                      <SelectValue placeholder="Progress" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Progress</SelectItem>
                      <SelectItem value="not-started">Not Started</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={sortBy} onValueChange={(value: string) => setSortBy(value as any)}>
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recent">Recent</SelectItem>
                      <SelectItem value="popular">Popular</SelectItem>
                      <SelectItem value="title">Title</SelectItem>
                      <SelectItem value="rating">Rating</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  >
                    {sortOrder === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
              
              {/* Results count */}
              <div className="flex justify-between items-center text-sm text-muted-foreground">
                <span>
                  {filteredAndSortedContent.length} of {vaultContent.length} items
                  {searchQuery && ` matching "${searchQuery}"`}
                </span>
                <span>
                  {selectedCategory !== 'all' && `in ${selectedCategory}`}
                </span>
              </div>
            </TabsContent>
            
            {/* Quick filter tabs content */}
            <TabsContent value="bookmarked">
              <p className="text-sm text-muted-foreground">Showing only bookmarked content</p>
            </TabsContent>
            <TabsContent value="in-progress">
              <p className="text-sm text-muted-foreground">Showing content you've started</p>
            </TabsContent>
            <TabsContent value="completed">
              <p className="text-sm text-muted-foreground">Showing completed content</p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Content */}
      {viewMode === 'grid' ? <GridView /> : <ListView />}

      {/* Enhanced Stats Dashboard */}
      <div className="grid lg:grid-cols-3 gap-6 mt-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Learning Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">{vaultContent.length}</p>
                <p className="text-sm text-muted-foreground">Total Items</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-success">
                  {vaultContent.filter(item => item.progress === 100).length}
                </p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-warning">
                  {vaultContent.filter(item => item.progress > 0 && item.progress < 100).length}
                </p>
                <p className="text-sm text-muted-foreground">In Progress</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-secondary">24h</p>
                <p className="text-sm text-muted-foreground">Watch Time</p>
              </div>
            </div>
            
            {/* Category breakdown */}
            <div className="mt-6 pt-6 border-t">
              <h4 className="font-medium mb-4">Content by Category</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {categories.slice(1).map((category) => {
                  const count = vaultContent.filter(item => item.category === category.value).length;
                  return (
                    <div key={category.value} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <span className="text-sm font-medium">{category.label}</span>
                      <Badge variant="secondary">{count}</Badge>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {vaultContent
              .filter(item => item.lastViewed)
              .sort((a, b) => new Date(b.lastViewed!).getTime() - new Date(a.lastViewed!).getTime())
              .slice(0, 4)
              .map((item) => (
                <div key={item.id} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-2">
                    {getContentIcon(item.type)}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium line-clamp-1">{item.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(item.lastViewed!).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">{item.progress}%</p>
                    <Progress value={item.progress} className="h-1 w-12" />
                  </div>
                </div>
              ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VaultPage;