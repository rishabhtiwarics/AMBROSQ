import { Field, ErrorMessage, useFormikContext } from 'formik';

export default function AddressForm() {
  const { errors, touched } = useFormikContext();

  return (
    <section className="space-y-8">
      <div className="flex items-center gap-4 text-brand-secondary text-left">
        <div className="w-8 h-[1px] bg-brand-secondary" />
        <h6 className="uppercase tracking-[0.4em]">1. Shipping Destination</h6>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
        <div className="space-y-1.5">
          <label className="text-[9px] uppercase tracking-[0.3em] font-bold text-brand-primary/60 ml-1">First Name</label>
          <Field 
            name="firstName"
            className={`w-full bg-white border ${touched.firstName && errors.firstName ? 'border-red-400' : 'border-brand-secondary/20'} p-4 text-[11px] outline-none focus:border-brand-secondary uppercase tracking-widest transition-colors`} 
            placeholder="EX. JULIANNE" 
          />
          <ErrorMessage name="firstName" component="div" className="text-[8px] text-red-500 uppercase tracking-widest font-bold mt-1" />
        </div>
        <div className="space-y-1.5">
          <label className="text-[9px] uppercase tracking-[0.3em] font-bold text-brand-primary/60 ml-1">Last Name</label>
          <Field 
            name="lastName"
            className={`w-full bg-white border ${touched.lastName && errors.lastName ? 'border-red-400' : 'border-brand-secondary/20'} p-4 text-[11px] outline-none focus:border-brand-secondary uppercase tracking-widest transition-colors`} 
            placeholder="EX. VANCE" 
          />
          <ErrorMessage name="lastName" component="div" className="text-[8px] text-red-500 uppercase tracking-widest font-bold mt-1" />
        </div>
        <div className="md:col-span-2 space-y-1.5">
          <label className="text-[9px] uppercase tracking-[0.3em] font-bold text-brand-primary/60 ml-1">Address Identity</label>
          <Field 
            name="address"
            className={`w-full bg-white border ${touched.address && errors.address ? 'border-red-400' : 'border-brand-secondary/20'} p-4 text-[11px] outline-none focus:border-brand-secondary uppercase tracking-widest transition-colors`} 
            placeholder="123 LUXURY BLVD, SUITE 500" 
          />
          <ErrorMessage name="address" component="div" className="text-[8px] text-red-500 uppercase tracking-widest font-bold mt-1" />
        </div>
        <div className="space-y-1.5">
          <label className="text-[9px] uppercase tracking-[0.3em] font-bold text-brand-primary/60 ml-1">City</label>
          <Field 
            name="city"
            className={`w-full bg-white border ${touched.city && errors.city ? 'border-red-400' : 'border-brand-secondary/20'} p-4 text-[11px] outline-none focus:border-brand-secondary uppercase tracking-widest transition-colors`} 
            placeholder="PARIS" 
          />
          <ErrorMessage name="city" component="div" className="text-[8px] text-red-500 uppercase tracking-widest font-bold mt-1" />
        </div>
        <div className="space-y-1.5">
          <label className="text-[9px] uppercase tracking-[0.3em] font-bold text-brand-primary/60 ml-1">Postal Code</label>
          <Field 
            name="postalCode"
            className={`w-full bg-white border ${touched.postalCode && errors.postalCode ? 'border-red-400' : 'border-brand-secondary/20'} p-4 text-[11px] outline-none focus:border-brand-secondary uppercase tracking-widest transition-colors`} 
            placeholder="75001" 
          />
          <ErrorMessage name="postalCode" component="div" className="text-[8px] text-red-500 uppercase tracking-widest font-bold mt-1" />
        </div>
      </div>
    </section>
  );
}
