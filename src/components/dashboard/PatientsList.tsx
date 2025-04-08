
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Calendar } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface PatientData {
  id: string;
  name: string;
  age: string;
  lastVisit: string;
  condition: string;
  avatar?: string;
}

const mockPatients: PatientData[] = [
  {
    id: "pat1",
    name: "Jane Smith",
    age: "34",
    lastVisit: "Apr 3, 2025",
    condition: "Hypertension",
  },
  {
    id: "pat2",
    name: "Robert Johnson",
    age: "45",
    lastVisit: "Mar 28, 2025",
    condition: "Diabetes Type 2",
  },
  {
    id: "pat3",
    name: "Emily Williams",
    age: "27",
    lastVisit: "Apr 1, 2025",
    condition: "Migraine",
  },
  {
    id: "pat4",
    name: "Michael Brown",
    age: "52",
    lastVisit: "Apr 5, 2025",
    condition: "Arthritis",
  },
];

const PatientCard = ({ patient }: { patient: PatientData }) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
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
            <h4 className="font-semibold">{patient.name}</h4>
            <p className="text-sm text-muted-foreground">
              Age: {patient.age} • {patient.condition}
            </p>
          </div>
        </div>
        <div className="flex items-center text-xs text-muted-foreground mt-1">
          <Calendar className="mr-1 h-3 w-3" />
          Last visit: {patient.lastVisit}
        </div>
      </div>
      <Button variant="ghost" size="sm">View</Button>
    </div>
  );
};

export const PatientsList = () => {
  const recentPatients = mockPatients.slice(0, 4);

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle className="text-xl">Recent Patients</CardTitle>
        <CardDescription>Your recently treated patients</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {recentPatients.map((patient) => (
            <PatientCard key={patient.id} patient={patient} />
          ))}
          <Button variant="outline" className="w-full mt-4" asChild>
            <a href="/doctor/patients">View All Patients</a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
