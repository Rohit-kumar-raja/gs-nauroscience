import React from 'react';
import { Calendar, Check, Clock, Loader2 } from 'lucide-react';

interface DoctorTimeSlotsProps {
    availability: string[];
    selectedTime: string | null;
    onSelectTime: (time: string) => void;
    isWeekend: boolean;
    isLoading?: boolean;
}

const DoctorTimeSlots: React.FC<DoctorTimeSlotsProps> = ({ availability, selectedTime, onSelectTime, isWeekend, isLoading = false }) => {
    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-40 bg-slate-50/50 rounded-2xl border border-slate-200 border-dashed animate-pulse">
                <Loader2 className="h-8 w-8 text-primary-300 animate-spin mb-2" />
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Updating Slots...</p>
            </div>
        );
    }

    if (isWeekend) {
        return (
            <div className="flex flex-col items-center justify-center h-40 bg-slate-50 rounded-2xl border border-slate-200 border-dashed">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-3">
                    <Calendar className="h-6 w-6 text-slate-300" />
                </div>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-tight">Doctor Unavailable</p>
                <p className="text-[10px] text-slate-400 mt-1 font-bold uppercase tracking-widest">Closed on Weekends</p>
            </div>
        );
    }

    return (
        <div className="animate-fade-in">
            <div className="flex justify-between items-center mb-4 px-1">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wide flex items-center gap-1.5">
                    <Clock className="h-3 w-3 text-primary-500" /> Available Time
                </p>
                <span className="text-[10px] font-bold text-primary-600 bg-primary-50 px-2.5 py-1 rounded-full border border-primary-100">
                    {availability.length} Open Slots
                </span>
            </div>
            <div className="grid grid-cols-3 gap-3">
                {availability.map((time, i) => {
                    const isSelected = selectedTime === time;
                    return (
                        <button 
                            key={i} 
                            onClick={() => onSelectTime(time)}
                            className={`py-4 px-2 flex items-center justify-center gap-2 rounded-2xl text-sm font-bold transition-all border-2 ${
                                isSelected 
                                ? 'bg-primary-500 text-white border-primary-500 shadow-lg shadow-primary-500/30 scale-[1.03]' 
                                : 'bg-white text-slate-700 border-slate-100 hover:border-primary-200 hover:bg-slate-50 active:scale-95'
                            }`}
                        >
                            {time}
                            {isSelected && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
                        </button>
                    )
                })}
            </div>
        </div>
    );
};
export default DoctorTimeSlots;