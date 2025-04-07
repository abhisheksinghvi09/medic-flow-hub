
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Calendar, Globe, Map, Plane, User, Users } from 'lucide-react';

interface Destination {
  id: string;
  name: string;
  country: string;
  description: string;
  specialties: string[];
  rating: number;
  image: string;
  featured: boolean;
}

interface Package {
  id: string;
  name: string;
  destination: string;
  hospitalName: string;
  description: string;
  procedures: string[];
  duration: number;
  price: number;
  inclusions: string[];
  image: string;
}

const mockDestinations: Destination[] = [
  {
    id: 'dest1',
    name: 'Bangkok',
    country: 'Thailand',
    description: 'A leading destination for medical tourism offering high-quality healthcare at affordable prices',
    specialties: ['Cosmetic Surgery', 'Dental Work', 'Heart Surgery'],
    rating: 4.8,
    image: '🇹🇭',
    featured: true
  },
  {
    id: 'dest2',
    name: 'Istanbul',
    country: 'Turkey',
    description: 'Known for world-class healthcare facilities and specialists in hair transplants and dental work',
    specialties: ['Hair Transplant', 'Dental Treatment', 'Laser Eye Surgery'],
    rating: 4.7,
    image: '🇹🇷',
    featured: true
  },
  {
    id: 'dest3',
    name: 'Singapore',
    country: 'Singapore',
    description: 'Premium healthcare destination with cutting-edge technology and internationally accredited hospitals',
    specialties: ['Oncology', 'Cardiology', 'Orthopedics'],
    rating: 4.9,
    image: '🇸🇬',
    featured: false
  },
  {
    id: 'dest4',
    name: 'Mumbai',
    country: 'India',
    description: 'Offering traditional and modern medical treatments at competitive prices',
    specialties: ['Cardiac Surgery', 'Joint Replacement', 'IVF Treatment'],
    rating: 4.6,
    image: '🇮🇳',
    featured: false
  },
];

const mockPackages: Package[] = [
  {
    id: 'pkg1',
    name: 'Complete Health Checkup Package',
    destination: 'Bangkok',
    hospitalName: 'Bumrungrad International Hospital',
    description: 'Comprehensive health screening with premium accommodation and city tour',
    procedures: ['Full Body Checkup', 'Cardiac Assessment', 'Cancer Screening'],
    duration: 5,
    price: 1999,
    inclusions: [
      'Airport pickup and drop-off',
      '4-star hotel accommodation',
      'Personal coordinator',
      'City tour',
      'All medical reports and consultation'
    ],
    image: '🏥'
  },
  {
    id: 'pkg2',
    name: 'Dental Treatment Package',
    destination: 'Istanbul',
    hospitalName: 'DentIstanbul Clinic',
    description: 'Complete dental care including teeth whitening, implants, and more',
    procedures: ['Dental Implants', 'Teeth Whitening', 'Dental Crowns'],
    duration: 7,
    price: 2499,
    inclusions: [
      'Airport pickup and drop-off',
      '5-star hotel accommodation',
      'All dental procedures',
      'Bosphorus cruise tour',
      '24/7 support staff'
    ],
    image: '🦷'
  },
  {
    id: 'pkg3',
    name: 'Cardiac Care Excellence',
    destination: 'Singapore',
    hospitalName: 'Mount Elizabeth Hospital',
    description: 'World-class cardiac care with top specialists and latest technology',
    procedures: ['Cardiac Assessment', 'Angiography', 'Consultation with Specialist'],
    duration: 8,
    price: 3999,
    inclusions: [
      'Premium airport service',
      'Luxury hotel accommodation',
      'All medical procedures',
      'Private nurse',
      'Post-treatment care'
    ],
    image: '❤️'
  },
  {
    id: 'pkg4',
    name: 'Joint Replacement Package',
    destination: 'Mumbai',
    hospitalName: 'Fortis Hospital',
    description: 'Complete care for knee or hip replacement with rehabilitation',
    procedures: ['Joint Replacement Surgery', 'Physiotherapy', 'Rehabilitation'],
    duration: 14,
    price: 8999,
    inclusions: [
      'Airport pickup and drop-off',
      'Hospital accommodation',
      'Surgery and implants',
      'Rehabilitation sessions',
      'Follow-up consultations'
    ],
    image: '🦵'
  },
];

export default function TourismPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Medical Tourism</h1>
          <p className="text-muted-foreground">
            Explore healthcare services around the world with curated medical travel packages
          </p>
        </div>

        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-medical-primary to-medical-secondary p-8 text-white">
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-2xl font-bold mb-2">World-Class Healthcare, Globally</h2>
            <p className="mb-4">
              Access top-quality medical treatments abroad at significant cost savings. Our medical tourism services combine healthcare excellence with the opportunity to recover in beautiful destinations.
            </p>
            <div className="flex gap-3">
              <Badge className="bg-white text-medical-secondary hover:bg-gray-100">24/7 Support</Badge>
              <Badge className="bg-white text-medical-secondary hover:bg-gray-100">Accredited Hospitals</Badge>
              <Badge className="bg-white text-medical-secondary hover:bg-gray-100">All-inclusive Packages</Badge>
            </div>
          </div>
          <div className="absolute right-0 bottom-0 opacity-20 text-[150px]">
            ✈️
          </div>
        </div>

        <Tabs defaultValue="destinations" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="destinations">Popular Destinations</TabsTrigger>
            <TabsTrigger value="packages">Medical Packages</TabsTrigger>
          </TabsList>
          
          <TabsContent value="destinations" className="pt-4">
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
              {mockDestinations.map(destination => (
                <Card key={destination.id} className={destination.featured ? "border-t-4 border-t-medical-primary" : ""}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <span className="text-3xl">{destination.image}</span>
                        <div>
                          <CardTitle>{destination.name}</CardTitle>
                          <CardDescription>{destination.country}</CardDescription>
                        </div>
                      </div>
                      
                      <div className="flex items-center bg-amber-50 text-amber-700 px-2 py-1 rounded text-sm">
                        <span className="mr-1">⭐</span>
                        <span>{destination.rating}</span>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pb-4">
                    <p className="text-sm mb-4">{destination.description}</p>
                    
                    <div className="mb-2">
                      <h4 className="text-sm font-medium mb-2">Medical Specialties</h4>
                      <div className="flex flex-wrap gap-2">
                        {destination.specialties.map(specialty => (
                          <Badge key={specialty} variant="outline">{specialty}</Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  
                  <CardFooter>
                    <Button className="w-full">Explore Packages</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="packages" className="pt-4">
            <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
              {mockPackages.map(pkg => (
                <PackageCard key={pkg.id} package={pkg} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}

interface PackageCardProps {
  package: Package;
}

function PackageCard({ package: pkg }: PackageCardProps) {
  const [showDetails, setShowDetails] = React.useState(false);
  
  const handleBookPackage = () => {
    toast.success('Package inquiry submitted successfully');
    setShowDetails(false);
  };
  
  return (
    <Card className="overflow-hidden">
      <div className="bg-gray-100 p-8 flex justify-center items-center">
        <span className="text-6xl">{pkg.image}</span>
      </div>
      
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{pkg.name}</CardTitle>
            <CardDescription>
              {pkg.destination}, {pkg.hospitalName}
            </CardDescription>
          </div>
          <div className="bg-medical-primary/10 text-medical-primary px-3 py-1 rounded-full text-sm font-medium">
            ${pkg.price}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4 pb-4">
        <p className="text-sm">{pkg.description}</p>
        
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2 text-gray-500" />
            <span>{pkg.duration} days</span>
          </div>
          <div className="flex items-center">
            <Plane className="h-4 w-4 mr-2 text-gray-500" />
            <span>{pkg.destination}</span>
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium mb-2">Procedures:</h4>
          <div className="flex flex-wrap gap-1">
            {pkg.procedures.map(procedure => (
              <Badge key={procedure} variant="secondary" className="text-xs">
                {procedure}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="gap-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-1/2">View Details</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{pkg.name}</DialogTitle>
              <DialogDescription>
                {pkg.destination}, {pkg.hospitalName}
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-4 space-y-4">
              <div className="flex items-center justify-center bg-gray-100 p-8 rounded-md">
                <span className="text-6xl">{pkg.image}</span>
              </div>
              
              <p>{pkg.description}</p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded-md">
                  <div className="flex items-center mb-2">
                    <Calendar className="h-4 w-4 mr-2 text-medical-primary" />
                    <h4 className="font-medium">Duration</h4>
                  </div>
                  <p className="text-sm">{pkg.duration} days total</p>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-md">
                  <div className="flex items-center mb-2">
                    <Globe className="h-4 w-4 mr-2 text-medical-primary" />
                    <h4 className="font-medium">Destination</h4>
                  </div>
                  <p className="text-sm">{pkg.destination}</p>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-md">
                  <div className="flex items-center mb-2">
                    <Map className="h-4 w-4 mr-2 text-medical-primary" />
                    <h4 className="font-medium">Hospital</h4>
                  </div>
                  <p className="text-sm">{pkg.hospitalName}</p>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-md">
                  <div className="flex items-center mb-2">
                    <Users className="h-4 w-4 mr-2 text-medical-primary" />
                    <h4 className="font-medium">Price</h4>
                  </div>
                  <p className="text-sm">${pkg.price} per person</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Medical Procedures:</h4>
                <ul className="list-disc pl-5 text-sm space-y-1">
                  {pkg.procedures.map(procedure => (
                    <li key={procedure}>{procedure}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Package Inclusions:</h4>
                <ul className="list-disc pl-5 text-sm space-y-1">
                  {pkg.inclusions.map((inclusion, index) => (
                    <li key={index}>{inclusion}</li>
                  ))}
                </ul>
              </div>
            </div>
            
            <DialogFooter>
              <Button onClick={handleBookPackage}>
                Book This Package
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        <Button className="w-1/2" onClick={handleBookPackage}>
          Book Now
        </Button>
      </CardFooter>
    </Card>
  );
}
