import { Department, Doctor, Facility, Notification, UserProfile } from './types';

export const USER: UserProfile = {
  id: "u_default_001",
  name: "John Doe",
  email: "john.doe@gs-neuro.com",
  phone: "9876543210",
  dob: "1992-05-15",
  address: "123 Healthcare Avenue, Medical District, NY 10001",
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
  }
];

export const DOCTORS: Doctor[] = [
  // Cardiology
  { id: 'd1', name: 'Dr. Rahul Kumar', gender: 'female', specialty: Department.CARDIOLOGY, image: 'https://static.wixstatic.com/media/eaee05_f1ed08c7f4d94072b6d3a25626080ab6~mv2.jpg/v1/crop/x_468,y_94,w_409,h_408/fill/w_115,h_115,fp_0.50_0.50,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/DrRahulKumar.jpg', experience: 12, rating: 4.9, patients: 1, availability: ['09:00', '10:00', '14:00', '16:00'], bio: 'Expert cardiologist specializing in preventative care.' },
  { id: 'd33', name: 'Dr. Mukesh kumar ', gender: 'male', specialty: Department.NEUROLOGY, image: 'https://static.wixstatic.com/media/eaee05_4b9ea20bd59745faa5db124073f70d8c~mv2.png/v1/fill/w_115,h_115,fp_0.48_0.25,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/DrMukeshKumar.png', experience: 25, rating: 4.9, patients: 4500, availability: ['09:00', '13:00', '15:00'], bio: 'Specializes in computational neuroscience and stroke recovery.' },

  { id: 'd34', name: 'Dr. Sanjiv Kumar Sinha', gender: 'male', specialty: Department.PEDIATRICS, image: 'https://static.wixstatic.com/media/a7b83d_ed41254e2ad94599bd581f352dc17235~mv2.jpg/v1/fill/w_115,h_115,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Dr_edited.jpg', experience: 5, rating: 4.7, patients: 500, availability: ['09:00', '14:00'], bio: 'Youth wellness and adolescent development specialist.' },

 ];

export const FACILITIES: Facility[] = [
  { id: 'f1', name: 'Emergency Room', description: '24/7 immediate trauma and critical care for life-threatening emergencies.', image: 'https://bitbytefly.com/gsnero/4.jpeg', icon: 'siren', openHours: '24 Hours', location: 'Ground Floor, Wing A', contact: '+91 999 999 9999', features: ['Level 1 Trauma', 'Cardiac Emergency', '24/7 Ambulance'], isBookable: false },
  { id: 'f2', name: 'Blood Test', description: 'Comprehensive hematology and clinical pathology diagnostics with fast turnaround.', image: 'https://bitbytefly.com/gsnero/2.jpeg', icon: 'droplet', openHours: '07:00 AM - 08:00 PM', location: '1st Floor, Lab Wing', contact: 'Ext 205', features: ['CBC & ESR', 'Diabetes Screening', 'Home Collection'], isBookable: true },
  { id: 'f3', name: 'Urine Test', description: 'Accurate urinalysis for kidney function and metabolic health monitoring.', image: 'https://bitbytefly.com/gsnero/3.jpeg', icon: 'test-tube', openHours: '07:00 AM - 08:00 PM', location: '1st Floor, Lab Wing', contact: 'Ext 206', features: ['Routine Screening', 'Infection Check', 'Metabolic Profile'], isBookable: true },
  { id: 'f4', name: 'Full Body Checkup', description: 'Preventative health screening packages including master lab profiles and multi-specialist review.', image: 'https://bitbytefly.com/gsnero/1.jpeg', icon: 'heart-pulse', openHours: '08:00 AM - 04:00 PM', location: '3rd Floor, Wellness Center', contact: 'Ext 500', features: ['Executive Package', 'Senior Citizen Profile', 'Cardiac Wellness'], isBookable: true }
];

export const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Find a Doctor', path: '/doctors' },
  { name: 'My Appointments', path: '/appointments' },
  { name: 'Facilities', path: '/facilities' },
];