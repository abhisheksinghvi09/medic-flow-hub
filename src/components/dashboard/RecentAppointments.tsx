
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
  doctorName: string;
  speciality: string;
  date: string;
  time: string;
  location: string;
  status: "upcoming" | "completed" | "canceled";
}

const mockAppointments: AppointmentData[] = [
  {
    id: "app1",
    doctorName: "Dr. Sarah Johnson",
    speciality: "Cardiologist",
    date: "Apr 10, 2025",
    time: "10:00 AM",
    location: "Main Hospital, Floor 3",
    status: "upcoming",
  },
  {
    id: "app2",
    doctorName: "Dr. Michael Chen",
    speciality: "Dermatologist",
    date: "Apr 15, 2025",
    time: "2:30 PM",
    location: "West Wing, Office 205",
    status: "upcoming",
  },
  {
    id: "app3",
    doctorName: "Dr. Emily Rodriguez",
    speciality: "General Practitioner",
    date: "Mar 30, 2025",
    time: "9:15 AM",
    location: "Main Hospital, Floor 1",
    status: "completed",
  },
];

const AppointmentCard = ({ appointment }: { appointment: AppointmentData }) => {
  const statusColor =
    appointment.status === "upcoming"
      ? "bg-blue-100 text-blue-800"
      : appointment.status === "completed"
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800";

  return (
    <div className="flex gap-4 p-4 border rounded-lg mb-3 hover:shadow-md transition-shadow">
      <div
        className={`flex items-center justify-center w-12 h-12 rounded-full ${
          appointment.status === "upcoming" ? "bg-medical-primary/10" : "bg-gray-100"
        }`}
      >
        <User
          className={
            appointment.status === "upcoming" ? "text-medical-primary" : "text-gray-500"
          }
        />
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="font-semibold">{appointment.doctorName}</h4>
            <p className="text-sm text-muted-foreground">{appointment.speciality}</p>
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
          <div className="flex items-center text-sm text-muted-foreground col-span-2">
            <MapPin className="mr-1 h-3 w-3" />
            {appointment.location}
          </div>
        </div>
      </div>
    </div>
  );
};

export const RecentAppointments = () => {
  const upcomingAppointments = mockAppointments.filter(
    (app) => app.status === "upcoming"
  );

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle className="text-xl">Upcoming Appointments</CardTitle>
        <CardDescription>Your scheduled appointments</CardDescription>
      </CardHeader>
      <CardContent>
        {upcomingAppointments.length > 0 ? (
          <div className="space-y-4">
            {upcomingAppointments.map((appointment) => (
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))}
            <Button variant="outline" className="w-full" asChild>
              <a href="/appointments">View All Appointments</a>
            </Button>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No upcoming appointments</p>
            <Button className="mt-4" asChild>
              <a href="/appointments/book">Book Appointment</a>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
