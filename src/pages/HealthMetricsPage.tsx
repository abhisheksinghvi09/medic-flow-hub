
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { AddHealthMetricForm } from '@/components/health/AddHealthMetricForm';
import { useAuth } from '@/contexts/AuthContext';
import { HeartPulse, Plus, FileText } from 'lucide-react';

interface HealthMetricsPageProps {
  isAddMode?: boolean;
}

export default function HealthMetricsPage({ isAddMode = false }: HealthMetricsPageProps) {
  const { profile } = useAuth();
  const [activeTab, setActiveTab] = useState(isAddMode ? "add" : "view");
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <HeartPulse className="h-8 w-8 text-medical-primary" />
              Health Metrics
            </h1>
            <p className="text-muted-foreground">
              Track and monitor your health measurements over time
            </p>
          </div>
          <Button variant="outline" onClick={() => setActiveTab(activeTab === "add" ? "view" : "add")}>
            {activeTab === "add" ? (
              <>
                <FileText className="mr-2 h-4 w-4" /> View Records
              </>
            ) : (
              <>
                <Plus className="mr-2 h-4 w-4" /> Add New Measurement
              </>
            )}
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="view">View Records</TabsTrigger>
            <TabsTrigger value="add">Add Measurement</TabsTrigger>
          </TabsList>
          
          <TabsContent value="view" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <HealthMetricCard 
                title="Blood Pressure"
                value="120/80"
                unit="mmHg"
                date="Today"
                status="normal"
              />
              <HealthMetricCard 
                title="Heart Rate"
                value="75"
                unit="bpm"
                date="Yesterday"
                status="normal"
              />
              <HealthMetricCard 
                title="Blood Sugar"
                value="140"
                unit="mg/dL"
                date="2 days ago"
                status="warning"
              />
              <HealthMetricCard 
                title="Oxygen Saturation"
                value="98"
                unit="%"
                date="3 days ago"
                status="normal"
              />
              <HealthMetricCard 
                title="Weight"
                value="72.5"
                unit="kg"
                date="1 week ago"
                status="normal"
              />
              <HealthMetricCard 
                title="Temperature"
                value="36.8"
                unit="°C"
                date="2 weeks ago"
                status="normal"
              />
            </div>
          </TabsContent>
          
          <TabsContent value="add">
            <div className="max-w-md mx-auto">
              <AddHealthMetricForm onSuccess={() => setActiveTab("view")} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}

interface HealthMetricCardProps {
  title: string;
  value: string;
  unit: string;
  date: string;
  status: "normal" | "warning" | "alert";
}

function HealthMetricCard({ title, value, unit, date, status }: HealthMetricCardProps) {
  const statusColor =
    status === "normal"
      ? "text-green-600 bg-green-50"
      : status === "warning"
      ? "text-amber-600 bg-amber-50"
      : "text-red-600 bg-red-50";

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className={`h-2 ${
        status === "normal"
          ? "bg-green-500"
          : status === "warning"
          ? "bg-amber-500"
          : "bg-red-500"
      }`} />
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold">
            {value} <span className="text-sm font-normal text-gray-500">{unit}</span>
          </div>
          <span className={`rounded-full px-2 py-1 text-xs ${statusColor}`}>
            {status === "normal" ? "Normal" : status === "warning" ? "Warning" : "Alert"}
          </span>
        </div>
        <p className="text-xs text-gray-500 mt-2">Recorded: {date}</p>
      </CardContent>
    </Card>
  );
}
