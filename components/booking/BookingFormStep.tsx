import React from 'react';
import { Star, Video, Building2 } from 'lucide-react';
import Button from '../Button';
import { Doctor } from '../../types';

interface BookingFormStepProps {
    doctor: Doctor;
    consultationType: 'virtual' | 'in-person';
    date: string;
    setDate: (d: string) => void;
    time: string;
    setTime: (t: string) => void;
    name: string;
    setName: (n: string) => void;
    notes: string;
    setNotes: (n: string) => void;
    onSubmit: (e: React.FormEvent) => void;
}

const BookingFormStep: React.FC<BookingFormStepProps> = ({
    doctor, consultationType, date, setDate, time, setTime, name, setName, notes, setNotes, onSubmit
}) => {
    return (
        <>
            <div className={`flex items-center gap-4 mb-6 p-4 rounded-xl border ${consultationType === 'virtual' ? 'bg-indigo-50 border-indigo-100' : 'bg-slate-50 border-slate-100'}`}>
              <img src={doctor.image} alt={doctor.name} className="w-16 h-16 rounded-full object-cover ring-2 ring-white shadow-sm" />
              <div>
                <p className={`text-sm font-medium flex items-center gap-1.5 ${consultationType === 'virtual' ? 'text-indigo-600' : 'text-slate-500'}`}>
                    {consultationType === 'virtual' ? <Video className="h-3.5 w-3.5" /> : <Building2 className="h-3.5 w-3.5" />}
                    {doctor.specialty}
                </p>
                <h3 className="text-lg font-bold text-slate-900">{doctor.name}</h3>
                <div className="flex items-center gap-1 mt-1">
                    <Star className="h-3.5 w-3.5 text-yellow-400 fill-current" />
                    <span className="text-xs font-semibold text-slate-700">{doctor.rating} Rating</span>
                </div>
              </div>
            </div>

            <form onSubmit={onSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Patient Name</label>
                <input 
                  required
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-primary-500 text-slate-900 font-medium placeholder:text-slate-400"
                  placeholder="Enter full name"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Date</label>
                  <input 
                    required
                    type="date" 
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-primary-500 text-slate-900 font-medium"
                  />
                </div>
                <div>
                   <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Time Slot</label>
                   <select 
                      required
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-primary-500 text-slate-900 font-medium"
                   >
                     <option value="">Select</option>
                     {doctor.availability.map(t => (
                       <option key={t} value={t}>{t}</option>
                     ))}
                   </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Notes (Optional)</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-primary-500 text-slate-900 font-medium placeholder:text-slate-400 resize-none"
                  placeholder="Describe symptoms or add special requests..."
                  rows={3}
                />
              </div>

              <div className="pt-4 pb-2">
                <Button type="submit" className={`w-full py-4 text-base font-bold shadow-lg ${consultationType === 'virtual' ? 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-600/30' : 'shadow-primary-600/30'}`}>
                    Confirm Booking
                </Button>
              </div>
            </form>
        </>
    );
};
export default BookingFormStep;