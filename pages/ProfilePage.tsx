import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, CreditCard, Shield, Bell, HelpCircle, LogOut, Building2, ChevronRight, Save, X, Edit2, Calendar, Receipt, FileText } from 'lucide-react';
import MobileHeader from '../components/MobileHeader';
import Button from '../components/Button';
import { USER } from '../constants';
import { UserProfile } from '../types';

const ProfilePage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<UserProfile>(USER);
    const [isEditing, setIsEditing] = useState(false);

    // Initialize from localStorage if available, else use default USER
    useEffect(() => {
        const storedUser = localStorage.getItem('userProfile');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleChange = (field: keyof UserProfile, value: string | number) => {
        setUser(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        setIsEditing(false);
        // Regenerate initials if name changed
        const newInitials = user.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
        const updatedUser = { ...user, initials: newInitials };
        setUser(updatedUser);
        localStorage.setItem('userProfile', JSON.stringify(updatedUser));
        alert('Profile Updated Successfully!');
    };

    return (
        <div className="min-h-full bg-slate-50 pb-20">
            <MobileHeader title="My Profile" showBack />
            
            <div className="bg-white pb-6 rounded-b-3xl shadow-sm border-b border-slate-100">
                <div className="flex flex-col items-center pt-6">
                    <div className="relative">
                        <div className="w-24 h-24 bg-gradient-to-tr from-primary-500 to-primary-300 rounded-full flex items-center justify-center text-white text-3xl font-bold border-4 border-white shadow-lg">
                            {user.initials}
                        </div>
                        <button 
                            onClick={() => setIsEditing(!isEditing)}
                            className={`absolute bottom-0 right-0 p-2 rounded-full border-2 border-white shadow-sm transition-colors ${isEditing ? 'bg-red-500 text-white' : 'bg-slate-800 text-white'}`}
                        >
                            {isEditing ? <X className="h-4 w-4" /> : <Edit2 className="h-4 w-4" />}
                        </button>
                    </div>
                    
                    {isEditing ? (
                        <div className="mt-4 w-full px-10">
                            <input 
                                type="text"
                                value={user.name}
                                onChange={(e) => handleChange('name', e.target.value)}
                                className="w-full text-center text-xl font-bold text-slate-900 border-b-2 border-primary-500 focus:outline-none bg-transparent pb-1"
                            />
                        </div>
                    ) : (
                        <h2 className="text-xl font-bold text-slate-900 mt-4">{user.name}</h2>
                    )}
                    <p className="text-slate-500 text-sm">Patient ID: #GS-8829</p>
                </div>

                <div className="grid grid-cols-3 gap-4 px-6 mt-8">
                    {[
                        { label: 'Height', key: 'height' as keyof UserProfile, value: user.height },
                        { label: 'Weight', key: 'weight' as keyof UserProfile, value: user.weight },
                        { label: 'Blood', key: 'bloodType' as keyof UserProfile, value: user.bloodType },
                    ].map((stat, i) => (
                        <div key={i} className={`bg-slate-50 p-3 rounded-2xl text-center border border-slate-100 ${isEditing ? 'ring-2 ring-primary-100 bg-white' : ''}`}>
                            <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">{stat.label}</p>
                            {isEditing ? (
                                <input 
                                    type="text"
                                    value={stat.value}
                                    onChange={(e) => handleChange(stat.key, e.target.value)}
                                    className="w-full text-center text-sm font-bold text-slate-800 border-b border-slate-300 focus:border-primary-500 focus:outline-none bg-transparent"
                                />
                            ) : (
                                <p className="text-lg font-bold text-slate-800">{stat.value}</p>
                            )}
                        </div>
                    ))}
                </div>

                {isEditing && (
                    <div className="px-6 mt-6 animate-fade-in">
                        <Button onClick={handleSave} className="w-full shadow-lg shadow-primary-600/30">
                            <Save className="h-4 w-4" /> Save Changes
                        </Button>
                    </div>
                )}
            </div>

            <div className="p-4 space-y-4">
                 <h3 className="font-bold text-slate-900 px-2">General</h3>
                 <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 divide-y divide-slate-50">
                     <button onClick={() => navigate('/appointments')} className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors">
                        <div className="flex items-center gap-4">
                            <div className="bg-primary-50 text-primary-600 p-2 rounded-lg">
                                <Calendar className="h-5 w-5" />
                            </div>
                            <span className="font-medium text-slate-700">My Appointments</span>
                        </div>
                        <ChevronRight className="h-5 w-5 text-slate-400" />
                     </button>
                     
                     <button onClick={() => navigate('/reports')} className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors">
                        <div className="flex items-center gap-4">
                            <div className="bg-primary-50 text-primary-600 p-2 rounded-lg">
                                <FileText className="h-5 w-5" />
                            </div>
                            <span className="font-medium text-slate-700">My Reports</span>
                        </div>
                        <ChevronRight className="h-5 w-5 text-slate-400" />
                     </button>

                     <button onClick={() => navigate('/transactions')} className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors">
                        <div className="flex items-center gap-4">
                            <div className="bg-primary-50 text-primary-600 p-2 rounded-lg">
                                <Receipt className="h-5 w-5" />
                            </div>
                            <span className="font-medium text-slate-700">Transactions</span>
                        </div>
                        <ChevronRight className="h-5 w-5 text-slate-400" />
                     </button>

                     <button onClick={() => navigate('/my-facilities')} className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors">
                        <div className="flex items-center gap-4">
                            <div className="bg-primary-50 text-primary-600 p-2 rounded-lg">
                                <Building2 className="h-5 w-5" />
                            </div>
                            <span className="font-medium text-slate-700">My Facilities</span>
                        </div>
                        <ChevronRight className="h-5 w-5 text-slate-400" />
                     </button>
                     
                     {[
                         { icon: CreditCard, label: 'Payment Methods' },
                         { icon: Shield, label: 'Insurance Details' },
                         { icon: Bell, label: 'Notifications' },
                         { icon: HelpCircle, label: 'Help & Support' },
                     ].map((item, i) => (
                         <button key={i} className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors">
                             <div className="flex items-center gap-4">
                                 <div className="bg-primary-50 text-primary-600 p-2 rounded-lg">
                                     <item.icon className="h-5 w-5" />
                                 </div>
                                 <span className="font-medium text-slate-700">{item.label}</span>
                             </div>
                             <ChevronRight className="h-5 w-5 text-slate-400" />
                         </button>
                     ))}
                 </div>

                 <Button variant="danger" className="w-full mt-4 flex items-center justify-center gap-2">
                     <LogOut className="h-5 w-5" />
                     Sign Out
                 </Button>
                 <p className="text-center text-xs text-slate-400 mt-4">App Version 2.4.0</p>
            </div>
        </div>
    )
}

export default ProfilePage;