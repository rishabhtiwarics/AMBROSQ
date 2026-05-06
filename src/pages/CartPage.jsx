import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ChevronRight, 
  ShieldCheck, 
  Truck, 
  CreditCard,
  Lock,
  ArrowLeft
} from 'lucide-react';
import { removeFromCart, updateQuantity } from '../store/slices/cartSlice';
import GlassmorphicBreadcrumbs from '../components/common/GlassmorphicBreadcrumbs';

/* ─── Cart Page Item Component (Premium UI) ─────────────────────────────────── */
const CartPageItem = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="group relative flex flex-col sm:flex-row gap-6 md:gap-10 py-10 border-b border-brand-secondary/10 last:border-0"
    >
      {/* Product Image Area */}
      <div className="relative w-full sm:w-40 md:w-48 aspect-[4/5] bg-white border border-brand-secondary/5 overflow-hidden flex-shrink-0">
        <img 
          src={item.image} 
          alt={item.name} 
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
        {/* Subtle inner border */}
        <div className="absolute inset-2 border border-brand-secondary/10 pointer-events-none" />
      </div>

      {/* Content Area */}
      <div className="flex-1 flex flex-col justify-between">
        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-secondary">Collection Exclusive</p>
              <h3 className="text-2xl md:text-3xl heading-serif text-brand-primary uppercase tracking-tight">{item.name}</h3>
              <p className="text-[10px] font-medium text-brand-dark/40 uppercase tracking-widest">Scent ID: #{item.id}992-AMB</p>
            </div>
            <button 
              onClick={() => dispatch(removeFromCart(item.id))}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-brand-cream/50 text-brand-dark/30 hover:bg-red-50 hover:text-red-500 transition-all duration-300"
            >
              <Trash2 size={16} />
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500/60 shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-dark/60">In Stock</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck size={12} className="text-brand-secondary" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-dark/60">Authenticity Guaranteed</span>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
          {/* Quantity Control */}
          <div className="space-y-3">
            <p className="text-[10px] font-bold uppercase tracking-widest text-brand-dark/40">Quantity</p>
            <div className="flex items-center bg-white border border-brand-secondary/20 h-12">
              <button 
                onClick={() => dispatch(updateQuantity({ id: item.id, quantity: Math.max(1, item.quantity - 1) }))}
                className="w-12 h-full flex items-center justify-center hover:bg-brand-cream transition-colors border-r border-brand-secondary/10"
              >
                <Minus size={14} />
              </button>
              <span className="w-14 text-center font-bold text-sm tracking-widest">{item.quantity}</span>
              <button 
                onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                className="w-12 h-full flex items-center justify-center hover:bg-brand-cream transition-colors border-l border-brand-secondary/10"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>

          {/* Pricing */}
          <div className="text-right">
            <p className="text-[10px] font-bold uppercase tracking-widest text-brand-dark/40 mb-1">Item Total</p>
            <div className="flex flex-col">
              <span className="text-xs text-brand-dark/30 line-through">₹{(item.price * 1.2 * item.quantity).toFixed(0)}.00</span>
              <span className="text-2xl font-serif text-brand-primary font-medium tracking-tight">₹{(item.price * item.quantity).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function CartPage() {
  const { items } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 2500 ? 0 : 150;
  const tax = subtotal * 0.18; // 18% GST example
  const total = subtotal + shipping + tax;

  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'Shopping Bag', active: true }
  ];

  if (items.length === 0) {
    return (
      <div className="bg-brand-cream/10 min-h-screen pt-40 pb-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-xl mx-auto text-center space-y-10"
          >
            <div className="relative inline-block">
              <div className="w-32 h-32 bg-white border border-brand-secondary/20 flex items-center justify-center relative z-10 shadow-xl">
                <ShoppingBag size={48} className="text-brand-secondary/30" />
              </div>
              <div className="absolute -top-4 -right-4 w-12 h-12 border-t-2 border-r-2 border-brand-secondary/40" />
              <div className="absolute -bottom-4 -left-4 w-12 h-12 border-b-2 border-l-2 border-brand-secondary/40" />
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl heading-serif text-brand-primary uppercase tracking-tight">Your bag is currently empty</h1>
              <p className="text-sm text-brand-dark/60 leading-relaxed font-medium">
                Indulge in our collection of artisanal fragrances. Every scent tells a story, waiting for its next chapter to be written by you.
              </p>
            </div>

            <Link 
              to="/shop" 
              className="inline-flex items-center gap-4 bg-brand-primary text-white px-14 py-5 text-[10px] font-bold uppercase tracking-[0.5em] hover:bg-brand-secondary transition-all shadow-2xl group"
            >
              Start Your Journey
              <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-brand-cream/10 min-h-screen pb-32">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Glassmorphic Breadcrumbs */}
        <div className="mb-12 pt-10">
          <GlassmorphicBreadcrumbs items={breadcrumbItems} />
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-12 xl:gap-20">
          
          {/* ── Left Side: Cart Items ── */}
          <div className="w-full lg:w-[65%] space-y-2">
            <div className="flex items-center justify-between border-b border-brand-secondary/10 pb-6">
              <h2 className="text-3xl heading-serif text-brand-primary uppercase tracking-tight">Shopping Bag ({items.length})</h2>
              <Link to="/shop" className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-secondary hover:text-brand-primary transition-colors flex items-center gap-2">
                <ArrowLeft size={12} /> Continue Shopping
              </Link>
            </div>

            <div className="divide-y divide-brand-secondary/5">
              <AnimatePresence>
                {items.map((item) => (
                  <CartPageItem key={item.id} item={item} />
                ))}
              </AnimatePresence>
            </div>

            {/* Value Props */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
              <div className="flex items-center gap-4 p-6 bg-white/40 border border-brand-secondary/5">
                <Truck size={20} className="text-brand-secondary" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-dark/60 leading-tight">Fast Express Shipping</span>
              </div>
              <div className="flex items-center gap-4 p-6 bg-white/40 border border-brand-secondary/5">
                <ShieldCheck size={20} className="text-brand-secondary" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-dark/60 leading-tight">Secured Authenticity</span>
              </div>
              <div className="flex items-center gap-4 p-6 bg-white/40 border border-brand-secondary/5">
                <Lock size={20} className="text-brand-secondary" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-dark/60 leading-tight">SSL Encrypted Payment</span>
              </div>
            </div>
          </div>

          {/* ── Right Side: Order Summary ── */}
          <div className="w-full lg:w-[35%] sticky top-32">
            <div className="bg-white border border-brand-secondary/20 shadow-2xl relative overflow-hidden group">
              {/* Gold Top Accents */}
              <div className="h-[4px] bg-gradient-to-r from-transparent via-brand-secondary to-transparent" />
              
              <div className="p-8 md:p-10 space-y-10">
                <div className="space-y-1">
                  <h3 className="text-2xl heading-serif text-brand-primary uppercase tracking-tight">Order Summary</h3>
                  <div className="w-12 h-[1px] bg-brand-secondary" />
                </div>

                <div className="space-y-5">
                  <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-widest text-brand-dark/60">
                    <span>Subtotal</span>
                    <span className="text-brand-primary">₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-widest text-brand-dark/60">
                    <span>Shipping</span>
                    <span className={shipping === 0 ? "text-green-600" : "text-brand-primary"}>
                      {shipping === 0 ? "Complimentary" : `₹${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-widest text-brand-dark/60">
                    <span>GST (18%)</span>
                    <span className="text-brand-primary">₹{tax.toFixed(2)}</span>
                  </div>
                  
                  {/* Divider */}
                  <div className="h-px bg-brand-secondary/10" />

                  <div className="flex justify-between items-end">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-secondary">Grand Total</span>
                      <p className="text-xs text-brand-dark/30 italic font-medium leading-none">Inclusive of all taxes</p>
                    </div>
                    <span className="text-3xl font-serif text-brand-primary font-medium tracking-tight">₹{total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <button 
                    onClick={() => navigate('/checkout')}
                    className="w-full bg-brand-primary text-white py-5 text-[10px] font-bold uppercase tracking-[0.5em] hover:bg-brand-secondary transition-all shadow-xl flex items-center justify-center gap-3 group"
                  >
                    Proceed To Checkout
                    <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                  <div className="flex items-center justify-center gap-4 pt-2 opacity-40">
                    <CreditCard size={20} />
                    <span className="text-[9px] font-bold uppercase tracking-widest">VISA · MASTERCARD · AMEX · UPI</span>
                  </div>
                </div>

                <div className="pt-6 border-t border-brand-secondary/10">
                  <p className="text-[10px] text-brand-dark/50 italic leading-relaxed text-center">
                    Enjoy complimentary gift wrapping on all orders above ₹5000. Experience the art of luxury gifting.
                  </p>
                </div>
              </div>

              {/* Inner border overlay */}
              <div className="absolute inset-4 border border-brand-secondary/10 pointer-events-none group-hover:border-brand-secondary/30 transition-colors duration-500" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
