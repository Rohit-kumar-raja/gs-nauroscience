import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Search, Activity, X, Star, Video, Building2 } from 'lucide-react';
import MobileHeader from '../components/MobileHeader';
import Card from '../components/Card';
import Badge from '../components/Badge';
import DoctorDetailsSheet from '../components/DoctorDetailsSheet';
import BottomSheetBooking from '../components/BottomSheetBooking';
import { analyzeSymptoms } from '../services/geminiService';
import { DOCTORS } from '../constants';
import { Department, Doctor, Appointment } from '../types';

const DoctorsPage = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Navigation State
  const navigationState = location.state as { filter?: Department | 'All', mode?: 'virtual' | 'in-person' } | null;
  const [activeFilter, setActiveFilter] = useState<Department | 'All'>(navigationState?.filter || 'All');
  const [consultationMode, setConsultationMode] = useState<'virtual' | 'in-person'>(navigationState?.mode || 'in-person');
  
  const [viewingDoctor, setViewingDoctor] = useState<Doctor | null>(null);
  
  // State for booking flow
  const [bookingDoctor, setBookingDoctor] = useState<Doctor | null>(null);
  const [bookingParams, setBookingParams] = useState<{date: string, time: string}>({ date: '', time: '' });
  
  const [showSymptomSearch, setShowSymptomSearch] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState<{dept: string, reason: string} | null>(null);
  const [symptomInput, setSymptomInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSymptomAnalysis = async () => {
    if (!symptomInput) return;
    setIsAnalyzing(true);
    const result = await analyzeSymptoms(symptomInput);
    setIsAnalyzing(false);
    if (result) {
        setAiSuggestion({ dept: result.department, reason: result.reasoning });
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

  const handleBookingConfirm = (appt: Appointment) => {
    const current = JSON.parse(localStorage.getItem('appointments') || '[]');
    localStorage.setItem('appointments', JSON.stringify([...current, appt]));
    setBookingDoctor(null);
    setBookingParams({ date: '', time: '' });
  };

  const handleBookFromProfile = (date?: string, time?: string, mode?: 'virtual' | 'in-person') => {
      setBookingParams({ date: date || '', time: time || '' });
      if (mode) {
          setConsultationMode(mode);
      }
      setBookingDoctor(viewingDoctor);
      setViewingDoctor(null);
  }

  return (
    <div className="min-h-full bg-slate-50 pb-20">
      <MobileHeader title={consultationMode === 'virtual' ? 'Virtual Consultation' : 'Find Specialist'} showBack />

      {/* Sticky Search & Filter */}
      <div className="sticky top-[57px] z-20 bg-slate-50/95 backdrop-blur-sm pb-2 pt-2 px-4 space-y-3 shadow-sm border-b border-slate-100">
        <div className="flex gap-2">
            <div className="relative flex-1">
                <input 
                    type="text" 
                    placeholder="Search doctors..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-primary-500 shadow-sm text-sm"
                />
                <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
            </div>
            <button 
                onClick={() => setShowSymptomSearch(!showSymptomSearch)}
                className={`p-3 rounded-xl border transition-colors ${showSymptomSearch ? 'bg-primary-600 text-white border-primary-600' : 'bg-white text-slate-600 border-slate-200'} shadow-sm`}
            >
                <Activity className="h-5 w-5" />
            </button>
        </div>

        {/* Mode Toggler */}
        <div className="flex gap-2 p-1 bg-slate-200/50 rounded-xl">
             <button 
                onClick={() => setConsultationMode('in-person')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all ${consultationMode === 'in-person' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
             >
                <Building2 className="h-3.5 w-3.5" /> In-Person
             </button>
             <button 
                onClick={() => setConsultationMode('virtual')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all ${consultationMode === 'virtual' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
             >
                <Video className="h-3.5 w-3.5" /> Virtual
             </button>
        </div>

        {showSymptomSearch && (
            <div className="bg-white p-4 rounded-xl border border-primary-100 shadow-sm animate-fade-in">
                <p className="text-xs font-bold text-primary-700 mb-2 uppercase">AI Symptom Checker</p>
                <div className="flex gap-2">
                    <input 
                        value={symptomInput}
                        onChange={(e) => setSymptomInput(e.target.value)}
                        placeholder="Describe symptoms..."
                        className="flex-1 text-sm border-b border-primary-200 py-1 focus:outline-none focus:border-primary-600"
                    />
                    <button onClick={handleSymptomAnalysis} disabled={isAnalyzing} className="text-xs bg-primary-600 text-white px-3 py-1 rounded-lg font-medium">
                        {isAnalyzing ? '...' : 'Analyze'}
                    </button>
                </div>
            </div>
        )}

        {aiSuggestion && !showSymptomSearch && (
             <div className="flex items-start gap-2 bg-indigo-50 p-3 rounded-lg border border-indigo-100">
                <div className="flex-1">
                    <p className="text-xs text-indigo-800">
                        <span className="font-bold">Recommendation:</span> {aiSuggestion.reason}
                    </p>
                </div>
                <button onClick={() => {setAiSuggestion(null); setActiveFilter('All')}} className="text-indigo-400 hover:text-indigo-600">
                    <X className="h-4 w-4" />
                </button>
            </div>
        )}

        <div className="flex overflow-x-auto no-scrollbar gap-2 -mx-4 px-4 pb-1">
            <button 
                onClick={() => setActiveFilter('All')}
                className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-medium border transition-colors ${activeFilter === 'All' ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-slate-600 border-slate-200'}`}
            >
                All
            </button>
            {Object.values(Department).map(dept => (
                <button 
                    key={dept}
                    onClick={() => setActiveFilter(dept)}
                    className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-medium border transition-colors ${activeFilter === dept ? 'bg-primary-600 text-white border-primary-600' : 'bg-white text-slate-600 border-slate-200'}`}
                >
                    {dept}
                </button>
            ))}
        </div>
      </div>

      <div className="px-4 space-y-3 mt-4">
          {filteredDoctors.map(doctor => (
              <Card key={doctor.id} className="flex p-3 gap-3 active:scale-[0.99] transition-transform" onClick={() => setViewingDoctor(doctor)}>
                  <div className="relative">
                      <img src={doctor.image} alt={doctor.name} className="w-20 h-24 rounded-xl object-cover bg-slate-100" />
                      {consultationMode === 'virtual' && (
                          <div className="absolute -bottom-2 -right-2 bg-indigo-600 text-white p-1.5 rounded-full border-2 border-white">
                              <Video className="h-3 w-3" />
                          </div>
                      )}
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                          <div className="flex justify-between items-start">
                              <Badge>{doctor.specialty}</Badge>
                              <div className="flex items-center gap-1 text-slate-500">
                                  <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                                  <span className="text-xs font-bold text-slate-700">{doctor.rating}</span>
                              </div>
                          </div>
                          <h3 className="font-bold text-slate-900 mt-2 text-base">{doctor.name}</h3>
                      </div>
                      <div className="flex justify-between items-center mt-3">
                          <span className="text-xs text-slate-500 font-medium">{doctor.experience} years exp.</span>
                          <button className={`text-xs font-bold px-4 py-2 rounded-lg pointer-events-none transition-colors ${consultationMode === 'virtual' ? 'bg-indigo-50 text-indigo-600' : 'bg-primary-50 text-primary-600'}`}>
                              {consultationMode === 'virtual' ? 'Book Call' : 'Book Visit'}
                          </button>
                      </div>
                  </div>
              </Card>
          ))}
          <div className="h-6"></div>
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