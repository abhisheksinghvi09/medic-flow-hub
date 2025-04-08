
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FileText, Calendar, PlusCircle, Trash } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const recordTypeOptions = [
  { value: 'diagnosis', label: 'Diagnosis Report' },
  { value: 'laboratory', label: 'Laboratory Test' },
  { value: 'imaging', label: 'Imaging/Scan' },
  { value: 'prescription', label: 'Prescription' },
  { value: 'vaccination', label: 'Vaccination' },
  { value: 'surgery', label: 'Surgery Report' },
  { value: 'discharge', label: 'Discharge Summary' },
  { value: 'other', label: 'Other Document' },
];

const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  recordType: z.string().min(1, "Please select a record type"),
  date: z.string().min(1, "Date is required"),
  description: z.string().optional(),
  doctorName: z.string().optional(),
  attachments: z.array(z.any()).optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function MedicalRecordForm() {
  const { profile } = useAuth();
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      recordType: '',
      date: new Date().toISOString().split('T')[0],
      description: '',
      doctorName: '',
      attachments: [],
    }
  });
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles) return;
    
    const newFiles = Array.from(selectedFiles);
    setFiles(prev => [...prev, ...newFiles]);
  };
  
  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };
  
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // In a real app, this would upload files and save record to the database
      console.log('Record data:', { ...data, files });
      
      // Simulate API request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Medical record added successfully');
      form.reset();
      setFiles([]);
    } catch (error) {
      console.error('Failed to save medical record:', error);
      toast.error('Failed to save medical record. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-medical-primary" /> 
          Add Medical Record
        </CardTitle>
        <CardDescription>
          Manually add information about your medical records
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Record Title</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter a title for this record"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="recordType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Record Type</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a record type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {recordTypeOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Record Date</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Calendar className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input 
                          type="date"
                          className="pl-8"
                          {...field}
                        />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="doctorName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Doctor's Name (Optional)</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter doctor's name"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description / Notes</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter any additional information about this record"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormItem>
              <FormLabel>Attachments</FormLabel>
              <div className="space-y-2">
                <div className="bg-secondary/50 rounded-lg p-4">
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="file-upload"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <PlusCircle className="w-8 h-8 mb-2 text-gray-500" />
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">PDF, JPG or PNG (MAX. 10MB)</p>
                      </div>
                      <input 
                        id="file-upload" 
                        type="file" 
                        className="hidden" 
                        onChange={handleFileChange}
                        multiple
                        accept=".pdf,.jpg,.jpeg,.png"
                      />
                    </label>
                  </div>
                </div>
                
                {files.length > 0 && (
                  <div className="space-y-2 mt-4">
                    <p className="text-sm font-medium">Selected files:</p>
                    <div className="space-y-2">
                      {files.map((file, index) => (
                        <div key={index} className="flex items-center justify-between bg-secondary/30 p-2 rounded">
                          <div className="flex items-center space-x-2">
                            <FileText className="h-4 w-4" />
                            <span className="text-sm truncate max-w-[250px]">{file.name}</span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile(index)}
                            className="h-8 w-8 p-0"
                          >
                            <Trash className="h-4 w-4" />
                            <span className="sr-only">Remove</span>
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </FormItem>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <Button 
          type="button" 
          onClick={form.handleSubmit(onSubmit)} 
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? "Saving..." : "Save Medical Record"}
        </Button>
      </CardFooter>
    </Card>
  );
}
