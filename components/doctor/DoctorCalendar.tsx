import React from 'react';

interface DoctorCalendarProps {
    dates: Date[];
    selectedDateIndex: number;
    onSelectDate: (index: number) => void;
}

const DoctorCalendar: React.FC<DoctorCalendarProps> = ({ dates, selectedDateIndex, onSelectDate }) => {
    return (
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-4 pt-2 -mx-6 px-6 scroll-smooth snap-x">
            {dates.map((date, i) => {
                const isSelected = i === selectedDateIndex;
                const isWeekendDay = date.getDay() === 0 || date.getDay() === 6;
                const isToday = new Date().toDateString() === date.toDateString();
                
                return (
                    <button 
                        key={i} 
                        onClick={() => onSelectDate(i)}
                        className={`min-w-[70px] h-[85px] rounded-2xl flex flex-col items-center justify-center border transition-all duration-300 flex-shrink-0 relative overflow-hidden snap-center ${
                            isSelected 
                            ? 'bg-primary-600 text-white border-primary-600 shadow-xl shadow-primary-600/20 scale-105 z-10' 
                            : isWeekendDay
                                ? 'bg-slate-50 text-slate-400 border-slate-100 opacity-80 grayscale'
                                : 'bg-white text-slate-600 border-slate-200 hover:border-primary-300'
                        }`}
                    >
                        {isToday && !isSelected && (
                            <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                        )}
                        <span className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${isSelected ? 'opacity-80' : 'opacity-60'}`}>
                            {date.toLocaleDateString('en-US', { weekday: 'short' })}
                        </span>
                        <span className={`text-2xl font-bold ${isSelected ? 'text-white' : 'text-slate-800'}`}>
                            {date.getDate()}
                        </span>
                        {isSelected && (
                            <div className="absolute bottom-2 w-1 h-1 bg-white rounded-full"></div>
                        )}
                    </button>
                )
            })}
        </div>
    );
};
export default DoctorCalendar;