import React, { useState } from 'react';
import { User, UserRound } from 'lucide-react';

interface DoctorAvatarProps {
  src: string;
  gender: 'male' | 'female';
  className?: string;
  name: string;
}

const DoctorAvatar: React.FC<DoctorAvatarProps> = ({ src, gender, className = "", name }) => {
  const [error, setError] = useState(false);

  if (!src || error) {
    return (
      <div className={`flex items-center justify-center ${gender === 'female' ? 'bg-pink-100 text-pink-500' : 'bg-blue-100 text-blue-500'} ${className}`}>
        {gender === 'female' ? <UserRound className="h-2/3 w-2/3" /> : <User className="h-2/3 w-2/3" />}
      </div>
    );
  }

  return (
    <img 
      src={src} 
      alt={name} 
      onError={() => setError(true)}
      className={`object-cover ${className}`} 
    />
  );
};

export default DoctorAvatar;