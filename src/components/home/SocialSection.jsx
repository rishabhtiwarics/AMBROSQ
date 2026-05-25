import { motion } from 'motion/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';

const instagramImages = [
  "/product_images/ambrosq1.png",
  "/product_images/ambrosq2.png",
  "/product_images/ambrosq3.png",
  "/product_images/ambrosq4.png",
  "/product_images/ambrosq5.png",
  "/product_images/ambrosq6.png",
  "/product_images/ambrosq7.png",
  "/product_images/ambrosq8.png",
  "/product_images/ambrosq1.png",
  "/product_images/ambrosq2.png"
];

export default function SocialSection() {
  return (
    <section id="social-section" className="w-full relative pt-24 mt-12 bg-white border-t border-brand-secondary/10 overflow-hidden">
      {/* Header Row */}
      <div className="container mx-auto px-4 md:px-8 text-center mb-16">
        <div className="text-center">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-4 mb-4"
          >
            <div className="w-8 h-[1px] bg-brand-secondary/30"></div>
            <span className="text-[10px] md:text-xs font-bold text-brand-secondary block transition-all tracking-[0.5em] uppercase">
              Insta Shop
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
            Tag Us on Instagram
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="max-w-[750px] mx-auto text-brand-dark/70 text-sm md:text-base leading-relaxed"
          >
            Share your moments with our collection and join the #EclatDor community for exclusive drops and aesthetic inspiration.
          </motion.p>
        </div>
      </div>

      {/* Swiper Auto Play Row */}
      <div className="w-full">
        <Swiper
          modules={[Autoplay, FreeMode]}
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          freeMode={true}
          speed={6000}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          allowTouchMove={false}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            },
            1440: {
              slidesPerView: 5,
            },
          }}
          className="w-full"
        >
          {instagramImages.map((img, i) => (
            <SwiperSlide key={i}>
              <div 
                className="relative group w-full aspect-square cursor-pointer overflow-hidden"
              >
                <img 
                  src={img} 
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 transform-gpu will-change-transform scale-[1.01]" 
                  alt={`Social moment ${i}`} 
                  referrerPolicy="no-referrer"
                />

                <div className="absolute inset-4 border border-brand-secondary/20 group-hover:border-brand-secondary/40 transition-colors duration-500 pointer-events-none z-[5]"></div>

                {/* Theme Underline */}
                <div className="absolute bottom-0 left-0 w-full h-[4px] bg-gradient-to-r from-transparent via-brand-secondary/40 to-transparent z-[5]"></div>
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-brand-primary/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center p-6">
                  {/* Subtle Insta Icon */}
                  <div className="mb-4 text-white opacity-40">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                  </div>
                  <motion.button 
                    initial={{ y: 20, opacity: 0 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-brand-dark px-8 py-3 text-[10px] font-bold transform translate-y-4 group-hover:translate-y-0 transition-all duration-500"
                  >
                    Shop Now
                  </motion.button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
