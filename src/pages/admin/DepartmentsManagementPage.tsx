
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function DepartmentsManagementPage() {
  const { profile } = useAuth();

  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Departments Management</h1>
        <p className="text-muted-foreground">Manage hospital departments and staff assignments</p>

        <Card>
          <CardHeader>
            <CardTitle>Departments</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Department management functionality will appear here.
            </p>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
