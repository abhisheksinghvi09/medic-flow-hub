
import React from 'react';
import { AuthForm } from '@/components/auth/AuthForm';

export default function AuthPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-medical-primary/5 to-medical-secondary/5">
      <div className="w-full max-w-5xl px-4 py-8 flex flex-col md:flex-row gap-8">
        {/* Left side - App info */}
        <div className="flex-1 flex flex-col justify-center p-4">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-medical-secondary mb-4">
              MedicFlow
            </h1>
            <p className="text-xl text-gray-600">
              Your complete healthcare management solution
            </p>
          </div>
          
          <div className="space-y-6">
            <FeatureItem 
              title="Appointments"
              description="Book and manage medical appointments with ease"
              icon="🗓️"
            />
            <FeatureItem 
              title="Disease Detection"
              description="Advanced AI-powered disease prediction system"
              icon="🔍"
            />
            <FeatureItem 
              title="Online Pharmacy"
              description="Order medications with doorstep delivery"
              icon="💊"
            />
            <FeatureItem 
              title="Medical Tourism"
              description="Explore healthcare options across destinations"
              icon="✈️"
            />
          </div>
        </div>
        
        {/* Right side - Auth form */}
        <div className="flex-1 flex items-center">
          <AuthForm />
        </div>
      </div>
    </div>
  );
}

const FeatureItem: React.FC<{ title: string; description: string; icon: string }> = ({ 
  title, 
  description,
  icon
}) => (
  <div className="flex items-start">
    <div className="bg-medical-primary/10 p-3 rounded-lg text-2xl">
      {icon}
    </div>
    <div className="ml-4">
      <h3 className="text-lg font-semibold text-medical-secondary">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);
