
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" })
});

const registerSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  role: z.enum(["patient", "doctor", "admin"], {
    required_error: "Please select a role",
  }),
});

type FormType = 'login' | 'register';

export const AuthForm = () => {
  const [formType, setFormType] = useState<FormType>('login');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  // Form data state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'patient',
  });

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Toggle between login and register forms
  const toggleFormType = () => {
    setFormType(prev => prev === 'login' ? 'register' : 'login');
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (formType === 'login') {
        const result = loginSchema.safeParse(formData);
        if (!result.success) {
          result.error.issues.forEach(issue => {
            toast.error(issue.message);
          });
          setIsLoading(false);
          return;
        }
        
        // Here you would normally make an API call to authenticate
        // For now, we'll simulate a successful login
        localStorage.setItem('user', JSON.stringify({ 
          email: formData.email, 
          role: 'patient',
          name: 'Demo Patient'
        }));
        
        toast.success("Login successful!");
        setTimeout(() => navigate('/dashboard'), 1000);
      } else {
        const result = registerSchema.safeParse(formData);
        if (!result.success) {
          result.error.issues.forEach(issue => {
            toast.error(issue.message);
          });
          setIsLoading(false);
          return;
        }
        
        // Here you would normally make an API call to register the user
        // For now, we'll simulate a successful registration
        toast.success("Registration successful! Please login.");
        setFormType('login');
        setFormData(prev => ({ ...prev, password: '' }));
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto animate-fade-in">
      <CardHeader>
        <CardTitle className="text-2xl font-display text-center text-medical-secondary">
          {formType === 'login' ? 'Login to MedicFlow' : 'Create an Account'}
        </CardTitle>
        <CardDescription className="text-center">
          {formType === 'login' 
            ? 'Enter your credentials to access your account' 
            : 'Fill in your details to create your account'}
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {formType === 'register' && (
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="example@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {formType === 'register' && (
            <div className="space-y-2">
              <Label htmlFor="role">Register as</Label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full rounded-md border border-input bg-transparent px-3 py-2"
                required
              >
                <option value="patient">Patient</option>
                <option value="doctor">Doctor</option>
              </select>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex flex-col space-y-4">
          <Button 
            type="submit" 
            className="w-full bg-medical-primary hover:bg-medical-primary/90"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : formType === 'login' ? "Login" : "Register"}
          </Button>
          
          <p className="text-center text-sm">
            {formType === 'login' ? "Don't have an account? " : "Already have an account? "}
            <button
              type="button"
              onClick={toggleFormType}
              className="text-medical-primary hover:underline focus:outline-none"
            >
              {formType === 'login' ? "Register" : "Login"}
            </button>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
};
