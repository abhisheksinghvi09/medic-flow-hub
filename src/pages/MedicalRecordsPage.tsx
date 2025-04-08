
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { FileText, Search, Download, Calendar, Clock, User, Filter, Plus } from 'lucide-react';

type MedicalRecord = {
  id: string;
  title: string;
  type: string;
  date: string;
  doctor: string;
  description: string;
  files?: { name: string; type: string; size: string }[];
};

const mockRecords: MedicalRecord[] = [
  {
    id: 'rec1',
    title: 'Annual Check-up',
    type: 'General Examination',
    date: '2025-03-15',
    doctor: 'Dr. Sarah Johnson',
    description: 'Routine annual physical examination. All vitals normal. Blood work sent to lab for analysis.',
    files: [
      { name: 'blood_work_results.pdf', type: 'PDF', size: '1.2 MB' },
      { name: 'vitals_chart.png', type: 'Image', size: '640 KB' },
    ]
  },
  {
    id: 'rec2',
    title: 'Cardiology Consultation',
    type: 'Specialist Consultation',
    date: '2025-02-10',
    doctor: 'Dr. James Wilson',
    description: 'Patient reported occasional chest pain. ECG performed, showing normal sinus rhythm. Referred for stress test.',
    files: [
      { name: 'ecg_results.pdf', type: 'PDF', size: '980 KB' },
    ]
  },
  {
    id: 'rec3',
    title: 'Allergy Test',
    type: 'Diagnostic Test',
    date: '2025-01-22',
    doctor: 'Dr. Emily Rodriguez',
    description: 'Skin prick test conducted for common allergens. Patient showed moderate reaction to pollen and dust mites.',
    files: [
      { name: 'allergy_report.pdf', type: 'PDF', size: '1.5 MB' },
      { name: 'prescription.pdf', type: 'PDF', size: '750 KB' },
    ]
  },
  {
    id: 'rec4',
    title: 'Routine Blood Work',
    type: 'Laboratory Test',
    date: '2024-12-05',
    doctor: 'Dr. Michael Chen',
    description: 'Comprehensive blood panel collected. Results within normal ranges except slightly elevated cholesterol.',
    files: [
      { name: 'blood_panel_results.pdf', type: 'PDF', size: '1.1 MB' },
    ]
  },
  {
    id: 'rec5',
    title: 'Dental Cleaning',
    type: 'Dental',
    date: '2024-11-18',
    doctor: 'Dr. Lisa Thompson',
    description: 'Routine dental cleaning and examination. Two small cavities identified for follow-up treatment.',
    files: [
      { name: 'dental_xrays.png', type: 'Image', size: '2.3 MB' },
    ]
  },
];

const MedicalRecordsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [selectedRecord, setSelectedRecord] = useState<MedicalRecord | null>(null);

  const filteredRecords = mockRecords
    .filter(record => {
      if (activeTab !== 'all' && record.type !== activeTab) return false;
      if (!searchTerm) return true;
      
      return (
        record.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <MainLayout>
      <div>
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Medical Records</h1>
            <p className="text-muted-foreground">View and manage your complete medical history</p>
          </div>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Record
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-1 space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Records</CardTitle>
                <CardDescription>Browse your medical records</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search records..."
                      className="pl-9"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  
                  <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="w-full">
                      <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
                      <TabsTrigger value="General Examination" className="flex-1">General</TabsTrigger>
                      <TabsTrigger value="Laboratory Test" className="flex-1">Lab Tests</TabsTrigger>
                    </TabsList>
                  </Tabs>
                  
                  <div className="space-y-2 max-h-[400px] overflow-y-auto">
                    {filteredRecords.length > 0 ? (
                      filteredRecords.map(record => (
                        <div 
                          key={record.id}
                          className={`p-3 border rounded-md cursor-pointer hover:bg-gray-50 transition-colors ${selectedRecord?.id === record.id ? 'border-primary bg-primary/5' : ''}`}
                          onClick={() => setSelectedRecord(record)}
                        >
                          <div className="flex items-start gap-3">
                            <div className="bg-primary/10 p-2 rounded-full">
                              <FileText className="h-4 w-4 text-primary" />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium">{record.title}</p>
                              <p className="text-xs text-muted-foreground">{formatDate(record.date)}</p>
                              <p className="text-xs text-muted-foreground truncate">{record.doctor}</p>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-6">
                        <FileText className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-muted-foreground">No records found</p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-2">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Record Details</CardTitle>
              </CardHeader>
              <CardContent>
                {selectedRecord ? (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-semibold">{selectedRecord.title}</h2>
                      <div className="flex flex-wrap gap-y-2 gap-x-4 mt-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(selectedRecord.date)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          <span>{selectedRecord.doctor}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Filter className="h-4 w-4" />
                          <span>{selectedRecord.type}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Description</h3>
                      <p className="text-muted-foreground">{selectedRecord.description}</p>
                    </div>
                    
                    {selectedRecord.files && selectedRecord.files.length > 0 && (
                      <div>
                        <h3 className="font-medium mb-2">Attachments</h3>
                        <div className="space-y-2">
                          {selectedRecord.files.map((file, index) => (
                            <div key={index} className="flex items-center justify-between p-3 border rounded-md">
                              <div className="flex items-center gap-3">
                                <FileText className="h-5 w-5 text-muted-foreground" />
                                <div>
                                  <p className="font-medium">{file.name}</p>
                                  <p className="text-xs text-muted-foreground">{file.type} • {file.size}</p>
                                </div>
                              </div>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="flex gap-2 pt-4">
                      <Button variant="outline" className="flex items-center gap-2">
                        <Download className="h-4 w-4" />
                        Download All Files
                      </Button>
                      <Button className="flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        Add Files
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <FileText className="h-16 w-16 text-muted-foreground opacity-30 mb-4" />
                    <h3 className="text-xl font-medium mb-1">No Record Selected</h3>
                    <p className="text-muted-foreground">Select a record from the list to view details</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default MedicalRecordsPage;
