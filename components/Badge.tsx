import React from 'react';

const Badge: React.FC<{ children: React.ReactNode, color?: string }> = ({ children, color = 'bg-primary-50 text-primary-700' }) => (
  <span className={`px-2.5 py-1 rounded-md text-xs font-semibold ${color}`}>
    {children}
  </span>
);

export default Badge;