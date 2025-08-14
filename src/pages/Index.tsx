import { useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import LoginForm from '@/components/auth/LoginForm';
import AdminDashboard from '@/components/dashboard/AdminDashboard';
import UserDashboard from '@/components/dashboard/UserDashboard';
import { Dialog, DialogContent } from '@/components/ui/dialog';

const Index = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleLogin = () => {
    setShowLoginModal(true);
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

      {/* Login Modal */}
      <Dialog open={showLoginModal} onOpenChange={setShowLoginModal}>
        <DialogContent className="sm:max-w-md">
          <LoginForm 
            onClose={() => setShowLoginModal(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
