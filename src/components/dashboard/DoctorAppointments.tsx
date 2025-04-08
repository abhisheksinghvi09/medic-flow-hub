
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, User } from "lucide-react";

interface AppointmentData {
  id: string;
  patientName: string;
  patientAge: string;
  date: string;
  time: string;
  reason: string;
  status: "pending" | "confirmed" | "completed" | "canceled";
}

const mockAppointments: AppointmentData[] = [
  {
    id: "app1",
    patientName: "Jane Smith",
    patientAge: "34",
    date: "Apr 10, 2025",
    time: "10:00 AM",
    reason: "Annual check-up",
    status: "confirmed",
  },
  {
    id: "app2",
    patientName: "Robert Johnson",
    patientAge: "45",
    date: "Apr 10, 2025",
    time: "11:30 AM",
    reason: "Blood pressure concerns",
    status: "confirmed",
  },
  {
    id: "app3",
    patientName: "Emily Williams",
    patientAge: "27",
    date: "Apr 10, 2025",
    time: "2:15 PM",
    reason: "Recurring headaches",
    status: "confirmed",
  },
  {
    id: "app4",
    patientName: "Michael Brown",
    patientAge: "52",
    date: "Apr 11, 2025",
    time: "9:00 AM",
    reason: "Follow-up appointment",
    status: "pending",
  },
];

const AppointmentCard = ({ appointment }: { appointment: AppointmentData }) => {
  const statusColor =
    appointment.status === "pending"
      ? "bg-yellow-100 text-yellow-800"
      : appointment.status === "confirmed"
      ? "bg-blue-100 text-blue-800"
      : appointment.status === "completed"
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800";

  return (
    <div className="flex gap-4 p-4 border rounded-lg mb-3 hover:shadow-md transition-shadow">
      <div
        className={`flex items-center justify-center w-12 h-12 rounded-full bg-medical-primary/10`}
      >
        <User className="text-medical-primary" />
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="font-semibold">{appointment.patientName}</h4>
            <p className="text-sm text-muted-foreground">Age: {appointment.patientAge} • {appointment.reason}</p>
          </div>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor}`}
          >
            {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
          </span>
        </div>

        <div className="mt-2 grid grid-cols-2 gap-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="mr-1 h-3 w-3" />
            {appointment.date}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="mr-1 h-3 w-3" />
            {appointment.time}
          </div>
        </div>
        
        <div className="mt-3 flex space-x-2">
          <Button variant="outline" size="sm">View Details</Button>
          <Button size="sm">Start Consultation</Button>
        </div>
      </div>
    </div>
  );
};

export const DoctorAppointments = () => {
  const todaysAppointments = mockAppointments.filter(
    (app) => app.date === "Apr 10, 2025"
  );

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle className="text-xl">Today's Appointments</CardTitle>
        <CardDescription>Your scheduled appointments for today</CardDescription>
      </CardHeader>
      <CardContent>
        {todaysAppointments.length > 0 ? (
          <div className="space-y-4">
            {todaysAppointments.map((appointment) => (
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))}
            <Button variant="outline" className="w-full" asChild>
              <a href="/doctor/appointments">View All Appointments</a>
            </Button>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No appointments scheduled for today</p>
            <Button className="mt-4" asChild>
              <a href="/doctor/appointments">Manage Schedule</a>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
