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
  { id: 'd1', name: 'Dr. Sarah Jenning', gender: 'female', specialty: Department.CARDIOLOGY, image: 'https://images.unsplash.com/photo-1559839734-2b71f1536783?q=80&w=400&auto=format&fit=crop', experience: 12, rating: 4.9, patients: 1500, availability: ['09:00', '10:00', '14:00', '16:00'], bio: 'Expert cardiologist specializing in preventative care.' },
  { id: 'd7', name: 'Dr. Arthur Vane', gender: 'male', specialty: Department.CARDIOLOGY, image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=400&auto=format&fit=crop', experience: 18, rating: 4.8, patients: 2200, availability: ['10:00', '11:00', '15:00'], bio: 'Specialist in interventional cardiology and heart rhythms.' },
  { id: 'd8', name: 'Dr. Maria Garcia', gender: 'female', specialty: Department.CARDIOLOGY, image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=400&auto=format&fit=crop', experience: 9, rating: 4.7, patients: 1100, availability: ['08:00', '09:00', '12:00'], bio: 'Focused on pediatric heart health and congenital defects.' },
  { id: 'd32', name: 'Dr. Kenneth Reed', gender: 'male', specialty: Department.CARDIOLOGY, image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=400&auto=format&fit=crop', experience: 14, rating: 4.6, patients: 1300, availability: ['11:00', '12:00', '15:00'], bio: 'Cardiac surgeon with a focus on valve replacement.' },

  // Neurology
  { id: 'd2', name: 'Dr. James Wilson', gender: 'male', specialty: Department.NEUROLOGY, image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=400&auto=format&fit=crop', experience: 8, rating: 4.7, patients: 800, availability: ['11:00', '13:00', '15:00'], bio: 'Neurologist focusing on migraines and neurodegenerative disorders.' },
  { id: 'd9', name: 'Dr. Elena Belova', gender: 'female', specialty: Department.NEUROLOGY, image: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?q=80&w=400&auto=format&fit=crop', experience: 14, rating: 4.9, patients: 1400, availability: ['09:30', '10:30', '14:30'], bio: 'Specialist in epilepsy management and sleep medicine.' },
  { id: 'd10', name: 'Dr. Victor Stone', gender: 'male', specialty: Department.NEUROLOGY, image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=400&auto=format&fit=crop', experience: 20, rating: 5.0, patients: 3000, availability: ['08:30', '11:30', '16:30'], bio: 'Senior neurosurgeon with expertise in minimally invasive spinal surgery.' },
  { id: 'd33', name: 'Dr. Harrison Wells', gender: 'male', specialty: Department.NEUROLOGY, image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=400&auto=format&fit=crop', experience: 25, rating: 4.9, patients: 4500, availability: ['09:00', '13:00', '15:00'], bio: 'Specializes in computational neuroscience and stroke recovery.' },

  // Pediatrics
  { id: 'd3', name: 'Dr. Emily Chen', gender: 'female', specialty: Department.PEDIATRICS, image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=400&auto=format&fit=crop', experience: 15, rating: 5.0, patients: 3000, availability: ['08:30', '09:30', '10:30', '11:30'], bio: 'Dedicated pediatrician loved by families for compassionate care.' },
  { id: 'd11', name: 'Dr. Samual Reed', gender: 'male', specialty: Department.PEDIATRICS, image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=400&auto=format&fit=crop', experience: 7, rating: 4.6, patients: 950, availability: ['14:00', '15:00', '16:00'], bio: 'Specialist in newborn care and developmental milestones.' },
  { id: 'd12', name: 'Dr. Lucy Pevensie', gender: 'female', specialty: Department.PEDIATRICS, image: 'https://images.unsplash.com/photo-1559839734-2b71f1536783?q=80&w=400&auto=format&fit=crop', experience: 11, rating: 4.8, patients: 1200, availability: ['10:00', '12:00', '14:00'], bio: 'Pediatric allergist and immunologist.' },
  { id: 'd34', name: 'Dr. Peter Parker', gender: 'male', specialty: Department.PEDIATRICS, image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=400&auto=format&fit=crop', experience: 5, rating: 4.7, patients: 500, availability: ['09:00', '14:00'], bio: 'Youth wellness and adolescent development specialist.' },

  // Orthopedics
  { id: 'd4', name: 'Dr. Michael Ross', gender: 'male', specialty: Department.ORTHOPEDICS, image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=400&auto=format&fit=crop', experience: 20, rating: 4.8, patients: 5000, availability: ['14:00', '15:30', '17:00'], bio: 'Senior orthopedic surgeon specializing in sports injuries.' },
  { id: 'd13', name: 'Dr. Diane Prince', gender: 'female', specialty: Department.ORTHOPEDICS, image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=400&auto=format&fit=crop', experience: 10, rating: 4.9, patients: 1300, availability: ['09:00', '10:30', '13:00'], bio: 'Expert in hip and knee joint replacements.' },
  { id: 'd14', name: 'Dr. Barry Allen', gender: 'male', specialty: Department.ORTHOPEDICS, image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=400&auto=format&fit=crop', experience: 6, rating: 4.5, patients: 700, availability: ['11:00', '14:00', '16:00'], bio: 'Focused on sports medicine and fracture management.' },
  { id: 'd35', name: 'Dr. Oliver Queen', gender: 'male', specialty: Department.ORTHOPEDICS, image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=400&auto=format&fit=crop', experience: 12, rating: 4.8, patients: 1600, availability: ['10:00', '15:00'], bio: 'Rehabilitation specialist for repetitive motion injuries.' },

  // Dermatology
  { id: 'd5', name: 'Dr. Linda Kim', gender: 'female', specialty: Department.DERMATOLOGY, image: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?q=80&w=400&auto=format&fit=crop', experience: 6, rating: 4.6, patients: 1200, availability: ['09:00', '12:00', '14:00'], bio: 'Board-certified dermatologist focusing on skin health.' },
  { id: 'd15', name: 'Dr. Selina Kyle', gender: 'female', specialty: Department.DERMATOLOGY, image: 'https://images.unsplash.com/photo-1559839734-2b71f1536783?q=80&w=400&auto=format&fit=crop', experience: 13, rating: 4.7, patients: 1600, availability: ['10:00', '13:00', '15:00'], bio: 'Specialist in aesthetic dermatology and laser treatments.' },
  { id: 'd16', name: 'Dr. Bruce Wayne', gender: 'male', specialty: Department.DERMATOLOGY, image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=400&auto=format&fit=crop', experience: 15, rating: 4.9, patients: 2000, availability: ['11:00', '14:30', '16:30'], bio: 'Expert in skin cancer screening and surgical dermatology.' },

  // General Medicine
  { id: 'd6', name: 'Dr. Robert House', gender: 'male', specialty: Department.GENERAL_MEDICINE, image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=400&auto=format&fit=crop', experience: 25, rating: 4.5, patients: 8000, availability: ['08:00', '10:00', '12:00', '16:00'], bio: 'Senior diagnostician with extensive experience.' },
  { id: 'd17', name: 'Dr. John Watson', gender: 'male', specialty: Department.GENERAL_MEDICINE, image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=400&auto=format&fit=crop', experience: 12, rating: 4.6, patients: 3500, availability: ['09:00', '11:00', '14:00'], bio: 'Primary care physician focusing on family wellness.' },
  { id: 'd18', name: 'Dr. Jean Grey', gender: 'female', specialty: Department.GENERAL_MEDICINE, image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=400&auto=format&fit=crop', experience: 8, rating: 4.8, patients: 1800, availability: ['10:30', '13:30', '15:30'], bio: 'Internal medicine specialist with a focus on endocrinology.' },

  // Gynecology
  { id: 'd19', name: 'Dr. Natasha Romanoff', gender: 'female', specialty: Department.GYNECOLOGY, image: 'https://images.unsplash.com/photo-1559839734-2b71f1536783?q=80&w=400&auto=format&fit=crop', experience: 14, rating: 4.9, patients: 2100, availability: ['08:30', '12:30', '15:30'], bio: 'Obstetrics and Gynecology expert with focus on high-risk pregnancy.' },
  { id: 'd20', name: 'Dr. Wanda Maximoff', gender: 'female', specialty: Department.GYNECOLOGY, image: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?q=80&w=400&auto=format&fit=crop', experience: 7, rating: 4.7, patients: 1100, availability: ['10:00', '14:00', '16:00'], bio: 'Reproductive health specialist and infertility consultant.' },
  { id: 'd21', name: 'Dr. Carol Danvers', gender: 'female', specialty: Department.GYNECOLOGY, image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=400&auto=format&fit=crop', experience: 11, rating: 4.8, patients: 1900, availability: ['09:00', '11:00', '13:00'], bio: 'Surgical gynecologist specializing in laparoscopy.' },

  // Ophthalmology
  { id: 'd22', name: 'Dr. Scott Summers', gender: 'male', specialty: Department.OPHTHALMOLOGY, image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=400&auto=format&fit=crop', experience: 12, rating: 4.7, patients: 2200, availability: ['10:00', '12:00', '14:00'], bio: 'Eye surgeon specializing in laser vision correction.' },
  { id: 'd23', name: 'Dr. Charles Xavier', gender: 'male', specialty: Department.OPHTHALMOLOGY, image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=400&auto=format&fit=crop', experience: 30, rating: 5.0, patients: 9000, availability: ['09:00', '11:00', '15:00'], bio: 'Senior ophthalmologist focusing on glaucoma treatment.' },
  { id: 'd24', name: 'Dr. Ororo Munroe', gender: 'female', specialty: Department.OPHTHALMOLOGY, image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=400&auto=format&fit=crop', experience: 10, rating: 4.8, patients: 1800, availability: ['08:30', '13:30', '16:00'], bio: 'Specialist in retina care and macular degeneration.' },

  // Dental
  { id: 'd25', name: 'Dr. Tony Stark', gender: 'male', specialty: Department.DENTAL, image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=400&auto=format&fit=crop', experience: 15, rating: 4.9, patients: 4000, availability: ['09:00', '12:00', '15:00'], bio: 'Cosmetic dentist and orthodontic specialist.' },
  { id: 'd26', name: 'Dr. Pepper Potts', gender: 'female', specialty: Department.DENTAL, image: 'https://images.unsplash.com/photo-1559839734-2b71f1536783?q=80&w=400&auto=format&fit=crop', experience: 12, rating: 4.8, patients: 2500, availability: ['10:00', '13:00', '16:00'], bio: 'Pediatric dentist and preventive care expert.' },
  { id: 'd27', name: 'Dr. Steve Rogers', gender: 'male', specialty: Department.DENTAL, image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=400&auto=format&fit=crop', experience: 20, rating: 4.7, patients: 5000, availability: ['08:00', '11:00', '14:00'], bio: 'Maxillofacial surgeon and implant specialist.' },

  // Additional Fill
  { id: 'd28', name: 'Dr. Clark Kent', gender: 'male', specialty: Department.GENERAL_MEDICINE, image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=400&auto=format&fit=crop', experience: 5, rating: 4.4, patients: 600, availability: ['10:00', '15:00'], bio: 'Family medicine resident focused on general health.' },
  { id: 'd29', name: 'Dr. Lois Lane', gender: 'female', specialty: Department.DERMATOLOGY, image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=400&auto=format&fit=crop', experience: 9, rating: 4.6, patients: 1000, availability: ['11:00', '14:00'], bio: 'Specialist in pediatric dermatology.' },
  { id: 'd30', name: 'Dr. Arthur Curry', gender: 'male', specialty: Department.ORTHOPEDICS, image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=400&auto=format&fit=crop', experience: 12, rating: 4.7, patients: 1500, availability: ['09:00', '13:00'], bio: 'Expert in underwater physical therapy and rehabilitation.' },
  { id: 'd31', name: 'Dr. Victor Fries', gender: 'male', specialty: Department.CARDIOLOGY, image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=400&auto=format&fit=crop', experience: 22, rating: 4.5, patients: 2800, availability: ['08:00', '16:00'], bio: 'Specialist in cryo-therapy for cardiac conditions.' },
  { id: 'd36', name: 'Dr. Stephen Strange', gender: 'male', specialty: Department.NEUROLOGY, image: 'https://images.unsplash.com/photo-1559839734-2b71f1536783?q=80&w=400&auto=format&fit=crop', experience: 18, rating: 5.0, patients: 4000, availability: ['10:00', '14:00', '16:00'], bio: 'Master of neurological surgery and rare trauma recovery.' },
  { id: 'd37', name: 'Dr. Jane Foster', gender: 'female', specialty: Department.GENERAL_MEDICINE, image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=400&auto=format&fit=crop', experience: 10, rating: 4.8, patients: 1200, availability: ['09:00', '13:00'], bio: 'Research-focused physician specializing in endocrine systems.' },
];

export const FACILITIES: Facility[] = [
  { id: 'f1', name: 'Emergency Room', description: '24/7 immediate trauma and critical care for life-threatening emergencies.', image: 'https://images.unsplash.com/photo-1583324113626-70df0f43aa2a?q=80&w=1200&auto=format&fit=crop', icon: 'siren', openHours: '24 Hours', location: 'Ground Floor, Wing A', contact: '+91 999 999 9999', features: ['Level 1 Trauma', 'Cardiac Emergency', '24/7 Ambulance'], isBookable: false },
  { id: 'f2', name: 'Blood Test', description: 'Comprehensive hematology and clinical pathology diagnostics with fast turnaround.', image: 'https://images.unsplash.com/photo-1579154235602-3c2c255e747b?q=80&w=1200&auto=format&fit=crop', icon: 'droplet', openHours: '07:00 AM - 08:00 PM', location: '1st Floor, Lab Wing', contact: 'Ext 205', features: ['CBC & ESR', 'Diabetes Screening', 'Home Collection'], isBookable: true },
  { id: 'f3', name: 'Urine Test', description: 'Accurate urinalysis for kidney function and metabolic health monitoring.', image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=1200&auto=format&fit=crop', icon: 'test-tube', openHours: '07:00 AM - 08:00 PM', location: '1st Floor, Lab Wing', contact: 'Ext 206', features: ['Routine Screening', 'Infection Check', 'Metabolic Profile'], isBookable: true },
  { id: 'f4', name: 'Full Body Checkup', description: 'Preventative health screening packages including master lab profiles and multi-specialist review.', image: 'https://images.unsplash.com/photo-1666214280557-f1b5022eb634?q=80&w=1200&auto=format&fit=crop', icon: 'heart-pulse', openHours: '08:00 AM - 04:00 PM', location: '3rd Floor, Wellness Center', contact: 'Ext 500', features: ['Executive Package', 'Senior Citizen Profile', 'Cardiac Wellness'], isBookable: true }
];

export const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Find a Doctor', path: '/doctors' },
  { name: 'My Appointments', path: '/appointments' },
  { name: 'Facilities', path: '/facilities' },
];