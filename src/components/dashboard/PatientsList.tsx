
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Calendar, Activity, AlertCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

interface PatientData {
  id: string;
  name: string;
  age: string;
  lastVisit: string;
  condition: string;
  status?: "stable" | "needs-attention" | "critical";
  avatar?: string;
}

const mockPatients: PatientData[] = [
  {
    id: "pat1",
    name: "Jane Smith",
    age: "34",
    lastVisit: "Apr 3, 2025",
    condition: "Hypertension",
    status: "stable",
  },
  {
    id: "pat2",
    name: "Robert Johnson",
    age: "45",
    lastVisit: "Mar 28, 2025",
    condition: "Diabetes Type 2",
    status: "needs-attention",
  },
  {
    id: "pat3",
    name: "Emily Williams",
    age: "27",
    lastVisit: "Apr 1, 2025",
    condition: "Migraine",
    status: "stable",
  },
  {
    id: "pat4",
    name: "Michael Brown",
    age: "52",
    lastVisit: "Apr 5, 2025",
    condition: "Arthritis",
    status: "critical",
  },
];

const PatientCard = ({ patient }: { patient: PatientData }) => {
  const navigate = useNavigate();
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

  const handleViewPatient = () => {
    navigate(`/doctor/patients/${patient.id}`);
  };

  return (
    <div className="flex gap-3 p-3 border rounded-lg mb-2 hover:shadow-sm transition-shadow">
      <Avatar>
        <AvatarImage src={patient.avatar} />
        <AvatarFallback className="bg-primary/10 text-primary">
          {getInitials(patient.name)}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-semibold">{patient.name}</h4>
              {patient.status && (
                <Badge className={statusColors[patient.status] || 'bg-gray-100'}>
                  {patient.status === 'needs-attention' ? 'Needs Attention' : 
                   patient.status === 'critical' ? 'Critical' : 'Stable'}
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              Age: {patient.age} • {patient.condition}
            </p>
          </div>
        </div>
        <div className="flex items-center text-xs text-muted-foreground mt-1">
          <Calendar className="mr-1 h-3 w-3" />
          Last visit: {patient.lastVisit}
        </div>
        <div className="mt-2 flex gap-2">
          <Button variant="outline" size="sm" className="h-8 px-2 text-xs" onClick={handleViewPatient}>
            <FileText className="mr-1 h-3 w-3" />
            Records
          </Button>
          <Button variant="outline" size="sm" className="h-8 px-2 text-xs" onClick={handleViewPatient}>
            <Activity className="mr-1 h-3 w-3" />
            Vitals
          </Button>
          {patient.status === 'critical' && (
            <Button variant="destructive" size="sm" className="h-8 px-2 text-xs" onClick={handleViewPatient}>
              <AlertCircle className="mr-1 h-3 w-3" />
              Alert
            </Button>
          )}
        </div>
      </div>
      <Button variant="ghost" size="sm" onClick={handleViewPatient}>View</Button>
    </div>
  );
};

export const PatientsList = () => {
  const navigate = useNavigate();
  const recentPatients = mockPatients.slice(0, 4);

  return (
    <Card className="col-span-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-xl">Recent Patients</CardTitle>
          <CardDescription>Your recently treated patients</CardDescription>
        </div>
        <Button variant="outline" size="sm" onClick={() => navigate('/doctor/patients')}>
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {recentPatients.map((patient) => (
            <PatientCard key={patient.id} patient={patient} />
          ))}
          <Button variant="outline" className="w-full mt-4" onClick={() => navigate('/doctor/patients')}>
            View All Patients
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

import { FileText } from "lucide-react";
