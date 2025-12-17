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

    // Reset state when doctor changes
    useEffect(() => {
        if (doctor) {
            setSelectedDateIndex(0);
            setSelectedTime(null);
        }
    }, [doctor]);

    // Reset time when date changes
    useEffect(() => {
        setSelectedTime(null);
    }, [selectedDateIndex]);

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
                <div className="flex-1 overflow-y-auto px-6 -mt-12 relative z-10">
                    <DoctorStats doctor={doctor} />

                    <div className="space-y-8 pb-24">
                        <div>
                            <h3 className="font-bold text-slate-900 mb-2">About Doctor</h3>
                            <p className="text-slate-600 leading-relaxed text-sm">
                                {doctor.bio || `${doctor.name} is a dedicated specialist in ${doctor.specialty} with over ${doctor.experience} years of experience in treating complex cases. They are known for their patient-centric approach and use of advanced diagnostic technology.`}
                            </p>
                        </div>

                        <div>
                            <div className="flex justify-between items-end mb-4">
                                <h3 className="font-bold text-slate-900">Availability</h3>
                                <span className="text-xs font-semibold text-primary-600 bg-primary-50 px-3 py-1.5 rounded-lg">
                                    {selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                </span>
                            </div>
                            
                            <DoctorCalendar 
                                dates={dates} 
                                selectedDateIndex={selectedDateIndex} 
                                onSelectDate={setSelectedDateIndex} 
                            />

                            <div className="mt-4 min-h-[140px] transition-all">
                                <DoctorTimeSlots 
                                    availability={doctor.availability} 
                                    selectedTime={selectedTime} 
                                    onSelectTime={setSelectedTime} 
                                    isWeekend={isWeekend} 
                                />
                            </div>
                        </div>

                        <div>
                            <h3 className="font-bold text-slate-900 mb-3">Patient Reviews</h3>
                            <div className="space-y-3">
                                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-xs">
                                                AP
                                            </div>
                                            <span className="font-bold text-sm text-slate-800">Alice P.</span>
                                        </div>
                                        <div className="flex text-yellow-400"><Star className="h-3 w-3 fill-current" /><Star className="h-3 w-3 fill-current" /><Star className="h-3 w-3 fill-current" /><Star className="h-3 w-3 fill-current" /><Star className="h-3 w-3 fill-current" /></div>
                                    </div>
                                    <p className="text-xs text-slate-600 leading-relaxed">"Dr. {doctor.name.split(' ')[1]} was incredibly attentive and explained everything clearly. The best experience I've had with a specialist."</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Action */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-100 pb-8 z-20">
                     {!selectedTime || isWeekend ? (
                        <Button 
                            disabled
                            className="w-full text-lg py-4 opacity-50 cursor-not-allowed shadow-none bg-slate-200 text-slate-500"
                        >
                            {isWeekend ? 'Not Available' : 'Select a Time'}
                        </Button>
                     ) : (
                        <div className="flex gap-3 animate-slide-up">
                            <Button 
                                onClick={() => onBook(formattedDate, selectedTime, 'in-person')}
                                className="flex-1 text-sm font-bold shadow-lg py-4 bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20 flex items-center justify-center gap-2"
                            >
                                <Building2 className="h-5 w-5" />
                                Book Visit
                            </Button>
                            <Button 
                                onClick={() => onBook(formattedDate, selectedTime, 'virtual')}
                                className="flex-1 text-sm font-bold shadow-lg py-4 bg-indigo-600 hover:bg-indigo-700 shadow-indigo-600/20 flex items-center justify-center gap-2"
                            >
                                <Video className="h-5 w-5" />
                                Book a Call
                            </Button>
                        </div>
                     )}
                </div>
            </div>
        </div>
    )
}

export default DoctorDetailsSheet;