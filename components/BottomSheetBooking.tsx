import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Doctor, Appointment } from '../types';
import BookingFormStep from './booking/BookingFormStep';
import BookingSuccessSummary from './booking/BookingSuccessSummary';

const BottomSheetBooking: React.FC<{ 
  doctor: Doctor | null, 
  onClose: () => void, 
  onConfirm: (appt: Appointment) => void,
  initialDate?: string,
  initialTime?: string,
  consultationType?: 'virtual' | 'in-person'
}> = ({ doctor, onClose, onConfirm, initialDate = '', initialTime = '', consultationType = 'in-person' }) => {
  const [date, setDate] = useState(initialDate);
  const [time, setTime] = useState(initialTime);
  const [name, setName] = useState('');
  const [notes, setNotes] = useState('');
  const [step, setStep] = useState(1);
  const [appointment, setAppointment] = useState<Appointment | null>(null);

  // Update state if props change
  useEffect(() => {
    if (initialDate) setDate(initialDate);
    if (initialTime) setTime(initialTime);
  }, [initialDate, initialTime]);

  if (!doctor) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newAppointment: Appointment = {
      id: Date.now().toString(),
      doctorId: doctor.id,
      doctorName: doctor.name,
      doctorSpecialty: doctor.specialty,
      date,
      time,
      patientName: name,
      notes,
      status: 'confirmed',
      consultationType
    };
    setAppointment(newAppointment);
    setStep(2);
  };

  const handleFinalConfirm = () => {
      if (appointment) {
          onConfirm(appointment);
      }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/60 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div className="bg-white rounded-t-3xl p-6 w-full max-h-[90vh] overflow-y-auto animate-slide-up shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-6"></div>
        
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-slate-900">
                {step === 1 ? (consultationType === 'virtual' ? 'Book Video Consultation' : 'Book Appointment') : 'Confirmation'}
            </h2>
            <button onClick={onClose} className="p-2 bg-slate-50 rounded-full">
                <X className="h-5 w-5 text-slate-500" />
            </button>
        </div>

        {step === 1 ? (
          <BookingFormStep 
            doctor={doctor}
            consultationType={consultationType}
            date={date}
            setDate={setDate}
            time={time}
            setTime={setTime}
            name={name}
            setName={setName}
            notes={notes}
            setNotes={setNotes}
            onSubmit={handleSubmit}
          />
        ) : (
          <BookingSuccessSummary 
            doctor={doctor}
            date={date}
            time={time}
            patientName={name}
            consultationType={consultationType}
            onConfirm={handleFinalConfirm}
          />
        )}
      </div>
    </div>
  );
};

export default BottomSheetBooking;