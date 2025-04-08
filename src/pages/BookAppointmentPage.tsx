
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { SelectValue, SelectTrigger, SelectContent, SelectItem, Select } from '@/components/ui/select';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

type Doctor = {
  id: string;
  name: string;
  specialty: string;
  avatar?: string;
};

// Mock doctors data
const mockDoctors: Doctor[] = [
  { id: 'doc1', name: 'Dr. Sarah Johnson', specialty: 'Cardiologist' },
  { id: 'doc2', name: 'Dr. Michael Chen', specialty: 'Dermatologist' },
  { id: 'doc3', name: 'Dr. Emily Rodriguez', specialty: 'General Practitioner' },
  { id: 'doc4', name: 'Dr. James Wilson', specialty: 'Neurologist' },
  { id: 'doc5', name: 'Dr. Lisa Thompson', specialty: 'Pediatrician' },
  { id: 'doc6', name: 'Dr. Robert Garcia', specialty: 'Orthopedic Surgeon' },
];

const BookAppointmentPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedDoctor, setSelectedDoctor] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [reason, setReason] = useState<string>('');
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  // Generate available time slots
  const generateTimeSlots = () => {
    const slots = [];
    for (let i = 9; i <= 16; i++) {
      slots.push(`${i}:00`);
      slots.push(`${i}:30`);
    }
    return slots;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 1) {
      if (!selectedDoctor) {
        toast.error("Please select a doctor");
        return;
      }
      setStep(2);
      return;
    }
    
    if (step === 2) {
      if (!selectedDate) {
        toast.error("Please select a date");
        return;
      }
      setStep(3);
      return;
    }
    
    if (step === 3) {
      if (!selectedTime) {
        toast.error("Please select a time");
        return;
      }
      setStep(4);
      return;
    }
    
    // Final submission
    toast.success("Appointment booked successfully! We'll notify you when the doctor confirms.");
    setTimeout(() => {
      navigate('/appointments');
    }, 2000);
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Select Doctor</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockDoctors.map(doctor => (
                <Card 
                  key={doctor.id}
                  className={`cursor-pointer hover:border-primary transition-colors ${selectedDoctor === doctor.id ? 'border-primary bg-primary/5' : ''}`}
                  onClick={() => setSelectedDoctor(doctor.id)}
                >
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                      {doctor.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium">{doctor.name}</p>
                      <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Select Date</h2>
            <p>Choose a date for your appointment with {mockDoctors.find(d => d.id === selectedDoctor)?.name}</p>
            <div className="flex justify-center">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
                disabled={(date) => {
                  // Disable past dates and weekends
                  return date < new Date() || date.getDay() === 0 || date.getDay() === 6;
                }}
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Select Time</h2>
            <p>Choose an available time on {selectedDate && format(selectedDate, 'MMMM dd, yyyy')}</p>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
              {generateTimeSlots().map((time) => (
                <button
                  key={time}
                  type="button"
                  className={`p-3 border rounded-md hover:bg-primary/5 ${selectedTime === time ? 'bg-primary text-primary-foreground hover:bg-primary' : ''}`}
                  onClick={() => setSelectedTime(time)}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Appointment Details</h2>
            <div className="space-y-3">
              <div className="p-4 bg-muted rounded-md">
                <p><span className="font-medium">Doctor:</span> {mockDoctors.find(d => d.id === selectedDoctor)?.name}</p>
                <p><span className="font-medium">Specialty:</span> {mockDoctors.find(d => d.id === selectedDoctor)?.specialty}</p>
                <p><span className="font-medium">Date:</span> {selectedDate && format(selectedDate, 'MMMM dd, yyyy')}</p>
                <p><span className="font-medium">Time:</span> {selectedTime}</p>
              </div>
              
              <div>
                <label htmlFor="reason" className="block text-sm font-medium mb-1">
                  Reason for Visit
                </label>
                <textarea
                  id="reason"
                  rows={4}
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Please describe your symptoms or reason for the appointment"
                ></textarea>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Book Appointment</h1>
          <p className="text-muted-foreground">Schedule a consultation with a healthcare professional</p>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].map((i) => (
              <React.Fragment key={i}>
                <div className="flex flex-col items-center">
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center ${step >= i ? 'bg-primary text-white' : 'bg-gray-200'}`}>
                    {i}
                  </div>
                  <span className="text-xs mt-1">
                    {i === 1 ? 'Doctor' : i === 2 ? 'Date' : i === 3 ? 'Time' : 'Confirm'}
                  </span>
                </div>
                {i < 4 && (
                  <div className={`flex-1 h-1 ${step > i ? 'bg-primary' : 'bg-gray-200'}`}></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <Card>
            <CardContent className="pt-6">
              {renderStepContent()}
              
              <div className="flex justify-between mt-6">
                {step > 1 && (
                  <Button type="button" variant="outline" onClick={() => setStep(step - 1)}>
                    Previous
                  </Button>
                )}
                <div className="flex-1"></div>
                <Button type="submit">
                  {step < 4 ? 'Next' : 'Book Appointment'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </MainLayout>
  );
};

export default BookAppointmentPage;
