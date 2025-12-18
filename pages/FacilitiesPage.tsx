import React, { useState, useEffect } from 'react';
import { Clock, ChevronRight, Heart, Siren, Droplet, TestTube, HeartPulse } from 'lucide-react';
import MobileHeader from '../components/MobileHeader';
import FacilityDetailsSheet from '../components/FacilityDetailsSheet';
import FacilityBookingSheet from '../components/FacilityBookingSheet';
import SafeImage from '../components/SafeImage';
import { FACILITIES } from '../constants';
import { Facility } from '../types';

const iconMap: Record<string, any> = {
    'siren': Siren,
    'droplet': Droplet,
    'test-tube': TestTube,
    'heart-pulse': HeartPulse
};

const FacilitiesPage = () => {
    const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);
    const [bookingFacility, setBookingFacility] = useState<Facility | null>(null);
    const [savedFacilities, setSavedFacilities] = useState<string[]>([]);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('myFacilities') || '[]');
        setSavedFacilities(saved);
    }, []);

    const toggleSave = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        let updated: string[];
        if (savedFacilities.includes(id)) {
            updated = savedFacilities.filter(fid => fid !== id);
        } else {
            updated = [...savedFacilities, id];
        }
        setSavedFacilities(updated);
        localStorage.setItem('myFacilities', JSON.stringify(updated));
    }

    const handleBook = () => {
        setBookingFacility(selectedFacility);
        setSelectedFacility(null);
    };

    const handleConfirmBooking = () => {
        setBookingFacility(null);
    };

    return (
        <div className="min-h-full bg-slate-50 pb-20">
            <MobileHeader title="Facilities" showBack />
            <div className="p-4 space-y-6">
                {FACILITIES.map((facility) => {
                    const isSaved = savedFacilities.includes(facility.id);
                    const FallbackIcon = iconMap[facility.icon];

                    return (
                        <div key={facility.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 group transition-all hover:shadow-md relative">
                            <button 
                                onClick={(e) => toggleSave(facility.id, e)}
                                className={`absolute top-4 right-4 z-10 p-2 rounded-full shadow-md transition-colors ${isSaved ? 'bg-white text-red-500' : 'bg-black/30 text-white hover:bg-black/50'}`}
                            >
                                <Heart className={`h-5 w-5 ${isSaved ? 'fill-current' : ''}`} />
                            </button>
                            
                            <div className="h-48 relative overflow-hidden">
                                <SafeImage 
                                    src={facility.image} 
                                    alt={facility.name} 
                                    fallbackIcon={FallbackIcon}
                                    className="w-full h-full transition-transform duration-700 group-hover:scale-105" 
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4">
                                    <h3 className="text-white font-bold text-xl">{facility.name}</h3>
                                </div>
                            </div>
                            <div className="p-5">
                                <div className="flex items-center gap-2 mb-3 text-xs font-bold text-primary-600 uppercase tracking-wide">
                                    <Clock className="h-3.5 w-3.5" />
                                    {facility.openHours}
                                </div>
                                <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-2">{facility.description}</p>
                                <div className="pt-4 border-t border-slate-50 flex justify-between items-center">
                                    <span className="text-xs text-slate-400 font-medium">Main Block</span>
                                    <button 
                                        onClick={() => setSelectedFacility(facility)}
                                        className="text-sm font-bold text-primary-600 flex items-center gap-1 hover:gap-2 transition-all bg-primary-50 px-3 py-1.5 rounded-lg"
                                    >
                                        Details <ChevronRight className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            
            <FacilityDetailsSheet 
                facility={selectedFacility} 
                onClose={() => setSelectedFacility(null)} 
                onBook={handleBook}
            />

            <FacilityBookingSheet
                facility={bookingFacility}
                onClose={() => setBookingFacility(null)}
                onConfirm={handleConfirmBooking}
            />
        </div>
    )
}

export default FacilitiesPage;