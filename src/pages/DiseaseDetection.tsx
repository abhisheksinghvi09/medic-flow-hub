
import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Disease {
  id: string;
  name: string;
  description: string;
  image: string;
  parameters: {
    id: string;
    name: string;
    type: 'number' | 'select' | 'checkbox';
    options?: string[];
    min?: number;
    max?: number;
    unit?: string;
  }[];
}

const diseases: Disease[] = [
  {
    id: 'diabetes',
    name: 'Diabetes',
    description: 'Analyze your risk of diabetes based on key health indicators',
    image: '🩸',
    parameters: [
      { id: 'glucose', name: 'Blood Glucose', type: 'number', min: 70, max: 400, unit: 'mg/dL' },
      { id: 'insulin', name: 'Insulin Level', type: 'number', min: 0, max: 300, unit: 'pmol/L' },
      { id: 'bmi', name: 'BMI', type: 'number', min: 10, max: 50, unit: 'kg/m²' },
      { id: 'age', name: 'Age', type: 'number', min: 0, max: 120, unit: 'years' },
      { 
        id: 'family_history', 
        name: 'Family History of Diabetes', 
        type: 'select',
        options: ['None', 'Parent', 'Sibling', 'Multiple relatives'] 
      },
    ]
  },
  {
    id: 'heart-disease',
    name: 'Heart Disease',
    description: 'Check your cardiovascular health risk factors',
    image: '❤️',
    parameters: [
      { id: 'age', name: 'Age', type: 'number', min: 0, max: 120, unit: 'years' },
      { id: 'cholesterol', name: 'Cholesterol', type: 'number', min: 100, max: 400, unit: 'mg/dL' },
      { id: 'blood_pressure', name: 'Blood Pressure', type: 'number', min: 80, max: 200, unit: 'mmHg (systolic)' },
      { 
        id: 'chest_pain', 
        name: 'Chest Pain Type', 
        type: 'select',
        options: ['None', 'Typical angina', 'Atypical angina', 'Non-anginal pain', 'Asymptomatic'] 
      },
      { id: 'exercise', name: 'Regular Exercise', type: 'checkbox' },
    ]
  },
  {
    id: 'pneumonia',
    name: 'Pneumonia',
    description: 'Analyze respiratory symptoms to assess pneumonia risk',
    image: '🫁',
    parameters: [
      { id: 'temperature', name: 'Body Temperature', type: 'number', min: 97, max: 105, unit: '°F' },
      { id: 'cough_duration', name: 'Cough Duration', type: 'number', min: 0, max: 30, unit: 'days' },
      { 
        id: 'breathing_difficulty', 
        name: 'Breathing Difficulty', 
        type: 'select',
        options: ['None', 'Mild', 'Moderate', 'Severe'] 
      },
      { id: 'chest_pain', name: 'Chest Pain', type: 'checkbox' },
      { id: 'fatigue', name: 'Fatigue', type: 'checkbox' },
    ]
  }
];

export default function DiseaseDetection() {
  const [selectedDisease, setSelectedDisease] = useState<Disease | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [result, setResult] = useState<{
    prediction: string;
    confidence: number;
    recommendations: string[];
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleDiseaseSelect = (disease: Disease) => {
    setSelectedDisease(disease);
    setFormData({});
    setResult(null);
  };

  const handleInputChange = (parameterId: string, value: any) => {
    setFormData(prev => ({ ...prev, [parameterId]: value }));
  };

  const handleCheckboxChange = (parameterId: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [parameterId]: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDisease) return;

    setIsLoading(true);
    
    try {
      // In a real application, this would be an API call to a Flask backend
      // For now, we'll simulate a response with setTimeout
      setTimeout(() => {
        if (selectedDisease.id === 'diabetes') {
          const glucose = Number(formData.glucose) || 0;
          let riskLevel = 'Low';
          let confidence = 68;
          
          if (glucose > 200) {
            riskLevel = 'High';
            confidence = 85;
          } else if (glucose > 140) {
            riskLevel = 'Moderate';
            confidence = 72;
          }
          
          setResult({
            prediction: riskLevel + ' Risk',
            confidence,
            recommendations: [
              'Monitor your blood glucose regularly',
              'Maintain a balanced diet low in sugars',
              'Exercise for at least 30 minutes daily',
              'Consult with your doctor about these results'
            ]
          });
        } else if (selectedDisease.id === 'heart-disease') {
          const cholesterol = Number(formData.cholesterol) || 0;
          const bloodPressure = Number(formData.blood_pressure) || 0;
          
          let riskLevel = 'Low';
          let confidence = 65;
          
          if (cholesterol > 240 && bloodPressure > 140) {
            riskLevel = 'High';
            confidence = 82;
          } else if (cholesterol > 200 || bloodPressure > 120) {
            riskLevel = 'Moderate';
            confidence = 75;
          }
          
          setResult({
            prediction: riskLevel + ' Risk',
            confidence,
            recommendations: [
              'Follow a heart-healthy diet rich in fruits and vegetables',
              'Manage stress with relaxation techniques',
              'Maintain regular cardiovascular exercise',
              'Schedule a follow-up with a cardiologist'
            ]
          });
        } else {
          // Generic response for other disease types
          setResult({
            prediction: 'Moderate Risk',
            confidence: 70,
            recommendations: [
              'Consult with a healthcare professional',
              'Monitor your symptoms closely',
              'Rest and maintain good hydration',
              'Follow up with specialized testing if symptoms persist'
            ]
          });
        }
        
        toast.success("Analysis complete");
        setIsLoading(false);
      }, 2000);
      
    } catch (error) {
      console.error("Error in disease prediction:", error);
      toast.error("An error occurred during analysis");
      setIsLoading(false);
    }
  };

  const resetAnalysis = () => {
    setSelectedDisease(null);
    setFormData({});
    setResult(null);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Disease Detection</h1>
          <p className="text-muted-foreground">
            Use our AI-powered system to analyze your health parameters
          </p>
        </div>

        {!selectedDisease ? (
          <div>
            <h2 className="text-xl font-semibold mb-4">Select a disease to analyze:</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {diseases.map((disease) => (
                <Card 
                  key={disease.id}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleDiseaseSelect(disease)}
                >
                  <CardHeader>
                    <div className="text-3xl mb-2">{disease.image}</div>
                    <CardTitle>{disease.name}</CardTitle>
                    <CardDescription>{disease.description}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button className="w-full">Select</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <Card className="border-t-4 border-t-medical-primary animate-fade-in">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <span className="text-3xl">{selectedDisease.image}</span>
                    {selectedDisease.name} Analysis
                  </CardTitle>
                  <CardDescription>{selectedDisease.description}</CardDescription>
                </div>
                <Button variant="outline" onClick={resetAnalysis}>
                  Choose Different Disease
                </Button>
              </div>
            </CardHeader>
            
            <CardContent>
              <Tabs defaultValue="parameters" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="parameters">Parameters</TabsTrigger>
                  <TabsTrigger value="results" disabled={!result}>Results</TabsTrigger>
                </TabsList>
                
                <TabsContent value="parameters">
                  <form onSubmit={handleSubmit} className="space-y-6 py-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {selectedDisease.parameters.map((param) => (
                        <div key={param.id} className="space-y-2">
                          <Label htmlFor={param.id}>
                            {param.name} {param.unit ? `(${param.unit})` : ''}
                          </Label>
                          
                          {param.type === 'number' && (
                            <Input
                              id={param.id}
                              type="number"
                              min={param.min}
                              max={param.max}
                              placeholder={`Enter ${param.name.toLowerCase()}`}
                              value={formData[param.id] || ''}
                              onChange={(e) => handleInputChange(param.id, e.target.value)}
                              required
                            />
                          )}
                          
                          {param.type === 'select' && (
                            <select
                              id={param.id}
                              className="w-full rounded-md border border-input bg-background px-3 py-2"
                              value={formData[param.id] || ''}
                              onChange={(e) => handleInputChange(param.id, e.target.value)}
                              required
                            >
                              <option value="">Select {param.name}</option>
                              {param.options?.map(option => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>
                          )}
                          
                          {param.type === 'checkbox' && (
                            <div className="flex items-center space-x-2">
                              <input
                                id={param.id}
                                type="checkbox"
                                className="rounded border-gray-300 text-medical-primary focus:ring-medical-primary"
                                checked={formData[param.id] || false}
                                onChange={(e) => handleCheckboxChange(param.id, e.target.checked)}
                              />
                              <label htmlFor={param.id} className="text-sm">
                                Yes
                              </label>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full md:w-auto"
                      disabled={isLoading}
                    >
                      {isLoading ? "Analyzing..." : "Analyze Results"}
                    </Button>
                  </form>
                </TabsContent>
                
                <TabsContent value="results">
                  {result && (
                    <div className="p-4 space-y-6">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="mb-4">
                          <h3 className="text-lg font-medium">Prediction</h3>
                          <div className="flex items-center mt-2">
                            <div className={`text-2xl font-bold ${
                              result.prediction.includes('High') ? 'text-red-600' :
                              result.prediction.includes('Moderate') ? 'text-amber-600' :
                              'text-green-600'
                            }`}>
                              {result.prediction}
                            </div>
                            <div className="ml-4 bg-gray-200 rounded-full h-2.5 w-full max-w-[200px]">
                              <div
                                className={`h-2.5 rounded-full ${
                                  result.prediction.includes('High') ? 'bg-red-600' :
                                  result.prediction.includes('Moderate') ? 'bg-amber-500' :
                                  'bg-green-500'
                                }`}
                                style={{ width: `${result.confidence}%` }}
                              ></div>
                            </div>
                            <span className="ml-2 text-sm text-gray-600">
                              {result.confidence}% confidence
                            </span>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-medium">Recommendations</h3>
                          <ul className="mt-2 space-y-1">
                            {result.recommendations.map((recommendation, i) => (
                              <li key={i} className="flex items-start">
                                <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-medical-primary/10 text-medical-primary text-xs mr-2 mt-0.5">
                                  {i + 1}
                                </span>
                                <span>{recommendation}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      <div className="flex flex-col md:flex-row gap-4">
                        <Button onClick={() => window.print()}>
                          Print Results
                        </Button>
                        <Button variant="outline" onClick={resetAnalysis}>
                          Start New Analysis
                        </Button>
                      </div>
                      
                      <div className="text-sm text-muted-foreground bg-blue-50 p-4 rounded-md border border-blue-100">
                        <strong>Important:</strong> These results are based on the information provided and are not a medical diagnosis. Always consult with a healthcare professional for proper medical advice.
                      </div>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  );
}
