import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    ChevronRight, 
    Calendar, 
    Banknote, 
    FileText, 
    Building2, 
    CreditCard, 
    Bell, 
    HelpCircle, 
    Shield, 
    LogOut, 
    User,
    ChevronLeft,
    ClipboardList
} from 'lucide-react';
import MobileHeader from '../components/MobileHeader';
import { authService } from '../services/authService';
import { UserProfile } from '../types';

const ProfilePage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<UserProfile | null>(authService.getCurrentUser());

    useEffect(() => {
        const currentUser = authService.getCurrentUser();
        if (currentUser) {
            setUser(currentUser);
        }
    }, []);

    const handleLogout = () => {
        authService.logout();
        window.location.reload();
    };

    if (!user) return null;

    const menuItems = [
        { name: 'Personal Information', path: '/personal-info', icon: User, color: 'text-primary-600', bg: 'bg-primary-50' },
        { name: 'My Appointments', path: '/appointments', icon: Calendar, color: 'text-primary-600', bg: 'bg-primary-50' },
        { name: 'Lab Reports', path: '/reports', icon: FileText, color: 'text-primary-600', bg: 'bg-primary-50' },
        { name: 'Discharge Summary', path: '/discharge-summary', icon: ClipboardList, color: 'text-primary-600', bg: 'bg-primary-50' },
        { name: 'Transactions', path: '/transactions', icon: Banknote, color: 'text-primary-600', bg: 'bg-primary-50' },
        { name: 'My Facilities', path: '/my-facilities', icon: Building2, color: 'text-primary-600', bg: 'bg-primary-50' },
        { name: 'Payment Methods', path: '/payment-methods', icon: CreditCard, color: 'text-primary-600', bg: 'bg-primary-50' },
        { name: 'Insurance Details', path: '/insurance', icon: Shield, color: 'text-primary-600', bg: 'bg-primary-50' },
        { name: 'Notifications', path: '/notifications', icon: Bell, color: 'text-primary-600', bg: 'bg-primary-50' },
        { name: 'Help & Support', path: '/help', icon: HelpCircle, color: 'text-primary-600', bg: 'bg-primary-50' },
    ];

    return (
        <div className="min-h-full bg-slate-50 pb-24 relative overflow-x-hidden">
            <div className="bg-white/95 backdrop-blur-sm px-4 py-3 flex items-center justify-between sticky top-0 z-30 shadow-sm border-b border-slate-100">
                <div className="flex items-center gap-3">
                    <button onClick={() => navigate(-1)} className="p-1 -ml-1 text-slate-600 hover:bg-slate-50 rounded-full">
                        <ChevronLeft className="h-6 w-6" />
                    </button>
                    <h1 className="text-lg font-bold text-slate-800 tracking-tight">Profile Settings</h1>
                </div>
            </div>
            
            {/* Minimal Header */}
            <div className="bg-white px-6 pt-10 pb-8 rounded-b-[2.5rem] shadow-sm border-b border-slate-100 mb-6 text-center">
                <div className="relative mb-4 inline-block">
                    <div className="w-20 h-20 brand-gradient rounded-full flex items-center justify-center text-white text-2xl font-bold border-4 border-white shadow-lg">
                        {user.initials}
                    </div>
                </div>
                <h2 className="text-xl font-bold text-slate-900">{user.name}</h2>
                <p className="text-primary-500 text-[10px] font-bold tracking-widest uppercase opacity-60 mt-1">Patient ID: #{user.id.slice(-6).toUpperCase()}</p>
            </div>

            <div className="px-5 space-y-6">
                {/* General Settings Section */}
                <div className="space-y-3">
                    <h3 className="text-base font-bold text-slate-900 px-1">General</h3>
                    <div className="bg-white rounded-[1.5rem] overflow-hidden shadow-sm border border-slate-100 divide-y divide-slate-50">
                        {menuItems.map((item, idx) => (
                            <button 
                                key={idx} 
                                onClick={() => navigate(item.path)}
                                className="w-full flex items-center justify-between p-3.5 px-5 hover:bg-slate-50 transition-all group active:bg-slate-100"
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`p-2.5 rounded-xl ${item.bg} ${item.color} group-hover:scale-105 transition-transform`}>
                                        <item.icon className="h-5 w-5" strokeWidth={1.5} />
                                    </div>
                                    <span className="font-bold text-slate-700 text-[14px]">{item.name}</span>
                                </div>
                                <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-primary-600 group-hover:translate-x-1 transition-all" />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Sign Out Section */}
                <div className="space-y-3">
                    <h3 className="text-base font-bold text-slate-900 px-1">Account Actions</h3>
                    <div className="bg-white rounded-[1.5rem] overflow-hidden shadow-sm border border-slate-100">
                        <button 
                            onClick={handleLogout}
                            className="w-full flex items-center justify-between p-3.5 px-5 hover:bg-red-50 transition-all group active:bg-red-100"
                        >
                            <div className="flex items-center gap-4">
                                <div className="p-2.5 rounded-xl bg-red-50 text-red-500 group-hover:scale-105 transition-transform">
                                    <LogOut className="h-5 w-5" strokeWidth={1.5} />
                                </div>
                                <span className="font-bold text-red-600 text-[14px]">Sign Out</span>
                            </div>
                            <ChevronRight className="h-4 w-4 text-red-200 group-hover:translate-x-1 transition-all" />
                        </button>
                    </div>
                </div>
                
                <div className="text-center py-6 opacity-40">
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-[0.5em]">G.S Neuroscience v2.5.0</p>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;