
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function OrderLabTestsPage() {
  const { profile } = useAuth();

  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Order Lab Tests</h1>
        <p className="text-muted-foreground">Request diagnostic and lab tests for your patients</p>

        <Card>
          <CardHeader>
            <CardTitle>Lab Test Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              The lab test ordering functionality will appear here.
            </p>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
