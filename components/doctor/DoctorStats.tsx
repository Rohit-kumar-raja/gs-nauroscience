import React from 'react';
import { User, Activity, Star } from 'lucide-react';
import { Doctor } from '../../types';

const DoctorStats: React.FC<{ doctor: Doctor }> = ({ doctor }) => {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 mb-6 text-center">
             <h2 className="text-2xl font-bold text-slate-900">{doctor.name}</h2>
             <p className="text-primary-600 font-semibold">{doctor.specialty}</p>
             <div className="flex justify-center items-center gap-4 mt-4">
                 <div className="text-center">
                     <div className="bg-blue-50 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-1 text-blue-600">
                        <User className="h-5 w-5" />
                     </div>
                     <p className="text-xs text-slate-400 font-medium mt-1">Patients</p>
                     <p className="font-bold text-slate-700">{doctor.patients}+</p>
                 </div>
                 <div className="text-center">
                     <div className="bg-green-50 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-1 text-green-600">
                        <Activity className="h-5 w-5" />
                     </div>
                     <p className="text-xs text-slate-400 font-medium mt-1">Exp</p>
                     <p className="font-bold text-slate-700">{doctor.experience} Yrs</p>
                 </div>
                 <div className="text-center">
                     <div className="bg-yellow-50 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-1 text-yellow-600">
                        <Star className="h-5 w-5 fill-current" />
                     </div>
                     <p className="text-xs text-slate-400 font-medium mt-1">Rating</p>
                     <p className="font-bold text-slate-700">{doctor.rating}</p>
                 </div>
             </div>
        </div>
    );
};
export default DoctorStats;