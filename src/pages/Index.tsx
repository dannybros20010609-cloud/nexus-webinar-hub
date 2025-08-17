import { useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import LoginForm from '@/components/auth/LoginForm';
import SignupForm from '@/components/auth/SignupForm';
import AdminDashboard from '@/components/dashboard/AdminDashboard';
import UserDashboard from '@/components/dashboard/UserDashboard';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';

const Index = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  const handleLogin = () => {
    setAuthMode('login');
    setShowLoginModal(true);
  };

  const handleSignup = () => {
    setAuthMode('signup');
    setShowSignupModal(true);
  };

  const switchToSignup = () => {
    setShowLoginModal(false);
    setShowSignupModal(true);
    setAuthMode('signup');
  };

  const switchToLogin = () => {
    setShowSignupModal(false);
    setShowLoginModal(true);
    setAuthMode('login');
  };

  const handleLogout = () => {
    logout();
  };

  const renderDashboard = () => {
    if (!isAuthenticated || !user) return null;

    switch (user.role) {
      case 'admin':
        return <AdminDashboard />;
      case 'host':
        return <AdminDashboard />; // For now, hosts see admin dashboard
      default:
        return <UserDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        userRole={user?.role || null} 
        onLogin={handleLogin}
        onSignup={handleSignup}
        onLogout={handleLogout}
      />
      
      <main>
        {isAuthenticated ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {renderDashboard()}
          </div>
        ) : (
          <Hero />
        )}
      </main>

      {/* Auth Modals */}
      <Dialog open={showLoginModal} onOpenChange={setShowLoginModal}>
        <DialogContent className="sm:max-w-md">
          <DialogTitle className="sr-only">Sign In</DialogTitle>
          <DialogDescription className="sr-only">
            Enter your credentials to access your account
          </DialogDescription>
          <LoginForm 
            onClose={() => setShowLoginModal(false)}
            onSwitchToSignup={switchToSignup}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={showSignupModal} onOpenChange={setShowSignupModal}>
        <DialogContent className="sm:max-w-md">
          <DialogTitle className="sr-only">Create Account</DialogTitle>
          <DialogDescription className="sr-only">
            Sign up for a new account to access exclusive content
          </DialogDescription>
          <SignupForm 
            onClose={() => setShowSignupModal(false)}
            onSwitchToLogin={switchToLogin}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
