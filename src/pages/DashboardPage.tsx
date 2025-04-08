
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { PatientDashboard } from '@/components/dashboard/PatientDashboard';
import { DoctorDashboard } from '@/components/dashboard/DoctorDashboard';
import { AdminDashboard } from '@/components/dashboard/AdminDashboard';
import { useAuth } from '@/contexts/AuthContext';
import { Loader } from '@/components/ui/loader';

export default function DashboardPage() {
  const { profile, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login if no authenticated user
    if (!isLoading && !profile) {
      navigate('/auth/login');
    }
  }, [isLoading, profile, navigate]);

  if (isLoading) {
    return <Loader />;
  }

  if (!profile) {
    return <Loader />;
  }

  // Define allowed components based on role
  const DashboardComponent = {
    admin: AdminDashboard,
    doctor: DoctorDashboard,
    patient: PatientDashboard
  }[profile.role] || PatientDashboard;

  return (
    <MainLayout 
      allowedRoles={["patient", "doctor", "admin"]}
      requireAuth={true}
    >
      <DashboardComponent profile={profile} />
    </MainLayout>
  );
}
