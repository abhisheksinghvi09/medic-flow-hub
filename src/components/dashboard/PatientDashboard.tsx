
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, Stethoscope, Pill, Plane, FileText, Activity, AlertCircle, HeartPulse } from 'lucide-react';
import { DashboardStats } from '@/components/dashboard/DashboardStats';
import { RecentAppointments } from '@/components/dashboard/RecentAppointments';
import { HealthStatus } from '@/components/dashboard/HealthStatus';
import { Profile } from '@/types/database.types';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Card } from '@/components/ui/card';

interface PatientDashboardProps {
  profile: Profile;
}

export const PatientDashboard = ({ profile }: PatientDashboardProps) => {
  const navigate = useNavigate();
  
  const handleAppointmentBook = () => {
    navigate('/appointments/book');
  };

  const handleEmergencyAlert = () => {
    toast.error("Emergency assistance requested! A healthcare provider will contact you shortly.", {
      duration: 5000,
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome, {profile.name || 'Patient'}
          </h1>
          <p className="text-muted-foreground">
            Here's an overview of your health and upcoming medical appointments
          </p>
        </div>
        <Button 
          variant="destructive" 
          className="flex items-center gap-2"
          onClick={handleEmergencyAlert}
        >
          <AlertCircle className="h-4 w-4" />
          Emergency Alert
        </Button>
      </div>
      
      <DashboardStats />
      
      <div className="grid gap-6 md:grid-cols-2">
        <RecentAppointments />
        <HealthStatus />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 md:col-span-2">
          <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <Button onClick={() => navigate('/disease-detection')} variant="default" className="h-auto py-4 flex flex-col items-center gap-2 bg-medical-primary hover:bg-medical-primary/90">
              <Stethoscope className="h-5 w-5" />
              <span>Disease Detection</span>
            </Button>
            <Button onClick={() => navigate('/health-metrics/add')} variant="outline" className="bg-white h-auto py-4 flex flex-col items-center gap-2">
              <HeartPulse className="h-5 w-5" />
              <span>Add Health Metrics</span>
            </Button>
            <Button onClick={() => navigate('/medical-records')} variant="outline" className="bg-white h-auto py-4 flex flex-col items-center gap-2">
              <FileText className="h-5 w-5" />
              <span>View Medical Records</span>
            </Button>
            <Button onClick={handleAppointmentBook} variant="outline" className="bg-white h-auto py-4 flex flex-col items-center gap-2">
              <Calendar className="h-5 w-5" />
              <span>Book Appointment</span>
            </Button>
          </div>
        </div>

        <Card className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border-0">
          <h3 className="text-xl font-semibold mb-4">Health Tips</h3>
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h4 className="font-medium">Stay Hydrated</h4>
              <p className="text-sm text-gray-600">Remember to drink at least 8 glasses of water daily.</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h4 className="font-medium">Regular Exercise</h4>
              <p className="text-sm text-gray-600">Aim for 30 minutes of moderate activity each day.</p>
            </div>
          </div>
          <Button variant="link" className="mt-4 p-0" onClick={() => navigate('/health-tips')}>
            View all health tips
          </Button>
        </Card>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Patient Services</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <ServiceCard 
            title="Disease Detection" 
            description="AI-based symptom analysis"
            icon={<Stethoscope className="h-6 w-6" />}
            href="/disease-detection"
            color="bg-green-50 text-green-700 hover:bg-green-100"
          />
          <ServiceCard 
            title="Health Metrics" 
            description="Track your health data"
            icon={<HeartPulse className="h-6 w-6" />}
            href="/health-metrics"
            color="bg-teal-50 text-teal-700 hover:bg-teal-100"
          />
          <ServiceCard 
            title="Medical Records" 
            description="View your medical history"
            icon={<FileText className="h-6 w-6" />}
            href="/medical-records"
            color="bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
          />
          <ServiceCard 
            title="Book Appointment" 
            description="Schedule a doctor visit"
            icon={<Calendar className="h-6 w-6" />}
            href="/appointments/book"
            color="bg-blue-50 text-blue-700 hover:bg-blue-100"
          />
          <ServiceCard 
            title="Order Medication" 
            description="Browse online pharmacy"
            icon={<Pill className="h-6 w-6" />}
            href="/pharmacy"
            color="bg-purple-50 text-purple-700 hover:bg-purple-100"
          />
          <ServiceCard 
            title="Medical Tourism" 
            description="Explore health packages"
            icon={<Plane className="h-6 w-6" />}
            href="/tourism"
            color="bg-amber-50 text-amber-700 hover:bg-amber-100"
          />
        </div>
      </div>
    </div>
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
