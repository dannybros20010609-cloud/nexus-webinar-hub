import { 
  LayoutDashboard, 
  Video, 
  Users, 
  Library, 
  Settings, 
  BarChart3,
  Calendar,
  FileText,
  HelpCircle,
  LogOut
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";

const AppSidebar = () => {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const { user, logout } = useAuthStore();
  const location = useLocation();

  // Navigation items based on user role
  const getNavigationItems = () => {
    const baseItems = [
      { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
      { title: "Webinars", url: "/webinars", icon: Video },
      { title: "Content Vault", url: "/vault", icon: Library },
    ];

    if (user?.role === 'admin' || user?.role === 'host') {
      return [
        ...baseItems,
        { title: "Analytics", url: "/analytics", icon: BarChart3 },
        { title: "User Management", url: "/users", icon: Users },
        { title: "Settings", url: "/settings", icon: Settings },
      ];
    }

    return [
      ...baseItems,
      { title: "My Calendar", url: "/calendar", icon: Calendar },
      { title: "Help & Support", url: "/help", icon: HelpCircle },
    ];
  };

  const navigationItems = getNavigationItems();

  const isActive = (path: string) => location.pathname === path;

  return (
    <Sidebar className={`${collapsed ? "w-16" : "w-64"} transition-all duration-300`}>
      {/* Header */}
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
            <Video className="w-5 h-5 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div className="animate-fade-in">
              <h2 className="font-bold text-sidebar-foreground">NexusHub</h2>
              <p className="text-xs text-sidebar-foreground/60 capitalize">{user?.role} Panel</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent className="py-4">
        <SidebarGroup>
          <SidebarGroupLabel className={collapsed ? "sr-only" : ""}>
            Main Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    className={`group transition-all duration-200 ${
                      isActive(item.url) 
                        ? "bg-sidebar-accent text-sidebar-primary font-medium shadow-sm" 
                        : "hover:bg-sidebar-accent/50"
                    }`}
                  >
                    <NavLink to={item.url} className="flex items-center gap-3">
                      <item.icon className={`h-5 w-5 transition-transform group-hover:scale-110 ${
                        isActive(item.url) ? "text-sidebar-primary" : ""
                      }`} />
                      {!collapsed && (
                        <span className="animate-fade-in">{item.title}</span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Quick Actions for Admin/Host */}
        {(user?.role === 'admin' || user?.role === 'host') && (
          <SidebarGroup className="mt-6">
            <SidebarGroupLabel className={collapsed ? "sr-only" : ""}>
              Quick Actions
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink to="/webinars/create" className="flex items-center gap-3 text-sidebar-foreground/80 hover:text-sidebar-foreground">
                      <Video className="h-5 w-5" />
                      {!collapsed && <span className="animate-fade-in">Create Webinar</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink to="/vault/upload" className="flex items-center gap-3 text-sidebar-foreground/80 hover:text-sidebar-foreground">
                      <FileText className="h-5 w-5" />
                      {!collapsed && <span className="animate-fade-in">Upload Content</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="border-t border-sidebar-border p-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-sidebar-accent rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-sm font-medium text-sidebar-foreground">
              {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
            </span>
          </div>
          {!collapsed && (
            <div className="flex-1 animate-fade-in">
              <p className="text-sm font-medium text-sidebar-foreground truncate">
                {user?.name}
              </p>
              <p className="text-xs text-sidebar-foreground/60 truncate">
                {user?.email}
              </p>
            </div>
          )}
        </div>
        
        {!collapsed && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={logout}
            className="mt-3 w-full justify-start text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        )}
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;