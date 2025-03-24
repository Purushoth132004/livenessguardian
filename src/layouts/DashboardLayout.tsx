
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, User, FileText, LogOut, Menu, X, Settings, Users } from 'lucide-react';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger,
  SheetClose
} from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from '@/hooks/use-toast';

interface DashboardLayoutProps {
  children: React.ReactNode;
  isAdmin?: boolean;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  children, 
  isAdmin = false 
}) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    // In a real app, this would clear auth state, tokens, etc.
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of the system.",
    });
    
    // Redirect to login page
    window.location.href = '/';
  };

  const navItems = isAdmin ? [
    { icon: Shield, label: 'Dashboard', path: '/admin' },
    { icon: Users, label: 'Pensioners', path: '/admin/pensioners' },
    { icon: FileText, label: 'Reports', path: '/admin/reports' },
    { icon: Settings, label: 'Settings', path: '/admin/settings' },
  ] : [
    { icon: User, label: 'Profile', path: '/dashboard' },
    { icon: FileText, label: 'Documents', path: '/documents' },
    { icon: Shield, label: 'Verification', path: '/verification' },
  ];

  const renderNavItems = () => {
    return navItems.map((item) => {
      const isActive = location.pathname === item.path;
      return (
        <li key={item.path}>
          <Link to={item.path} onClick={() => setOpen(false)}>
            <Button
              variant={isActive ? "default" : "ghost"}
              className={`w-full justify-start gap-2 ${isActive ? "" : "hover:text-primary"}`}
            >
              <item.icon size={18} />
              <span>{item.label}</span>
            </Button>
          </Link>
        </li>
      );
    });
  };

  const sidebarContent = (
    <>
      <div className="mb-8 flex items-center px-4">
        <Logo />
      </div>
      <nav className="flex-1">
        <ul className="space-y-2 px-2">
          {renderNavItems()}
        </ul>
      </nav>
      <div className="mt-auto px-2 pb-6">
        <Button 
          variant="ghost" 
          className="w-full justify-start gap-2 text-red-500 hover:bg-red-500/10 hover:text-red-500"
          onClick={handleLogout}
        >
          <LogOut size={18} />
          <span>Logout</span>
        </Button>
      </div>
    </>
  );

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar for desktop */}
      {!isMobile && (
        <aside className="fixed inset-y-0 left-0 z-50 hidden w-64 flex-col border-r bg-card px-2 py-6 sm:flex">
          {sidebarContent}
        </aside>
      )}

      {/* Mobile sidebar with Sheet */}
      {isMobile && (
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="fixed left-4 top-4 z-50 sm:hidden"
            >
              <Menu size={24} />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <div className="flex h-full flex-col py-6">
              {sidebarContent}
            </div>
          </SheetContent>
        </Sheet>
      )}

      {/* Main content */}
      <main className="flex-1 pl-0 sm:pl-64">
        <div className="container mx-auto p-4 sm:p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
