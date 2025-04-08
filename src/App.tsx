
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

// Auth & Common Pages
import AuthPage from "./pages/AuthPage";
import DashboardPage from "./pages/DashboardPage";
import ProfilePage from "./pages/ProfilePage";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Patient Pages
import AppointmentsPage from "./pages/AppointmentsPage";
import BookAppointmentPage from "./pages/BookAppointmentPage";
import DiseaseDetection from "./pages/DiseaseDetection";
import HealthMetricsPage from "./pages/HealthMetricsPage";
import MedicalRecordsPage from "./pages/MedicalRecordsPage";
import PharmacyPage from "./pages/PharmacyPage";
import TourismPage from "./pages/TourismPage";

// Doctor Pages
import DoctorPatientsPage from "./pages/doctor/DoctorPatientsPage";
import DoctorSchedulePage from "./pages/doctor/DoctorSchedulePage"; 
import WritePrescriptionsPage from "./pages/doctor/WritePrescriptionsPage";
import OrderLabTestsPage from "./pages/doctor/OrderLabTestsPage";
import PatientDetailsPage from "./pages/doctor/PatientDetailsPage";
import PatientVitalsPage from "./pages/doctor/PatientVitalsPage";
import DepartmentPage from "./pages/doctor/DepartmentPage";

// Admin Pages
import UserManagementPage from "./pages/admin/UserManagementPage";
import DepartmentsManagementPage from "./pages/admin/DepartmentsManagementPage";
import DoctorVerificationPage from "./pages/admin/DoctorVerificationPage";
import SystemSettingsPage from "./pages/admin/SystemSettingsPage";
import SystemLogsPage from "./pages/admin/SystemLogsPage";
import EmergencyServicePage from "./pages/admin/EmergencyServicePage";

// Create pages we don't have yet but need placeholders for
import { lazy, Suspense } from "react";

// Use lazy loading for pages that aren't used as often
const LazyPage = (Component: React.ComponentType) => 
  (props: any) => (
    <Suspense fallback={<div className="flex h-screen w-full items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
    </div>}>
      <Component {...props} />
    </Suspense>
  );

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/auth/login" replace />} />
            <Route path="/auth/login" element={<AuthPage />} />
            
            {/* Common Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } />
            
            {/* Patient Routes */}
            <Route path="/appointments" element={
              <ProtectedRoute>
                <AppointmentsPage />
              </ProtectedRoute>
            } />
            <Route path="/appointments/book" element={
              <ProtectedRoute>
                <BookAppointmentPage />
              </ProtectedRoute>
            } />
            <Route path="/disease-detection" element={
              <ProtectedRoute>
                <DiseaseDetection />
              </ProtectedRoute>
            } />
            <Route path="/health-metrics" element={
              <ProtectedRoute>
                <HealthMetricsPage />
              </ProtectedRoute>
            } />
            <Route path="/health-metrics/add" element={
              <ProtectedRoute>
                <HealthMetricsPage isAddMode={true} />
              </ProtectedRoute>
            } />
            <Route path="/medical-records" element={
              <ProtectedRoute>
                <MedicalRecordsPage />
              </ProtectedRoute>
            } />
            <Route path="/pharmacy" element={
              <ProtectedRoute>
                <PharmacyPage />
              </ProtectedRoute>
            } />
            <Route path="/tourism" element={
              <ProtectedRoute>
                <TourismPage />
              </ProtectedRoute>
            } />
            
            {/* Doctor Routes */}
            <Route path="/doctor/patients" element={
              <ProtectedRoute>
                <DoctorPatientsPage />
              </ProtectedRoute>
            } />
            <Route path="/doctor/patients/:patientId" element={
              <ProtectedRoute>
                <PatientDetailsPage />
              </ProtectedRoute>
            } />
            <Route path="/doctor/schedule" element={
              <ProtectedRoute>
                <DoctorSchedulePage />
              </ProtectedRoute>
            } />
            <Route path="/doctor/prescriptions" element={
              <ProtectedRoute>
                <WritePrescriptionsPage />
              </ProtectedRoute>
            } />
            <Route path="/doctor/prescriptions/new" element={
              <ProtectedRoute>
                <WritePrescriptionsPage isNewMode={true} />
              </ProtectedRoute>
            } />
            <Route path="/doctor/lab-tests" element={
              <ProtectedRoute>
                <OrderLabTestsPage />
              </ProtectedRoute>
            } />
            <Route path="/doctor/vitals" element={
              <ProtectedRoute>
                <PatientVitalsPage />
              </ProtectedRoute>
            } />
            <Route path="/doctor/department" element={
              <ProtectedRoute>
                <DepartmentPage />
              </ProtectedRoute>
            } />
            
            {/* Admin Routes */}
            <Route path="/admin/users" element={
              <ProtectedRoute>
                <UserManagementPage />
              </ProtectedRoute>
            } />
            <Route path="/admin/departments" element={
              <ProtectedRoute>
                <DepartmentsManagementPage />
              </ProtectedRoute>
            } />
            <Route path="/admin/verification" element={
              <ProtectedRoute>
                <DoctorVerificationPage />
              </ProtectedRoute>
            } />
            <Route path="/admin/settings" element={
              <ProtectedRoute>
                <SystemSettingsPage />
              </ProtectedRoute>
            } />
            <Route path="/admin/logs" element={
              <ProtectedRoute>
                <SystemLogsPage />
              </ProtectedRoute>
            } />
            <Route path="/admin/emergency" element={
              <ProtectedRoute>
                <EmergencyServicePage />
              </ProtectedRoute>
            } />

            {/* 404 Not Found */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
