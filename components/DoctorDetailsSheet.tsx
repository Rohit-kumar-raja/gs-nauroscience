import React, { useState, useEffect } from 'react';
import { Star, Video, Building2 } from 'lucide-react';
import Button from './Button';
import { Doctor } from '../types';
import DoctorHero from './doctor/DoctorHero';
import DoctorStats from './doctor/DoctorStats';
import DoctorCalendar from './doctor/DoctorCalendar';
import DoctorTimeSlots from './doctor/DoctorTimeSlots';

const DoctorDetailsSheet: React.FC<{ 
    doctor: Doctor | null, 
    onClose: () => void,
    onBook: (date?: string, time?: string, mode?: 'virtual' | 'in-person') => void,
    mode?: 'virtual' | 'in-person'
}> = ({ doctor, onClose, onBook, mode = 'in-person' }) => {
    const [selectedDateIndex, setSelectedDateIndex] = useState(0);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [isLoadingSlots, setIsLoadingSlots] = useState(false);

    // Reset state when doctor changes
    useEffect(() => {
        if (doctor) {
            setSelectedDateIndex(0);
            setSelectedTime(null);
        }
    }, [doctor]);

    // Handle dynamic "loading" of slots when date changes
    const handleDateSelect = (index: number) => {
        if (index === selectedDateIndex) return;
        
        setSelectedDateIndex(index);
        setSelectedTime(null);
        setIsLoadingSlots(true);
        
        // Simulate an API call delay to "load" slots for that specific day
        setTimeout(() => {
            setIsLoadingSlots(false);
        }, 600);
    };

    if (!doctor) return null;

    const dates = Array.from({ length: 14 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() + i);
        return d;
    });

    const selectedDate = dates[selectedDateIndex];
    const isWeekend = selectedDate.getDay() === 0 || selectedDate.getDay() === 6;
    
    // Format date for the booking form (YYYY-MM-DD)
    const formattedDate = selectedDate.toISOString().split('T')[0];

    return (
        <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/60 backdrop-blur-sm animate-fade-in" onClick={onClose}>
            <div className="bg-white rounded-t-3xl h-[85vh] flex flex-col animate-slide-up shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
                
                <DoctorHero doctor={doctor} mode={mode} onClose={onClose} />

                {/* Content */}
                <div className="flex-1 overflow-y-auto px-6 -mt-12 relative z-10 no-scrollbar">
                    <DoctorStats doctor={doctor} />

                    <div className="space-y-8 pb-32">
                        <div>
                            <h3 className="font-bold text-slate-900 mb-2">About Doctor</h3>
                            <p className="text-slate-600 leading-relaxed text-sm">
                                {doctor.bio || `${doctor.name} is a dedicated specialist in ${doctor.specialty} with over ${doctor.experience} years of experience in treating complex cases. They are known for their patient-centric approach and use of advanced diagnostic technology.`}
                            </p>
                        </div>

                        <div>
                            <div className="flex justify-between items-end mb-4 px-1">
                                <h3 className="font-bold text-slate-900">Appointment Date</h3>
                                <span className="text-[10px] font-black text-primary-600 bg-primary-50 px-3 py-1.5 rounded-xl border border-primary-100 uppercase tracking-widest">
                                    {selectedDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                                </span>
                            </div>
                            
                            <DoctorCalendar 
                                dates={dates} 
                                selectedDateIndex={selectedDateIndex} 
                                onSelectDate={handleDateSelect} 
                            />

                            <div className="mt-4 min-h-[160px] transition-all">
                                <DoctorTimeSlots 
                                    availability={doctor.availability} 
                                    selectedTime={selectedTime} 
                                    onSelectTime={setSelectedTime} 
                                    isWeekend={isWeekend}
                                    isLoading={isLoadingSlots}
                                />
                            </div>
                        </div>

                        <div>
                            <h3 className="font-bold text-slate-900 mb-4 px-1">Patient Reviews</h3>
                            <div className="space-y-4">
                                <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm">
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
                                                AP
                                            </div>
                                            <div>
                                                <span className="font-bold text-sm text-slate-800 block">Alice P.</span>
                                                <span className="text-[10px] text-slate-400 font-bold uppercase">Patient Since 2023</span>
                                            </div>
                                        </div>
                                        <div className="flex text-yellow-400 bg-yellow-50 px-2 py-1 rounded-lg">
                                            <Star className="h-3 w-3 fill-current" />
                                            <Star className="h-3 w-3 fill-current" />
                                            <Star className="h-3 w-3 fill-current" />
                                            <Star className="h-3 w-3 fill-current" />
                                            <Star className="h-3 w-3 fill-current" />
                                        </div>
                                    </div>
                                    <p className="text-xs text-slate-600 leading-relaxed italic">"Dr. {doctor.name.split(' ')[1]} was incredibly attentive and explained everything clearly. The best experience I've had with a specialist."</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Action */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t border-slate-50 pb-10 z-20 shadow-[0_-10px_30px_rgba(0,0,0,0.03)]">
                     {!selectedTime || isWeekend || isLoadingSlots ? (
                        <Button 
                            disabled
                            className="w-full text-base py-4 opacity-50 cursor-not-allowed shadow-none bg-slate-100 text-slate-400 border border-slate-200"
                        >
                            {isWeekend ? 'Doctor Unavailable Today' : isLoadingSlots ? 'Updating Availability...' : 'Choose a Time Slot'}
                        </Button>
                     ) : (
                        <div className="flex gap-4 animate-slide-up">
                            <Button 
                                onClick={() => onBook(formattedDate, selectedTime, 'in-person')}
                                className="flex-1 text-sm font-bold shadow-xl py-4.5 bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20 flex items-center justify-center gap-2 rounded-2xl"
                            >
                                <Building2 className="h-5 w-5" />
                                Confirm Visit
                            </Button>
                            <Button 
                                onClick={() => onBook(formattedDate, selectedTime, 'virtual')}
                                className="flex-1 text-sm font-bold shadow-xl py-4.5 bg-indigo-600 hover:bg-indigo-700 shadow-indigo-600/20 flex items-center justify-center gap-2 rounded-2xl"
                            >
                                <Video className="h-5 w-5" />
                                Video Call
                            </Button>
                        </div>
                     )}
                </div>
            </div>
        </div>
    )
}

export default DoctorDetailsSheet;