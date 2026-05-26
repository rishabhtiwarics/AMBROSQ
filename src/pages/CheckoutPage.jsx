import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  CreditCard, 
  Truck, 
  MapPin, 
  Lock, 
  ChevronRight, 
  ShoppingBag,
  ArrowLeft,
  Mail,
  Package,
  FileText,
  ShieldCheck,
  User,
  Calendar,
  HandCoins
} from 'lucide-react';
import { clearCart } from '../store/slices/cartSlice';
import GlassmorphicBreadcrumbs from '../components/common/GlassmorphicBreadcrumbs';
import LoginForm from '../components/authForm/LoginForm';
import LuxuryAddressForm from '../components/checkout/LuxuryAddressForm';
import SkeletonImage from '../components/common/SkeletonImage';

export default function CheckoutPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.cart);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  
  const [currentStep, setCurrentStep] = useState(1);
  const [addressData, setAddressData] = useState({ firstName: '', lastName: '', street: '', city: '', postalCode: '' });
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [orderId, setOrderId] = useState('');

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingCost = subtotal > 2500 ? 0 : 150;
  const tax = subtotal * 0.18;
  const total = subtotal + shippingCost + tax;

  useEffect(() => {
    if (items.length === 0 && currentStep !== 4) {
      navigate('/shop');
    }
  }, [items, currentStep, navigate]);

  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    { name: 'Bag', href: '/cart' },
    { name: 'Checkout', active: true }
  ];

  const handlePlaceOrder = () => {
    const newOrderId = 'AMB-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    setOrderId(newOrderId);
    setCurrentStep(4);
    dispatch(clearCart());
  };

  const steps = [
    { id: 1, name: 'Identity', icon: Lock },
    { id: 2, name: 'Destination', icon: MapPin },
    { id: 3, name: 'Payment', icon: CreditCard },
  ];

  if (currentStep === 4) {
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
                <CheckCircle2 size={48} className="text-brand-secondary" />
              </div>
              <div className="absolute -top-4 -right-4 w-12 h-12 border-t-2 border-r-2 border-brand-secondary/40" />
              <div className="absolute -bottom-4 -left-4 w-12 h-12 border-b-2 border-l-2 border-brand-secondary/40" />
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl heading-serif text-brand-primary uppercase tracking-tight">Your Essence is Secured</h1>
              <p className="text-sm text-brand-dark/60 leading-relaxed font-medium">
                Thank you for choosing AMBROSQ. Your order <span className="text-brand-primary font-bold">#{orderId}</span> has been confirmed and is now being prepared for its journey.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
              <div className="flex flex-col items-center gap-3 p-6 bg-white/40 border border-brand-secondary/5">
                <Mail size={20} className="text-brand-secondary" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-dark/60 text-center">Confirmation Emailed</span>
              </div>
              <div className="flex flex-col items-center gap-3 p-6 bg-white/40 border border-brand-secondary/5">
                <Package size={20} className="text-brand-secondary" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-dark/60 text-center">Tracking Initiated</span>
              </div>
              <div className="flex flex-col items-center gap-3 p-6 bg-white/40 border border-brand-secondary/5">
                <FileText size={20} className="text-brand-secondary" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-dark/60 text-center">Invoice Generated</span>
              </div>
            </div>

            <Link 
              to="/" 
              className="inline-flex items-center gap-4 bg-brand-primary text-white px-14 py-5 text-[10px] font-bold uppercase tracking-[0.5em] hover:bg-brand-secondary transition-all shadow-2xl group"
            >
              Continue Exploring
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
          
          {/* ── Left Side: Checkout Flow (Styled like Cart Left Side) ── */}
          <div className="w-full lg:w-[65%] space-y-12">
            
            {/* Header matches Cart Page */}
            <div className="flex items-center justify-between border-b border-brand-secondary/10 pb-6">
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-secondary">Secure Reservation</p>
                <h2 className="text-3xl heading-serif text-brand-primary uppercase tracking-tight">Checkout Portal</h2>
              </div>
              <Link to="/cart" className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-secondary hover:text-brand-primary transition-colors flex items-center gap-2">
                <ArrowLeft size={12} /> Return to Bag
              </Link>
            </div>

            {/* Stepper styled with Boutique minimalism */}
            <div className="flex items-center justify-center gap-8 md:gap-16 py-10 bg-white border border-brand-secondary/10 shadow-[0_10px_30px_rgba(0,0,0,0.02)]">
              {steps.map((step, idx) => (
                <div key={step.id} className="flex items-center gap-4">
                  <div className={`w-11 h-11 flex items-center justify-center rounded-full border transition-all duration-700 ${
                    currentStep >= step.id 
                      ? 'bg-brand-primary text-white border-brand-primary shadow-lg scale-110' 
                      : 'bg-white text-brand-dark/40 border-brand-secondary/20'
                  }`}>
                    <step.icon size={18} />
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-[0.3em] hidden md:block ${
                    currentStep >= step.id ? 'text-brand-primary' : 'text-brand-dark/40'
                  }`}>
                    {step.name}
                  </span>
                  {idx < steps.length - 1 && <div className="w-8 md:w-16 h-px bg-brand-secondary/20" />}
                </div>
              ))}
            </div>

            {/* Steps Content Area */}
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div 
                  key="step1" 
                  initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-8"
                >
                  {isAuthenticated ? (
                    <div className="bg-white border border-brand-secondary/20 relative overflow-hidden group shadow-[0_20px_50px_rgba(0,0,0,0.03)]">
                      <div className="h-[4px] bg-gradient-to-r from-transparent via-brand-secondary to-transparent" />
                      <div className="p-10 md:p-14 space-y-8 relative z-10">
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-px bg-brand-secondary" />
                            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-secondary">Collection Member Identified</p>
                          </div>
                          <h3 className="text-4xl heading-serif text-brand-primary uppercase tracking-tight leading-none">
                            Welcome Back, <span className="italic">{user?.name}</span>
                          </h3>
                          <p className="text-[12px] text-brand-dark/50 font-medium max-w-sm leading-relaxed">
                            Your private credentials have been successfully authenticated. Proceed to finalize your selection.
                          </p>
                        </div>
                        <div className="flex items-center gap-6 pt-4">
                          <button 
                            onClick={() => setCurrentStep(2)} 
                            className="bg-brand-primary text-white px-12 py-5 text-[10px] font-bold uppercase tracking-[0.5em] hover:bg-brand-secondary transition-all shadow-xl flex items-center gap-3 group overflow-hidden relative"
                          >
                            <span className="relative z-10">Proceed To Destination</span>
                            <ChevronRight size={14} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                            <div className="absolute inset-0 bg-brand-secondary translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                          </button>
                          <button className="text-[10px] text-brand-dark/40 font-bold uppercase tracking-widest hover:text-brand-secondary transition-colors border-b border-brand-secondary/10 pb-1">Sign Out</button>
                        </div>
                      </div>
                      <div className="absolute inset-4 border border-brand-secondary/5 pointer-events-none group-hover:border-brand-secondary/10 transition-colors duration-500" />
                    </div>
                  ) : (
                    <div className="bg-white border border-brand-secondary/20 relative overflow-hidden group shadow-[0_20px_50px_rgba(0,0,0,0.03)]">
                      <div className="h-[4px] bg-gradient-to-r from-transparent via-brand-secondary to-transparent" />
                      <div className="p-10 md:p-14 space-y-10 relative z-10">
                        <div className="space-y-2 text-center md:text-left">
                          <h3 className="text-3xl heading-serif text-brand-primary uppercase tracking-tight">Member Identification</h3>
                          <div className="flex items-center gap-3 justify-center md:justify-start">
                            <div className="w-8 h-px bg-brand-secondary/30" />
                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-dark/40">Access your private vault</p>
                          </div>
                        </div>
                        <LoginForm onNext={() => setCurrentStep(2)} />
                      </div>
                      <div className="absolute inset-4 border border-brand-secondary/5 pointer-events-none group-hover:border-brand-secondary/10 transition-colors duration-500" />
                    </div>
                  )}
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div 
                  key="step2" 
                  initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-8"
                >
                  <div className="bg-white border border-brand-secondary/20 relative overflow-hidden group shadow-[0_20px_50px_rgba(0,0,0,0.03)]">
                    {/* Gold Top Accent */}
                    <div className="h-[4px] bg-gradient-to-r from-transparent via-brand-secondary to-transparent" />
                    
                    <div className="p-10 md:p-14 space-y-10">
                      <div className="space-y-2 text-center md:text-left">
                        <h3 className="text-3xl heading-serif text-brand-primary uppercase tracking-tight">Artisanal Destination</h3>
                        <div className="flex items-center gap-3 justify-center md:justify-start">
                          <div className="w-8 h-px bg-brand-secondary/30" />
                          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-secondary">Designate your artisanal delivery</p>
                        </div>
                      </div>
                      <LuxuryAddressForm data={addressData} onChange={setAddressData} />
                    </div>

                    {/* Decorative inner frame */}
                    <div className="absolute inset-4 border border-brand-secondary/5 pointer-events-none group-hover:border-brand-secondary/10 transition-colors duration-500" />
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <button onClick={() => setCurrentStep(1)} className="text-[10px] font-bold uppercase tracking-widest text-brand-dark/40 hover:text-brand-primary transition-colors flex items-center gap-2 font-serif">
                      <ArrowLeft size={12} /> Back
                    </button>
                    <button 
                      onClick={() => setCurrentStep(3)} 
                      className="bg-brand-primary text-white px-12 py-5 text-[10px] font-bold uppercase tracking-[0.5em] hover:bg-brand-secondary transition-all shadow-xl flex items-center gap-3 group overflow-hidden relative"
                    >
                      <span className="relative z-10">Continue to Payment</span>
                      <ChevronRight size={14} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                      <div className="absolute inset-0 bg-brand-secondary translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                    </button>
                  </div>
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div 
                  key="step3" 
                  initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-8"
                >
                  <div className="bg-white border border-brand-secondary/20 relative overflow-hidden group shadow-[0_20px_50_rgba(0,0,0,0.03)]">
                    <div className="h-[4px] bg-gradient-to-r from-transparent via-brand-secondary to-transparent" />
                    
                    <div className="p-10 md:p-14 space-y-12 relative z-10">
                      <div className="space-y-2 text-center md:text-left">
                        <h3 className="text-3xl heading-serif text-brand-primary uppercase tracking-tight">Financing</h3>
                        <div className="flex items-center gap-3 justify-center md:justify-start">
                          <div className="w-8 h-px bg-brand-secondary/30" />
                          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-secondary">Select your preferred method</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                          { id: 'card', name: 'Credit / Debit', icon: CreditCard },
                          { id: 'upi', name: 'UPI / Wallet', icon: Lock },
                          { id: 'cod', name: 'Cash on Delivery', icon: HandCoins },
                          { id: 'net', name: 'Net Banking', icon: FileText },
                        ].map((method) => (
                          <button 
                            key={method.id} 
                            onClick={() => setPaymentMethod(method.id)} 
                            className={`p-10 border transition-all duration-500 flex flex-col items-center gap-4 relative group/btn ${
                              paymentMethod === method.id 
                                ? 'border-brand-secondary bg-white shadow-xl scale-105' 
                                : 'border-brand-secondary/10 bg-transparent hover:border-brand-secondary/40'
                            }`}
                          >
                            <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 ${
                              paymentMethod === method.id ? 'bg-brand-primary text-white shadow-lg' : 'bg-brand-cream text-brand-secondary opacity-60'
                            }`}>
                              <method.icon size={20} />
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-primary text-center leading-tight">{method.name}</span>
                            {paymentMethod === method.id && (
                              <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-brand-secondary shadow-[0_0_10px_rgba(200,155,60,0.8)]" />
                            )}
                          </button>
                        ))}
                      </div>

                      {paymentMethod === 'cod' && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="pt-10 border-t border-brand-secondary/10"
                        >
                          <div className="p-8 bg-brand-cream/20 border border-brand-secondary/5 space-y-4">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-brand-secondary/10">
                                <HandCoins size={18} className="text-brand-secondary" />
                              </div>
                              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-primary">Artisanal Exchange at Doorstep</p>
                            </div>
                            <p className="text-[12px] text-brand-dark/50 leading-relaxed italic">
                              Complete your reservation now and provide payment in cash upon the successful delivery of your essence. A convenience fee may apply for this premium service.
                            </p>
                          </div>
                        </motion.div>
                      )}

                      {paymentMethod === 'card' && (
                        <div className="space-y-12 pt-10 border-t border-brand-secondary/10">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            {/* Cardholder Name */}
                            <div className="space-y-2">
                              <label className="text-[10px] font-bold uppercase tracking-widest text-brand-dark/40 italic">Cardholder Identity</label>
                              <div className="relative">
                                <User size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-secondary opacity-60" />
                                <input 
                                  type="text" 
                                  className="w-full bg-white border border-brand-secondary/10 text-brand-primary text-[13px] font-light py-4 pl-10 pr-4 outline-none transition-all focus:border-brand-secondary rounded-none uppercase tracking-widest" 
                                  placeholder="JULIANNE VANCE" 
                                />
                              </div>
                            </div>

                            {/* CVV */}
                            <div className="space-y-2">
                              <label className="text-[10px] font-bold uppercase tracking-widest text-brand-dark/40 italic">Security Key (CVV)</label>
                              <div className="relative">
                                <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-secondary opacity-60" />
                                <input 
                                  type="password" 
                                  placeholder="***" 
                                  className="w-full bg-white border border-brand-secondary/10 text-brand-primary text-[13px] font-light py-4 pl-10 pr-4 outline-none transition-all focus:border-brand-secondary rounded-none" 
                                />
                              </div>
                            </div>
                          </div>

                          {/* Card Number */}
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-brand-dark/40 italic">Access Number</label>
                            <div className="relative">
                              <CreditCard size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-secondary opacity-60" />
                              <input 
                                type="text" 
                                className="w-full bg-white border border-brand-secondary/10 text-brand-primary text-[13px] font-light py-4 pl-10 pr-4 outline-none transition-all focus:border-brand-secondary rounded-none tracking-[0.4em]" 
                                placeholder="**** **** **** ****" 
                              />
                            </div>
                          </div>

                          {/* Expiry */}
                          <div className="w-full md:w-1/2 space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-brand-dark/40 italic">Validity Term (MM/YY)</label>
                            <div className="relative">
                              <Calendar size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-secondary opacity-60" />
                              <input 
                                type="text" 
                                className="w-full bg-white border border-brand-secondary/10 text-brand-primary text-[13px] font-light py-4 pl-10 pr-4 outline-none transition-all focus:border-brand-secondary rounded-none" 
                                placeholder="04 / 28" 
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="absolute inset-4 border border-brand-secondary/5 pointer-events-none group-hover:border-brand-secondary/10 transition-colors duration-500" />
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <button onClick={() => setCurrentStep(2)} className="text-[10px] font-bold uppercase tracking-widest text-brand-dark/40 hover:text-brand-primary transition-colors flex items-center gap-2">
                      <ArrowLeft size={12} /> Back
                    </button>
                    <button 
                      onClick={handlePlaceOrder} 
                      className="bg-brand-primary text-white px-16 py-7 text-[10px] font-bold uppercase tracking-[0.5em] hover:bg-brand-secondary transition-all shadow-2xl flex items-center justify-center gap-4 group overflow-hidden relative"
                    >
                      <span className="relative z-10">Complete Reservation</span>
                      <CheckCircle2 size={16} className="relative z-10" />
                      <div className="absolute inset-0 bg-brand-secondary translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Value Props - Matching Cart Page */}
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

          {/* ── Right Side: Order Summary (Strictly Matching Cart Page) ── */}
          <div className="w-full lg:w-[35%] sticky top-32">
            <div className="bg-white border border-brand-secondary/20 shadow-2xl relative overflow-hidden group">
              {/* Gold Top Accent */}
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
                    <span className={shippingCost === 0 ? "text-green-600" : "text-brand-primary"}>
                      {shippingCost === 0 ? "Complimentary" : `₹${shippingCost.toFixed(2)}`}
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

                <div className="pt-6 border-t border-brand-secondary/10">
                  <div className="flex items-center justify-center gap-4 opacity-40">
                    <CreditCard size={18} />
                    <span className="text-[9px] font-bold uppercase tracking-widest">VISA · MASTERCARD · AMEX · UPI</span>
                  </div>
                  <p className="mt-6 text-[10px] text-brand-dark/50 italic leading-relaxed text-center">
                    Enjoy complimentary gift wrapping on all orders above ₹5000. Experience the art of luxury gifting.
                  </p>
                </div>
              </div>

              {/* Inner border overlay */}
              <div className="absolute inset-4 border border-brand-secondary/10 pointer-events-none group-hover:border-brand-secondary/30 transition-colors duration-500" />
            </div>
            
            {/* Minimal Item List Overlay (Optional context) */}
            <div className="mt-8 px-2 space-y-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-dark/40">Items in Reservation ({items.length})</p>
              <div className="space-y-3">
                {items.map(item => (
                  <div key={item.id} className="flex items-center gap-4">
                    <div className="w-10 h-12 bg-white border border-brand-secondary/10 overflow-hidden">
                      <SkeletonImage
                        src={item.image}
                        alt={item.name}
                        loading="lazy"
                        wrapperClassName="w-full h-full"
                        imageClassName="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-[9px] font-bold uppercase tracking-widest text-brand-primary truncate">{item.name}</p>
                      <p className="text-[9px] text-brand-dark/40 uppercase tracking-widest">Qty: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
