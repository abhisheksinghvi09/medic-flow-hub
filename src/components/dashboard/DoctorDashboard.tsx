
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, Users, FileText, Stethoscope, Pill, Activity, AlertCircle } from 'lucide-react';
import { Profile } from '@/types/database.types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DoctorAppointments } from './DoctorAppointments';
import { PatientsList } from './PatientsList';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface DoctorDashboardProps {
  profile: Profile;
}

export const DoctorDashboard = ({ profile }: DoctorDashboardProps) => {
  const navigate = useNavigate();

  const handleEmergencyResponse = () => {
    toast.error("Emergency response mode activated! Checking for urgent cases.", {
      duration: 5000,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome, Dr. {profile.name || 'Doctor'}
          </h1>
          <p className="text-muted-foreground">
            Here's an overview of your upcoming appointments and patients
          </p>
        </div>
        <Button 
          variant="destructive" 
          className="flex items-center gap-2"
          onClick={handleEmergencyResponse}
        >
          <AlertCircle className="h-4 w-4" />
          Emergency Response
        </Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Today's Appointments"
          value="5"
          icon={<Calendar className="h-5 w-5" />}
          description="2 pending confirmations"
        />
        <StatsCard
          title="Total Patients"
          value="124"
          icon={<Users className="h-5 w-5" />}
          description="12 new this month"
          trend="up"
          trendValue="8%"
        />
        <StatsCard
          title="Pending Reports"
          value="7"
          icon={<FileText className="h-5 w-5" />}
          description="Due within 48 hours"
          trend="down"
          trendValue="3"
        />
        <StatsCard
          title="Prescription Renewals"
          value="9"
          icon={<Pill className="h-5 w-5" />}
          description="3 need urgent attention"
        />
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <DoctorAppointments />
        <PatientsList />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="bg-medical-primary/10 rounded-xl p-6 md:col-span-2">
          <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <Button onClick={() => navigate('/doctor/schedule')} variant="default" className="h-auto py-4 flex flex-col items-center gap-2">
              <Calendar className="h-5 w-5" />
              <span>Manage Schedule</span>
            </Button>
            <Button onClick={() => navigate('/doctor/prescriptions/new')} variant="outline" className="bg-white h-auto py-4 flex flex-col items-center gap-2">
              <Pill className="h-5 w-5" />
              <span>Write Prescription</span>
            </Button>
            <Button onClick={() => navigate('/doctor/patients')} variant="outline" className="bg-white h-auto py-4 flex flex-col items-center gap-2">
              <Users className="h-5 w-5" />
              <span>Patient Records</span>
            </Button>
            <Button onClick={() => navigate('/doctor/lab-tests')} variant="outline" className="bg-white h-auto py-4 flex flex-col items-center gap-2">
              <Stethoscope className="h-5 w-5" />
              <span>Order Lab Tests</span>
            </Button>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4">Patient Alert</h3>
          <div className="space-y-4">
            <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4 shadow-sm">
              <h4 className="font-medium text-red-700">Critical Alert</h4>
              <p className="text-sm text-red-600">Patient John Doe has abnormal blood pressure readings</p>
              <Button size="sm" variant="destructive" className="mt-2">
                Review Now
              </Button>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h4 className="font-medium">Test Results Available</h4>
              <p className="text-sm text-gray-600">3 new lab results available for review</p>
              <Button size="sm" variant="outline" className="mt-2">
                View Results
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Doctor Services</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <ServiceCard 
            title="Manage Appointments" 
            description="View and update your schedule"
            icon={<Calendar className="h-6 w-6" />}
            href="/doctor/appointments"
            color="bg-blue-50 text-blue-700 hover:bg-blue-100"
          />
          <ServiceCard 
            title="Patient Records" 
            description="Access patient histories"
            icon={<FileText className="h-6 w-6" />}
            href="/doctor/patients"
            color="bg-green-50 text-green-700 hover:bg-green-100"
          />
          <ServiceCard 
            title="Write Prescriptions" 
            description="Create and manage prescriptions"
            icon={<Pill className="h-6 w-6" />}
            href="/doctor/prescriptions"
            color="bg-purple-50 text-purple-700 hover:bg-purple-100"
          />
          <ServiceCard 
            title="Order Lab Tests" 
            description="Request diagnostic tests"
            icon={<Stethoscope className="h-6 w-6" />}
            href="/doctor/lab-tests"
            color="bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
          />
          <ServiceCard 
            title="Patient Vitals" 
            description="Monitor patient health metrics"
            icon={<Activity className="h-6 w-6" />}
            href="/doctor/vitals"
            color="bg-teal-50 text-teal-700 hover:bg-teal-100"
          />
          <ServiceCard 
            title="My Department" 
            description="Department information and colleagues"
            icon={<Users className="h-6 w-6" />}
            href="/doctor/department"
            color="bg-amber-50 text-amber-700 hover:bg-amber-100"
          />
        </div>
      </div>
    </div>
  );
};

interface StatsCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  description?: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
}

const StatsCard = ({
  title,
  value,
  icon,
  description,
  trend,
  trendValue,
}: StatsCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="text-medical-primary">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <div className="flex items-center space-x-1">
            {trend && (
              <span
                className={
                  trend === "up"
                    ? "text-green-500"
                    : trend === "down"
                    ? "text-red-500"
                    : "text-gray-500"
                }
              >
                {trend === "up" ? "↑" : trend === "down" ? "↓" : "→"}
                {trendValue && ` ${trendValue}`}
              </span>
            )}
            <p className="text-xs text-muted-foreground">{description}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  color?: string;
}

const ServiceCard = ({ title, description, icon, href, color = "bg-gray-50 text-gray-700 hover:bg-gray-100" }: ServiceCardProps) => {
  return (
    <a href={href} className={`p-6 rounded-xl transition-colors ${color} block`}>
      <div className="flex flex-col items-center text-center space-y-3">
        <div className="rounded-full p-3 bg-white/50 backdrop-blur">
          {icon}
        </div>
        <div>
          <h3 className="font-medium text-lg">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </a>
  );
};
