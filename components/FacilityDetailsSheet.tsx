import React from 'react';
import { X, Clock, MapPin, Phone, CalendarCheck } from 'lucide-react';
import Button from './Button';
import Badge from './Badge';
import { Facility } from '../types';

const FacilityDetailsSheet: React.FC<{ 
    facility: Facility | null, 
    onClose: () => void,
    onBook?: () => void 
}> = ({ facility, onClose, onBook }) => {
    if (!facility) return null;

    return (
        <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/60 backdrop-blur-sm animate-fade-in" onClick={onClose}>
            <div className="bg-white rounded-t-3xl p-0 w-full max-h-[90vh] overflow-y-auto animate-slide-up shadow-2xl" onClick={e => e.stopPropagation()}>
                 <div className="relative h-56">
                    <img src={facility.image} className="w-full h-full object-cover" alt={facility.name} />
                    <button onClick={onClose} className="absolute top-4 right-4 bg-black/30 text-white p-2 rounded-full backdrop-blur-md hover:bg-black/50 transition-colors">
                        <X className="h-5 w-5" />
                    </button>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                        <h2 className="text-2xl font-bold text-white">{facility.name}</h2>
                    </div>
                 </div>
                 
                 <div className="p-6 space-y-6">
                    <div className="flex gap-4 border-b border-slate-100 pb-6">
                         <div className="flex items-center gap-2 text-slate-700">
                             <Clock className="h-5 w-5 text-primary-600" />
                             <span className="text-sm font-medium">{facility.openHours}</span>
                         </div>
                         <div className="flex items-center gap-2 text-slate-700">
                             <MapPin className="h-5 w-5 text-primary-600" />
                             <span className="text-sm font-medium">{facility.location}</span>
                         </div>
                    </div>

                    <div>
                        <h3 className="font-bold text-slate-900 mb-2">About</h3>
                        <p className="text-slate-600 leading-relaxed text-sm">{facility.description}</p>
                    </div>

                    <div>
                        <h3 className="font-bold text-slate-900 mb-3">Key Features</h3>
                        <div className="flex flex-wrap gap-2">
                            {facility.features.map((feature, i) => (
                                <Badge key={i} color="bg-slate-100 text-slate-700">{feature}</Badge>
                            ))}
                        </div>
                    </div>

                    <div className="pt-2 flex gap-3">
                        <Button variant="outline" className="flex-1 gap-2 border-slate-200 text-slate-700 hover:bg-slate-50">
                            <Phone className="h-4 w-4" />
                            Call
                        </Button>
                        {facility.isBookable && onBook && (
                            <Button onClick={onBook} className="flex-[2] gap-2 shadow-lg shadow-primary-600/20">
                                <CalendarCheck className="h-4 w-4" />
                                Book Service
                            </Button>
                        )}
                    </div>
                 </div>
            </div>
        </div>
    )
}

export default FacilityDetailsSheet;