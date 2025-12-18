import React from 'react';

const Logo: React.FC<{ className?: string, light?: boolean }> = ({ className = "h-8", light = false }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Brain/Circuit Graphic Placeholder */}
      <div className="relative w-8 h-8 flex-shrink-0">
        <svg viewBox="0 0 100 100" className={light ? "text-white" : "text-primary-500"}>
          <path fill="currentColor" d="M50 5C25.1 5 5 25.1 5 50s20.1 45 45 45 45-20.1 45-45S74.9 5 50 5zm0 85c-22.1 0-40-17.9-40-40s17.9-40 40-40 40 17.9 40 40-17.9 40-40 40z"/>
          <path fill="currentColor" d="M50 20c-16.6 0-30 13.4-30 30s13.4 30 30 30 30-13.4 30-30-13.4-30-30-30zm0 55c-13.8 0-25-11.2-25-25s11.2-25 25-25 25 11.2 25 25-11.2 25-25 25z"/>
          <rect x="48" y="10" width="4" height="80" fill="currentColor" opacity="0.5"/>
        </svg>
      </div>
      <div className="flex flex-col leading-none">
        <span className={`text-sm font-bold tracking-tighter ${light ? "text-white" : "text-primary-500"}`}>GS NEUROSCIENCE</span>
        <span className={`text-[6px] font-medium tracking-[0.2em] ${light ? "text-accent-300" : "text-slate-400"}`}>CLINIC & RESEARCH CENTRE</span>
      </div>
    </div>
  );
};

export default Logo;