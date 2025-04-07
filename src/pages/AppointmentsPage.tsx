
import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Clock, MapPin, User, X } from 'lucide-react';

interface Appointment {
  id: string;
  doctorName: string;
  doctorId: string;
  speciality: string;
  date: Date;
  time: string;
  duration: number;
  location: string;
  status: 'upcoming' | 'completed' | 'canceled';
  notes?: string;
}

const mockAppointments: Appointment[] = [
  {
    id: 'app1',
    doctorName: 'Dr. Sarah Johnson',
    doctorId: 'doc1',
    speciality: 'Cardiologist',
    date: new Date(2025, 3, 10),
    time: '10:00 AM',
    duration: 30,
    location: 'Main Hospital, Floor 3',
    status: 'upcoming'
  },
  {
    id: 'app2',
    doctorName: 'Dr. Michael Chen',
    doctorId: 'doc2',
    speciality: 'Dermatologist',
    date: new Date(2025, 3, 15),
    time: '2:30 PM',
    duration: 45,
    location: 'West Wing, Office 205',
    status: 'upcoming'
  },
  {
    id: 'app3',
    doctorName: 'Dr. Emily Rodriguez',
    doctorId: 'doc3',
    speciality: 'General Practitioner',
    date: new Date(2025, 2, 30),
    time: '9:15 AM',
    duration: 30,
    location: 'Main Hospital, Floor 1',
    status: 'completed',
    notes: 'Regular check-up, all vitals normal. Follow up in 6 months.'
  }
];

interface Doctor {
  id: string;
  name: string;
  speciality: string;
  image: string;
  availability: {
    day: string;
    slots: string[];
  }[];
}

const mockDoctors: Doctor[] = [
  {
    id: 'doc1',
    name: 'Dr. Sarah Johnson',
    speciality: 'Cardiologist',
    image: '👩‍⚕️',
    availability: [
      { 
        day: '2025-04-12', 
        slots: ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM'] 
      },
      { 
        day: '2025-04-13', 
        slots: ['9:00 AM', '10:00 AM', '2:00 PM', '3:00 PM'] 
      },
    ]
  },
  {
    id: 'doc2',
    name: 'Dr. Michael Chen',
    speciality: 'Dermatologist',
    image: '👨‍⚕️',
    availability: [
      { 
        day: '2025-04-12', 
        slots: ['1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'] 
      },
      { 
        day: '2025-04-14', 
        slots: ['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM'] 
      },
    ]
  },
  {
    id: 'doc3',
    name: 'Dr. Emily Rodriguez',
    speciality: 'General Practitioner',
    image: '👩‍⚕️',
    availability: [
      { 
        day: '2025-04-11', 
        slots: ['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM'] 
      },
      { 
        day: '2025-04-12', 
        slots: ['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM'] 
      },
    ]
  },
  {
    id: 'doc4',
    name: 'Dr. James Wilson',
    speciality: 'Neurologist',
    image: '👨‍⚕️',
    availability: [
      { 
        day: '2025-04-13', 
        slots: ['10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM'] 
      },
      { 
        day: '2025-04-14', 
        slots: ['10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM'] 
      },
    ]
  },
];

export default function AppointmentsPage() {
  // State for appointments
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
  
  // State for booking process
  const [bookingStep, setBookingStep] = useState(1);
  const [selectedSpeciality, setSelectedSpeciality] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState('');
  const [bookingReason, setBookingReason] = useState('');
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false);
  
  // Filter appointments by status
  const upcomingAppointments = appointments.filter(app => app.status === 'upcoming');
  const pastAppointments = appointments.filter(app => app.status === 'completed' || app.status === 'canceled');
  
  // Specialities from the doctors list
  const specialities = Array.from(new Set(mockDoctors.map(doctor => doctor.speciality)));
  
  // Filter doctors by speciality
  const filteredDoctors = selectedSpeciality 
    ? mockDoctors.filter(doctor => doctor.speciality === selectedSpeciality)
    : mockDoctors;
  
  // Get available slots for selected doctor and date
  const getAvailableSlots = () => {
    if (!selectedDoctor || !selectedDate) return [];
    
    const dateString = format(selectedDate, 'yyyy-MM-dd');
    const availabilityForDay = selectedDoctor.availability.find(a => a.day === dateString);
    
    return availabilityForDay ? availabilityForDay.slots : [];
  };
  
  // Handle appointment cancellation
  const handleCancelAppointment = (id: string) => {
    setAppointments(prev => 
      prev.map(app => 
        app.id === id 
          ? { ...app, status: 'canceled' } 
          : app
      )
    );
    toast.success('Appointment cancelled successfully');
  };
  
  // Handle appointment booking
  const handleBookAppointment = () => {
    if (!selectedDoctor || !selectedDate || !selectedTime) {
      toast.error('Please complete all required fields');
      return;
    }
    
    // Create new appointment
    const newAppointment: Appointment = {
      id: `app${Date.now()}`,
      doctorName: selectedDoctor.name,
      doctorId: selectedDoctor.id,
      speciality: selectedDoctor.speciality,
      date: selectedDate,
      time: selectedTime,
      duration: 30,
      location: 'Main Hospital',
      status: 'upcoming',
      notes: bookingReason || undefined
    };
    
    setAppointments(prev => [...prev, newAppointment]);
    
    // Reset booking state
    setBookingStep(1);
    setSelectedSpeciality('');
    setSelectedDoctor(null);
    setSelectedDate(undefined);
    setSelectedTime('');
    setBookingReason('');
    
    // Close dialog and show toast
    setIsBookingDialogOpen(false);
    toast.success('Appointment booked successfully');
  };
  
  // Go to next booking step
  const nextStep = () => {
    if (bookingStep === 1 && !selectedSpeciality) {
      toast.error('Please select a speciality');
      return;
    }
    
    if (bookingStep === 2 && !selectedDoctor) {
      toast.error('Please select a doctor');
      return;
    }
    
    if (bookingStep === 3 && (!selectedDate || !selectedTime)) {
      toast.error('Please select a date and time');
      return;
    }
    
    setBookingStep(prev => Math.min(prev + 1, 4));
  };
  
  // Go to previous booking step
  const prevStep = () => {
    setBookingStep(prev => Math.max(prev - 1, 1));
  };
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Appointments</h1>
            <p className="text-muted-foreground">
              Manage your medical appointments and schedule new visits
            </p>
          </div>
          
          <Dialog open={isBookingDialogOpen} onOpenChange={setIsBookingDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-medical-primary hover:bg-medical-primary/90">
                Book New Appointment
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Book an Appointment</DialogTitle>
                <DialogDescription>
                  Schedule a new appointment with one of our specialists
                </DialogDescription>
              </DialogHeader>
              
              <div className="py-4">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-full max-w-xs">
                    <div className="relative">
                      <div className="flex items-center justify-between">
                        {[1, 2, 3, 4].map(step => (
                          <div 
                            key={step}
                            className={`z-10 flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                              bookingStep >= step 
                                ? 'bg-medical-primary text-white' 
                                : 'bg-gray-200 text-gray-500'
                            }`}
                          >
                            {step}
                          </div>
                        ))}
                      </div>
                      <div className="absolute top-4 left-0 w-full h-0.5 bg-gray-200">
                        <div 
                          className="h-0.5 bg-medical-primary transition-all" 
                          style={{ width: `${(bookingStep - 1) * 33.33}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                {bookingStep === 1 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Select Speciality</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {specialities.map(speciality => (
                        <div 
                          key={speciality}
                          onClick={() => setSelectedSpeciality(speciality)} 
                          className={`cursor-pointer p-4 rounded-lg border ${
                            selectedSpeciality === speciality 
                              ? 'border-medical-primary bg-medical-primary/5' 
                              : 'border-gray-200 hover:border-medical-primary/50'
                          }`}
                        >
                          <div className="text-center">
                            <p className="font-medium">{speciality}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {bookingStep === 2 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Select Doctor</h3>
                    <div className="grid gap-4">
                      {filteredDoctors.map(doctor => (
                        <div 
                          key={doctor.id}
                          onClick={() => setSelectedDoctor(doctor)} 
                          className={`cursor-pointer flex items-center p-4 rounded-lg border ${
                            selectedDoctor?.id === doctor.id 
                              ? 'border-medical-primary bg-medical-primary/5' 
                              : 'border-gray-200 hover:border-medical-primary/50'
                          }`}
                        >
                          <div className="text-3xl mr-4">{doctor.image}</div>
                          <div>
                            <p className="font-medium">{doctor.name}</p>
                            <p className="text-sm text-muted-foreground">{doctor.speciality}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {bookingStep === 3 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Select Date & Time</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card>
                        <CardContent className="pt-6">
                          <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                            disabled={(date) => {
                              // Disable dates before today
                              const today = new Date();
                              today.setHours(0, 0, 0, 0);
                              
                              // Also disable dates not in doctor's availability
                              if (!selectedDoctor) return date < today;
                              
                              const dateString = format(date, 'yyyy-MM-dd');
                              const isAvailable = selectedDoctor.availability.some(a => a.day === dateString);
                              
                              return date < today || !isAvailable;
                            }}
                            className="rounded-md border"
                          />
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Available Times</CardTitle>
                          {selectedDate && (
                            <CardDescription>
                              {format(selectedDate, 'EEEE, MMMM d, yyyy')}
                            </CardDescription>
                          )}
                        </CardHeader>
                        <CardContent>
                          {!selectedDate ? (
                            <p className="text-muted-foreground">Select a date first</p>
                          ) : getAvailableSlots().length === 0 ? (
                            <p className="text-muted-foreground">No available slots on this date</p>
                          ) : (
                            <div className="grid grid-cols-2 gap-2">
                              {getAvailableSlots().map(time => (
                                <button
                                  key={time}
                                  type="button"
                                  onClick={() => setSelectedTime(time)}
                                  className={`px-3 py-2 text-sm rounded-md ${
                                    selectedTime === time 
                                      ? 'bg-medical-primary text-white' 
                                      : 'border hover:border-medical-primary/50'
                                  }`}
                                >
                                  {time}
                                </button>
                              ))}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                )}
                
                {bookingStep === 4 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Appointment Details</h3>
                    
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="grid gap-3">
                        <div className="flex items-center">
                          <User className="h-5 w-5 mr-2 text-gray-500" />
                          <div>
                            <p className="font-medium">{selectedDoctor?.name}</p>
                            <p className="text-sm text-muted-foreground">{selectedDoctor?.speciality}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <CalendarIcon className="h-5 w-5 mr-2 text-gray-500" />
                          <p>{selectedDate && format(selectedDate, 'EEEE, MMMM d, yyyy')}</p>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-5 w-5 mr-2 text-gray-500" />
                          <p>{selectedTime}</p>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-5 w-5 mr-2 text-gray-500" />
                          <p>Main Hospital</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="reason">Reason for Visit (Optional)</Label>
                      <Input
                        id="reason"
                        placeholder="Briefly describe your symptoms or reason for the appointment"
                        value={bookingReason}
                        onChange={(e) => setBookingReason(e.target.value)}
                      />
                    </div>
                  </div>
                )}
              </div>
              
              <DialogFooter>
                {bookingStep > 1 && (
                  <Button variant="outline" onClick={prevStep}>
                    Back
                  </Button>
                )}
                
                {bookingStep < 4 ? (
                  <Button onClick={nextStep}>
                    Next Step
                  </Button>
                ) : (
                  <Button onClick={handleBookAppointment}>
                    Confirm Booking
                  </Button>
                )}
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="pt-4">
            {upcomingAppointments.length > 0 ? (
              <div className="grid gap-4">
                {upcomingAppointments.map(appointment => (
                  <Card key={appointment.id} className="animate-fade-in">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <CardTitle>{appointment.doctorName}</CardTitle>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="h-8 w-8 text-gray-500 hover:text-red-500"
                          onClick={() => handleCancelAppointment(appointment.id)}
                        >
                          <X className="h-4 w-4" />
                          <span className="sr-only">Cancel</span>
                        </Button>
                      </div>
                      <CardDescription>{appointment.speciality}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="grid gap-2">
                        <div className="flex items-center">
                          <CalendarIcon className="h-4 w-4 mr-2 text-gray-500" />
                          <p className="text-sm">
                            {format(appointment.date, 'EEEE, MMMM d, yyyy')}
                          </p>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-gray-500" />
                          <p className="text-sm">
                            {appointment.time} ({appointment.duration} minutes)
                          </p>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                          <p className="text-sm">{appointment.location}</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm" className="text-xs">
                        Reschedule
                      </Button>
                      <Button size="sm" className="text-xs">
                        View Details
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <h3 className="text-lg font-medium mb-2">No Upcoming Appointments</h3>
                <p className="text-muted-foreground mb-4">You don't have any scheduled appointments</p>
                <Button onClick={() => setIsBookingDialogOpen(true)}>
                  Book an Appointment
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="past" className="pt-4">
            {pastAppointments.length > 0 ? (
              <div className="grid gap-4">
                {pastAppointments.map(appointment => (
                  <Card key={appointment.id} className="animate-fade-in">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <CardTitle>{appointment.doctorName}</CardTitle>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          appointment.status === 'completed' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                        </span>
                      </div>
                      <CardDescription>{appointment.speciality}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="grid gap-2">
                        <div className="flex items-center">
                          <CalendarIcon className="h-4 w-4 mr-2 text-gray-500" />
                          <p className="text-sm">
                            {format(appointment.date, 'EEEE, MMMM d, yyyy')}
                          </p>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-gray-500" />
                          <p className="text-sm">
                            {appointment.time} ({appointment.duration} minutes)
                          </p>
                        </div>
                        {appointment.notes && (
                          <div className="mt-2 p-3 bg-gray-50 rounded-md text-sm">
                            <p className="font-medium mb-1">Notes:</p>
                            <p>{appointment.notes}</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" size="sm" className="w-full text-xs">
                        View Medical Record
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <h3 className="text-lg font-medium mb-2">No Past Appointments</h3>
                <p className="text-muted-foreground">Your appointment history will appear here</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
