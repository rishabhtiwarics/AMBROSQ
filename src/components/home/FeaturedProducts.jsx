import { useSelector } from 'react-redux';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../shop/ProductCard';
import SkeletonImage from '../common/SkeletonImage';

const FeaturedProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="relative aspect-square group overflow-hidden bg-brand-primary/5 border border-brand-primary/5 cursor-pointer border-b-2 border-transparent hover:border-b-[#C89B3C] transition-all duration-500"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      {/* Background Image */}
      <SkeletonImage
        src={product.image}
        alt={product.name}
        loading="lazy"
        wrapperClassName="w-full h-full transition-transform duration-1000 group-hover:scale-110"
        imageClassName="w-full h-full object-cover"
      />

      <div className="absolute inset-4 border border-brand-secondary/20 group-hover:border-brand-secondary/40 transition-colors duration-500 pointer-events-none z-[5]"></div>

      {/* Dark Overlay (Gradient like image) */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/80 via-transparent to-transparent opacity-40 group-hover:opacity-70 transition-opacity duration-500" />

      {/* Hover Shop Now Button */}
      <div className="absolute inset-0 flex items-center justify-center translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-10">
        <button className="bg-white text-brand-primary px-8 py-3 rounded-none text-xs font-bold shadow-xl hover:bg-[#C89B3C] hover:text-white transition-colors">
          Shop Now
        </button>
      </div>

      {/* Product Tag (Optional, minimal) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center w-full px-4">
        <p className="text-xs text-white/40 font-medium truncate group-hover:text-[#C89B3C] transition-colors">
          {product.name}
        </p>
      </div>
    </motion.div>
  );
};

export default function FeaturedCollection() {
  const products = useSelector((state) => state.products.items);
  const navigate = useNavigate();

  const collectionBars = [
    {
      title: "Men's Collection",
      count: "120+ Products",
      iconUrl: "/men.png"
    },
    {
      title: "Women's Collection",
      count: "185+ Products",
      iconUrl: "/woman.png"
    },
    {
      title: "Unisex Exclusive",
      count: "45+ Products",
      iconUrl: "/unisex.png"
    }
  ];

  return (
    <section id="featured-collection" className="py-12 bg-brand-cream border-t border-brand-secondary/10">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-4 mb-4"
          >
            <div className="w-8 h-[1px] bg-brand-secondary/30"></div>
            <span className="text-xs sm:text-sm font-bold text-[#C89B3C] block transition-all tracking-[0.5em] uppercase">
              Precious Scents
            </span>
            <div className="w-8 h-[1px] bg-brand-secondary/30"></div>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="uppercase mb-4"
          >
            DISCOVER FEATURED COLLECTION
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="max-w-[750px] mx-auto text-brand-primary/60 text-sm md:text-base leading-relaxed tracking-wide"
          >
            Discover our signature scents crafted with elegance, sophistication and timeless allure. Every bottle tells a unique story of artisanal mastery.
          </motion.p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16 mb-16">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>


        {/* Bottom Category Bars */}
        <div className="flex flex-col md:flex-row gap-4">
          {collectionBars.map((bar, idx) => (
            <motion.div
              key={bar.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              onClick={() => navigate('/shop')}
              className="flex-1 bg-white p-8 flex items-center justify-between group hover:bg-brand-primary hover:text-white transition-all duration-300 border border-brand-secondary/10 shadow-sm cursor-pointer"
            >
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 flex items-center justify-center bg-brand-primary/5 group-hover:bg-white/20 transition-all duration-500">
                  <SkeletonImage
                    src={bar.iconUrl}
                    alt={bar.title}
                    wrapperClassName="w-8 h-8"
                    imageClassName="w-8 h-8 object-contain group-hover:brightness-0 group-hover:invert transition-all duration-500"
                    style={{ filter: 'invert(63%) sepia(60%) saturate(500%) hue-rotate(5deg) brightness(95%) contrast(90%)' }}
                    onMouseEnter={e => e.currentTarget.style.filter = 'brightness(0) invert(1)'}
                    onMouseLeave={e => e.currentTarget.style.filter = 'invert(63%) sepia(60%) saturate(500%) hue-rotate(5deg) brightness(95%) contrast(90%)'}
                  />
                </div>
                <div className="text-left">
                  <h3 className="text-xl md:text-2xl group-hover:text-white transition-all uppercase tracking-tight">{bar.title}</h3>
                  <p className="text-[10px] text-brand-primary/40 group-hover:text-white/60 font-bold mt-1 uppercase tracking-widest">{bar.count}</p>
                </div>
              </div>
              <button className="w-12 h-12 rounded-none border border-brand-secondary/20 group-hover:border-white/50 flex items-center justify-center text-[#C89B3C] group-hover:text-white transition-all duration-500 transform group-hover:rotate-45 bg-[#C89B3C]/5 group-hover:bg-transparent">
                <ArrowRight size={20} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
