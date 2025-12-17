import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stethoscope, Phone, Building2, FileText, Activity, User, Plus, Brain, Bone, Sun, Eye, Smile, Baby, TestTube, UserPlus } from 'lucide-react';
import MobileHeader from '../components/MobileHeader';
import AIHealthTip from '../components/AIHealthTip';
import ConsultModeSection from '../components/ConsultModeSection';
import HomeServiceBookingSheet from '../components/HomeServiceBookingSheet';
import HomeHeader from '../components/home/HomeHeader';
import { USER } from '../constants';

const HomePage = ({ onEmergency }: { onEmergency: () => void }) => {
  const navigate = useNavigate();
  const [selectedHomeService, setSelectedHomeService] = useState<string | null>(null);

  const specialties = [
      { name: 'Cardiology', icon: Activity },
      { name: 'Neurology', icon: Brain },
      { name: 'Pediatrics', icon: Baby },
      { name: 'Orthopedics', icon: Bone },
      { name: 'General', icon: Plus },
      { name: 'Dermatology', icon: Sun },
      { name: 'Gynecology', icon: User },
      { name: 'Ophthalmology', icon: Eye },
      { name: 'Dental', icon: Smile },
  ];

  return (
    <div className="min-h-full bg-slate-50 pb-20">
      <MobileHeader title="G.S Neuroscience" onEmergency={onEmergency} />
      
      <div className="p-4 space-y-6">
        {/* Welcome Section */}
        <HomeHeader user={USER} />

        <AIHealthTip />

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-4 gap-3">
            {[
                { label: 'Doctor', icon: Stethoscope, color: 'bg-blue-100 text-blue-600', action: () => navigate('/doctors') },
                { label: 'Pharmacy', icon: Phone, color: 'bg-green-100 text-green-600', action: () => navigate('/facilities') },
                { label: 'Facilities', icon: Building2, color: 'bg-purple-100 text-purple-600', action: () => navigate('/facilities') },
                { label: 'Reports', icon: FileText, color: 'bg-orange-100 text-orange-600', action: () => navigate('/reports') },
            ].map((item, i) => (
                <button key={i} onClick={item.action} className="flex flex-col items-center gap-2 group">
                    <div className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center shadow-sm group-active:scale-95 transition-transform duration-200`}>
                        <item.icon className="h-7 w-7" />
                    </div>
                    <span className="text-xs font-semibold text-slate-600">{item.label}</span>
                </button>
            ))}
        </div>

        {/* Consultation Mode Options */}
        <ConsultModeSection />

                {/* Hospital at Home Section */}
        <div>
            <div className="flex justify-between items-center mb-3">
                <h3 className="font-bold text-slate-800 text-lg">Hospital at Home</h3>
            </div>
            <div className="grid grid-cols-3 gap-3">
                {[
                    { label: 'Lab Test', icon: TestTube, color: 'bg-rose-50 text-rose-600 border-rose-100' },
                    { label: 'Nursing', icon: UserPlus, color: 'bg-teal-50 text-teal-600 border-teal-100' },
                    { label: 'Physio', icon: Activity, color: 'bg-indigo-50 text-indigo-600 border-indigo-100' },
                ].map((service, i) => (
                    <button 
                        key={i} 
                        onClick={() => setSelectedHomeService(service.label)}
                        className={`flex flex-col items-center justify-center p-4 rounded-2xl border ${service.color} active:scale-95 transition-transform hover:shadow-sm`}
                    >
                        <service.icon className="h-6 w-6 mb-2" />
                        <span className="text-xs font-bold text-slate-700">{service.label}</span>
                    </button>
                ))}
            </div>
        </div>

        {/* Specialties Grid (9 items) */}
        <div>
            <div className="flex justify-between items-center mb-3">
                <h3 className="font-bold text-slate-800 text-lg">Specialties</h3>
                <span onClick={() => navigate('/doctors')} className="text-primary-600 text-sm font-semibold cursor-pointer hover:underline">See All</span>
            </div>
            <div className="grid grid-cols-3 gap-3">
                {specialties.map((dept, i) => (
                    <div 
                        key={i} 
                        onClick={() => navigate('/doctors', { state: { filter: dept.name === 'General' ? 'General Medicine' : dept.name } })}
                        className="bg-white rounded-2xl border border-slate-100 p-3 flex flex-col items-center justify-center gap-2 shadow-sm active:scale-95 transition-transform aspect-[1.1/1]"
                    >
                        <dept.icon className="h-8 w-8 text-primary-500" />
                        <span className="text-[10px] font-bold text-slate-700">{dept.name}</span>
                    </div>
                ))}
            </div>
        </div>



        {/* Promo Banner */}
        <div className="bg-slate-900 rounded-3xl p-6 text-white flex justify-between items-center shadow-xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10 blur-2xl"></div>
             <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary-500/20 rounded-full -ml-10 -mb-10 blur-xl"></div>
            <div className="relative z-10">
                <h4 className="font-bold text-lg mb-1">Heart Checkup</h4>
                <p className="text-xs text-slate-400 mb-4 font-medium">Get 20% off on full body checkups</p>
                <button 
                    onClick={() => navigate('/doctors', { state: { filter: 'Cardiology' } })}
                    className="bg-white text-slate-900 px-4 py-2 rounded-xl text-xs font-bold hover:bg-slate-100 transition-colors active:scale-95 transform"
                >
                    Book Now
                </button>
            </div>
            <Activity className="h-20 w-20 text-slate-700 opacity-50 relative z-10" />
        </div>
      </div>

      <HomeServiceBookingSheet 
        serviceName={selectedHomeService} 
        onClose={() => setSelectedHomeService(null)}
        onConfirm={() => setSelectedHomeService(null)}
      />
    </div>
  );
};

export default HomePage;