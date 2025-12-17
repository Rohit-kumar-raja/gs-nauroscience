import React, { useState } from 'react';
import { X, CheckCircle, MapPin, Calendar, User } from 'lucide-react';
import Button from './Button';

const HomeServiceBookingSheet: React.FC<{ 
  serviceName: string | null, 
  onClose: () => void, 
  onConfirm: () => void 
}> = ({ serviceName, onClose, onConfirm }) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [patientName, setPatientName] = useState('');
  const [address, setAddress] = useState('');
  const [step, setStep] = useState(1);

  if (!serviceName) return null;

  const timeSlots = ['07:00', '08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00', '18:00'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
    // Simulate API call
    setTimeout(() => {
        onConfirm();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/60 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div className="bg-white rounded-t-3xl p-6 w-full max-h-[90vh] overflow-y-auto animate-slide-up shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-6"></div>
        
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-slate-900">Hospital at Home</h2>
            <button onClick={onClose} className="p-2 bg-slate-50 rounded-full">
                <X className="h-5 w-5 text-slate-500" />
            </button>
        </div>

        {step === 1 ? (
          <>
            <div className="flex items-center gap-4 mb-8 bg-primary-50 p-4 rounded-xl border border-primary-100">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600">
                  <MapPin className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-primary-600 font-bold uppercase tracking-wide">Selected Service</p>
                <h3 className="text-lg font-bold text-slate-900">{serviceName}</h3>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Patient Name</label>
                <div className="relative">
                    <input 
                    required
                    type="text" 
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-primary-500 text-slate-900 font-medium placeholder:text-slate-400"
                    placeholder="Enter full name"
                    />
                    <User className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Home Address</label>
                <div className="relative">
                    <textarea 
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-primary-500 text-slate-900 font-medium placeholder:text-slate-400 resize-none"
                    placeholder="Enter complete address..."
                    rows={2}
                    />
                    <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                </div>
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
                     {timeSlots.map(t => (
                       <option key={t} value={t}>{t}</option>
                     ))}
                   </select>
                </div>
              </div>

              <div className="pt-4 pb-2">
                <Button type="submit" className="w-full py-4 text-base font-bold shadow-lg shadow-primary-600/30">
                    Confirm Booking
                </Button>
              </div>
            </form>
          </>
        ) : (
          <div className="py-12 flex flex-col items-center text-center animate-fade-in">
            <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-6 ring-4 ring-green-100">
              <CheckCircle className="h-12 w-12" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Request Sent!</h3>
            <p className="text-slate-500 px-6">Our team will arrive at your address on the scheduled time.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeServiceBookingSheet;