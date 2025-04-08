
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function DoctorSchedulePage() {
  const { profile } = useAuth();

  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Schedule Management</h1>
        <p className="text-muted-foreground">Manage your appointment schedule and availability</p>

        <Card>
          <CardHeader>
            <CardTitle>Your Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Your schedule management functionality will appear here.
            </p>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
