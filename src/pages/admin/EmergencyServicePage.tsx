
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function EmergencyServicePage() {
  const { profile } = useAuth();

  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Emergency Services</h1>
        <p className="text-muted-foreground">Manage emergency cases and urgent care</p>

        <Card>
          <CardHeader>
            <CardTitle>Emergency Cases</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Emergency service management functionality will appear here.
            </p>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
