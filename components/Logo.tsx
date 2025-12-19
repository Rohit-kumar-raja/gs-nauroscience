import React from 'react';

const Logo: React.FC<{ className?: string, light?: boolean }> = ({ className = "h-8", light = false }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Brain/Circuit Graphic Placeholder */}
      <div className="relative w-8 h-8 flex-shrink-0">
      <img src="https://bitbytefly.com/gsnero/icon.png" alt="" />
      </div>
      <div className="flex flex-col leading-none">
        <span className={`text-sm font-bold tracking-tighter ${light ? "text-white" : "text-primary-500"}`}>GS NEUROSCIENCE</span>
        <span className={`text-[6px] font-medium tracking-[0.2em] ${light ? "text-accent-300" : "text-slate-400"}`}>CLINIC & RESEARCH CENTRE</span>
      </div>
    </div>
  );
};

export default Logo;