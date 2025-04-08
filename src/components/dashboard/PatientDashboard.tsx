
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, Stethoscope, Pill, Plane, FileText, Activity, AlertCircle, HeartPulse } from 'lucide-react';
import { DashboardStats } from '@/components/dashboard/DashboardStats';
import { RecentAppointments } from '@/components/dashboard/RecentAppointments';
import { HealthStatus } from '@/components/dashboard/HealthStatus';
import { Profile } from '@/types/database.types';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { HealthMetricsForm } from '@/components/health/HealthMetricsForm';
import { HealthVisualization3D } from '@/components/health/HealthVisualization3D';

interface PatientDashboardProps {
  profile: Profile;
}

export const PatientDashboard = ({ profile }: PatientDashboardProps) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  
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
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 w-full max-w-2xl">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="metrics">Record Metrics</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="records">Medical Records</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6 mt-6">
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
                <Button onClick={() => setActiveTab('metrics')} variant="outline" className="bg-white h-auto py-4 flex flex-col items-center gap-2">
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
                priority={true}
              />
              <ServiceCard 
                title="Health Metrics" 
                description="Track your health data"
                icon={<HeartPulse className="h-6 w-6" />}
                href="/health-metrics"
                color="bg-teal-50 text-teal-700 hover:bg-teal-100"
                priority={true}
              />
              <ServiceCard 
                title="Medical Records" 
                description="View your medical history"
                icon={<FileText className="h-6 w-6" />}
                href="/medical-records"
                color="bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
                priority={true}
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
        </TabsContent>
        
        <TabsContent value="metrics" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <HealthMetricsForm />
            </div>
            <div>
              <HealthVisualization3D />
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Why Track Your Health?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Regular monitoring of your vital signs helps your healthcare providers
                    make better decisions about your treatment. It also helps you stay
                    aware of your health status and make informed lifestyle choices.
                  </p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-medical-primary"></div>
                      <p className="text-sm">Track trends in your health over time</p>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-medical-primary"></div>
                      <p className="text-sm">Get early warnings about potential health issues</p>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-medical-primary"></div>
                      <p className="text-sm">Share accurate information with your doctor</p>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="appointments" className="mt-6">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2">
              <RecentAppointments />
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Schedule a New Appointment</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    Choose a specialist and find available time slots for your next appointment.
                  </p>
                  <Button onClick={handleAppointmentBook}>Book Appointment</Button>
                </CardContent>
              </Card>
            </div>
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Appointment Guidelines</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm">
                    <strong>Before Your Visit:</strong> Please arrive 15 minutes early to complete any necessary paperwork.
                  </p>
                  <p className="text-sm">
                    <strong>Cancellation Policy:</strong> Please notify us at least 24 hours before your scheduled appointment if you need to cancel.
                  </p>
                  <p className="text-sm">
                    <strong>What to Bring:</strong> Your ID, insurance card, and a list of current medications.
                  </p>
                  <p className="text-sm">
                    <strong>Telemedicine:</strong> For virtual appointments, check your email for the link 15 minutes before your scheduled time.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="records" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-medical-primary" />
                Medical Records
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground mb-4">
                View and manage your complete medical history
              </p>
              <Button 
                onClick={() => navigate('/medical-records')}
                className="w-full"
              >
                Access Medical Records
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  color?: string;
  priority?: boolean;
}

const ServiceCard = ({ 
  title, 
  description, 
  icon, 
  href, 
  color = "bg-gray-50 text-gray-700 hover:bg-gray-100", 
  priority = false 
}: ServiceCardProps) => {
  return (
    <a 
      href={href} 
      className={`p-6 rounded-xl transition-colors ${color} block ${
        priority ? 'border-2 border-medical-primary/30' : ''
      }`}
    >
      <div className="flex flex-col items-center text-center space-y-3">
        <div className={`rounded-full p-3 bg-white/50 backdrop-blur ${
          priority ? 'ring-2 ring-medical-primary/20' : ''
        }`}>
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
