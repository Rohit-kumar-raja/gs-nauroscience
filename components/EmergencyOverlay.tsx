import React from 'react';
import { X, Siren, PhoneCall } from 'lucide-react';

const EmergencyOverlay: React.FC<{ isOpen: boolean, onClose: () => void }> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] bg-red-600/90 backdrop-blur-md flex flex-col items-center justify-center p-6 animate-fade-in text-white">
            <button onClick={onClose} className="absolute top-6 right-6 p-2 bg-white/20 rounded-full hover:bg-white/30">
                <X className="h-6 w-6" />
            </button>
            
            <div className="bg-white p-4 rounded-full mb-6 shadow-xl animate-bounce">
                <Siren className="h-12 w-12 text-red-600" />
            </div>
            
            <h2 className="text-3xl font-bold mb-2">Emergency Help</h2>
            <p className="text-red-100 text-center mb-8 max-w-xs">If you are in a life-threatening situation, please call emergency services immediately.</p>
            
            <div className="w-full max-w-sm space-y-4">
                <button className="w-full bg-white text-red-600 py-4 px-6 rounded-2xl font-bold text-lg shadow-lg flex items-center justify-center gap-3 active:scale-95 transition-transform">
                    <PhoneCall className="h-6 w-6" />
                    Call Ambulance (911)
                </button>
                <button className="w-full bg-red-800 text-white py-4 px-6 rounded-2xl font-bold text-lg shadow-lg flex items-center justify-center gap-3 active:scale-95 transition-transform border border-red-400">
                    <PhoneCall className="h-6 w-6" />
                    Call Hospital Emergency
                </button>
            </div>
            
            <p className="mt-8 text-sm text-red-200 opacity-80">Your location is being shared with responders.</p>
        </div>
    )
}

export default EmergencyOverlay;