import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Settings as SettingsIcon, Mail, MessageSquare, Palette, Shield, Globe, Bell, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // Mock settings state
  const [settings, setSettings] = useState({
    // General
    siteName: "NexusHub",
    siteDescription: "Professional webinar platform for modern businesses",
    supportEmail: "support@nexushub.com",
    
    // Branding
    primaryColor: "#0066cc",
    logoUrl: "",
    
    // Integrations
    hubspotApiKey: "",
    sendgridApiKey: "",
    clicksendApiKey: "",
    
    // Notifications
    emailNotifications: true,
    smsNotifications: true,
    webinarReminders: true,
    newUserAlerts: true,
    
    // Security
    requireEmailVerification: true,
    enableTwoFactor: false,
    sessionTimeout: 24,
    
    // Features
    allowGuestRegistration: true,
    enableRecordings: true,
    enableChat: true,
    maxWebinarDuration: 240
  });

  const handleSave = async (section: string) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    
    toast({
      title: "Settings saved",
      description: `${section} settings have been updated successfully.`,
    });
  };

  const integrationStatus = {
    hubspot: settings.hubspotApiKey ? "connected" : "disconnected",
    sendgrid: settings.sendgridApiKey ? "connected" : "disconnected", 
    clicksend: settings.clicksendApiKey ? "connected" : "disconnected"
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <SettingsIcon className="w-8 h-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Manage your platform configuration and integrations</p>
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="branding">Branding</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                General Settings
              </CardTitle>
              <CardDescription>
                Basic platform configuration and site information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input
                    id="siteName"
                    value={settings.siteName}
                    onChange={(e) => setSettings({...settings, siteName: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="supportEmail">Support Email</Label>
                  <Input
                    id="supportEmail"
                    type="email"
                    value={settings.supportEmail}
                    onChange={(e) => setSettings({...settings, supportEmail: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="siteDescription">Site Description</Label>
                <Textarea
                  id="siteDescription"
                  value={settings.siteDescription}
                  onChange={(e) => setSettings({...settings, siteDescription: e.target.value})}
                  rows={3}
                />
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Feature Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Guest Registration</Label>
                      <p className="text-sm text-muted-foreground">Allow users to register without invitation</p>
                    </div>
                    <Switch
                      checked={settings.allowGuestRegistration}
                      onCheckedChange={(checked) => setSettings({...settings, allowGuestRegistration: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Webinar Recordings</Label>
                      <p className="text-sm text-muted-foreground">Enable automatic webinar recording</p>
                    </div>
                    <Switch
                      checked={settings.enableRecordings}
                      onCheckedChange={(checked) => setSettings({...settings, enableRecordings: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Chat Features</Label>
                      <p className="text-sm text-muted-foreground">Enable live chat during webinars</p>
                    </div>
                    <Switch
                      checked={settings.enableChat}
                      onCheckedChange={(checked) => setSettings({...settings, enableChat: checked})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="maxDuration">Max Webinar Duration (minutes)</Label>
                    <Input
                      id="maxDuration"
                      type="number"
                      value={settings.maxWebinarDuration}
                      onChange={(e) => setSettings({...settings, maxWebinarDuration: parseInt(e.target.value)})}
                    />
                  </div>
                </div>
              </div>

              <Button onClick={() => handleSave("General")} disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Branding Settings */}
        <TabsContent value="branding">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5" />
                Branding & Appearance
              </CardTitle>
              <CardDescription>
                Customize the look and feel of your platform
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="primaryColor">Primary Color</Label>
                  <Input
                    id="primaryColor"
                    type="color"
                    value={settings.primaryColor}
                    onChange={(e) => setSettings({...settings, primaryColor: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="logoUrl">Logo URL</Label>
                  <Input
                    id="logoUrl"
                    placeholder="https://example.com/logo.png"
                    value={settings.logoUrl}
                    onChange={(e) => setSettings({...settings, logoUrl: e.target.value})}
                  />
                </div>
              </div>

              <Button onClick={() => handleSave("Branding")} disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Integrations */}
        <TabsContent value="integrations">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  HubSpot Integration
                </CardTitle>
                <CardDescription>
                  Sync contacts and manage lifecycle stages
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Connection Status</h4>
                    <p className="text-sm text-muted-foreground">Sync user data with HubSpot CRM</p>
                  </div>
                  <Badge variant={integrationStatus.hubspot === "connected" ? "default" : "secondary"}>
                    {integrationStatus.hubspot === "connected" ? "Connected" : "Disconnected"}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="hubspotKey">API Key</Label>
                  <Input
                    id="hubspotKey"
                    type="password"
                    placeholder="Enter HubSpot API key"
                    value={settings.hubspotApiKey}
                    onChange={(e) => setSettings({...settings, hubspotApiKey: e.target.value})}
                  />
                </div>
                
                <Button onClick={() => handleSave("HubSpot")} disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save Integration"}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  SendGrid Integration
                </CardTitle>
                <CardDescription>
                  Email notifications and marketing campaigns
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Connection Status</h4>
                    <p className="text-sm text-muted-foreground">Send automated emails and reminders</p>
                  </div>
                  <Badge variant={integrationStatus.sendgrid === "connected" ? "default" : "secondary"}>
                    {integrationStatus.sendgrid === "connected" ? "Connected" : "Disconnected"}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="sendgridKey">API Key</Label>
                  <Input
                    id="sendgridKey"
                    type="password"
                    placeholder="Enter SendGrid API key"
                    value={settings.sendgridApiKey}
                    onChange={(e) => setSettings({...settings, sendgridApiKey: e.target.value})}
                  />
                </div>
                
                <Button onClick={() => handleSave("SendGrid")} disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save Integration"}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  ClickSend Integration
                </CardTitle>
                <CardDescription>
                  SMS notifications and reminders
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Connection Status</h4>
                    <p className="text-sm text-muted-foreground">Send SMS reminders and notifications</p>
                  </div>
                  <Badge variant={integrationStatus.clicksend === "connected" ? "default" : "secondary"}>
                    {integrationStatus.clicksend === "connected" ? "Connected" : "Disconnected"}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="clicksendKey">API Key</Label>
                  <Input
                    id="clicksendKey"
                    type="password"
                    placeholder="Enter ClickSend API key"
                    value={settings.clicksendApiKey}
                    onChange={(e) => setSettings({...settings, clicksendApiKey: e.target.value})}
                  />
                </div>
                
                <Button onClick={() => handleSave("ClickSend")} disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save Integration"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notification Settings
              </CardTitle>
              <CardDescription>
                Configure automatic notifications and reminders
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Send email notifications for platform events</p>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => setSettings({...settings, emailNotifications: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>SMS Notifications</Label>
                    <p className="text-sm text-muted-foreground">Send SMS notifications for important events</p>
                  </div>
                  <Switch
                    checked={settings.smsNotifications}
                    onCheckedChange={(checked) => setSettings({...settings, smsNotifications: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Webinar Reminders</Label>
                    <p className="text-sm text-muted-foreground">Automatic reminders before webinars start</p>
                  </div>
                  <Switch
                    checked={settings.webinarReminders}
                    onCheckedChange={(checked) => setSettings({...settings, webinarReminders: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>New User Alerts</Label>
                    <p className="text-sm text-muted-foreground">Notify admins when new users register</p>
                  </div>
                  <Switch
                    checked={settings.newUserAlerts}
                    onCheckedChange={(checked) => setSettings({...settings, newUserAlerts: checked})}
                  />
                </div>
              </div>

              <Button onClick={() => handleSave("Notifications")} disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Security Settings
              </CardTitle>
              <CardDescription>
                Manage authentication and security policies
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Verification Required</Label>
                    <p className="text-sm text-muted-foreground">Require email verification for new accounts</p>
                  </div>
                  <Switch
                    checked={settings.requireEmailVerification}
                    onCheckedChange={(checked) => setSettings({...settings, requireEmailVerification: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">Enable 2FA for enhanced security</p>
                  </div>
                  <Switch
                    checked={settings.enableTwoFactor}
                    onCheckedChange={(checked) => setSettings({...settings, enableTwoFactor: checked})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Session Timeout (hours)</Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    value={settings.sessionTimeout}
                    onChange={(e) => setSettings({...settings, sessionTimeout: parseInt(e.target.value)})}
                  />
                </div>
              </div>

              <Button onClick={() => handleSave("Security")} disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;