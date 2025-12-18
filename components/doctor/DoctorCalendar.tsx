import React from 'react';

interface DoctorCalendarProps {
    dates: Date[];
    selectedDateIndex: number;
    onSelectDate: (index: number) => void;
}

const DoctorCalendar: React.FC<DoctorCalendarProps> = ({ dates, selectedDateIndex, onSelectDate }) => {
    return (
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-6 pt-2 -mx-6 px-6 scroll-smooth snap-x">
            {dates.map((date, i) => {
                const isSelected = i === selectedDateIndex;
                const isWeekendDay = date.getDay() === 0 || date.getDay() === 6;
                const isToday = new Date().toDateString() === date.toDateString();
                
                return (
                    <button 
                        key={i} 
                        onClick={() => onSelectDate(i)}
                        className={`min-w-[72px] h-[90px] rounded-2xl flex flex-col items-center justify-center border transition-all duration-300 flex-shrink-0 relative overflow-hidden snap-center group ${
                            isSelected 
                            ? 'bg-primary-500 text-white border-primary-500 shadow-xl shadow-primary-500/30 scale-105 z-10' 
                            : isWeekendDay
                                ? 'bg-slate-100 text-slate-400 border-slate-200'
                                : 'bg-white text-slate-600 border-slate-200 hover:border-primary-300 hover:shadow-md'
                        }`}
                    >
                        {isToday && !isSelected && (
                            <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                        )}
                        
                        <span className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${isSelected ? 'text-white/80' : 'text-slate-400'}`}>
                            {date.toLocaleDateString('en-US', { weekday: 'short' })}
                        </span>
                        
                        <span className={`text-xl font-bold ${isSelected ? 'text-white' : 'text-slate-800'}`}>
                            {date.getDate()}
                        </span>

                        {isWeekendDay && !isSelected && (
                            <span className="text-[8px] font-black text-slate-300 uppercase mt-1 tracking-tighter">Weekend</span>
                        )}

                        {isSelected && (
                            <div className="absolute bottom-2 w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                        )}
                    </button>
                )
            })}
        </div>
    );
};
export default DoctorCalendar;