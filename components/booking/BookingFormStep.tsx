import React from 'react';
import { Star, Video, Building2, ShieldCheck, MapPin, Globe, CreditCard } from 'lucide-react';
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
    const isVirtual = consultationType === 'virtual';

    return (
        <div className="animate-fade-in">
            {/* Mode Banner - Stronger Differentiation */}
            <div className={`mb-6 p-4 rounded-2xl border-2 flex items-center gap-4 transition-all ${isVirtual ? 'bg-indigo-50 border-indigo-200' : 'bg-emerald-50 border-emerald-200'}`}>
              <div className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg shrink-0 ${isVirtual ? 'bg-indigo-600 text-white' : 'bg-emerald-600 text-white'}`}>
                  {isVirtual ? <Video className="h-7 w-7" /> : <Building2 className="h-7 w-7" />}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                    <h4 className={`text-base font-bold ${isVirtual ? 'text-indigo-900' : 'text-emerald-900'}`}>
                        {isVirtual ? 'Virtual Consultation' : 'In-Person Visit'}
                    </h4>
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest ${isVirtual ? 'bg-indigo-100 text-indigo-600' : 'bg-emerald-100 text-emerald-600'}`}>
                        {isVirtual ? 'Online' : 'On-Site'}
                    </span>
                </div>
                <p className={`text-[10px] font-bold uppercase tracking-wider mt-1 ${isVirtual ? 'text-indigo-500' : 'text-emerald-500'}`}>
                    {isVirtual ? 'Requires Stable Internet' : 'Report to Reception Desk'}
                </p>
              </div>
            </div>

            {/* Doctor Quick Profile */}
            <div className="flex items-center gap-4 mb-8 bg-slate-50 p-4 rounded-2xl border border-slate-100 shadow-sm">
              <img src={doctor.image} alt={doctor.name} className="w-16 h-16 rounded-full object-cover ring-4 ring-white shadow-md" />
              <div>
                <h3 className="text-lg font-bold text-slate-900 leading-tight">{doctor.name}</h3>
                <p className="text-primary-500 text-xs font-bold uppercase tracking-tight">{doctor.specialty}</p>
                <div className="flex items-center gap-3 mt-1.5">
                    <div className="flex items-center gap-1 bg-white px-2 py-0.5 rounded-lg border border-slate-100">
                        <Star className="h-3 w-3 text-yellow-400 fill-current" />
                        <span className="text-[10px] font-bold text-slate-700">{doctor.rating}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Verified Specialist</span>
                </div>
              </div>
            </div>

            <form onSubmit={onSubmit} className="space-y-6">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2.5">Patient Details</label>
                <div className="relative">
                    <input 
                        required
                        type="text" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={`w-full px-5 py-4 bg-slate-50 border-2 rounded-2xl focus:ring-0 text-slate-900 font-bold transition-all ${isVirtual ? 'focus:border-indigo-400 border-slate-100' : 'focus:border-emerald-400 border-slate-100'}`}
                        placeholder="Full Legal Name"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                        <ShieldCheck className={`h-5 w-5 ${isVirtual ? 'text-indigo-200' : 'text-emerald-200'}`} />
                    </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2.5">Appointment Date</label>
                  <input 
                    required
                    type="date" 
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className={`w-full px-4 py-4 bg-slate-50 border-2 rounded-2xl focus:ring-0 text-slate-900 font-bold text-sm ${isVirtual ? 'focus:border-indigo-400 border-slate-100' : 'focus:border-emerald-400 border-slate-100'}`}
                  />
                </div>
                <div>
                   <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2.5">Time Slot</label>
                   <select 
                      required
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className={`w-full px-4 py-4 bg-slate-50 border-2 rounded-2xl focus:ring-0 text-slate-900 font-bold text-sm appearance-none ${isVirtual ? 'focus:border-indigo-400 border-slate-100' : 'focus:border-emerald-400 border-slate-100'}`}
                   >
                     <option value="">Choose Time</option>
                     {doctor.availability.map(t => (
                       <option key={t} value={t}>{t}</option>
                     ))}
                   </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2.5">Chief Complaint / Reason</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className={`w-full px-5 py-4 bg-slate-50 border-2 rounded-2xl focus:ring-0 text-slate-900 font-bold placeholder:text-slate-300 resize-none transition-all ${isVirtual ? 'focus:border-indigo-400 border-slate-100' : 'focus:border-emerald-400 border-slate-100'}`}
                  placeholder="Describe your symptoms (optional)..."
                  rows={2}
                />
              </div>

              <div className="pt-4 pb-4">
                <Button 
                    type="submit" 
                    className={`w-full py-4.5 text-base font-bold shadow-2xl transition-all transform hover:-translate-y-1 active:scale-95 ${isVirtual ? 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-600/30' : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/30'}`}
                >
                    {isVirtual ? (
                        <>
                            <Video className="h-5 w-5" /> 
                            Confirm Video Booking
                        </>
                    ) : (
                        <>
                            <Building2 className="h-5 w-5" />
                            Confirm In-Person Visit
                        </>
                    )}
                </Button>
                <div className="flex items-center justify-center gap-4 mt-6">
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
                        <Globe className="h-3 w-3" /> Secure Connection
                    </p>
                    <div className="w-1 h-1 bg-slate-200 rounded-full"></div>
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
                        <CreditCard className="h-3 w-3" /> No Pre-payment
                    </p>
                </div>
              </div>
            </form>
        </div>
    );
};
export default BookingFormStep;