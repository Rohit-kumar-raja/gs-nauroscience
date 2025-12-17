import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Video, Building2 } from 'lucide-react';
import ConsultOptionCard from './ConsultOptionCard';

const ConsultModeSection = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h3 className="font-bold text-slate-800 text-lg mb-3">Consultation Mode</h3>
            <div className="flex gap-3">
                <ConsultOptionCard 
                    title="Virtual" 
                    description="Video call with doctor"
                    icon={Video}
                    colorClass="bg-indigo-50 text-indigo-600 group-hover:bg-indigo-100"
                    onClick={() => navigate('/doctors', { state: { mode: 'virtual' } })} 
                />
                <ConsultOptionCard 
                    title="In-Person" 
                    description="Visit Hospital"
                    icon={Building2}
                    colorClass="bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100"
                    onClick={() => navigate('/doctors', { state: { mode: 'in-person' } })}
                />
            </div>
        </div>
    );
};

export default ConsultModeSection;