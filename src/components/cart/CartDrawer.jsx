import { X, ShoppingBag, Trash2, Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../../store/slices/cartSlice';

export default function CartDrawer({ isOpen, onClose }) {
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-brand-dark/60 backdrop-blur-md z-[100]"
        >
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute right-0 top-0 bottom-0 w-full sm:w-[450px] bg-brand-cream border-l border-brand-secondary/20 shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Drawer Header */}
            <div className="flex justify-between items-center px-8 py-8 border-b border-brand-secondary/10 bg-white/40 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <ShoppingBag size={24} className="text-brand-secondary" />
                <h2 className="heading-serif text-2xl text-brand-primary uppercase font-bold tracking-widest">Your Bag</h2>
              </div>
              <button 
                onClick={onClose} 
                className="w-10 h-10 flex items-center justify-center rounded-full bg-brand-secondary/10 text-brand-secondary hover:bg-brand-secondary hover:text-white transition-all duration-300"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6 scrollbar-thin scrollbar-thumb-brand-secondary/20">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full space-y-6">
                  <div className="w-24 h-24 rounded-full bg-brand-secondary/5 flex items-center justify-center">
                    <ShoppingBag size={40} className="text-brand-secondary/20" />
                  </div>
                  <div className="text-center">
                    <p className="heading-serif text-xl text-brand-primary mb-2">Your bag is empty</p>
                    <p className="text-xs text-brand-dark/40 tracking-widest uppercase">Start discovering our essence</p>
                  </div>
                  <button 
                    onClick={() => { onClose(); navigate('/shop'); }}
                    className="px-8 py-3 bg-brand-secondary text-white text-[10px] font-bold uppercase tracking-widest hover:bg-brand-primary transition-all shadow-lg"
                  >
                    Go to Shop
                  </button>
                </div>
              ) : (
                items.map(item => (
                  <motion.div 
                    layout
                    key={item.id} 
                    className="flex gap-6 group bg-white/40 border border-[#C89B3C]/30 p-4 rounded-sm hover:border-[#C89B3C] transition-colors duration-300"
                  >
                    {/* Item Image */}
                    <div className="w-24 h-28 bg-white border border-brand-secondary/10 flex-shrink-0 relative overflow-hidden group-hover:border-brand-secondary/30 transition-all duration-500">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                        referrerPolicy="no-referrer" 
                      />
                    </div>

                    {/* Item Info */}
                    <div className="flex-grow flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="text-[11px] text-brand-dark uppercase tracking-[0.2em] font-bold leading-tight max-w-[180px]">
                            {item.name}
                          </h4>
                          <button 
                            onClick={() => dispatch(removeFromCart(item.id))}
                            className="text-brand-dark/30 hover:text-red-500 transition-colors p-1"
                            title="Remove item"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <p className="text-[10px] text-brand-secondary font-medium tracking-wider mb-2">
                          Luxury Collection
                        </p>
                      </div>

                      <div className="flex items-center justify-between">
                        {/* Quantity Controls */}
                        <div className="flex items-center border border-brand-secondary/20 rounded-full px-2 py-1 bg-white/50">
                          <button 
                            onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
                            className="p-1 hover:text-brand-secondary transition-colors"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="text-xs font-bold px-3 text-brand-primary">{item.quantity}</span>
                          <button 
                            onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                            className="p-1 hover:text-brand-secondary transition-colors"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        
                        <span className="text-sm font-bold text-brand-primary font-serif">
                          ${(item.price * item.quantity).toLocaleString()}.00
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="p-8 border-t border-brand-secondary/10 bg-white/60 backdrop-blur-md">
              <div className="grid grid-cols-1 gap-4">
                <button 
                  onClick={() => { onClose(); navigate('/checkout'); }}
                  disabled={items.length === 0}
                  className="w-full bg-[#C89B3C] text-white py-5 text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-black transition-all duration-500 shadow-lg shadow-brand-secondary/10 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#C89B3C]"
                >
                  Instant Checkout — ${subtotal.toLocaleString()}.00
                </button>
                <button 
                  onClick={() => { onClose(); navigate('/cart'); }}
                  disabled={items.length === 0}
                  className="w-full border-2 border-[#C89B3C] text-[#C89B3C] py-5 text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-black hover:border-black hover:text-white transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-[#C89B3C] disabled:hover:border-[#C89B3C]"
                >
                  View Detailed Bag
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
