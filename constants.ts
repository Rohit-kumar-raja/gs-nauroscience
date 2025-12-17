import { Department, Doctor, Facility, Notification, UserProfile } from './types';

export const USER: UserProfile = {
  name: "John Doe",
  initials: "JD",
  age: 32,
  weight: "78 kg",
  height: "180 cm",
  bloodType: "O+"
};

export const NOTIFICATIONS: Notification[] = [
  {
    id: 'n1',
    title: 'Appointment Confirmed',
    message: 'Your appointment with Dr. Sarah Jenning is confirmed for tomorrow at 10:00 AM.',
    time: '2 mins ago',
    type: 'appointment',
    read: false
  },
  {
    id: 'n2',
    title: 'Lab Results Ready',
    message: 'Your blood work results from Oct 12th are now available in your reports.',
    time: '5 hours ago',
    type: 'info',
    read: true
  },
  {
    id: 'n3',
    title: 'Flu Shot Reminder',
    message: 'It is flu season! Visit our pharmacy to get your annual flu shot.',
    time: '1 day ago',
    type: 'alert',
    read: true
  }
];

export const DOCTORS: Doctor[] = [
  {
    id: 'd1',
    name: 'Dr. Sarah Jenning',
    specialty: Department.CARDIOLOGY,
    image: 'https://picsum.photos/id/64/300/300',
    experience: 12,
    rating: 4.9,
    patients: 1500,
    availability: ['09:00', '10:00', '14:00', '16:00'],
    bio: 'Expert cardiologist specializing in preventative care and heart failure management.'
  },
  {
    id: 'd2',
    name: 'Dr. James Wilson',
    specialty: Department.NEUROLOGY,
    image: 'https://picsum.photos/id/1005/300/300',
    experience: 8,
    rating: 4.7,
    patients: 800,
    availability: ['11:00', '13:00', '15:00'],
    bio: 'Neurologist with a focus on migraines and neurodegenerative disorders.'
  },
  {
    id: 'd3',
    name: 'Dr. Emily Chen',
    specialty: Department.PEDIATRICS,
    image: 'https://picsum.photos/id/338/300/300',
    experience: 15,
    rating: 5.0,
    patients: 3000,
    availability: ['08:30', '09:30', '10:30', '11:30'],
    bio: 'Dedicated pediatrician loved by families for her compassionate care approach.'
  },
  {
    id: 'd4',
    name: 'Dr. Michael Ross',
    specialty: Department.ORTHOPEDICS,
    image: 'https://picsum.photos/id/1012/300/300',
    experience: 20,
    rating: 4.8,
    patients: 5000,
    availability: ['14:00', '15:30', '17:00'],
    bio: 'Senior orthopedic surgeon specializing in sports injuries and joint replacement.'
  },
  {
    id: 'd5',
    name: 'Dr. Linda Kim',
    specialty: Department.DERMATOLOGY,
    image: 'https://picsum.photos/id/823/300/300',
    experience: 6,
    rating: 4.6,
    patients: 1200,
    availability: ['09:00', '12:00', '14:00'],
    bio: 'Board-certified dermatologist focusing on cosmetic and medical dermatology.'
  },
  {
    id: 'd6',
    name: 'Dr. Robert House',
    specialty: Department.GENERAL_MEDICINE,
    image: 'https://picsum.photos/id/1025/300/300',
    experience: 25,
    rating: 4.5,
    patients: 8000,
    availability: ['08:00', '10:00', '12:00', '16:00'],
    bio: 'Diagnostician with extensive experience in rare diseases and internal medicine.'
  }
];

export const FACILITIES: Facility[] = [
  {
    id: 'f1',
    name: 'Emergency Room',
    description: '24/7 Trauma center equipped with state-of-the-art life support systems.',
    image: 'https://picsum.photos/id/1031/600/400',
    icon: 'ambulance',
    openHours: '24 Hours',
    location: 'Ground Floor, Wing A',
    contact: '911 or Ext 101',
    features: ['Level 1 Trauma', 'Stroke Center', 'Cardiac Response']
  },
  {
    id: 'f2',
    name: 'Advanced Pathology Lab',
    description: 'Full-service laboratory offering blood work, biopsies, and genetic testing.',
    image: 'https://picsum.photos/id/1056/600/400',
    icon: 'microscope',
    openHours: '7:00 AM - 8:00 PM',
    location: '2nd Floor, Wing B',
    contact: 'Ext 205',
    features: ['Same-day Results', 'Home Collection', 'Genetic Screening'],
    isBookable: true
  },
  {
    id: 'f3',
    name: 'Radiology Center',
    description: 'MRI, CT Scans, X-Ray, and Ultrasound services available on-site.',
    image: 'https://picsum.photos/id/1059/600/400',
    icon: 'radiation',
    openHours: '8:00 AM - 6:00 PM',
    location: 'Basement Level 1',
    contact: 'Ext 310',
    features: ['3T MRI', 'Low-dose CT', '3D Mammography'],
    isBookable: true
  },
  {
    id: 'f4',
    name: 'Pharmacy',
    description: 'In-house pharmacy for convenient prescription pickup and consultations.',
    image: 'https://picsum.photos/id/1062/600/400',
    icon: 'pill',
    openHours: '8:00 AM - 10:00 PM',
    location: 'Ground Floor, Lobby',
    contact: 'Ext 110',
    features: ['Prescription Refills', 'Vaccinations', 'Compounding']
  }
];

export const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Find a Doctor', path: '/doctors' },
  { name: 'My Appointments', path: '/appointments' },
  { name: 'Facilities', path: '/facilities' },
];