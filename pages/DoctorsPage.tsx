import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Search, Activity, Star } from 'lucide-react';
import MobileHeader from '../components/MobileHeader';
import Card from '../components/Card';
import DoctorDetailsSheet from '../components/DoctorDetailsSheet';
import BottomSheetBooking from '../components/BottomSheetBooking';
import DoctorAvatar from '../components/DoctorAvatar';
import { analyzeSymptoms } from '../services/geminiService';
import { DOCTORS } from '../constants';
import { Department, Doctor, Appointment } from '../types';
import { appointmentService } from '../services/appointmentService';

const DoctorsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
  const navigationState = location.state as { filter?: Department | 'All', mode?: 'virtual' | 'in-person' } | null;
  const [activeFilter, setActiveFilter] = useState<Department | 'All'>(navigationState?.filter || 'All');
  const [consultationMode, setConsultationMode] = useState<'virtual' | 'in-person'>(navigationState?.mode || 'in-person');
  
  const [viewingDoctor, setViewingDoctor] = useState<Doctor | null>(null);
  const [bookingDoctor, setBookingDoctor] = useState<Doctor | null>(null);
  const [bookingParams, setBookingParams] = useState<{date: string, time: string}>({ date: '', time: '' });
  
  const [showSymptomSearch, setShowSymptomSearch] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSymptomAnalysis = async (symptoms: string) => {
    setIsAnalyzing(true);
    const result = await analyzeSymptoms(symptoms);
    setIsAnalyzing(false);
    if (result) {
        setActiveFilter(result.department);
        setShowSymptomSearch(false);
    }
  };

  const filteredDoctors = DOCTORS.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          doc.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'All' || doc.specialty === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const handleBookingConfirm = async (appt: Appointment) => {
    await appointmentService.create(appt);
    setBookingDoctor(null);
    setBookingParams({ date: '', time: '' });
    navigate('/appointments');
  };

  const handleBookFromProfile = (date?: string, time?: string, mode?: 'virtual' | 'in-person') => {
      setBookingParams({ date: date || '', time: time || '' });
      if (mode) setConsultationMode(mode);
      setBookingDoctor(viewingDoctor);
      setViewingDoctor(null);
  }

  return (
    <div className="min-h-full bg-slate-50 pb-20">
      <MobileHeader title="Doctors" showBack />

      <div className="sticky top-[57px] z-20 bg-slate-50/95 backdrop-blur-sm pb-2 pt-2 px-4 space-y-3 shadow-sm border-b border-slate-100">
        <div className="flex gap-2">
            <div className="relative flex-1">
                <input 
                    type="text" 
                    placeholder="Search specialists..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:border-primary-500 text-sm"
                />
                <Search className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
            </div>
            <button 
                onClick={() => setShowSymptomSearch(!showSymptomSearch)}
                className={`p-3 rounded-xl border transition-colors ${showSymptomSearch ? 'bg-primary-500 text-white' : 'bg-white text-slate-600 border-slate-200'}`}
            >
                <Activity className="h-5 w-5" />
            </button>
        </div>

        <div className="flex overflow-x-auto no-scrollbar gap-2 -mx-4 px-4 pb-1">
            <button 
                onClick={() => setActiveFilter('All')}
                className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-bold border ${activeFilter === 'All' ? 'bg-primary-500 text-white' : 'bg-white text-slate-500'}`}
            >
                All
            </button>
            {Object.values(Department).map(dept => (
                <button 
                    key={dept}
                    onClick={() => setActiveFilter(dept)}
                    className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-bold border ${activeFilter === dept ? 'bg-primary-500 text-white' : 'bg-white text-slate-500'}`}
                >
                    {dept}
                </button>
            ))}
        </div>
      </div>

      <div className="px-4 space-y-3 mt-4">
          {filteredDoctors.map(doctor => (
              <Card key={doctor.id} className="flex p-3 gap-3" onClick={() => setViewingDoctor(doctor)}>
                  <DoctorAvatar 
                    src={doctor.image} 
                    gender={doctor.gender} 
                    name={doctor.name} 
                    className="w-16 h-16 rounded-xl shrink-0" 
                  />
                  <div className="flex-1">
                      <h3 className="font-bold text-slate-900 text-sm">{doctor.name}</h3>
                      <p className="text-[10px] font-bold text-accent-600 uppercase mb-1">{doctor.specialty}</p>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs font-bold">{doctor.rating}</span>
                        <span className="text-[10px] text-slate-400 font-medium ml-2">{doctor.experience} yrs exp.</span>
                      </div>
                  </div>
              </Card>
          ))}
      </div>

      <DoctorDetailsSheet 
        doctor={viewingDoctor} 
        onClose={() => setViewingDoctor(null)} 
        onBook={handleBookFromProfile}
        mode={consultationMode}
      />

      <BottomSheetBooking 
        doctor={bookingDoctor} 
        onClose={() => setBookingDoctor(null)} 
        onConfirm={handleBookingConfirm}
        initialDate={bookingParams.date}
        initialTime={bookingParams.time}
        consultationType={consultationMode}
      />
    </div>
  );
};

export default DoctorsPage;