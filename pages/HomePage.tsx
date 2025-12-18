import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stethoscope, Phone, Building2, FileText, Activity, User, Plus, Brain, Bone, Sun, Eye, Smile, Baby, TestTube, UserPlus } from 'lucide-react';
import MobileHeader from '../components/MobileHeader';
import AIHealthTip from '../components/AIHealthTip';
import ConsultModeSection from '../components/ConsultModeSection';
import HomeServiceBookingSheet from '../components/HomeServiceBookingSheet';
import HomeHeader from '../components/home/HomeHeader';
import { authService } from '../services/authService';
import { UserProfile } from '../types';

const HomePage = ({ onEmergency }: { onEmergency: () => void }) => {
  const navigate = useNavigate();
  const [selectedHomeService, setSelectedHomeService] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile | null>(authService.getCurrentUser());

  useEffect(() => {
    setUser(authService.getCurrentUser());
  }, []);

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

  if (!user) return null;

  return (
    <div className="min-h-full bg-slate-50 pb-20">
      <MobileHeader title="G.S Neuroscience" onEmergency={onEmergency} />
      
      <div className="p-4 space-y-6">
        {/* Welcome Section */}
        <HomeHeader user={user} />

        <AIHealthTip />

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-4 gap-3">
            {[
                { label: 'Doctor', icon: Stethoscope, color: 'bg-primary-50 text-primary-600', action: () => navigate('/doctors') },
                { label: 'Pharmacy', icon: Phone, color: 'bg-accent-50 text-accent-600', action: () => navigate('/facilities') },
                { label: 'Facilities', icon: Building2, color: 'bg-primary-50 text-primary-600', action: () => navigate('/facilities') },
                { label: 'Reports', icon: FileText, color: 'bg-accent-50 text-accent-600', action: () => navigate('/reports') },
            ].map((item, i) => (
                <button key={i} onClick={item.action} className="flex flex-col items-center gap-2">
                    <div className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center shadow-sm active:scale-95 transition-transform`}>
                        <item.icon className="h-6 w-6" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{item.label}</span>
                </button>
            ))}
        </div>

        {/* Consultation Mode Options */}
        <ConsultModeSection />

        {/* Specialties Grid (9 items) */}
        <div>
            <div className="flex justify-between items-center mb-3">
                <h3 className="font-bold text-primary-900 text-lg">Our Specialties</h3>
                <span onClick={() => navigate('/doctors')} className="text-accent-600 text-xs font-bold cursor-pointer">SEE ALL</span>
            </div>
            <div className="grid grid-cols-3 gap-3">
                {specialties.map((dept, i) => (
                    <div 
                        key={i} 
                        onClick={() => navigate('/doctors', { state: { filter: dept.name === 'General' ? 'General Medicine' : dept.name } })}
                        className="bg-white rounded-2xl border border-slate-100 p-3 flex flex-col items-center justify-center gap-2 shadow-sm active:scale-95 transition-transform aspect-[1.1/1]"
                    >
                        <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center">
                            <dept.icon className="h-5 w-5 text-primary-500" />
                        </div>
                        <span className="text-[9px] font-bold text-slate-600 uppercase tracking-tight">{dept.name}</span>
                    </div>
                ))}
            </div>
        </div>

        {/* Promo Banner - New Brand Style */}
        <div className="brand-gradient rounded-3xl p-6 text-white flex justify-between items-center shadow-xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10 blur-2xl"></div>
            <div className="relative z-10">
                <h4 className="font-bold text-lg mb-1 brand-text-gradient">Premium Checkup</h4>
                <p className="text-[10px] text-white/70 mb-4 font-medium uppercase tracking-widest">GS Research Centre Special</p>
                <button 
                    onClick={() => navigate('/doctors')}
                    className="bg-white text-primary-600 px-5 py-2 rounded-xl text-xs font-bold active:scale-95 transform transition-all shadow-md"
                >
                    Book Now
                </button>
            </div>
            <Activity className="h-20 w-20 text-white opacity-10 absolute right-4 top-1/2 -translate-y-1/2" />
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