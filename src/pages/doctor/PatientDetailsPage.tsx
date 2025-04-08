
import React from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PatientDetailsPage() {
  const { profile } = useAuth();
  const { patientId } = useParams<{ patientId: string }>();

  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Patient Details</h1>
        <p className="text-muted-foreground">Viewing details for patient ID: {patientId}</p>

        <Card>
          <CardHeader>
            <CardTitle>Patient Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Patient details will appear here.
            </p>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
