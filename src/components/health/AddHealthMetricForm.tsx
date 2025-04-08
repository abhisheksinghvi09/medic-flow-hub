
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from 'sonner';

interface HealthMetricFormProps {
  onSuccess?: () => void;
}

export function AddHealthMetricForm({ onSuccess }: HealthMetricFormProps) {
  const [metricType, setMetricType] = useState('blood_pressure');
  const [value, setValue] = useState('');
  const [value2, setValue2] = useState(''); // For systolic/diastolic
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const metricTypes = [
    { id: 'blood_pressure', name: 'Blood Pressure', unit: 'mmHg', hasTwoValues: true },
    { id: 'heart_rate', name: 'Heart Rate', unit: 'bpm' },
    { id: 'blood_sugar', name: 'Blood Sugar', unit: 'mg/dL' },
    { id: 'weight', name: 'Weight', unit: 'kg' },
    { id: 'temperature', name: 'Temperature', unit: '°C' },
    { id: 'oxygen_saturation', name: 'Oxygen Saturation', unit: '%' },
    { id: 'cholesterol', name: 'Cholesterol', unit: 'mg/dL' },
  ];

  const currentMetric = metricTypes.find(m => m.id === metricType);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!value) {
      toast.error("Please enter a value");
      return;
    }
    
    if (currentMetric?.hasTwoValues && !value2) {
      toast.error("Please enter both values");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate saving to database
    setTimeout(() => {
      // In a real app, this would be saved to a database
      console.log('Health metric saved:', {
        type: metricType,
        value: currentMetric?.hasTwoValues ? `${value}/${value2}` : value,
        unit: currentMetric?.unit,
        date,
        notes
      });
      
      toast.success(`${currentMetric?.name} measurement recorded successfully`);
      
      // Reset form
      setValue('');
      setValue2('');
      setNotes('');
      
      if (onSuccess) onSuccess();
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Record Health Measurement</CardTitle>
        <CardDescription>Track your health metrics to monitor your wellbeing</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="metric-type">Metric Type</Label>
            <Select 
              value={metricType} 
              onValueChange={setMetricType}
            >
              <SelectTrigger id="metric-type">
                <SelectValue placeholder="Select metric type" />
              </SelectTrigger>
              <SelectContent>
                {metricTypes.map(type => (
                  <SelectItem key={type.id} value={type.id}>
                    {type.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {currentMetric?.hasTwoValues ? (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="value1">Systolic (mmHg)</Label>
                <Input
                  id="value1"
                  type="number"
                  placeholder="120"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="value2">Diastolic (mmHg)</Label>
                <Input
                  id="value2"
                  type="number"
                  placeholder="80"
                  value={value2}
                  onChange={(e) => setValue2(e.target.value)}
                />
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="value">
                Value ({currentMetric?.unit})
              </Label>
              <Input
                id="value"
                type="number"
                placeholder="Enter value"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes (optional)</Label>
            <Input
              id="notes"
              placeholder="Any additional notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Recording..." : "Record Measurement"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
