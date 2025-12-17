import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { getHealthTip } from '../services/geminiService';

const AIHealthTip = () => {
    const [tip, setTip] = useState<string>('Loading daily health tip...');

    useEffect(() => {
        let mounted = true;
        const fetchTip = async () => {
            const result = await getHealthTip();
            if (mounted) setTip(result);
        };
        fetchTip();
        return () => { mounted = false; };
    }, []);

    return (
        <div className="bg-gradient-to-r from-teal-500 to-emerald-500 rounded-2xl p-4 text-white shadow-lg relative overflow-hidden">
             <div className="relative z-10">
                 <div className="flex items-center gap-2 mb-2 opacity-90">
                     <Star className="h-4 w-4 text-white" />
                     <span className="text-xs font-bold uppercase tracking-wider">Daily Health Tip</span>
                 </div>
                 <p className="font-medium text-lg leading-snug">"{tip}"</p>
             </div>
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
        </div>
    );
}

export default AIHealthTip;