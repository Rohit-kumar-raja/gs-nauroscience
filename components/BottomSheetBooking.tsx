import React, { useState, useEffect } from 'react';
import { X, ChevronLeft } from 'lucide-react';
import { Doctor, Appointment, Transaction } from '../types';
import BookingFormStep from './booking/BookingFormStep';
import BookingSuccessSummary from './booking/BookingSuccessSummary';
import PaymentStep from './booking/PaymentStep';
import { authService } from '../services/authService';
import { paymentService } from '../services/paymentService';
import { transactionService } from '../services/transactionService';

const BottomSheetBooking: React.FC<{ 
  doctor: Doctor | null, 
  onClose: () => void, 
  onConfirm: (appt: Appointment) => void,
  initialDate?: string,
  initialTime?: string,
  consultationType?: 'virtual' | 'in-person'
}> = ({ doctor, onClose, onConfirm, initialDate = '', initialTime = '', consultationType = 'in-person' }) => {
  const currentUser = authService.getCurrentUser();
  const [date, setDate] = useState(initialDate);
  const [time, setTime] = useState(initialTime);
  const [name, setName] = useState(currentUser?.name || '');
  const [notes, setNotes] = useState('');
  const [step, setStep] = useState(1); // 1: Form, 2: Payment, 3: Success
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [loading, setLoading] = useState(false);

  const CONSULTATION_FEE = 1500;

  useEffect(() => {
    if (initialDate) setDate(initialDate);
    if (initialTime) setTime(initialTime);
  }, [initialDate, initialTime]);

  if (!doctor) return null;

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePayNow = async () => {
    if (!currentUser) return;
    setLoading(true);
    try {
        const response = await paymentService.processRazorpayPayment(
            CONSULTATION_FEE,
            currentUser,
            `Consultation with ${doctor.name}`
        );

        if (response) {
            completeBooking('paid', response.razorpay_payment_id);
        }
    } catch (error) {
        console.error("Payment error", error);
    } finally {
        setLoading(false);
    }
  };

  const handlePayLater = () => {
    completeBooking('pay_at_desk');
  };

  const completeBooking = (paymentStatus: 'paid' | 'pay_at_desk', paymentId?: string) => {
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
      consultationType: consultationType as 'virtual' | 'in-person',
      paymentStatus,
      paymentId,
      amount: CONSULTATION_FEE
    };

    // Create Transaction Record
    const tx: Transaction = {
        id: `tx_${Date.now()}`,
        title: `Consultation - ${doctor.name}`,
        date: new Date().toISOString(),
        amount: -CONSULTATION_FEE, // Negative for debit
        type: 'debit',
        status: paymentStatus === 'paid' ? 'Completed' : 'Pending',
        category: 'Appointment',
        referenceId: newAppointment.id
    };
    transactionService.create(tx);

    setAppointment(newAppointment);
    setStep(3);
  };

  const handleFinalConfirm = () => {
      if (appointment) {
          onConfirm(appointment);
      }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/60 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div className="bg-white rounded-t-3xl p-6 w-full max-h-[95vh] overflow-y-auto animate-slide-up shadow-2xl relative" onClick={e => e.stopPropagation()}>
        {loading && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center gap-4">
                <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin"></div>
                <p className="text-sm font-bold text-slate-800 uppercase tracking-widest">Processing Payment...</p>
            </div>
        )}

        <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-6"></div>
        
        <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
                {step === 2 && (
                    <button onClick={() => setStep(1)} className="p-2 -ml-2 text-slate-400 hover:text-slate-600">
                        <ChevronLeft className="h-5 w-5" />
                    </button>
                )}
                <h2 className="text-xl font-bold text-slate-900">
                    {step === 1 ? (consultationType === 'virtual' ? 'Book Video Call' : 'Book Appointment') : 
                     step === 2 ? 'Payment Method' : 'Confirmation'}
                </h2>
            </div>
            <button onClick={onClose} className="p-2 bg-slate-50 rounded-full">
                <X className="h-5 w-5 text-slate-500" />
            </button>
        </div>

        {step === 1 && (
          <BookingFormStep 
            doctor={doctor}
            consultationType={consultationType as 'virtual' | 'in-person'}
            date={date}
            setDate={setDate}
            time={time}
            setTime={setTime}
            name={name}
            setName={setName}
            notes={notes}
            setNotes={setNotes}
            onSubmit={handleFormSubmit}
          />
        )}

        {step === 2 && (
            <PaymentStep 
                amount={CONSULTATION_FEE} 
                onPayNow={handlePayNow} 
                onPayLater={handlePayLater} 
            />
        )}

        {step === 3 && (
          <BookingSuccessSummary 
            doctor={doctor}
            date={date}
            time={time}
            patientName={name}
            consultationType={consultationType as 'virtual' | 'in-person'}
            onConfirm={handleFinalConfirm}
            paymentStatus={appointment?.paymentStatus}
          />
        )}
      </div>
    </div>
  );
};

export default BottomSheetBooking;