import { useSelector } from 'react-redux';
import { motion } from 'motion/react';
import ProductCard from '../shop/ProductCard';
import { useNavigate } from 'react-router-dom';

export default function ProductShowcase() {
  const products = useSelector((state) => state.products.items);
  const navigate = useNavigate();

  return (
    <section id="product-showcase" className="py-24 bg-brand-cream/30 border-y border-brand-secondary/5">
      <div className="container mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-4 mb-4"
          >
            <div className="w-8 h-[1px] bg-brand-secondary/30"></div>
            <span className="text-[10px] md:text-xs font-bold text-[#C89B3C] block transition-all tracking-[0.5em] uppercase">
              Curated Essentials
            </span>
            <div className="w-8 h-[1px] bg-brand-secondary/30"></div>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="uppercase mb-4 tracking-tight"
          >
            The Beauty Collection
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="max-w-[750px] mx-auto text-brand-dark/70 text-sm md:text-base leading-relaxed"
          >
            Experience the pinnacle of skincare and beauty with our handpicked collection of rejuvenating essentials.
          </motion.p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Section Footer - View More */}
        <div className="mt-20 text-center">
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            onClick={() => navigate('/shop')}
            className="inline-flex items-center justify-center px-12 py-4 border border-brand-primary text-xs font-bold text-brand-dark hover:bg-brand-primary hover:text-white transition-all transform hover:-translate-y-1"
          >
            Explore The Full Boutique
          </motion.button>
        </div>
      </div>
    </section>
  );
}
