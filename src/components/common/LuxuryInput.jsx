import React, { useState } from 'react';

const LuxuryInput = ({ label, icon: Icon, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = props.value && props.value.length > 0;

  return (
    <div className="relative group w-full mb-8">
      <div className={`absolute left-0 transition-all duration-300 pointer-events-none ${
        isFocused || hasValue 
          ? '-top-5 text-[9px] text-brand-secondary tracking-[0.3em] font-bold' 
          : 'top-4 text-xs text-brand-dark/30 tracking-widest font-medium'
      }`}>
        {label.toUpperCase()}
      </div>
      {Icon && (
        <Icon size={14} className={`absolute right-0 top-4 transition-colors duration-300 ${
          isFocused ? 'text-brand-secondary' : 'text-brand-dark/20'
        }`} />
      )}
      <input
        {...props}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full bg-transparent border-b border-brand-secondary/10 py-4 text-base font-serif text-brand-primary focus:border-brand-secondary outline-none transition-all duration-500 placeholder:opacity-0"
      />
      <div className={`absolute bottom-0 left-0 h-[1.5px] bg-brand-secondary transition-all duration-700 ${isFocused ? 'w-full' : 'w-0'}`} />
    </div>
  );
};

export default LuxuryInput;
