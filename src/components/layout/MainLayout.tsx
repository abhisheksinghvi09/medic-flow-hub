
import React from 'react';
import Sidebar from './Sidebar';
import { Footer } from './Footer';
import { Toaster } from '@/components/ui/sonner';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';

interface MainLayoutProps {
  children: React.ReactNode;
  userRole?: string;
  requireAuth?: boolean;
  allowedRoles?: string[];
}

export default function MainLayout({ 
  children, 
  userRole, 
  requireAuth = true,
  allowedRoles = ["patient", "doctor", "admin"]
}: MainLayoutProps) {
  const { profile, isLoading } = useAuth();
  
  // Use the authenticated user's role if available, otherwise fall back to the prop
  const role = profile?.role || userRole || "patient";
  
  // Check if authentication is required but user is not logged in
  if (requireAuth && !isLoading && !profile) {
    return <Navigate to="/auth/login" replace />;
  }
  
  // Check if user has permission to access this page
  if (profile && allowedRoles.length > 0 && !allowedRoles.includes(profile.role)) {
    return <Navigate to="/dashboard" replace />;
  }
  
  if (isLoading) {
    return <div className="flex min-h-screen items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-medical-primary border-t-transparent"></div>
    </div>;
  }
  
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
