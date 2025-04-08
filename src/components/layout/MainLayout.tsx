
import React from 'react';
import Sidebar from './Sidebar';
import { Footer } from './Footer';
import { Toaster } from '@/components/ui/sonner';
import { useAuth } from '@/contexts/AuthContext';

interface MainLayoutProps {
  children: React.ReactNode;
  userRole?: string;
}

export default function MainLayout({ children, userRole }: MainLayoutProps) {
  const { profile } = useAuth();
  
  // Use the authenticated user's role if available, otherwise fall back to the prop
  const role = profile?.role || userRole || "patient";
  
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar userRole={role} />
      <div className="flex-1 flex flex-col overflow-auto">
        <main className="flex-1 p-6">
          {children}
        </main>
        <Footer />
        <Toaster />
      </div>
    </div>
  );
}
