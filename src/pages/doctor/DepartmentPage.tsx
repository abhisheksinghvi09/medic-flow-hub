
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function DepartmentPage() {
  const { profile } = useAuth();

  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Department</h1>
        <p className="text-muted-foreground">Your department information and colleagues</p>

        <Card>
          <CardHeader>
            <CardTitle>Department Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Department information will appear here.
            </p>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
