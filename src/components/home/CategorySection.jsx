import { motion } from 'motion/react';
import { CATEGORIES } from '../../constants';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';


export default function CategorySection() {
  const navigate = useNavigate();
  return (
    <section id="category-section" className="py-24 bg-white overflow-hidden border-y border-brand-secondary/5">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-4 mb-4"
          >
            <div className="w-8 h-[1px] bg-brand-secondary/30"></div>
            <span className="text-xs sm:text-sm font-bold text-brand-secondary block transition-all tracking-[0.4em] uppercase">
              Discover Our Collections
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
            BROWSE BY CATEGORY
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="max-w-[750px] mx-auto text-brand-dark/70 text-sm md:text-base leading-relaxed"
          >
            Crafted for every mood and occasion, our collections are designed to evoke emotion and define your personal signature.
          </motion.p>
        </div>

        <Swiper
          modules={[Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={true}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
          className="category-swiper pb-12"
        >
          {CATEGORIES.map((cat, idx) => (
            <SwiperSlide key={cat.id}>
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                onClick={() => navigate('/shop')}
                className="relative w-full aspect-[4/5] overflow-hidden group cursor-pointer border-b-2 border-transparent hover:border-b-[#C89B3C] shadow-lg shadow-brand-secondary/10 hover:shadow-xl hover:shadow-brand-secondary/30 transition-all duration-500"
              >
                {/* Background Image */}
                <img 
                  src={cat.image} 
                  alt={cat.title} 
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[0.3] group-hover:grayscale-0"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                
                {/* Border Overlay */}
                <div className="absolute inset-4 border border-brand-secondary/20 group-hover:border-brand-secondary/40 transition-colors duration-500"></div>

                {/* Content — dark-glass panel */}
                <div className="absolute bottom-0 left-0 right-0 dark-glass px-5 py-4 space-y-1 transition-all duration-500 group-hover:bg-brand-primary/90">
                  <span className="block text-[10px] font-bold tracking-[0.3em] uppercase text-brand-secondary">
                    {cat.products}
                  </span>
                  <h3 className="text-brand-cream group-hover:text-brand-secondary transition-colors duration-300 leading-snug" style={{ fontSize: '1.2rem' }}>
                    {cat.title}
                  </h3>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-1 group-hover:translate-y-0">
                    <span className="text-[10px] tracking-widest uppercase text-brand-cream/70">Shop Collection</span>
                    <ArrowRight size={11} className="text-brand-secondary" />
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
