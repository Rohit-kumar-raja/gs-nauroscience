import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Building2, Heart, Clock, MapPin } from 'lucide-react';
import MobileHeader from '../components/MobileHeader';
import { FACILITIES } from '../constants';

const MyFacilitiesPage = () => {
    const [savedFacilities, setSavedFacilities] = useState<string[]>([]);
    
    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('myFacilities') || '[]');
        setSavedFacilities(saved);
    }, []);

    const removeFacility = (id: string) => {
        const updated = savedFacilities.filter(fid => fid !== id);
        setSavedFacilities(updated);
        localStorage.setItem('myFacilities', JSON.stringify(updated));
    }

    const facilitiesToShow = FACILITIES.filter(f => savedFacilities.includes(f.id));

    return (
        <div className="min-h-full bg-slate-50 pb-20">
            <MobileHeader title="My Facilities" showBack />
            
            <div className="p-4 space-y-4">
                {facilitiesToShow.length === 0 ? (
                    <div className="text-center py-20 opacity-50">
                        <Building2 className="h-16 w-16 mx-auto text-slate-300 mb-4" />
                        <h3 className="text-lg font-medium text-slate-900">No facilities saved</h3>
                        <p className="text-sm text-slate-500">Add facilities to your list for quick access.</p>
                        <Link to="/facilities" className="inline-block mt-4 text-primary-600 font-bold text-sm">Browse Facilities</Link>
                    </div>
                ) : (
                    facilitiesToShow.map(facility => (
                        <div key={facility.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 group transition-all">
                            <div className="h-40 relative overflow-hidden">
                                <img src={facility.image} alt={facility.name} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4">
                                    <h3 className="text-white font-bold text-xl">{facility.name}</h3>
                                </div>
                                <button 
                                    onClick={() => removeFacility(facility.id)}
                                    className="absolute top-3 right-3 p-2 bg-white/90 rounded-full shadow-sm text-red-500 hover:bg-red-50 transition-colors"
                                >
                                    <Heart className="h-5 w-5 fill-current" />
                                </button>
                            </div>
                            <div className="p-4">
                                <div className="flex items-center gap-2 mb-2 text-xs font-bold text-primary-600 uppercase tracking-wide">
                                    <Clock className="h-3.5 w-3.5" />
                                    {facility.openHours}
                                </div>
                                <p className="text-slate-600 text-sm leading-relaxed mb-3 line-clamp-2">{facility.description}</p>
                                <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                                    <div className="flex items-center gap-2 text-xs text-slate-500">
                                        <MapPin className="h-3.5 w-3.5" /> {facility.location}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default MyFacilitiesPage;