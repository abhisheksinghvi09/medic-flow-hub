
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, FileText, Calendar, Phone, Mail, Activity, Filter, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  phone: string;
  email: string;
  condition: string;
  lastVisit: string;
  status: "stable" | "needs-attention" | "critical";
  appointmentDate?: string;
  treatment?: string;
}

const mockPatients: Patient[] = [
  {
    id: "pat1",
    name: "Jane Smith",
    age: 34,
    gender: "Female",
    phone: "+1 555-123-4567",
    email: "jane.smith@example.com",
    condition: "Hypertension",
    lastVisit: "Apr 3, 2025",
    status: "stable",
    appointmentDate: "Apr 20, 2025"
  },
  {
    id: "pat2",
    name: "Robert Johnson",
    age: 45,
    gender: "Male",
    phone: "+1 555-987-6543",
    email: "robert.johnson@example.com",
    condition: "Diabetes Type 2",
    lastVisit: "Mar 28, 2025",
    status: "needs-attention",
    treatment: "Insulin therapy"
  },
  {
    id: "pat3",
    name: "Emily Williams",
    age: 27,
    gender: "Female",
    phone: "+1 555-456-7890",
    email: "emily.williams@example.com",
    condition: "Migraine",
    lastVisit: "Apr 1, 2025",
    status: "stable",
    appointmentDate: "Apr 22, 2025"
  },
  {
    id: "pat4",
    name: "Michael Brown",
    age: 52,
    gender: "Male",
    phone: "+1 555-789-0123",
    email: "michael.brown@example.com",
    condition: "Arthritis",
    lastVisit: "Apr 5, 2025",
    status: "critical",
    treatment: "Pain management therapy"
  },
  {
    id: "pat5",
    name: "Sarah Davis",
    age: 41,
    gender: "Female",
    phone: "+1 555-234-5678",
    email: "sarah.davis@example.com",
    condition: "Asthma",
    lastVisit: "Mar 20, 2025",
    status: "stable",
    appointmentDate: "Apr 25, 2025"
  },
  {
    id: "pat6",
    name: "David Miller",
    age: 38,
    gender: "Male",
    phone: "+1 555-345-6789",
    email: "david.miller@example.com",
    condition: "Anxiety",
    lastVisit: "Mar 15, 2025",
    status: "needs-attention",
    treatment: "Cognitive behavioral therapy"
  },
];

const DoctorPatientsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const navigate = useNavigate();

  const filteredPatients = mockPatients
    .filter(patient => {
      if (activeTab === 'critical' && patient.status !== 'critical') return false;
      if (activeTab === 'needs-attention' && patient.status !== 'needs-attention') return false;
      if (activeTab === 'stable' && patient.status !== 'stable') return false;
      if (!searchTerm) return true;
      
      return (
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.condition.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

  const handlePatientSelect = (patient: Patient) => {
    setSelectedPatient(patient);
  };

  const handlePatientDetails = (patientId: string) => {
    navigate(`/doctor/patients/${patientId}`);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const statusColors = {
    'stable': 'bg-green-100 text-green-800',
    'needs-attention': 'bg-yellow-100 text-yellow-800',
    'critical': 'bg-red-100 text-red-800'
  };

  const statusLabels = {
    'stable': 'Stable',
    'needs-attention': 'Needs Attention',
    'critical': 'Critical'
  };

  return (
    <MainLayout>
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-1">My Patients</h1>
        <p className="text-muted-foreground mb-6">Manage and view patient information</p>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-1 space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Patient List</CardTitle>
                <CardDescription>Manage your patients</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search patients..."
                      className="pl-9"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  
                  <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="w-full">
                      <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
                      <TabsTrigger value="critical" className="flex-1">Critical</TabsTrigger>
                      <TabsTrigger value="needs-attention" className="flex-1">Attention</TabsTrigger>
                      <TabsTrigger value="stable" className="flex-1">Stable</TabsTrigger>
                    </TabsList>
                  </Tabs>
                  
                  <div className="space-y-2 max-h-[500px] overflow-y-auto">
                    {filteredPatients.length > 0 ? (
                      filteredPatients.map(patient => (
                        <div 
                          key={patient.id}
                          className={`p-3 border rounded-md cursor-pointer hover:bg-gray-50 transition-colors ${selectedPatient?.id === patient.id ? 'border-primary bg-primary/5' : ''}`}
                          onClick={() => handlePatientSelect(patient)}
                        >
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarFallback className="bg-primary/10 text-primary">
                                {getInitials(patient.name)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <p className="font-medium truncate">{patient.name}</p>
                                <Badge className={statusColors[patient.status]}>
                                  {statusLabels[patient.status]}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">{patient.age} • {patient.gender}</p>
                              <p className="text-xs text-muted-foreground truncate">{patient.condition}</p>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-6">
                        <p className="text-muted-foreground">No patients found</p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-2">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Patient Details</CardTitle>
              </CardHeader>
              <CardContent>
                {selectedPatient ? (
                  <div className="space-y-6">
                    <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
                      <Avatar className="h-20 w-20">
                        <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                          {getInitials(selectedPatient.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h2 className="text-2xl font-semibold">{selectedPatient.name}</h2>
                          <Badge className={statusColors[selectedPatient.status]}>
                            {statusLabels[selectedPatient.status]}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground">
                          {selectedPatient.age} years • {selectedPatient.gender}
                        </p>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Phone className="h-3 w-3" />
                            <span>{selectedPatient.phone}</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Mail className="h-3 w-3" />
                            <span>{selectedPatient.email}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="h-9">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          Message
                        </Button>
                        <Button size="sm" className="h-9" onClick={() => handlePatientDetails(selectedPatient.id)}>
                          View Full Profile
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Medical Condition</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div>
                              <p className="font-medium">{selectedPatient.condition}</p>
                              <p className="text-sm text-muted-foreground">
                                {selectedPatient.treatment || "No active treatment plan"}
                              </p>
                            </div>
                            <div className="flex items-center gap-1 text-sm">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span>Last visit: {selectedPatient.lastVisit}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Appointment</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {selectedPatient.appointmentDate ? (
                              <div>
                                <p className="font-medium">Next appointment</p>
                                <div className="flex items-center gap-1 text-sm">
                                  <Calendar className="h-4 w-4 text-muted-foreground" />
                                  <span>{selectedPatient.appointmentDate}</span>
                                </div>
                              </div>
                            ) : (
                              <div>
                                <p className="text-muted-foreground">No upcoming appointments</p>
                              </div>
                            )}
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" className="h-8">Reschedule</Button>
                              <Button size="sm" className="h-8">Schedule New</Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Quick Actions</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Button variant="outline" className="h-auto py-3 flex flex-col items-center gap-2">
                          <FileText className="h-5 w-5" />
                          <span>Medical Records</span>
                        </Button>
                        <Button variant="outline" className="h-auto py-3 flex flex-col items-center gap-2">
                          <Activity className="h-5 w-5" />
                          <span>Health Metrics</span>
                        </Button>
                        <Button variant="outline" className="h-auto py-3 flex flex-col items-center gap-2" onClick={() => navigate('/doctor/prescriptions/new')}>
                          <Filter className="h-5 w-5" />
                          <span>Write Prescription</span>
                        </Button>
                        <Button variant="outline" className="h-auto py-3 flex flex-col items-center gap-2" onClick={() => navigate('/doctor/lab-tests')}>
                          <Filter className="h-5 w-5" />
                          <span>Order Lab Test</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <User className="h-16 w-16 text-muted-foreground opacity-30 mb-4" />
                    <h3 className="text-xl font-medium mb-1">No Patient Selected</h3>
                    <p className="text-muted-foreground">Select a patient from the list to view details</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

import { User } from 'lucide-react';
export default DoctorPatientsPage;
