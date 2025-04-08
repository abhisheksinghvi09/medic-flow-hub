
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Heart, Stethoscope, Calendar, FileText, User } from 'lucide-react';

const Index = () => {
  const { profile, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If user is already authenticated, redirect to dashboard
    if (!isLoading && profile) {
      navigate("/dashboard");
    }
  }, [isLoading, profile, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-medical-primary border-t-transparent"></div>
      </div>
    );
  }

  // Landing page content for non-authenticated users
  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-primary/5 to-medical-secondary/5">
      {/* Header/Navigation */}
      <header className="container mx-auto py-6 px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Heart className="text-medical-primary" size={32} />
          <span className="text-2xl font-bold text-medical-primary">MedicFlow</span>
        </div>
        <div className="space-x-4">
          <Button variant="ghost" asChild>
            <Link to="/auth/login">Login</Link>
          </Button>
          <Button asChild>
            <Link to="/auth/login?signup=true">Sign Up</Link>
          </Button>
        </div>
      </header>

      {/* Hero section */}
      <section className="container mx-auto px-4 py-20 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Complete Healthcare <span className="text-medical-primary">Management System</span>
          </h1>
          <p className="text-lg text-gray-600 md:max-w-lg">
            A comprehensive platform for patients and healthcare providers, 
            offering seamless appointment scheduling, medical records management, 
            and AI-powered disease detection.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-medical-primary hover:bg-medical-primary/90" asChild>
              <Link to="/auth/login?signup=true">Get Started</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/disease-detection">Try Disease Detection</Link>
            </Button>
          </div>
        </div>
        <div className="flex-1 flex justify-center">
          <div className="relative w-full max-w-lg aspect-square">
            <div className="absolute inset-0 rounded-full bg-medical-primary/10 animate-pulse"></div>
            <Stethoscope className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-medical-primary" size={120} />
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<Stethoscope className="h-10 w-10" />}
            title="AI Disease Detection"
            description="Our advanced AI system analyzes symptoms and provides potential diagnoses with recommendations for next steps."
          />
          <FeatureCard 
            icon={<Calendar className="h-10 w-10" />}
            title="Appointment Management"
            description="Easily schedule, reschedule, and manage appointments with healthcare providers."
          />
          <FeatureCard 
            icon={<FileText className="h-10 w-10" />}
            title="Medical Records"
            description="Securely store and access your complete medical history, prescriptions, and test results."
          />
          <FeatureCard 
            icon={<User className="h-10 w-10" />}
            title="Doctor Dashboard"
            description="Specialized interface for healthcare providers to manage patients, appointments, and medical records."
          />
          <FeatureCard 
            icon={<HeartPulseIcon className="h-10 w-10" />}
            title="Health Metrics Tracking"
            description="Monitor vital signs and health measurements over time with visual analytics."
          />
          <FeatureCard 
            icon={<HospitalIcon className="h-10 w-10" />}
            title="Complete HMS"
            description="Comprehensive hospital management system with role-based access for patients, doctors, and administrators."
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Heart className="text-medical-primary" size={24} />
              <span className="text-xl font-bold text-medical-primary">MedicFlow</span>
            </div>
            <div className="text-sm text-gray-500">
              © {new Date().getFullYear()} MedicFlow. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Custom icon components
const HeartPulseIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    <path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27" />
  </svg>
);

const HospitalIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m6-2V2M5 10h14M9 14h6" />
  </svg>
);

const FeatureCard = ({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
}) => (
  <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
    <div className="text-medical-primary mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default Index;
