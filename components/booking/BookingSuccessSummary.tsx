import React from 'react';
import { CheckCircle, Video, Building2, Calendar, MapPin, Globe, CreditCard, Banknote } from 'lucide-react';
import Button from '../Button';
import { Doctor } from '../../types';

interface BookingSuccessSummaryProps {
    doctor: Doctor;
    date: string;
    time: string;
    patientName: string;
    consultationType: 'virtual' | 'in-person';
    onConfirm: () => void;
    paymentStatus?: 'paid' | 'pending' | 'pay_at_desk';
}

const BookingSuccessSummary: React.FC<BookingSuccessSummaryProps> = ({
    doctor, date, time, patientName, consultationType, onConfirm, paymentStatus
}) => {
    const isVirtual = consultationType === 'virtual';

    return (
        <div className="flex flex-col animate-fade-in">
            <div className="text-center mb-8">
                <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 ring-8 transition-all ${isVirtual ? 'bg-indigo-50 text-indigo-500 ring-indigo-50/50' : 'bg-emerald-50 text-emerald-500 ring-emerald-50/50'}`}>
                    <CheckCircle className="h-12 w-12" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Appointment Set!</h3>
                <p className="text-slate-500 text-sm mt-1 font-medium">Confirmation has been sent to your email.</p>
            </div>

            <div className="bg-slate-50 rounded-3xl p-6 space-y-5 border border-slate-100 mb-8 shadow-inner">
                <div className="flex justify-between items-center border-b border-slate-200/50 pb-4">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Specialist</span>
                    <span className="text-sm font-bold text-slate-900">{doctor.name}</span>
                </div>
                 <div className="flex justify-between items-center border-b border-slate-200/50 pb-4">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Schedule</span>
                    <div className="text-right">
                        <span className="text-sm font-bold text-slate-900 block">{new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        <span className="text-xs font-bold text-primary-500">{time}</span>
                    </div>
                </div>
                <div className="flex justify-between items-center border-b border-slate-200/50 pb-4">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Payment</span>
                    <div className="text-right flex flex-col items-end">
                        <div className={`flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-tight px-2.5 py-1 rounded-full ${paymentStatus === 'paid' ? 'bg-emerald-100 text-emerald-600' : 'bg-orange-100 text-orange-600'}`}>
                            {paymentStatus === 'paid' ? <CreditCard className="h-3 w-3" /> : <Banknote className="h-3 w-3" />}
                            {paymentStatus === 'paid' ? 'Paid Online' : 'Pay at Counter'}
                        </div>
                        {paymentStatus === 'paid' && <span className="text-[8px] text-slate-400 mt-1 font-bold">TXN ID: #{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>}
                    </div>
                </div>
                 <div className="flex justify-between items-center border-b border-slate-200/50 pb-4">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Type</span>
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl font-bold text-[11px] uppercase tracking-tighter ${isVirtual ? 'bg-indigo-600 text-white' : 'bg-emerald-600 text-white'}`}>
                        {isVirtual ? <Video className="h-3 w-3" /> : <Building2 className="h-3 w-3" />}
                        {isVirtual ? 'Virtual Call' : 'In-Person Visit'}
                    </div>
                </div>
            </div>

            {/* Instruction Card */}
            <div className={`mb-8 p-5 rounded-[2rem] border shadow-sm ${isVirtual ? 'bg-indigo-50/50 border-indigo-100' : 'bg-emerald-50/50 border-emerald-100'}`}>
                <h4 className={`text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2 ${isVirtual ? 'text-indigo-600' : 'text-emerald-600'}`}>
                    {isVirtual ? <Globe className="h-4 w-4" /> : <MapPin className="h-4 w-4" />}
                    Next Steps
                </h4>
                <div className="text-sm text-slate-600 leading-relaxed font-medium">
                    {isVirtual 
                        ? "Ensure you have a stable internet connection. A secure link will be enabled in 'My Appointments' 15 minutes before the start time."
                        : "Please arrive at the G.S Neuroscience Main Wing reception 15 minutes early. Carry your digital ID available in your profile."}
                    {paymentStatus !== 'paid' && (
                        <p className="mt-2 text-orange-600 font-bold">Please settle the balance of ₹1,500 at the billing desk upon arrival.</p>
                    )}
                </div>
            </div>

            <Button onClick={onConfirm} className="w-full py-4 text-base font-bold shadow-2xl shadow-primary-500/30 rounded-2xl">
                Return to Dashboard
            </Button>
        </div>
    );
};
export default BookingSuccessSummary;