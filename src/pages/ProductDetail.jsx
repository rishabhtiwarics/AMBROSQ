import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';
import { motion, AnimatePresence } from 'motion/react';
import GlassmorphicBreadcrumbs from '../components/common/GlassmorphicBreadcrumbs';
import { Star, ShieldCheck, Truck, RefreshCcw, Sparkles, Hammer, Plus, Minus, ChevronRight, Heart, Share2, Wind, Flower2, TreeDeciduous, Info } from 'lucide-react';

// Swiper for Recommendations
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import ProductCard from '../components/shop/ProductCard';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [selectedVariant, setSelectedVariant] = useState('Standard');

  const product = useSelector((state) =>
    state.products.items.find(p => p.id === id)
  );

  // Mock data for key notes if not present in product object
  const keyNotes = {
    top: ["Bergamot", "Italian Lemon", "Pink Pepper"],
    heart: ["Damask Rose", "Jasmine Sambac", "Orris"],
    base: ["Sandalwood", "White Musk", "Ambergris"]
  };

  const allProducts = useSelector((state) => state.products.items);

  const cartItem = useSelector((state) =>
    state.cart.items.find((item) => item.id === id)
  );

  const isAlreadyInCart = !!cartItem && cartItem.quantity === quantity;

  const images = product ? [product.image, product.hoverImage].filter(Boolean) : [];

  const handleAddToCart = () => {
    if (product) {
      if (isAlreadyInCart) {
        navigate('/cart');
      } else {
        dispatch(addToCart({ ...product, quantity }));
      }
    }
  };

  const handleBuyNow = () => {
    if (cartItem) {
      navigate('/checkout');
    }
  };

  if (!product) {
    return (
      <div className="pt-40 pb-24 text-center min-h-[60vh] flex flex-col justify-center items-center">
        <h2 className="text-2xl font-serif text-brand-primary mb-4">Product Not Found</h2>
        <Link to="/shop" className="text-sm font-bold uppercase tracking-widest border-b border-brand-secondary text-brand-secondary pb-1">Return to Shop</Link>
      </div>
    );
  }

  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: product.name, active: true }
  ];

  return (
    <div className="bg-brand-cream/10 pb-32">
      <div className="container mx-auto px-4 md:px-8">

        {/* Glassmorphic Breadcrumbs */}
        <div className="mb-12">
          <GlassmorphicBreadcrumbs items={breadcrumbItems} />
        </div>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          {/* Left Column: Image Gallery */}
          <div className="w-full lg:w-1/2 flex flex-col md:flex-row-reverse gap-6">
            <div className="flex-1 relative aspect-[4/5] bg-white border border-brand-secondary/10 overflow-hidden group">
              <motion.img
                key={selectedImage}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                src={images[selectedImage]}
                alt={product.name}
                loading="lazy"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              {/* Quick Action Icons */}
              <div className="absolute top-6 right-6 flex flex-col gap-4">
                <button className="w-10 h-10 bg-white shadow-lg flex items-center justify-center hover:bg-brand-secondary hover:text-white transition-all">
                  <Heart size={18} />
                </button>
                <button className="w-10 h-10 bg-white shadow-lg flex items-center justify-center hover:bg-brand-secondary hover:text-white transition-all">
                  <Share2 size={18} />
                </button>
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-20 md:w-24 aspect-square border-2 transition-all overflow-hidden ${selectedImage === idx ? 'border-brand-secondary shadow-lg' : 'border-brand-secondary/10 opacity-60'
                    }`}
                >
                  <img src={img} alt="" loading="lazy" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Product Info */}
          <div className="w-full lg:w-1/2 flex flex-col text-left">
            {/* Meta Header */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="bg-brand-secondary/10 text-brand-secondary text-[10px] font-bold px-3 py-1 uppercase tracking-widest flex items-center gap-2">
                <Sparkles size={12} /> New Arrival
              </span>
              <span className="bg-brand-primary/5 text-brand-primary text-[10px] font-bold px-3 py-1 uppercase tracking-widest flex items-center gap-2">
                <Hammer size={12} /> Handmade In India
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl heading-serif text-brand-primary mb-4 leading-tight uppercase tracking-tight">
              {product.name}
            </h1>

            {/* Rating and Orders */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className={i < 4 ? "fill-brand-secondary text-brand-secondary" : "text-gray-200"} />
                ))}
              </div>
              <p className="text-[11px] font-bold text-brand-primary/60 uppercase tracking-widest">
                (4.9 / 5.0) Review • 2.4k Orders
              </p>
            </div>

            <p className="text-3xl font-serif text-brand-primary font-medium mb-10">₹{product.price || '1,899'}.00</p>

            <p className="text-sm text-brand-dark/70 leading-relaxed mb-12 max-w-xl italic border-l-2 border-brand-secondary/30 pl-6 font-medium">
              "Our signature formulation, {product.name} is a masterclass in olfactory balance. Crisp, clean, and effortlessly natural. Crafted with precision and passion, this perfume embodies the spirit of Kaycent’s artisanal heritage."
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 border-y border-brand-secondary/10 py-8">
              <div className="flex items-center gap-3">
                <ShieldCheck className="text-brand-secondary" size={20} />
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-primary/80">Pure Quality</span>
              </div>
              <div className="flex items-center gap-3">
                <Truck className="text-brand-secondary" size={20} />
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-primary/80">Pan India Delivery</span>
              </div>
              <div className="flex items-center gap-3">
                <RefreshCcw className="text-brand-secondary" size={20} />
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-primary/80">Easy Returns</span>
              </div>
            </div>

            {/* Key Notes Visualization */}
            <div className="mb-12 space-y-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-secondary">Olfactory Journey</p>
              <div className="grid grid-cols-3 gap-4">
                 <div className="flex flex-col items-center p-4 bg-brand-cream/30 border border-brand-secondary/5 rounded-sm group hover:bg-white hover:shadow-md transition-all">
                    <Wind size={24} className="text-brand-secondary mb-3 group-hover:scale-110 transition-transform" />
                    <span className="text-[9px] font-bold uppercase tracking-widest text-brand-primary/40 mb-2">Top Notes</span>
                    <p className="text-[10px] font-bold text-brand-primary text-center leading-tight">{keyNotes.top.join(", ")}</p>
                 </div>
                 <div className="flex flex-col items-center p-4 bg-brand-cream/30 border border-brand-secondary/5 rounded-sm group hover:bg-white hover:shadow-md transition-all">
                    <Flower2 size={24} className="text-brand-secondary mb-3 group-hover:scale-110 transition-transform" />
                    <span className="text-[9px] font-bold uppercase tracking-widest text-brand-primary/40 mb-2">Heart Notes</span>
                    <p className="text-[10px] font-bold text-brand-primary text-center leading-tight">{keyNotes.heart.join(", ")}</p>
                 </div>
                 <div className="flex flex-col items-center p-4 bg-brand-cream/30 border border-brand-secondary/5 rounded-sm group hover:bg-white hover:shadow-md transition-all">
                    <TreeDeciduous size={24} className="text-brand-secondary mb-3 group-hover:scale-110 transition-transform" />
                    <span className="text-[9px] font-bold uppercase tracking-widest text-brand-primary/40 mb-2">Base Notes</span>
                    <p className="text-[10px] font-bold text-brand-primary text-center leading-tight">{keyNotes.base.join(", ")}</p>
                 </div>
              </div>
            </div>

            {/* Variant Selection */}
            <div className="space-y-6 mb-12 text-left">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-secondary">Selection</p>
              <div className="flex flex-wrap gap-4">
                {['Standard', 'Premium Collection', 'Gift Box'].map((variant) => (
                  <button
                    key={variant}
                    onClick={() => setSelectedVariant(variant)}
                    className={`px-8 py-3 text-[10px] font-bold uppercase tracking-widest border transition-all ${selectedVariant === variant
                        ? 'border-brand-primary bg-brand-primary text-white shadow-lg'
                        : 'border-brand-secondary/20 text-brand-primary/60 hover:border-brand-secondary hover:text-brand-primary'
                      }`}
                  >
                    {variant}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Actions - Integrated Single Row */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 md:gap-4">
              {/* Quantity Selector */}
              <div className="flex items-center border border-brand-secondary/30 bg-white">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-12 flex items-center justify-center hover:bg-brand-cream transition-colors border-r border-brand-secondary/30"
                >
                  <Minus size={12} />
                </button>
                <span className="w-12 text-center font-bold text-xs">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-12 flex items-center justify-center hover:bg-brand-cream transition-colors border-l border-brand-secondary/30"
                >
                  <Plus size={12} />
                </button>
              </div>

              {/* Add To Casket Button */}
              <button
                onClick={handleAddToCart}
                className={`flex-1 py-4 px-6 text-[10px] font-bold uppercase tracking-[0.3em] transition-all shadow-xl flex items-center justify-center gap-2 ${
                  isAlreadyInCart
                    ? 'bg-brand-primary text-white hover:bg-brand-secondary active:scale-[0.98]'
                    : 'bg-brand-secondary text-white hover:bg-brand-primary active:scale-[0.98]'
                }`}
              >
                {isAlreadyInCart ? 'Go to Cart' : 'Add To Casket'}
              </button>

              {/* Buy Now Button */}
              <button
                onClick={handleBuyNow}
                disabled={!cartItem}
                className={`flex-1 border-2 py-[14px] px-6 text-[10px] font-bold uppercase tracking-[0.3em] transition-all shadow-lg flex items-center justify-center gap-2 group ${
                  !!cartItem
                    ? 'border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white cursor-pointer'
                    : 'border-gray-200 text-gray-400 cursor-not-allowed opacity-50'
                }`}
              >
                Buy Now
                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Large Detailed Description Section */}
        <section className="mt-24 md:mt-32">
          {/* Tab Navigation */}
          <div className="flex justify-center border-b border-brand-secondary/10 mb-16">
            {['description', 'specifications', 'usage'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-12 py-6 text-[10px] font-bold uppercase tracking-[0.4em] transition-all relative ${
                  activeTab === tab ? 'text-brand-primary' : 'text-brand-primary/40 hover:text-brand-primary'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div 
                    layoutId="activeTabIndicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-secondary" 
                  />
                )}
              </button>
            ))}
          </div>

          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              {activeTab === 'description' && (
                <motion.div
                  key="description"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8 text-center"
                >
                  <h3 className="text-3xl heading-serif text-brand-primary uppercase">The Olfactory Narrative</h3>
                  <div className="w-20 h-[1px] bg-brand-secondary/40 mx-auto"></div>
                  <p className="text-brand-dark/70 text-lg leading-relaxed font-medium">
                    {product.name} is an exquisite manifestation of AMBROSQ's commitment to excellence. Designed for those who seek a scent that is both intimate and commanding, this fragrance evolves beautifully over time, revealing layers of complexity that captivate the senses.
                  </p>
                  <p className="text-brand-dark/60 leading-loose">
                    Inspired by the timeless elegance of artisanal perfumery, we have combined traditional distillation methods with modern olfactory science. The result is a fragrance that not only smells divine but also tells a story of heritage, passion, and the pursuit of perfection. Each bottle is a testament to our dedicated artisans in Grasse, who hand-pour every drop with meticulous care.
                  </p>
                </motion.div>
              )}

              {activeTab === 'specifications' && (
                <motion.div
                  key="specifications"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-10"
                >
                  <div className="space-y-6">
                    <h4 className="text-sm font-bold uppercase tracking-widest text-brand-secondary">Technical Details</h4>
                    <ul className="space-y-4">
                      <li className="flex justify-between border-b border-brand-secondary/10 pb-4">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-brand-primary/60">Concentration</span>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-brand-primary">Extrait de Parfum</span>
                      </li>
                      <li className="flex justify-between border-b border-brand-secondary/10 pb-4">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-brand-primary/60">Sillage</span>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-brand-primary">Strong / Enveloping</span>
                      </li>
                      <li className="flex justify-between border-b border-brand-secondary/10 pb-4">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-brand-primary/60">Longevity</span>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-brand-primary">12+ Hours</span>
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-6">
                    <h4 className="text-sm font-bold uppercase tracking-widest text-brand-secondary">Sustainability</h4>
                    <p className="text-xs text-brand-dark/60 leading-loose">
                      AMBROSQ is committed to ethical sourcing. Our bottles are 100% recyclable, and our ingredients are harvested following fair-trade practices. We prioritize local farmers in Grasse to support the heritage of traditional perfumery.
                    </p>
                  </div>
                </motion.div>
              )}

              {activeTab === 'usage' && (
                <motion.div
                  key="usage"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex flex-col md:flex-row gap-12 items-center"
                >
                  <div className="w-full md:w-1/3 aspect-square bg-brand-cream border border-brand-secondary/10 flex items-center justify-center">
                     <Info size={40} className="text-brand-secondary/30" />
                  </div>
                  <div className="flex-1 space-y-6">
                     <h4 className="text-xl heading-serif text-brand-primary uppercase">Application Mastery</h4>
                     <p className="text-sm text-brand-dark/60 leading-loose">
                        To maximize the longevity of {product.name}, apply to pulse points where your skin is thinnest: the wrists, neck, and behind the ears. For a more subtle trail, spray into the air and walk through the mist. Avoid rubbing the fragrance into the skin, as this can break down the delicate olfactory molecules.
                     </p>
                     <div className="bg-brand-secondary/5 p-6 border-l-2 border-brand-secondary">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-brand-primary italic">"Let the warmth of your pulse unlock the soul of the scent."</p>
                     </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Recommended Products Section */}
        <section className="mt-32 pt-24 border-t border-brand-secondary/10">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-6 mb-16">
            <div className="text-center md:text-left">
              <h2 className="text-3xl md:text-4xl heading-serif text-brand-primary uppercase tracking-tight">
                Other Recommended Products
              </h2>
              <div className="w-20 h-[2px] bg-brand-secondary mt-4 mx-auto md:mx-0" />
            </div>
            <Link 
              to="/shop" 
              className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-secondary hover:text-brand-primary transition-all border-b border-brand-secondary/20 pb-2 hover:border-brand-primary"
            >
              DISCOVER ALL PIECES
            </Link>
          </div>

          <div className="relative group">
            <Swiper
              modules={[Autoplay, Navigation]}
              spaceBetween={30}
              slidesPerView={1}
              autoplay={{ 
                delay: 4000, 
                disableOnInteraction: false,
                pauseOnMouseEnter: true
              }}
              navigation={{
                prevEl: '.recommended-prev',
                nextEl: '.recommended-next',
              }}
              breakpoints={{
                640: { slidesPerView: 2, spaceBetween: 20 },
                1024: { slidesPerView: 3, spaceBetween: 30 },
                1280: { slidesPerView: 4, spaceBetween: 40 }
              }}
              className="h-full"
            >
              {allProducts
                .filter(p => p.id !== id)
                .map((item) => (
                  <SwiperSlide key={item.id}>
                    <ProductCard product={item} />
                  </SwiperSlide>
                ))}
            </Swiper>

            {/* Custom Navigation Buttons */}
            <button className="recommended-prev absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 md:-translate-x-12 z-20 w-12 h-12 bg-white border border-brand-secondary/20 flex items-center justify-center text-brand-primary hover:bg-brand-secondary hover:text-white transition-all opacity-0 group-hover:opacity-100 shadow-xl">
              <ChevronRight size={20} className="rotate-180" />
            </button>
            <button className="recommended-next absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 md:translate-x-12 z-20 w-12 h-12 bg-white border border-brand-secondary/20 flex items-center justify-center text-brand-primary hover:bg-brand-secondary hover:text-white transition-all opacity-0 group-hover:opacity-100 shadow-xl">
              <ChevronRight size={20} />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductDetail;
