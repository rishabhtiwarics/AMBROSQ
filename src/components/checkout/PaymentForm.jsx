import { CreditCard, Lock } from 'lucide-react';
import { Field, ErrorMessage, useFormikContext } from 'formik';

export default function PaymentForm() {
  const { errors, touched } = useFormikContext();

  return (
    <section className="space-y-8">
      <div className="flex items-center gap-4 text-brand-secondary text-left">
        <div className="w-8 h-[1px] bg-brand-secondary" />
        <h6 className="uppercase tracking-[0.4em]">2. Payment Authentication</h6>
      </div>
      <div className="p-8 border border-brand-secondary/20 bg-white space-y-6 text-left">
        <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <CreditCard className="text-brand-secondary" size={20} />
              <span className="text-[10px] font-bold uppercase tracking-widest">Encrypted Credit Card</span>
            </div>
            <Lock className="text-brand-secondary/40" size={16} />
        </div>
        <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[9px] uppercase tracking-[0.3em] font-bold text-brand-primary/60 ml-1">Card Number</label>
              <Field 
                name="cardNumber"
                className={`w-full bg-neutral-50 border ${touched.cardNumber && errors.cardNumber ? 'border-red-400' : 'border-brand-secondary/10'} p-4 text-[11px] outline-none focus:border-brand-secondary tracking-[0.5em] transition-colors`} 
                placeholder="**** **** **** ****" 
              />
              <ErrorMessage name="cardNumber" component="div" className="text-[8px] text-red-500 uppercase tracking-widest font-bold mt-1" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[9px] uppercase tracking-[0.3em] font-bold text-brand-primary/60 ml-1">Expiry</label>
                <Field 
                  name="expiry"
                  className={`w-full bg-neutral-50 border ${touched.expiry && errors.expiry ? 'border-red-400' : 'border-brand-secondary/10'} p-4 text-[11px] outline-none focus:border-brand-secondary tracking-widest transition-colors`} 
                  placeholder="MM/YY" 
                />
                <ErrorMessage name="expiry" component="div" className="text-[8px] text-red-500 uppercase tracking-widest font-bold mt-1" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[9px] uppercase tracking-[0.3em] font-bold text-brand-primary/60 ml-1">CVC</label>
                <Field 
                  name="cvc"
                  className={`w-full bg-neutral-50 border ${touched.cvc && errors.cvc ? 'border-red-400' : 'border-brand-secondary/10'} p-4 text-[11px] outline-none focus:border-brand-secondary tracking-widest transition-colors`} 
                  placeholder="123" 
                />
                <ErrorMessage name="cvc" component="div" className="text-[8px] text-red-500 uppercase tracking-widest font-bold mt-1" />
              </div>
            </div>
        </div>
      </div>
    </section>
  );
}
