import React from 'react';
import { CheckCircle } from 'lucide-react';
import Button from '../Button';
import { Doctor } from '../../types';

interface BookingSuccessSummaryProps {
    doctor: Doctor;
    date: string;
    time: string;
    patientName: string;
    consultationType: 'virtual' | 'in-person';
    onConfirm: () => void;
}

const BookingSuccessSummary: React.FC<BookingSuccessSummaryProps> = ({
    doctor, date, time, patientName, consultationType, onConfirm
}) => {
    return (
        <div className="flex flex-col animate-fade-in">
            <div className="text-center mb-6">
                <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4 ring-4 ring-green-100">
                    <CheckCircle className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Booked Successfully!</h3>
                <p className="text-slate-500 text-sm mt-1">Your appointment is confirmed.</p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-5 space-y-4 border border-slate-100 mb-6">
                <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                    <span className="text-sm text-slate-500">Doctor</span>
                    <span className="text-sm font-bold text-slate-900">{doctor.name}</span>
                </div>
                 <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                    <span className="text-sm text-slate-500">Date & Time</span>
                    <span className="text-sm font-bold text-slate-900">{new Date(date).toLocaleDateString()} at {time}</span>
                </div>
                 <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                    <span className="text-sm text-slate-500">Patient</span>
                    <span className="text-sm font-bold text-slate-900">{patientName}</span>
                </div>
                 <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-500">Type</span>
                    <span className={`text-sm font-bold px-2 py-0.5 rounded-md ${consultationType === 'virtual' ? 'bg-indigo-100 text-indigo-700' : 'bg-emerald-100 text-emerald-700'}`}>
                        {consultationType === 'virtual' ? 'Virtual Call' : 'In-Person Visit'}
                    </span>
                </div>
            </div>

            <Button onClick={onConfirm} className="w-full py-4 text-base font-bold shadow-lg shadow-primary-600/30">
                Done
            </Button>
        </div>
    );
};
export default BookingSuccessSummary;