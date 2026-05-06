import { Field } from 'formik';

export default function ShippingOptions() {
  return (
    <section className="space-y-8">
      <div className="flex items-center gap-4 text-brand-secondary text-left">
        <div className="w-8 h-[1px] bg-brand-secondary" />
        <h6 className="uppercase tracking-[0.4em]">1.5. Shipping Options</h6>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
        <label className="border border-brand-secondary/20 p-4 cursor-pointer hover:border-brand-secondary transition-colors flex items-center gap-4 bg-white">
          <Field type="radio" name="shipping" value="standard" className="accent-brand-secondary" />
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-brand-primary">Standard Shipping</p>
            <p className="text-[9px] text-brand-dark/50 mt-1">3-5 Business Days - $25.00</p>
          </div>
        </label>
        <label className="border border-brand-secondary/20 p-4 cursor-pointer hover:border-brand-secondary transition-colors flex items-center gap-4 bg-white">
          <Field type="radio" name="shipping" value="express" className="accent-brand-secondary" />
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-brand-primary">Express Shipping</p>
            <p className="text-[9px] text-brand-dark/50 mt-1">1-2 Business Days - $50.00</p>
          </div>
        </label>
      </div>
    </section>
  );
}
