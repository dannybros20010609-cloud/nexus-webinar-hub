import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useAuthStore } from "@/store/authStore";
import AppSidebar from "@/components/AppSidebar";
import Index from "./pages/Index";
import WebinarsPage from "./pages/WebinarsPage";
import VaultPage from "./pages/VaultPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import UserManagement from "./pages/UserManagement";
import Settings from "./pages/Settings";
import CreateWebinar from "./pages/CreateWebinar";
import VaultUpload from "./pages/VaultUpload";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return children;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 flex flex-col">
          <header className="h-14 flex items-center border-b border-border bg-background px-6">
            <SidebarTrigger />
          </header>
          <div className="flex-1 p-6 bg-muted/30">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Index />} />
            <Route path="/webinars" element={<WebinarsPage />} />
            <Route path="/vault" element={<VaultPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/webinars/create" element={<CreateWebinar />} />
            <Route path="/vault/upload" element={<VaultUpload />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
