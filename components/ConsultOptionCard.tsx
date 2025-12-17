import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ConsultOptionCardProps {
    title: string;
    description: string;
    icon: LucideIcon;
    colorClass: string;
    onClick: () => void;
}

const ConsultOptionCard: React.FC<ConsultOptionCardProps> = ({ title, description, icon: Icon, colorClass, onClick }) => {
    return (
        <button 
            onClick={onClick}
            className="flex-1 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 active:scale-95 transition-transform text-left group hover:border-primary-100"
        >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${colorClass}`}>
                <Icon className="h-6 w-6" />
            </div>
            <div>
                <h3 className="font-bold text-slate-900 text-sm group-hover:text-primary-700 transition-colors">{title}</h3>
                <p className="text-xs text-slate-500 font-medium">{description}</p>
            </div>
        </button>
    );
};

export default ConsultOptionCard;