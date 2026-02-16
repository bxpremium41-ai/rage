import React from 'react';

export const Logo: React.FC<{ className?: string, light?: boolean }> = ({ className = "", light = false }) => {
  return (
    <div className={`flex items-center select-none ${className}`}>
      <img 
        src="https://lh3.googleusercontent.com/d/1xB5_BGcRadJjUmsM3PKDgOlJUJOvFxo3" 
        alt="Leadsdocker Logo" 
        className="h-[4.5em] w-auto object-contain block"
        referrerPolicy="no-referrer"
      />
    </div>
  );
};