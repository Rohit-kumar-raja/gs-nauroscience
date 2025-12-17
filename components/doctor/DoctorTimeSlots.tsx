import React from 'react';
import { Calendar, Check, Clock } from 'lucide-react';

interface DoctorTimeSlotsProps {
    availability: string[];
    selectedTime: string | null;
    onSelectTime: (time: string) => void;
    isWeekend: boolean;
}

const DoctorTimeSlots: React.FC<DoctorTimeSlotsProps> = ({ availability, selectedTime, onSelectTime, isWeekend }) => {
    if (isWeekend) {
        return (
            <div className="flex flex-col items-center justify-center h-40 bg-slate-50 rounded-2xl border border-slate-200 border-dashed">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-3">
                    <Calendar className="h-6 w-6 text-slate-300" />
                </div>
                <p className="text-sm font-bold text-slate-500">Weekend Off</p>
                <p className="text-xs text-slate-400 mt-1">Please select a weekday</p>
            </div>
        );
    }

    return (
        <div className="animate-fade-in">
            <div className="flex justify-between items-center mb-4 px-1">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wide flex items-center gap-1">
                    <Clock className="h-3 w-3" /> Available Slots
                </p>
                <span className="text-[10px] font-medium text-slate-400 bg-slate-100 px-2 py-1 rounded-full">
                    {availability.length} slots
                </span>
            </div>
            <div className="grid grid-cols-3 gap-3">
                {availability.map((time, i) => {
                    const isSelected = selectedTime === time;
                    return (
                        <button 
                            key={i} 
                            onClick={() => onSelectTime(time)}
                            className={`py-3.5 px-2 flex items-center justify-center gap-2 rounded-xl text-sm font-bold transition-all border ${
                                isSelected 
                                ? 'bg-primary-600 text-white border-primary-600 shadow-md ring-2 ring-primary-100 scale-[1.02]' 
                                : 'bg-white text-slate-700 border-slate-200 hover:border-primary-400 hover:bg-slate-50'
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