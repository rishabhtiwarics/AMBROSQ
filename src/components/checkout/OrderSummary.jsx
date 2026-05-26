import { ShieldCheck } from 'lucide-react';
import SkeletonImage from '../common/SkeletonImage';

export default function OrderSummary({ items, subtotal, tax, shipping, total }) {
  return (
    <div className="bg-white border border-brand-secondary/10 p-10 sticky top-40 shadow-sm">
      <h3 className="border-b border-brand-secondary/10 pb-4 mb-8 text-left">Order Insight</h3>
      
      <div className="space-y-6 mb-8 overflow-y-auto max-h-[300px] pr-4 custom-scrollbar text-left">
        {items.map(item => (
          <div key={item.id} className="flex gap-4 items-center">
            <div className="w-16 h-20 bg-brand-cream border border-brand-secondary/10 flex-shrink-0">
              <SkeletonImage
                src={item.image}
                loading="lazy"
                wrapperClassName="w-full h-full"
                imageClassName="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                alt={item.name}
              />
            </div>
            <div className="flex-grow">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-brand-primary line-clamp-1">{item.name}</h4>
              <p className="text-[9px] text-brand-dark/40 uppercase tracking-wider">Qty: {item.quantity}</p>
              <span className="text-[11px] font-bold text-brand-primary font-mono">${item.price * item.quantity}.00</span>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4 mb-8 text-left">
        <div className="flex justify-between text-[11px] uppercase tracking-widest text-brand-dark/60 font-bold">
          <span>Subtotal</span>
          <span className="font-mono">${subtotal}.00</span>
        </div>
        <div className="flex justify-between text-[11px] uppercase tracking-widest text-brand-dark/60 font-bold">
          <span>Luxury Tax (8%)</span>
          <span className="font-mono">${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-[11px] uppercase tracking-widest text-brand-dark/60 font-bold">
          <span>White Glove Shipping</span>
          <span className="font-mono">{shipping === 0 ? 'COMPLIMENTARY' : `$${shipping}.00`}</span>
        </div>
        <div className="h-[1px] bg-brand-secondary/10 my-6" />
        <div className="flex justify-between items-center text-brand-primary">
          <span className="text-sm font-bold uppercase tracking-widest">Final Total</span>
          <span className="text-3xl font-bold font-mono">${total.toFixed(2)}</span>
        </div>
      </div>

      <div className="p-4 bg-brand-cream border border-brand-secondary/20 flex items-center gap-4 text-left">
          <ShieldCheck className="text-brand-secondary" size={24} />
          <p className="text-[8px] uppercase tracking-[0.2em] leading-relaxed font-bold text-brand-primary">
            Your payment is processed through a bank-grade TLS 1.3 encrypted gateway.
          </p>
      </div>
    </div>
  );
}
