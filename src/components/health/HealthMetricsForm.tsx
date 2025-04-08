
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { InputWithSuffix } from '@/components/ui/input-with-suffix';
import { useForm } from 'react-hook-form';
import { HeartPulse, Activity, Thermometer, Weight, TrendingUp, ClipboardList } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

interface HealthMetricFormValues {
  bloodPressureSystolic: string;
  bloodPressureDiastolic: string;
  heartRate: string;
  temperature: string;
  weight: string;
  bloodSugar: string;
  oxygenSaturation: string;
  notes: string;
}

export function HealthMetricsForm() {
  const { profile } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<HealthMetricFormValues>({
    defaultValues: {
      bloodPressureSystolic: '',
      bloodPressureDiastolic: '',
      heartRate: '',
      temperature: '',
      weight: '',
      bloodSugar: '',
      oxygenSaturation: '',
      notes: ''
    }
  });
  
  const onSubmit = async (data: HealthMetricFormValues) => {
    setIsSubmitting(true);
    
    try {
      // In a real application, this would send data to the backend
      console.log('Health metrics submitted:', data);
      
      // Simulate API request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Health metrics saved successfully');
      form.reset();
    } catch (error) {
      console.error('Failed to save health metrics:', error);
      toast.error('Failed to save health metrics. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <HeartPulse className="mr-2 h-5 w-5 text-medical-primary" />
          Record Health Metrics
        </CardTitle>
        <CardDescription>
          Track your vital signs and health measurements
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="flex gap-4">
                  <FormField
                    control={form.control}
                    name="bloodPressureSystolic"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel className="flex items-center">
                          <Activity className="mr-1 h-4 w-4" />
                          Systolic BP
                        </FormLabel>
                        <FormControl>
                          <InputWithSuffix
                            {...field}
                            type="number"
                            placeholder="120"
                            suffix="mmHg"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="bloodPressureDiastolic"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Diastolic BP</FormLabel>
                        <FormControl>
                          <InputWithSuffix
                            {...field}
                            type="number"
                            placeholder="80"
                            suffix="mmHg"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="heartRate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center">
                        <HeartPulse className="mr-1 h-4 w-4" />
                        Heart Rate
                      </FormLabel>
                      <FormControl>
                        <InputWithSuffix
                          {...field}
                          type="number"
                          placeholder="75"
                          suffix="bpm"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="temperature"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center">
                        <Thermometer className="mr-1 h-4 w-4" />
                        Temperature
                      </FormLabel>
                      <FormControl>
                        <InputWithSuffix
                          {...field}
                          type="number"
                          placeholder="98.6"
                          step="0.1"
                          suffix="°F"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="weight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center">
                        <Weight className="mr-1 h-4 w-4" />
                        Weight
                      </FormLabel>
                      <FormControl>
                        <InputWithSuffix
                          {...field}
                          type="number"
                          placeholder="150"
                          step="0.1"
                          suffix="lbs"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="bloodSugar"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center">
                        <TrendingUp className="mr-1 h-4 w-4" />
                        Blood Sugar
                      </FormLabel>
                      <FormControl>
                        <InputWithSuffix
                          {...field}
                          type="number"
                          placeholder="120"
                          suffix="mg/dL"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="oxygenSaturation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center">
                        <Activity className="mr-1 h-4 w-4" />
                        Oxygen Saturation
                      </FormLabel>
                      <FormControl>
                        <InputWithSuffix
                          {...field}
                          type="number"
                          placeholder="98"
                          min="1"
                          max="100"
                          suffix="%"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center">
                    <ClipboardList className="mr-1 h-4 w-4" />
                    Additional Notes
                  </FormLabel>
                  <FormControl>
                    <textarea
                      {...field}
                      className="w-full min-h-[100px] rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Any additional information about your health status..."
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <Button 
          type="button" 
          onClick={form.handleSubmit(onSubmit)} 
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? "Saving..." : "Save Health Metrics"}
        </Button>
      </CardFooter>
    </Card>
  );
}
