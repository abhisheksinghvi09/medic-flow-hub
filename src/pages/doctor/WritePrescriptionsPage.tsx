
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SelectValue, SelectTrigger, SelectContent, SelectItem, Select } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, Pill, X, Calendar, Plus, Trash2, FileDown } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface PrescriptionProps {
  isNewMode?: boolean;
}

type Patient = {
  id: string;
  name: string;
  age: number;
  gender: string;
  avatar?: string;
};

type Medicine = {
  id: string;
  name: string;
  dosage?: string;
  instructions?: string;
  duration?: string;
};

const mockPatients: Patient[] = [
  { id: 'pat1', name: 'Jane Smith', age: 34, gender: 'Female' },
  { id: 'pat2', name: 'Robert Johnson', age: 45, gender: 'Male' },
  { id: 'pat3', name: 'Emily Williams', age: 27, gender: 'Female' },
  { id: 'pat4', name: 'Michael Brown', age: 52, gender: 'Male' },
];

const mockMedicines: Medicine[] = [
  { id: 'med1', name: 'Amoxicillin' },
  { id: 'med2', name: 'Lisinopril' },
  { id: 'med3', name: 'Metformin' },
  { id: 'med4', name: 'Simvastatin' },
  { id: 'med5', name: 'Omeprazole' },
  { id: 'med6', name: 'Albuterol' },
  { id: 'med7', name: 'Gabapentin' },
  { id: 'med8', name: 'Hydrochlorothiazide' },
];

const WritePrescriptionsPage: React.FC<PrescriptionProps> = ({ isNewMode = false }) => {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [currentMedicine, setCurrentMedicine] = useState<string>('');
  const [currentDosage, setCurrentDosage] = useState<string>('');
  const [currentInstructions, setCurrentInstructions] = useState<string>('');
  const [currentDuration, setCurrentDuration] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const navigate = useNavigate();

  const addMedicine = () => {
    if (!currentMedicine) {
      toast.error('Please select a medicine');
      return;
    }

    const selectedMed = mockMedicines.find(med => med.id === currentMedicine);
    if (!selectedMed) return;

    const newMed: Medicine = {
      ...selectedMed,
      dosage: currentDosage,
      instructions: currentInstructions,
      duration: currentDuration,
    };

    setMedicines([...medicines, newMed]);
    setCurrentMedicine('');
    setCurrentDosage('');
    setCurrentInstructions('');
    setCurrentDuration('');
  };

  const removeMedicine = (id: string) => {
    setMedicines(medicines.filter(med => med.id !== id));
  };

  const handleSavePrescription = () => {
    if (!selectedPatient) {
      toast.error('Please select a patient');
      return;
    }

    if (medicines.length === 0) {
      toast.error('Please add at least one medicine');
      return;
    }

    toast.success('Prescription saved successfully!');
    setTimeout(() => {
      navigate('/doctor/prescriptions');
    }, 1500);
  };

  const filteredPatients = mockPatients
    .filter(patient =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <MainLayout>
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-1">
          {isNewMode ? 'Create New Prescription' : 'Prescriptions'}
        </h1>
        <p className="text-muted-foreground mb-6">
          {isNewMode ? 'Create and manage prescriptions for your patients' : 'View and manage patient prescriptions'}
        </p>

        {isNewMode ? (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Patient Information</CardTitle>
                <CardDescription>Select the patient for this prescription</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {!selectedPatient ? (
                    <>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input 
                          placeholder="Search patients by name..."
                          className="pl-9"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {filteredPatients.map((patient) => (
                          <Card 
                            key={patient.id}
                            className="cursor-pointer hover:border-primary transition-colors"
                            onClick={() => setSelectedPatient(patient)}
                          >
                            <CardContent className="p-4 flex items-center gap-3">
                              <Avatar>
                                <AvatarFallback className="bg-primary/10 text-primary">
                                  {getInitials(patient.name)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{patient.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  {patient.age} years • {patient.gender}
                                </p>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="flex justify-between items-center border rounded-md p-4">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {getInitials(selectedPatient.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{selectedPatient.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {selectedPatient.age} years • {selectedPatient.gender}
                          </p>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setSelectedPatient(null)}
                      >
                        <X className="h-4 w-4 mr-1" />
                        Change Patient
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {selectedPatient && (
              <Card>
                <CardHeader>
                  <CardTitle>Prescription Details</CardTitle>
                  <CardDescription>Add medications to the prescription</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Current medications list */}
                    <div>
                      <h3 className="text-lg font-medium mb-3">Current Medications</h3>
                      {medicines.length > 0 ? (
                        <div className="space-y-3">
                          {medicines.map((med) => (
                            <div key={med.id} className="flex items-start border rounded-md p-3">
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <Pill className="h-4 w-4" />
                                  <p className="font-medium">{med.name}</p>
                                </div>
                                <div className="ml-6 mt-1 space-y-1">
                                  <p className="text-sm">Dosage: {med.dosage || 'Not specified'}</p>
                                  <p className="text-sm">Instructions: {med.instructions || 'Not specified'}</p>
                                  <p className="text-sm">Duration: {med.duration || 'Not specified'}</p>
                                </div>
                              </div>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => removeMedicine(med.id)}
                              >
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8 border rounded-md border-dashed">
                          <Pill className="h-12 w-12 mx-auto text-muted-foreground opacity-30" />
                          <p className="mt-2 text-muted-foreground">No medications added yet</p>
                        </div>
                      )}
                    </div>

                    {/* Add new medication form */}
                    <div className="border-t pt-4">
                      <h3 className="text-lg font-medium mb-3">Add Medication</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="medicine">Medicine Name</Label>
                          <Select value={currentMedicine} onValueChange={setCurrentMedicine}>
                            <SelectTrigger id="medicine">
                              <SelectValue placeholder="Select medicine" />
                            </SelectTrigger>
                            <SelectContent>
                              {mockMedicines.map((med) => (
                                <SelectItem key={med.id} value={med.id}>{med.name}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="dosage">Dosage</Label>
                          <Input 
                            id="dosage" 
                            placeholder="e.g. 500mg, twice daily" 
                            value={currentDosage}
                            onChange={(e) => setCurrentDosage(e.target.value)}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="duration">Duration</Label>
                          <Input 
                            id="duration" 
                            placeholder="e.g. 7 days, 2 weeks" 
                            value={currentDuration}
                            onChange={(e) => setCurrentDuration(e.target.value)}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="instructions">Instructions</Label>
                          <Input 
                            id="instructions" 
                            placeholder="e.g. Take with food" 
                            value={currentInstructions}
                            onChange={(e) => setCurrentInstructions(e.target.value)}
                          />
                        </div>
                      </div>
                      
                      <Button 
                        className="mt-4"
                        onClick={addMedicine}
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Add Medicine
                      </Button>
                    </div>
                    
                    {/* Notes section */}
                    <div className="space-y-2 border-t pt-4">
                      <Label htmlFor="notes">Additional Notes</Label>
                      <Textarea 
                        id="notes" 
                        placeholder="Add any additional instructions or notes here" 
                        rows={3}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                      />
                    </div>

                    <div className="pt-4 flex justify-end gap-3">
                      <Button variant="outline" onClick={() => navigate('/doctor/prescriptions')}>
                        Cancel
                      </Button>
                      <Button onClick={handleSavePrescription}>
                        Save Prescription
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-end">
              <Button onClick={() => navigate('/doctor/prescriptions/new')}>
                <Plus className="h-4 w-4 mr-1" />
                Create Prescription
              </Button>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Recent Prescriptions</CardTitle>
                <CardDescription>View and manage your recent prescriptions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((_, i) => (
                    <div key={i} className="border rounded-md p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex gap-3">
                          <Avatar>
                            <AvatarFallback className="bg-primary/10 text-primary">
                              {mockPatients[i]?.name.charAt(0) || 'P'}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{mockPatients[i]?.name || 'Patient Name'}</p>
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                April {5 + i}, 2025
                              </span>
                              <span className="flex items-center gap-1">
                                <Pill className="h-3 w-3" />
                                {2 + i} medications
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <FileDown className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                          <Button size="sm">
                            View
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default WritePrescriptionsPage;
