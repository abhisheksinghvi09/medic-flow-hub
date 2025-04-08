
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function SystemLogsPage() {
  const { profile } = useAuth();

  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">System Logs</h1>
        <p className="text-muted-foreground">View system activity and audit logs</p>

        <Card>
          <CardHeader>
            <CardTitle>Activity Logs</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              System logs and activity records will appear here.
            </p>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
