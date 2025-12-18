import React, { useState } from 'react';
import { LucideIcon } from 'lucide-react';

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackIcon?: LucideIcon;
}

const SafeImage: React.FC<SafeImageProps> = ({ src, alt, className = "", fallbackIcon: Icon }) => {
  const [error, setError] = useState(false);

  if (!src || error) {
    return (
      <div className={`bg-slate-100 flex items-center justify-center overflow-hidden relative ${className}`}>
        <div className="absolute inset-0 brand-gradient opacity-10"></div>
        {Icon ? <Icon className="h-12 w-12 text-slate-300 relative z-10" /> : <div className="text-slate-300 font-bold text-xs uppercase tracking-widest relative z-10">GS Medical</div>}
      </div>
    );
  }

  return (
    <img 
      src={src} 
      alt={alt} 
      onError={() => setError(true)}
      className={`object-cover ${className}`} 
    />
  );
};

export default SafeImage;