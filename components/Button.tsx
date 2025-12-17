import React from 'react';

const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'outline' | 'ghost' | 'icon' | 'danger' | 'emergency' }> = ({ 
  children, className = '', variant = 'primary', ...props 
}) => {
  const baseStyle = "font-medium transition-all duration-200 flex items-center justify-center gap-2 active:scale-95";
  const variants = {
    primary: "bg-primary-600 text-white shadow-md rounded-xl py-3 px-4 hover:bg-primary-700",
    outline: "border border-primary-600 text-primary-600 bg-transparent rounded-xl py-2 px-4 hover:bg-primary-50",
    ghost: "text-slate-600 hover:bg-slate-100 rounded-lg p-2",
    icon: "p-2 rounded-full hover:bg-black/5",
    danger: "bg-red-50 text-red-600 rounded-xl py-3 px-4 hover:bg-red-100",
    emergency: "bg-red-600 text-white shadow-lg shadow-red-500/30 rounded-xl py-3 px-4 hover:bg-red-700 animate-pulse"
  };
  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;