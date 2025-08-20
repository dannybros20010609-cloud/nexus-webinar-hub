import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  Users, 
  MessageSquare,
  Share2,
  Settings,
  Hand,
  PhoneOff,
  Monitor,
  MonitorOff,
  Camera,
  Send,
  MoreVertical,
  Volume2,
  VolumeX,
  Maximize,
  Minimize
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const RunningWebinar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [handRaised, setHandRaised] = useState(false);
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Mock webinar data
  const webinar = {
    id: id,
    title: "Future of AI in Business Operations",
    host: "Dr. Sarah Chen",
    startTime: "2024-01-15T14:00:00Z",
    participants: 142,
    maxAttendees: 500,
    status: "live"
  };

  // Mock chat messages
  const [chatMessages, setChatMessages] = useState([
    { id: 1, user: "John Doe", message: "Great presentation so far!", timestamp: "2:15 PM", isHost: false },
    { id: 2, user: "Dr. Sarah Chen", message: "Thank you! Feel free to ask questions anytime.", timestamp: "2:16 PM", isHost: true },
    { id: 3, user: "Alice Smith", message: "Can you share more details about AI automation?", timestamp: "2:18 PM", isHost: false }
  ]);

  const isHost = user?.role === 'admin' || user?.role === 'host';
  const canManage = user?.role === 'admin';

  // Fullscreen functionality for webinar area only
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      const newMessage = {
        id: chatMessages.length + 1,
        user: user?.name || "Anonymous",
        message: chatMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isHost: isHost
      };
      setChatMessages([...chatMessages, newMessage]);
      setChatMessage("");
    }
  };

  const handleLeaveWebinar = () => {
    navigate('/webinars');
  };

  const handleEndWebinar = () => {
    // Only hosts/admins can end webinar
    if (canManage) {
      navigate('/webinars');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header - Hidden in fullscreen */}
      {!isFullscreen && (
        <div className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-semibold text-foreground">{webinar.title}</h1>
              <Badge className="bg-success text-success-foreground">
                Live
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <Users className="w-4 h-4" />
                {webinar.participants} participants
              </span>
              {canManage && (
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={handleEndWebinar}
                >
                  End Webinar
                </Button>
              )}
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleLeaveWebinar}
              >
                <PhoneOff className="w-4 h-4 mr-2" />
                Leave
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className={`flex ${isFullscreen ? 'h-screen' : 'h-[calc(100vh-73px)]'}`}>
        {/* Main Video Area */}
        <div className={`flex-1 flex flex-col ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
          {/* Video Display */}
          <div className="flex-1 bg-card relative">
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
              <div className="text-center space-y-4">
                <div className="w-32 h-32 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
                  <Camera className="w-16 h-16 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-foreground">{webinar.host}</h3>
                  <p className="text-muted-foreground">Host</p>
                </div>
              </div>
            </div>
            
            {/* Video Controls Overlay */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
              <Card className="bg-background/90 backdrop-blur">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Button
                      variant={isMuted ? "destructive" : "outline"}
                      size="icon"
                      onClick={() => setIsMuted(!isMuted)}
                    >
                      {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    </Button>
                    
                    <Button
                      variant={isVideoOff ? "destructive" : "outline"}
                      size="icon"
                      onClick={() => setIsVideoOff(!isVideoOff)}
                    >
                      {isVideoOff ? <VideoOff className="w-4 h-4" /> : <Video className="w-4 h-4" />}
                    </Button>

                    <Button
                      variant={isSoundOn ? "outline" : "destructive"}
                      size="icon"
                      onClick={() => setIsSoundOn(!isSoundOn)}
                    >
                    {isSoundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                    </Button>

                    <Button
                      variant="outline"
                      size="icon"
                      onClick={toggleFullscreen}
                      title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                    >
                      {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
                    </Button>

                    {isHost && (
                      <Button
                        variant={isScreenSharing ? "default" : "outline"}
                        size="icon"
                        onClick={() => setIsScreenSharing(!isScreenSharing)}
                      >
                        {isScreenSharing ? <MonitorOff className="w-4 h-4" /> : <Monitor className="w-4 h-4" />}
                      </Button>
                    )}

                    {!isHost && (
                      <Button
                        variant={handRaised ? "default" : "outline"}
                        size="icon"
                        onClick={() => setHandRaised(!handRaised)}
                      >
                        <Hand className="w-4 h-4" />
                      </Button>
                    )}

                    {isHost && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="icon">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem className="gap-2">
                            <Settings className="w-4 h-4" />
                            Settings
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <Share2 className="w-4 h-4" />
                            Share Link
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Host Controls (Only for hosts/admins) - Hidden in fullscreen */}
          {isHost && !isFullscreen && (
            <div className="border-t border-border p-4 bg-muted/30">
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm" className="gap-2">
                  <Users className="w-4 h-4" />
                  Manage Participants
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Share2 className="w-4 h-4" />
                  Share Screen
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Settings className="w-4 h-4" />
                  Recording Settings
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Chat Sidebar - Hidden in fullscreen */}
        {!isFullscreen && (
          <div className="w-80 border-l border-border flex flex-col bg-card">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Chat
            </CardTitle>
          </CardHeader>

          {/* Chat Messages */}
          <CardContent className="flex-1 overflow-y-auto space-y-3 px-4">
            {chatMessages.map((msg) => (
              <div key={msg.id} className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-medium ${msg.isHost ? 'text-primary' : 'text-foreground'}`}>
                    {msg.user}
                  </span>
                  {msg.isHost && (
                    <Badge variant="secondary" className="text-xs">
                      Host
                    </Badge>
                  )}
                  <span className="text-xs text-muted-foreground">
                    {msg.timestamp}
                  </span>
                </div>
                <p className="text-sm text-foreground bg-muted/50 rounded-lg p-2">
                  {msg.message}
                </p>
              </div>
            ))}
          </CardContent>

          {/* Chat Input */}
          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <Input
                placeholder="Type your message..."
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1"
              />
              <Button 
                size="icon" 
                onClick={handleSendMessage}
                disabled={!chatMessage.trim()}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default RunningWebinar;