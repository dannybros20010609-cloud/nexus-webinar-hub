import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Calendar, Clock, Users, Settings, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const CreateWebinar = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const [webinarData, setWebinarData] = useState({
    title: "",
    description: "",
    date: new Date(),
    startTime: "",
    duration: 60,
    maxAttendees: 100,
    hosts: [],
    guests: [],
    isRecorded: true,
    isPublic: true,
    requiresRegistration: true,
    reminderSettings: {
      emailReminder24h: true,
      emailReminder1h: true,
      smsReminder30min: false
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast({
      title: "Webinar created successfully!",
      description: `"${webinarData.title}" has been scheduled and participants will be notified.`,
    });

    setIsLoading(false);
    navigate("/webinars");
  };

  const updateReminderSetting = (key: string, value: boolean) => {
    setWebinarData({
      ...webinarData,
      reminderSettings: {
        ...webinarData.reminderSettings,
        [key]: value
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => navigate("/webinars")}
          className="w-fit"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create New Webinar</h1>
          <p className="text-muted-foreground">Set up your webinar with all the necessary details</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>
                  Enter the essential details for your webinar
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Webinar Title *</Label>
                  <Input
                    id="title"
                    placeholder="Enter a compelling title for your webinar"
                    value={webinarData.title}
                    onChange={(e) => setWebinarData({...webinarData, title: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe what attendees will learn and why they should join..."
                    rows={4}
                    value={webinarData.description}
                    onChange={(e) => setWebinarData({...webinarData, description: e.target.value})}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Schedule & Duration */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Schedule & Duration
                </CardTitle>
                <CardDescription>
                  Set when your webinar will take place
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Date *</Label>
                    <Input
                      type="date"
                      value={webinarData.date.toISOString().split('T')[0]}
                      onChange={(e) => setWebinarData({...webinarData, date: new Date(e.target.value)})}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="startTime">Start Time *</Label>
                    <Input
                      id="startTime"
                      type="time"
                      value={webinarData.startTime}
                      onChange={(e) => setWebinarData({...webinarData, startTime: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration (minutes)</Label>
                    <Select 
                      value={webinarData.duration.toString()} 
                      onValueChange={(value) => setWebinarData({...webinarData, duration: parseInt(value)})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="45">45 minutes</SelectItem>
                        <SelectItem value="60">1 hour</SelectItem>
                        <SelectItem value="90">1.5 hours</SelectItem>
                        <SelectItem value="120">2 hours</SelectItem>
                        <SelectItem value="180">3 hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="maxAttendees">Max Attendees</Label>
                    <Input
                      id="maxAttendees"
                      type="number"
                      min="1"
                      max="1000"
                      value={webinarData.maxAttendees}
                      onChange={(e) => setWebinarData({...webinarData, maxAttendees: parseInt(e.target.value)})}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Participants */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Participants
                </CardTitle>
                <CardDescription>
                  Assign hosts and guest speakers
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="hosts">Additional Hosts</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select additional hosts..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="john">John Host (host@nexushub.com)</SelectItem>
                      <SelectItem value="admin">Admin User (admin@nexushub.com)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="guests">Guest Speakers</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Invite guest speakers..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="guest">Guest Speaker (guest@nexushub.com)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Settings Sidebar */}
          <div className="space-y-6">
            {/* Webinar Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Record Webinar</Label>
                    <p className="text-xs text-muted-foreground">Save recording to content vault</p>
                  </div>
                  <Switch
                    checked={webinarData.isRecorded}
                    onCheckedChange={(checked) => setWebinarData({...webinarData, isRecorded: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Public Webinar</Label>
                    <p className="text-xs text-muted-foreground">Anyone can join</p>
                  </div>
                  <Switch
                    checked={webinarData.isPublic}
                    onCheckedChange={(checked) => setWebinarData({...webinarData, isPublic: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Require Registration</Label>
                    <p className="text-xs text-muted-foreground">Users must register first</p>
                  </div>
                  <Switch
                    checked={webinarData.requiresRegistration}
                    onCheckedChange={(checked) => setWebinarData({...webinarData, requiresRegistration: checked})}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Reminder Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Reminders
                </CardTitle>
                <CardDescription>
                  Configure automatic reminders
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email 24h before</Label>
                    <p className="text-xs text-muted-foreground">Send email reminder</p>
                  </div>
                  <Switch
                    checked={webinarData.reminderSettings.emailReminder24h}
                    onCheckedChange={(checked) => updateReminderSetting('emailReminder24h', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email 1h before</Label>
                    <p className="text-xs text-muted-foreground">Final email reminder</p>
                  </div>
                  <Switch
                    checked={webinarData.reminderSettings.emailReminder1h}
                    onCheckedChange={(checked) => updateReminderSetting('emailReminder1h', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>SMS 30min before</Label>
                    <p className="text-xs text-muted-foreground">Send SMS notification</p>
                  </div>
                  <Switch
                    checked={webinarData.reminderSettings.smsReminder30min}
                    onCheckedChange={(checked) => updateReminderSetting('smsReminder30min', checked)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button type="submit" className="w-full" disabled={isLoading || !webinarData.title || !webinarData.startTime}>
                <Save className="w-4 h-4 mr-2" />
                {isLoading ? "Creating..." : "Create Webinar"}
              </Button>
              
              <Button 
                type="button" 
                variant="outline" 
                className="w-full"
                onClick={() => navigate("/webinars")}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateWebinar;