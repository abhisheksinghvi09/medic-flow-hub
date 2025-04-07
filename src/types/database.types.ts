
export type Profile = {
  id: string;
  name: string | null;
  role: string;
  phone: string | null;
  address: string | null;
  dob: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
};

export type Appointment = {
  id: string;
  patient_id: string;
  doctor_id: string | null;
  title: string;
  description: string | null;
  appointment_date: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  created_at: string;
  updated_at: string;
};

export type Prescription = {
  id: string;
  patient_id: string;
  doctor_id: string | null;
  appointment_id: string | null;
  medicine_name: string;
  dosage: string;
  instructions: string | null;
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
};

export type MedicalRecord = {
  id: string;
  patient_id: string;
  doctor_id: string | null;
  record_type: string;
  title: string;
  description: string | null;
  date: string;
  attachments: any | null;
  created_at: string;
  updated_at: string;
};
