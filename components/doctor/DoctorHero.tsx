import React from 'react';
import { X, Video } from 'lucide-react';
import { Doctor } from '../../types';
import DoctorAvatar from '../DoctorAvatar';

interface DoctorHeroProps {
    doctor: Doctor;
    mode: 'virtual' | 'in-person';
    onClose: () => void;
}

const DoctorHero: React.FC<DoctorHeroProps> = ({ doctor, mode, onClose }) => {
    return (
        <div className="relative h-48 bg-slate-100 shrink-0">
            <DoctorAvatar 
                src={doctor.image} 
                gender={doctor.gender} 
                name={doctor.name} 
                className="w-full h-full opacity-90" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
            <button onClick={onClose} className="absolute top-4 right-4 bg-white/50 backdrop-blur-sm p-2 rounded-full shadow-sm text-slate-800 hover:bg-white transition-colors">
                <X className="h-5 w-5" />
            </button>
            {mode === 'virtual' && (
                <div className="absolute top-4 left-4 bg-indigo-600/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-2 shadow-sm text-white border border-white/20">
                    <Video className="h-3.5 w-3.5" />
                    <span className="text-xs font-bold">Virtual Mode</span>
                </div>
            )}
        </div>
    );
};
export default DoctorHero;