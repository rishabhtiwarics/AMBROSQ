import React from 'react';
import { Truck, User, MapPin, Building, Hash, Map } from 'lucide-react';

const LuxuryAddressForm = ({ data, onChange }) => {
  const C = {
    primary:    '#0D0D0D',
    secondary:  '#C89B3C',
    border:     'rgba(13,13,13,0.12)',
    borderFocus: 'rgba(200,155,60,0.6)',
    label:      'rgba(13,13,13,0.55)',
  };

  const inputStyle = "w-full bg-white border border-[rgba(13,13,13,0.12)] text-[#0D0D0D] text-[13px] font-light py-3.5 pl-10 pr-4 outline-none transition-colors focus:border-[rgba(200,155,60,0.6)] rounded-none";
  const labelStyle = "text-[10px] font-bold uppercase tracking-[0.05em] text-[rgba(13,13,13,0.55)] mb-2 block";
  const iconStyle = "absolute left-3.5 top-1/2 -translate-y-1/2 text-[#C89B3C] opacity-60";

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-right-8 duration-1000">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
        {/* First Name */}
        <div className="space-y-1">
          <label className={labelStyle}>First Name</label>
          <div className="relative">
            <User size={14} className={iconStyle} />
            <input 
              type="text"
              placeholder="Julianne"
              className={inputStyle}
              value={data.firstName}
              onChange={(e) => onChange({...data, firstName: e.target.value})}
            />
          </div>
        </div>

        {/* Last Name */}
        <div className="space-y-1">
          <label className={labelStyle}>Last Name</label>
          <div className="relative">
            <User size={14} className={iconStyle} />
            <input 
              type="text"
              placeholder="Vance"
              className={inputStyle}
              value={data.lastName}
              onChange={(e) => onChange({...data, lastName: e.target.value})}
            />
          </div>
        </div>

        {/* Shipping Destination */}
        <div className="md:col-span-2 space-y-1">
          <label className={labelStyle}>Shipping Destination</label>
          <div className="relative">
            <MapPin size={14} className={iconStyle} />
            <input 
              type="text"
              placeholder="Street name, apartment, suite"
              className={inputStyle}
              value={data.street}
              onChange={(e) => onChange({...data, street: e.target.value})}
            />
          </div>
        </div>

        {/* City */}
        <div className="space-y-1">
          <label className={labelStyle}>City / Region</label>
          <div className="relative">
            <Building size={14} className={iconStyle} />
            <input 
              type="text"
              placeholder="Paris / New York"
              className={inputStyle}
              value={data.city}
              onChange={(e) => onChange({...data, city: e.target.value})}
            />
          </div>
        </div>

        {/* Postal Code */}
        <div className="space-y-1">
          <label className={labelStyle}>Postal Identity</label>
          <div className="relative">
            <Hash size={14} className={iconStyle} />
            <input 
              type="text"
              placeholder="Zip Code"
              className={inputStyle}
              value={data.postalCode}
              onChange={(e) => onChange({...data, postalCode: e.target.value})}
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6 p-6 bg-brand-cream/30 border border-brand-secondary/10 relative overflow-hidden group">
        <div className="w-12 h-12 rounded-full bg-white border border-brand-secondary/10 flex items-center justify-center shadow-sm relative z-10">
          <Truck size={18} className="text-brand-secondary" />
        </div>
        <div className="relative z-10 space-y-1">
          <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-primary">Priority Courier Secure</h4>
          <p className="text-[11px] text-brand-dark/50 italic leading-relaxed">Your essence will be transported in temperature-controlled artisanal packaging.</p>
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-secondary/5 rounded-full translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-1000" />
      </div>
    </div>
  );
};

export default LuxuryAddressForm;
