import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Home, Stethoscope, Calendar, Building2, Heart } from 'lucide-react';

const BottomNav = () => {
  const location = useLocation();
  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Doctors', path: '/doctors', icon: Stethoscope },
    { name: 'Appts', path: '/appointments', icon: Calendar },
    { name: 'Facilities', path: '/facilities', icon: Building2 },
    { name: 'Saved', path: '/my-facilities', icon: Heart },
  ];

  return (
    <div className="bg-white border-t border-slate-200 px-4 py-2 pb-5 sticky bottom-0 z-40 flex justify-between items-center shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link 
            key={item.path} 
            to={item.path} 
            className={`flex flex-col items-center gap-1 min-w-[50px] transition-all duration-300 ${isActive ? 'text-primary-600 scale-105' : 'text-slate-400 hover:text-slate-500'}`}
          >
            <item.icon className={`h-6 w-6 ${isActive ? 'fill-current' : ''}`} strokeWidth={isActive ? 2.5 : 2} />
            <span className="text-[10px] font-medium">{item.name}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default BottomNav;