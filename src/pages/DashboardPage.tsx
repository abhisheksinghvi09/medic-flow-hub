import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { DashboardStats } from '@/components/dashboard/DashboardStats';
import { RecentAppointments } from '@/components/dashboard/RecentAppointments';
import { HealthStatus } from '@/components/dashboard/HealthStatus';
import { Button } from '@/components/ui/button';
import { Calendar, Stethoscope, Pill, Plane } from 'lucide-react';

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate('/auth/login');
    }
    setIsLoading(false);
  }, [navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <MainLayout userRole={user?.role}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome, {user?.name || 'User'}
          </h1>
          <p className="text-muted-foreground">
            Here's an overview of your health and upcoming medical appointments
          </p>
        </div>
        
        <DashboardStats />
        
        <div className="grid gap-6 md:grid-cols-2">
          <RecentAppointments />
          <HealthStatus />
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Quick Services</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <ServiceCard 
              title="Book Appointment" 
              description="Schedule a doctor visit"
              icon={<Calendar className="h-6 w-6" />}
              href="/appointments/book"
              color="bg-blue-50 text-blue-700 hover:bg-blue-100"
            />
            <ServiceCard 
              title="Disease Check" 
              description="AI-based symptom analysis"
              icon={<Stethoscope className="h-6 w-6" />}
              href="/disease-detection"
              color="bg-green-50 text-green-700 hover:bg-green-100"
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
    </MainLayout>
  );
}

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
