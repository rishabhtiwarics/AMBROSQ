import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Star, Heart, Eye } from 'lucide-react';
import { addToCart } from '../../store/slices/cartSlice';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import SkeletonImage from '../common/SkeletonImage';

export default function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const isInCart = cartItems.some(item => item.id === product.id);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (!isInCart) {
      dispatch(addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      }));
    }
  };

  return (
    <div 
      onClick={() => navigate(`/product/${product.id}`)}
      className="flex flex-col group cursor-pointer border border-[#C89B3C]/30 p-6 transition-all duration-500 hover:border-[#C89B3C] hover:shadow-2xl hover:shadow-[#C89B3C]/5 bg-white h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-[#F8F8F8] mb-6 border-b-2 border-transparent group-hover:border-b-[#C89B3C] transition-all duration-500">
        {/* Primary Image */}
        <SkeletonImage
          src={product.image}
          alt={product.name}
          loading="lazy"
          wrapperClassName="absolute inset-0 w-full h-full transition-all duration-700 ease-in-out group-hover:scale-105"
          imageClassName="w-full h-full object-contain p-4"
          referrerPolicy="no-referrer"
        />

        {/* Hover Image (Cross-fade) */}
        {product.hoverImage && (
          <SkeletonImage
            src={product.hoverImage}
            alt={`${product.name} alternate view`}
            loading="eager"
            wrapperClassName={`absolute inset-0 z-10 w-full h-full transition-all duration-700 ease-in-out ${
              isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
            imageClassName="w-full h-full object-contain p-4"
            skeletonClassName="hidden"
            referrerPolicy="no-referrer"
          />
        )}

        {/* Overlay Content */}
        {isHovered && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center p-4 bg-brand-primary/5"
          >
            {/* Heart Icon Top Left */}
            <div className="absolute top-4 left-4 p-2 bg-white rounded-full shadow-sm">
              <Heart size={16} className="text-brand-primary hover:fill-brand-primary transition-colors" />
            </div>

            {/* Quick View Icon Top Right */}
            <div className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-sm">
              <Eye size={16} className="text-brand-primary transition-colors" />
            </div>

            {/* Add to Cart Button */}
            <motion.button 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              onClick={handleAddToCart}
              disabled={isInCart}
              className={`px-10 py-4 text-sm font-bold transition-colors shadow-lg whitespace-nowrap ${
                isInCart 
                  ? 'bg-brand-secondary text-white' 
                  : 'bg-[#EAE2D1] text-brand-dark hover:bg-brand-secondary hover:text-white'
              }`}
            >
              {isInCart ? 'In Bag' : 'Add to Cart'}
            </motion.button>
          </motion.div>
        )}

        {isInCart && (
          <div className="absolute top-4 left-4 z-20 bg-brand-secondary text-white text-xs font-bold px-4 py-2 shadow-lg">
            In Bag
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="text-center flex flex-col items-center gap-2 mt-auto">
        <span className="text-[10px] text-brand-secondary font-bold mb-1 uppercase tracking-widest">{product.category}</span>
        <h5 className="text-brand-primary uppercase">{product.name}</h5>
        
        {/* Rating Stars */}
        <div className="flex gap-1 my-1">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              size={12} 
              className={i < (product.rating || 5) ? "fill-brand-secondary text-brand-secondary" : "text-gray-200"} 
            />
          ))}
        </div>

        {/* Short Description */}
        <p className="text-brand-dark/60 text-xs leading-relaxed px-2 line-clamp-2">
          {product.description}
        </p>

        {/* Price */}
        <p className="text-brand-primary text-base font-semibold mt-2">₹{product.price}.00</p>
      </div>
    </div>
  );
}
