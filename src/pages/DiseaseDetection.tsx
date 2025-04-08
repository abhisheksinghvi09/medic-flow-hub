
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Stethoscope, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { HealthVisualization3D } from '@/components/health/HealthVisualization3D';
import { useAuth } from '@/contexts/AuthContext';

const SYMPTOMS = [
  "Fever", "Cough", "Headache", "Sore Throat", "Fatigue", "Shortness of Breath", 
  "Body Aches", "Runny Nose", "Nausea", "Vomiting", "Diarrhea", "Chills",
  "Loss of Taste or Smell", "Rash", "Joint Pain", "Dizziness"
];

export default function DiseaseDetection() {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const [age, setAge] = useState("");
  const [gender, setGender] = useState(""); 
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{
    disease: string;
    confidence: number;
    recommendations: string[];
  } | null>(null);
  
  const handleSymptomToggle = (symptom: string) => {
    if (selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms(selectedSymptoms.filter(s => s !== symptom));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedSymptoms.length === 0) {
      toast.error("Please select at least one symptom");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate AI processing
    setTimeout(() => {
      // In a real app, this would call an API to process the symptoms
      const mockResults = [
        {
          disease: "Common Cold",
          confidence: 85,
          recommendations: [
            "Rest and stay hydrated", 
            "Use over-the-counter medications for symptoms",
            "Consult a doctor if symptoms worsen or persist more than a week"
          ]
        },
        {
          disease: "Seasonal Allergy",
          confidence: 65,
          recommendations: [
            "Avoid known allergens",
            "Consider taking antihistamines",
            "Nasal irrigation may help relieve symptoms"
          ]
        },
        {
          disease: "COVID-19",
          confidence: 40,
          recommendations: [
            "Get tested for COVID-19",
            "Self-isolate until results are received",
            "Monitor symptoms and seek medical care if they worsen"
          ]
        }
      ];
      
      setResult(mockResults[0]);
      setIsLoading(false);
    }, 2000);
  };
  
  const resetForm = () => {
    setSelectedSymptoms([]);
    setDescription("");
    setAge("");
    setGender("");
    setDuration("");
    setResult(null);
  };
  
  const handleBookAppointment = () => {
    navigate('/appointments/book', { 
      state: { 
        reason: result ? `Possible ${result.disease}` : 'Follow-up on disease detection' 
      } 
    });
  };
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center">
              <Stethoscope className="mr-2 h-7 w-7 text-medical-primary" />
              Disease Detection
            </h1>
            <p className="text-muted-foreground">
              AI-powered symptom analysis to help identify potential health concerns
            </p>
          </div>
          <Button variant="outline" onClick={() => window.location.reload()}>
            <AlertCircle className="mr-2 h-4 w-4" /> 
            Get Emergency Help
          </Button>
        </div>

        <div className="grid md:grid-cols-5 gap-6">
          {/* Main detection form */}
          <div className="md:col-span-3 space-y-6">
            <Tabs defaultValue="symptoms" className="space-y-4">
              <TabsList>
                <TabsTrigger value="symptoms">Symptom Checker</TabsTrigger>
                <TabsTrigger value="history">Medical History</TabsTrigger>
              </TabsList>
              
              <TabsContent value="symptoms" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Symptom Checker</CardTitle>
                    <CardDescription>
                      Select your symptoms for AI-based disease detection
                    </CardDescription>
                  </CardHeader>
                  <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="age">Age</Label>
                          <Input
                            id="age"
                            type="number"
                            placeholder="Your age"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="gender">Gender</Label>
                          <select
                            id="gender"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                          >
                            <option value="">Select gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="duration">Symptom Duration</Label>
                        <Input
                          id="duration"
                          placeholder="How long have you been experiencing these symptoms?"
                          value={duration}
                          onChange={(e) => setDuration(e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Select Your Symptoms</Label>
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-2">
                          {SYMPTOMS.map((symptom) => (
                            <div key={symptom} className="flex items-center space-x-2">
                              <Checkbox 
                                id={`symptom-${symptom}`} 
                                checked={selectedSymptoms.includes(symptom)}
                                onCheckedChange={() => handleSymptomToggle(symptom)}
                              />
                              <label
                                htmlFor={`symptom-${symptom}`}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                {symptom}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="description">Additional Information</Label>
                        <Textarea
                          id="description"
                          placeholder="Describe your symptoms in more detail..."
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          className="min-h-[100px]"
                        />
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button type="button" variant="outline" onClick={resetForm}>Reset</Button>
                      <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Analyzing..." : "Analyze Symptoms"}
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </TabsContent>
              
              <TabsContent value="history">
                <Card>
                  <CardHeader>
                    <CardTitle>Medical History</CardTitle>
                    <CardDescription>
                      View and manage your past diagnoses and health records
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No previous diagnoses found</p>
                      <Button className="mt-4" onClick={() => document.getElementById('historyTab')?.click()}>
                        Check Your Symptoms Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            
            {result && (
              <Card className="border-l-4 border-medical-primary">
                <CardHeader>
                  <CardTitle>Diagnosis Results</CardTitle>
                  <CardDescription>
                    AI-generated analysis based on your symptoms
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-semibold">{result.disease}</h3>
                      <p className="text-sm text-muted-foreground">Possible diagnosis</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center">
                        <span className="text-2xl font-bold">{result.confidence}%</span>
                        <span className="ml-1 text-sm text-muted-foreground">confidence</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Recommendations:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {result.recommendations.map((rec, index) => (
                        <li key={index}>{rec}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-amber-50 p-4 rounded-md border border-amber-200">
                    <p className="text-amber-800 text-sm">
                      <strong>Note:</strong> This is an AI-generated analysis and not a professional medical diagnosis. 
                      Please consult with a healthcare provider for proper diagnosis and treatment.
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={handleBookAppointment}>
                    Book an Appointment with a Doctor
                  </Button>
                </CardFooter>
              </Card>
            )}
          </div>
          
          {/* 3D visualization and info */}
          <div className="md:col-span-2 space-y-6">
            <HealthVisualization3D />
            
            <Card>
              <CardHeader>
                <CardTitle>How it Works</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm">
                  Our AI-powered disease detection system analyzes your symptoms and compares them against a vast database of medical knowledge to suggest potential diagnoses.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-100 text-blue-800 rounded-full p-1 mt-0.5">
                      <span className="block w-5 h-5 flex items-center justify-center text-sm font-medium">1</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Select Symptoms</h4>
                      <p className="text-sm text-muted-foreground">Choose all the symptoms you're experiencing</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-100 text-blue-800 rounded-full p-1 mt-0.5">
                      <span className="block w-5 h-5 flex items-center justify-center text-sm font-medium">2</span>
                    </div>
                    <div>
                      <h4 className="font-medium">AI Analysis</h4>
                      <p className="text-sm text-muted-foreground">Our algorithm analyzes your symptoms and health data</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-100 text-blue-800 rounded-full p-1 mt-0.5">
                      <span className="block w-5 h-5 flex items-center justify-center text-sm font-medium">3</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Results & Recommendations</h4>
                      <p className="text-sm text-muted-foreground">Get insights about possible conditions and next steps</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
