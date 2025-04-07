
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Search, ShoppingCart, Plus, Minus, Check } from 'lucide-react';
import { toast } from 'sonner';

interface Medication {
  id: string;
  name: string;
  description: string;
  dosage: string;
  category: string;
  price: number;
  requiresPrescription: boolean;
  inStock: boolean;
  image: string;
}

interface CartItem {
  medication: Medication;
  quantity: number;
}

interface Prescription {
  id: string;
  medicationName: string;
  dosage: string;
  instructions: string;
  prescribedBy: string;
  issuedDate: string;
  validUntil: string;
  refills: number;
  active: boolean;
}

const mockMedications: Medication[] = [
  {
    id: 'med1',
    name: 'Amoxicillin',
    description: 'Antibiotic used to treat bacterial infections',
    dosage: '500mg tablets',
    category: 'Antibiotics',
    price: 15.99,
    requiresPrescription: true,
    inStock: true,
    image: '💊'
  },
  {
    id: 'med2',
    name: 'Ibuprofen',
    description: 'Non-steroidal anti-inflammatory drug (NSAID)',
    dosage: '200mg tablets',
    category: 'Pain Relief',
    price: 8.49,
    requiresPrescription: false,
    inStock: true,
    image: '💊'
  },
  {
    id: 'med3',
    name: 'Loratadine',
    description: 'Antihistamine for allergy relief',
    dosage: '10mg tablets',
    category: 'Allergy',
    price: 12.99,
    requiresPrescription: false,
    inStock: true,
    image: '💊'
  },
  {
    id: 'med4',
    name: 'Metformin',
    description: 'Oral diabetes medication',
    dosage: '500mg tablets',
    category: 'Diabetes',
    price: 22.50,
    requiresPrescription: true,
    inStock: true,
    image: '💊'
  },
  {
    id: 'med5',
    name: 'Lisinopril',
    description: 'ACE inhibitor for high blood pressure',
    dosage: '10mg tablets',
    category: 'Blood Pressure',
    price: 18.75,
    requiresPrescription: true,
    inStock: false,
    image: '💊'
  },
  {
    id: 'med6',
    name: 'Acetaminophen',
    description: 'Pain reliever and fever reducer',
    dosage: '500mg tablets',
    category: 'Pain Relief',
    price: 7.99,
    requiresPrescription: false,
    inStock: true,
    image: '💊'
  },
];

const mockPrescriptions: Prescription[] = [
  {
    id: 'pr1',
    medicationName: 'Amoxicillin',
    dosage: '500mg',
    instructions: 'Take 1 tablet three times daily for 10 days',
    prescribedBy: 'Dr. Sarah Johnson',
    issuedDate: '2025-03-30',
    validUntil: '2025-04-30',
    refills: 0,
    active: true
  },
  {
    id: 'pr2',
    medicationName: 'Metformin',
    dosage: '500mg',
    instructions: 'Take 1 tablet twice daily with meals',
    prescribedBy: 'Dr. Michael Chen',
    issuedDate: '2025-03-15',
    validUntil: '2025-06-15',
    refills: 3,
    active: true
  }
];

export default function PharmacyPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [currentView, setCurrentView] = useState<'all' | 'prescription' | 'nonprescription'>('all');
  const [showCheckoutDialog, setShowCheckoutDialog] = useState(false);
  
  // Filter medications based on search term and current view
  const filteredMedications = mockMedications.filter(med => {
    const matchesSearch = med.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          med.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (currentView === 'all') return matchesSearch;
    if (currentView === 'prescription') return matchesSearch && med.requiresPrescription;
    if (currentView === 'nonprescription') return matchesSearch && !med.requiresPrescription;
    
    return matchesSearch;
  });
  
  // Add to cart handler
  const addToCart = (medication: Medication) => {
    // Check if medication requires prescription
    if (medication.requiresPrescription) {
      // Check if user has a valid prescription
      const hasPrescription = mockPrescriptions.some(
        p => p.medicationName === medication.name && p.active
      );
      
      if (!hasPrescription) {
        toast.error(`${medication.name} requires a valid prescription`);
        return;
      }
    }
    
    // Check if medication is already in cart
    const existingItem = cart.find(item => item.medication.id === medication.id);
    
    if (existingItem) {
      // Increase quantity
      setCart(cart.map(item => 
        item.medication.id === medication.id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      ));
    } else {
      // Add new item
      setCart([...cart, { medication, quantity: 1 }]);
    }
    
    toast.success(`${medication.name} added to cart`);
  };
  
  // Remove from cart handler
  const removeFromCart = (medicationId: string) => {
    const existingItem = cart.find(item => item.medication.id === medicationId);
    
    if (existingItem && existingItem.quantity > 1) {
      // Decrease quantity
      setCart(cart.map(item => 
        item.medication.id === medicationId 
          ? { ...item, quantity: item.quantity - 1 } 
          : item
      ));
    } else {
      // Remove item
      setCart(cart.filter(item => item.medication.id !== medicationId));
    }
  };
  
  // Calculate cart total
  const cartTotal = cart.reduce(
    (total, item) => total + item.medication.price * item.quantity,
    0
  );
  
  // Handle checkout
  const handleCheckout = () => {
    toast.success('Order placed successfully');
    setCart([]);
    setShowCheckoutDialog(false);
  };
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Online Pharmacy</h1>
            <p className="text-muted-foreground">
              Order your prescribed medications and health products
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search medications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full"
              />
            </div>
            
            <Dialog open={showCheckoutDialog} onOpenChange={setShowCheckoutDialog}>
              <DialogTrigger asChild>
                <Button variant="outline" className="flex gap-1 relative">
                  <ShoppingCart className="h-4 w-4" />
                  <span>Cart</span>
                  {cart.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-medical-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cart.length}
                    </span>
                  )}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Your Cart</DialogTitle>
                  <DialogDescription>
                    Review your items before checkout
                  </DialogDescription>
                </DialogHeader>
                
                {cart.length > 0 ? (
                  <>
                    <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                      {cart.map((item) => (
                        <div key={item.medication.id} className="flex justify-between items-center border-b pb-3">
                          <div className="flex gap-3 items-center">
                            <div className="text-2xl">{item.medication.image}</div>
                            <div>
                              <h4 className="font-medium">{item.medication.name}</h4>
                              <p className="text-sm text-muted-foreground">{item.medication.dosage}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <div className="flex items-center">
                              <button 
                                onClick={() => removeFromCart(item.medication.id)}
                                className="p-1 rounded-md hover:bg-gray-100"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="mx-2">{item.quantity}</span>
                              <button 
                                onClick={() => addToCart(item.medication)}
                                className="p-1 rounded-md hover:bg-gray-100"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                            <div className="text-right w-16">
                              ${(item.medication.price * item.quantity).toFixed(2)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between mb-2">
                        <span>Subtotal</span>
                        <span>${cartTotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span>Shipping</span>
                        <span>$5.00</span>
                      </div>
                      <div className="flex justify-between font-medium text-lg pt-2 border-t">
                        <span>Total</span>
                        <span>${(cartTotal + 5).toFixed(2)}</span>
                      </div>
                    </div>
                    
                    <DialogFooter>
                      <Button 
                        variant="outline" 
                        onClick={() => setShowCheckoutDialog(false)}
                      >
                        Continue Shopping
                      </Button>
                      <Button onClick={handleCheckout}>
                        Checkout
                      </Button>
                    </DialogFooter>
                  </>
                ) : (
                  <div className="text-center py-10">
                    <div className="text-4xl mb-3">🛒</div>
                    <h3 className="text-lg font-medium mb-1">Your cart is empty</h3>
                    <p className="text-muted-foreground mb-4">Add medications to get started</p>
                    <Button onClick={() => setShowCheckoutDialog(false)}>
                      Browse Medications
                    </Button>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Tabs defaultValue="medications" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="medications">Medications</TabsTrigger>
            <TabsTrigger value="prescriptions">My Prescriptions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="medications" className="pt-4">
            <div className="mb-6 flex flex-wrap gap-2">
              <Button 
                variant={currentView === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCurrentView('all')}
              >
                All Medications
              </Button>
              <Button 
                variant={currentView === 'prescription' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCurrentView('prescription')}
              >
                Prescription Only
              </Button>
              <Button 
                variant={currentView === 'nonprescription' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCurrentView('nonprescription')}
              >
                Over The Counter
              </Button>
            </div>
            
            {filteredMedications.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No medications found matching your search</p>
              </div>
            ) : (
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {filteredMedications.map(medication => (
                  <Card key={medication.id} className="overflow-hidden">
                    <div className="bg-gray-50 p-6 flex justify-center">
                      <div className="text-5xl">{medication.image}</div>
                    </div>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle>{medication.name}</CardTitle>
                        <Badge variant={medication.requiresPrescription ? "default" : "secondary"}>
                          {medication.requiresPrescription ? "Prescription" : "OTC"}
                        </Badge>
                      </div>
                      <CardDescription>{medication.dosage}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm">{medication.description}</p>
                      <div className="mt-2">
                        <span className="font-medium text-lg">${medication.price.toFixed(2)}</span>
                        <span className="text-xs text-muted-foreground ml-1">per unit</span>
                      </div>
                      <div className="mt-1">
                        <span className={`text-xs ${medication.inStock ? 'text-green-600' : 'text-red-600'}`}>
                          {medication.inStock ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        onClick={() => addToCart(medication)} 
                        disabled={!medication.inStock}
                        className="w-full"
                      >
                        Add to Cart
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="prescriptions" className="pt-4">
            {mockPrescriptions.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">You don't have any active prescriptions</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {mockPrescriptions.map(prescription => {
                  const relatedMedication = mockMedications.find(
                    med => med.name === prescription.medicationName
                  );
                  
                  return (
                    <Card key={prescription.id} className="animate-fade-in">
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{prescription.medicationName}</CardTitle>
                            <CardDescription>{prescription.dosage}</CardDescription>
                          </div>
                          <Badge variant={prescription.active ? "outline" : "secondary"}>
                            {prescription.active ? `${prescription.refills} refills left` : "Expired"}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-3">
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-sm font-medium mb-1">Instructions</h4>
                            <p className="text-sm">{prescription.instructions}</p>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <p className="text-muted-foreground">Prescribed by</p>
                              <p>{prescription.prescribedBy}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Valid until</p>
                              <p>{prescription.validUntil}</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        {relatedMedication && relatedMedication.inStock ? (
                          <Button 
                            onClick={() => {
                              if (relatedMedication) {
                                addToCart(relatedMedication);
                              }
                            }}
                            className="w-full"
                            disabled={!prescription.active || prescription.refills === 0}
                          >
                            Order Refill
                          </Button>
                        ) : (
                          <Button variant="outline" className="w-full" disabled>
                            Currently Out of Stock
                          </Button>
                        )}
                      </CardFooter>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
