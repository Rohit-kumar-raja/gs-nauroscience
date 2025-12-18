import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, Siren, Bell } from 'lucide-react';
import { NOTIFICATIONS } from '../constants';
import { authService } from '../services/authService';
import Logo from './Logo';

const MobileHeader = ({ title, showBack = false, onEmergency }: { title: string, showBack?: boolean, onEmergency?: () => void }) => {
  const navigate = useNavigate();
  const unreadCount = NOTIFICATIONS.filter(n => !n.read).length;
  const user = authService.getCurrentUser();

  return (
    <div className="bg-white/95 backdrop-blur-sm px-4 py-3 flex items-center justify-between sticky top-0 z-30 shadow-sm border-b border-slate-100 transition-all duration-300">
      <div className="flex items-center gap-3">
        {showBack ? (
          <button onClick={() => navigate(-1)} className="p-1 -ml-1 text-slate-600 hover:bg-slate-50 rounded-full">
            <ChevronLeft className="h-6 w-6" />
          </button>
        ) : (
          <Logo className="h-7" />
        )}
        {showBack && <h1 className="text-lg font-bold text-slate-800 tracking-tight">{title}</h1>}
      </div>
      <div className="flex items-center gap-3">
        {onEmergency && (
             <button onClick={onEmergency} className="p-2 bg-red-50 text-red-600 rounded-full animate-pulse border border-red-100">
                 <Siren className="h-5 w-5" />
             </button>
        )}
        <Link to="/notifications" className="p-2 text-slate-500 hover:bg-slate-50 rounded-full relative transition-colors">
          <Bell className="h-6 w-6" />
          {unreadCount > 0 && (
             <span className="absolute top-2 right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
          )}
        </Link>
        <Link to="/profile" className="w-9 h-9 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md ring-2 ring-white hover:ring-accent-100 transition-all">
          {user?.initials || '??'}
        </Link>
      </div>
    </div>
  );
};

export default MobileHeader;