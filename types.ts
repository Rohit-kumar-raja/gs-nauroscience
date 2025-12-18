export enum Department {
  CARDIOLOGY = 'Cardiology',
  NEUROLOGY = 'Neurology',
  PEDIATRICS = 'Pediatrics',
  ORTHOPEDICS = 'Orthopedics',
  DERMATOLOGY = 'Dermatology',
  GENERAL_MEDICINE = 'General Medicine',
  GYNECOLOGY = 'Gynecology',
  OPHTHALMOLOGY = 'Ophthalmology',
  DENTAL = 'Dental'
}

export interface Doctor {
  id: string;
  name: string;
  specialty: Department;
  image: string;
  gender: 'male' | 'female';
  experience: number;
  rating: number;
  patients: number;
  availability: string[];
  bio: string;
}

export interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  doctorSpecialty: string;
  date: string; // ISO date string
  time: string;
  patientName: string;
  status: 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  consultationType?: 'virtual' | 'in-person';
  paymentStatus?: 'paid' | 'pending' | 'pay_at_desk';
  paymentId?: string;
  amount?: number;
}

export interface Facility {
  id: string;
  name: string;
  description: string;
  image: string;
  icon: string;
  openHours: string;
  location: string;
  contact: string;
  features: string[];
  isBookable?: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'appointment' | 'info' | 'alert';
  read: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  dob: string;
  address: string;
  initials: string;
  age?: number;
  weight?: string;
  height?: string;
  bloodType?: string;
  image?: string;
}