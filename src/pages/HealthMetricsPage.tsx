
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';

interface HealthMetricsPageProps {
  isAddMode?: boolean;
}

export default function HealthMetricsPage({ isAddMode = false }: HealthMetricsPageProps) {
  const { profile } = useAuth();
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">
          {isAddMode ? "Add Health Metrics" : "Health Metrics"}
        </h1>
        <p className="text-muted-foreground">
          {isAddMode 
            ? "Record your new health measurements" 
            : "Track and monitor your health measurements over time"
          }
        </p>

        <Card>
          <CardHeader>
            <CardTitle>{isAddMode ? "New Measurement" : "Your Metrics"}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              {isAddMode 
                ? "Form to add new health metrics will appear here." 
                : "Your health metrics history will appear here."
              }
            </p>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
