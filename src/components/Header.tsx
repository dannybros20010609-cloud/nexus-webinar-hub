import { Button } from "@/components/ui/button";
import { Video, Users, Calendar, Library } from "lucide-react";

import { UserRole } from "@/types/auth";

interface HeaderProps {
  userRole?: UserRole | null;
  onLogin?: () => void;
  onSignup?: () => void;
  onLogout?: () => void;
}

const Header = ({ userRole, onLogin, onSignup, onLogout }: HeaderProps) => {
  return (
    <header className="bg-card border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Video className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">NexusHub</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Webinars
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Content Vault
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              About
            </a>
          </nav>

          {/* Auth Actions */}
          <div className="flex items-center space-x-3">
            {userRole ? (
              <>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-primary-light rounded-full flex items-center justify-center">
                    <Users className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium capitalize">{userRole}</span>
                </div>
                <Button variant="outline" onClick={onLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" onClick={onLogin}>
                  Sign In
                </Button>
                <Button onClick={onSignup}>
                  Get Started
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;