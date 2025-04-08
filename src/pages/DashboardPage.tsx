
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

  return (
    <MainLayout>
      {profile.role === 'admin' ? (
        <AdminDashboard profile={profile} />
      ) : profile.role === 'doctor' ? (
        <DoctorDashboard profile={profile} />
      ) : (
        <PatientDashboard profile={profile} />
      )}
    </MainLayout>
  );
}
