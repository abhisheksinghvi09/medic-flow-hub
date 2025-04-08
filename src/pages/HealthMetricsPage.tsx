
import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { Progress } from "@/components/ui/progress";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

// Mock data for the charts
const healthData = [
  { date: 'Apr 1', bloodPressure: 120, bloodSugar: 130, heartRate: 72, cholesterol: 190 },
  { date: 'Apr 2', bloodPressure: 118, bloodSugar: 125, heartRate: 75, cholesterol: 190 },
  { date: 'Apr 3', bloodPressure: 122, bloodSugar: 135, heartRate: 70, cholesterol: 185 },
  { date: 'Apr 4', bloodPressure: 121, bloodSugar: 140, heartRate: 73, cholesterol: 185 },
  { date: 'Apr 5', bloodPressure: 119, bloodSugar: 135, heartRate: 74, cholesterol: 180 },
  { date: 'Apr 6', bloodPressure: 120, bloodSugar: 130, heartRate: 72, cholesterol: 180 },
  { date: 'Apr 7', bloodPressure: 117, bloodSugar: 125, heartRate: 69, cholesterol: 175 },
];

interface MetricsFormValues {
  bloodPressure: string;
  bloodSugar: string;
  heartRate: string;
  cholesterol: string;
}

export default function HealthMetricsPage() {
  const { profile } = useAuth();
  const [hasMetrics, setHasMetrics] = useState(true);
  
  const form = useForm<MetricsFormValues>({
    defaultValues: {
      bloodPressure: '',
      bloodSugar: '',
      heartRate: '',
      cholesterol: ''
    }
  });
  
  const onSubmit = (values: MetricsFormValues) => {
    // Here you would normally save the data to your database
    console.log('Submitted values:', values);
    toast.success('Health metrics updated successfully!');
    setHasMetrics(true);
    
    // Reset form
    form.reset();
  };
  
  const HealthMetric = ({
    title,
    value,
    max,
    unit,
    progress,
    status,
  }: {
    title: string;
    value: number;
    max: number;
    unit: string;
    progress: number;
    status: "normal" | "warning" | "alert";
  }) => {
    const statusColor =
      status === "normal"
        ? "text-green-600"
        : status === "warning"
        ? "text-amber-600"
        : "text-red-600";

    const progressColor =
      status === "normal"
        ? "bg-green-600"
        : status === "warning"
        ? "bg-amber-500"
        : "bg-red-500";

    return (
      <div className="space-y-1">
        <div className="flex justify-between">
          <span className="text-sm font-medium">{title}</span>
          <span className={`text-sm font-medium ${statusColor}`}>
            {value} {unit}
          </span>
        </div>
        <Progress value={progress} max={100} className={progressColor} />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>0</span>
          <span>{max}</span>
        </div>
      </div>
    );
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Health Metrics</h1>
          <p className="text-muted-foreground">
            Track and monitor your key health indicators
          </p>
        </div>

        {hasMetrics ? (
          <>
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Current Metrics</CardTitle>
                  <CardDescription>Your most recent health measurements</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <HealthMetric
                    title="Blood Pressure"
                    value={120}
                    max={200}
                    unit="mmHg"
                    progress={60}
                    status="normal"
                  />
                  <HealthMetric
                    title="Heart Rate"
                    value={75}
                    max={220}
                    unit="bpm"
                    progress={35}
                    status="normal"
                  />
                  <HealthMetric
                    title="Blood Sugar"
                    value={140}
                    max={300}
                    unit="mg/dL"
                    progress={45}
                    status="warning"
                  />
                  <HealthMetric
                    title="Cholesterol"
                    value={180}
                    max={300}
                    unit="mg/dL"
                    progress={60}
                    status="normal"
                  />
                  
                  <Button 
                    variant="outline" 
                    onClick={() => setHasMetrics(false)}
                    className="w-full"
                  >
                    Add New Measurements
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Add Health Data</CardTitle>
                  <CardDescription>Record your latest health measurements</CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="bloodPressure"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Blood Pressure (mmHg)</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="120" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="bloodSugar"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Blood Sugar (mg/dL)</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="130" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="heartRate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Heart Rate (bpm)</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="72" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="cholesterol"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Cholesterol (mg/dL)</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="180" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <Button type="submit" className="w-full">Record Metrics</Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Health Metrics History</CardTitle>
                <CardDescription>7-day trends of your key health indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={healthData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="bloodPressure" 
                        stroke="#8884d8" 
                        name="Blood Pressure" 
                        activeDot={{ r: 8 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="bloodSugar" 
                        stroke="#82ca9d" 
                        name="Blood Sugar" 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="heartRate" 
                        stroke="#ff7300" 
                        name="Heart Rate" 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="cholesterol" 
                        stroke="#0088fe" 
                        name="Cholesterol" 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Add Health Metrics</CardTitle>
              <CardDescription>Enter your health measurements to start tracking</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="bloodPressure"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Blood Pressure (mmHg)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="120" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="bloodSugar"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Blood Sugar (mg/dL)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="130" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="heartRate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Heart Rate (bpm)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="72" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="cholesterol"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cholesterol (mg/dL)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="180" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="w-full">Save Metrics</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  );
}
