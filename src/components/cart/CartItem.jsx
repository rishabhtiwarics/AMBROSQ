import { useDispatch } from 'react-redux';
import { Trash2, Plus, Minus } from 'lucide-react';
import { removeFromCart, updateQuantity } from '../../store/slices/cartSlice';

export default function CartItem({ item }) {
  const dispatch = useDispatch();

  return (
    <div className="flex gap-6 py-8 border-b border-brand-secondary/10 group">
      {/* Product Image */}
      <div className="w-24 h-32 md:w-32 md:h-40 bg-brand-cream overflow-hidden border border-brand-secondary/5 flex-shrink-0">
        <img 
          src={item.image} 
          alt={item.name} 
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Product Info */}
      <div className="flex flex-grow flex-col">
        <div className="flex justify-between items-start mb-2">
          <div className="text-left">
            <h3 className="heading-serif text-lg md:text-xl text-brand-primary">{item.name}</h3>
            <p className="text-xs text-brand-dark/50 uppercase tracking-widest mt-1">Ref. {item.id}00-LX</p>
          </div>
          <button 
            onClick={() => dispatch(removeFromCart(item.id))}
            className="text-brand-dark/30 hover:text-red-500 transition-colors"
          >
            <Trash2 size={18} />
          </button>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
          {/* Quantity Spinner */}
          <div className="flex items-center border border-brand-secondary/20 h-10 px-4 gap-4">
            <button 
              onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
              className="text-brand-primary hover:text-brand-secondary"
            >
              <Minus size={14} />
            </button>
            <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
            <button 
              onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
              className="text-brand-primary hover:text-brand-secondary"
            >
              <Plus size={14} />
            </button>
          </div>

          <div className="text-right">
            <span className="text-sm text-brand-dark/40 uppercase tracking-widest block mb-1">Total</span>
            <span className="text-lg font-bold text-brand-primary font-mono">${item.price * item.quantity}.00</span>
          </div>
        </div>
      </div>
    </div>
  );
}
