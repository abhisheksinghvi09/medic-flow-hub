
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, Users, FileText, Stethoscope, Pill, Settings, UserCheck, Building } from 'lucide-react';
import { Profile } from '@/types/database.types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';

interface AdminDashboardProps {
  profile: Profile;
}

export const AdminDashboard = ({ profile }: AdminDashboardProps) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome, {profile.name || 'Admin'}
        </h1>
        <p className="text-muted-foreground">
          Hospital administration dashboard - System overview and management
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Registered Users"
          value="532"
          icon={<Users className="h-5 w-5" />}
          description="86 new this month"
          trend="up"
          trendValue="12%"
        />
        <StatsCard
          title="Active Doctors"
          value="48"
          icon={<UserCheck className="h-5 w-5" />}
          description="8 pending verification"
        />
        <StatsCard
          title="Daily Appointments"
          value="124"
          icon={<Calendar className="h-5 w-5" />}
          description="Today's schedule"
          trend="up"
          trendValue="5%"
        />
        <StatsCard
          title="System Health"
          value="98%"
          icon={<Settings className="h-5 w-5" />}
          description="All systems operational"
          trend="up"
          trendValue="2%"
        />
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Hospital Departments</CardTitle>
            <CardDescription>Overview of all clinical departments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {['Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 'Oncology'].map((dept, i) => (
                <div key={i} className="flex justify-between items-center p-3 border rounded-md">
                  <div className="flex items-center">
                    <div className="bg-primary/10 p-2 rounded-full mr-3">
                      <Building className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{dept}</p>
                      <p className="text-sm text-muted-foreground">{5 + i} doctors</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">View</Button>
                </div>
              ))}
              <Button variant="outline" className="w-full" onClick={() => navigate('/departments')}>
                Manage Departments
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Recent Activities</CardTitle>
            <CardDescription>System actions and events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {text: 'New doctor registered (Dr. James Wilson)', time: '10 minutes ago'},
                {text: 'System backup completed', time: '2 hours ago'},
                {text: 'Database maintenance performed', time: '5 hours ago'},
                {text: 'New patient registered (Emily Parker)', time: '1 day ago'},
                {text: 'Updated billing system', time: '2 days ago'}
              ].map((activity, i) => (
                <div key={i} className="flex items-start gap-3 pb-3 border-b last:border-0">
                  <div className="h-2 w-2 mt-2 rounded-full bg-primary" />
                  <div>
                    <p className="text-sm">{activity.text}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full" onClick={() => navigate('/logs')}>
                View All Activities
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Admin Services</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <ServiceCard 
            title="User Management" 
            description="Manage users and permissions"
            icon={<Users className="h-6 w-6" />}
            href="/admin/users"
            color="bg-blue-50 text-blue-700 hover:bg-blue-100"
          />
          <ServiceCard 
            title="Department Management" 
            description="Manage hospital departments"
            icon={<Building className="h-6 w-6" />}
            href="/admin/departments"
            color="bg-green-50 text-green-700 hover:bg-green-100"
          />
          <ServiceCard 
            title="Doctor Verification" 
            description="Verify doctor credentials"
            icon={<UserCheck className="h-6 w-6" />}
            href="/admin/verification"
            color="bg-purple-50 text-purple-700 hover:bg-purple-100"
          />
          <ServiceCard 
            title="System Settings" 
            description="Configure system preferences"
            icon={<Settings className="h-6 w-6" />}
            href="/admin/settings"
            color="bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
          />
          <ServiceCard 
            title="Billing Management" 
            description="Manage billing and payments"
            icon={<Pill className="h-6 w-6" />}
            href="/admin/billing"
            color="bg-amber-50 text-amber-700 hover:bg-amber-100"
          />
          <ServiceCard 
            title="System Logs" 
            description="View system activity logs"
            icon={<FileText className="h-6 w-6" />}
            href="/admin/logs"
            color="bg-red-50 text-red-700 hover:bg-red-100"
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
