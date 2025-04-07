
import React from 'react';
import Sidebar from './Sidebar';
import { Toaster } from '@/components/ui/sonner';

interface MainLayoutProps {
  children: React.ReactNode;
  userRole?: string;
}

export default function MainLayout({ children, userRole = "patient" }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar userRole={userRole} />
      <div className="flex-1 overflow-auto">
        <main className="p-6">
          {children}
        </main>
        <Toaster />
      </div>
    </div>
  );
}
