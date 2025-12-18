
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    ChevronLeft, 
    Save, 
    Phone, 
    Mail, 
    MapPin, 
    CheckCircle,
    User,
    ShieldCheck
} from 'lucide-react';
import MobileHeader from '../components/MobileHeader';
import Button from '../components/Button';
import { authService } from '../services/authService';
import { UserProfile } from '../types';

const PersonalDetailsPage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<UserProfile | null>(authService.getCurrentUser());
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        const currentUser = authService.getCurrentUser();
        if (currentUser) setUser(currentUser);
    }, []);

    const handleChange = (field: keyof UserProfile, value: string) => {
        if (!user) return;
        setUser({ ...user, [field]: value });
    };

    const handleSave = () => {
        if (!user) return;
        authService.updateProfile(user);
        setShowSuccess(true);
        setTimeout(() => {
            setShowSuccess(false);
            navigate('/profile');
        }, 1500);
    };

    if (!user) return null;

    return (
        <div className="min-h-full bg-slate-50 pb-24">
            <MobileHeader title="Personal Information" showBack />
            
            <div className="p-5 space-y-6">
                <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                        <User className="h-4 w-4 text-primary-500" /> Identity Details
                    </h3>
                    
                    <div className="space-y-6">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Full Name</label>
                            <input 
                                type="text"
                                value={user.name}
                                onChange={(e) => handleChange('name', e.target.value)}
                                className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-50 rounded-xl focus:border-primary-500 transition-all font-bold text-slate-800"
                            />
                        </div>

                        <div>
                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Mobile Number</label>
                            <div className="relative">
                                <input 
                                    type="tel"
                                    value={user.phone}
                                    onChange={(e) => handleChange('phone', e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-slate-50 rounded-xl focus:border-primary-500 transition-all font-bold text-slate-800"
                                />
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Email Address</label>
                            <div className="relative">
                                <input 
                                    type="email"
                                    value={user.email}
                                    onChange={(e) => handleChange('email', e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-slate-50 rounded-xl focus:border-primary-500 transition-all font-bold text-slate-800"
                                />
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Residential Address</label>
                            <div className="relative">
                                <textarea 
                                    value={user.address}
                                    onChange={(e) => handleChange('address', e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-slate-50 rounded-xl focus:border-primary-500 transition-all font-bold text-slate-800 resize-none"
                                    rows={3}
                                />
                                <MapPin className="absolute left-4 top-4 h-4 w-4 text-slate-400" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                    {[
                        { label: 'Blood', val: user.bloodType },
                        { label: 'Weight', val: user.weight },
                        { label: 'Height', val: user.height },
                    ].map((s, i) => (
                        <div key={i} className="bg-white p-3 rounded-2xl text-center border border-slate-100">
                            <p className="text-[8px] font-bold text-slate-400 uppercase mb-1">{s.label}</p>
                            <p className="text-sm font-bold text-primary-600">{s.val}</p>
                        </div>
                    ))}
                </div>

                <Button onClick={handleSave} className="w-full py-4.5 bg-primary-600 shadow-primary-600/20 text-base font-bold rounded-2xl mt-4">
                    <Save className="h-5 w-5" /> Save Changes
                </Button>
            </div>

            {showSuccess && (
                <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50">
                    <div className="bg-primary-600 text-white px-6 py-3 rounded-2xl flex items-center gap-3 shadow-2xl">
                        <CheckCircle className="h-5 w-5" />
                        <span className="text-sm font-bold">Profile Updated</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PersonalDetailsPage;
