
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PatientVitalsPage() {
  const { profile } = useAuth();

  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Patient Vitals</h1>
        <p className="text-muted-foreground">View and monitor patient vital signs</p>

        <Card>
          <CardHeader>
            <CardTitle>Vitals Monitoring</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Patient vitals monitoring functionality will appear here.
            </p>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
