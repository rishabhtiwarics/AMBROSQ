import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const navigate = useNavigate();
  return (
    <section id="hero-section" className="relative h-auto min-h-[600px] md:h-[700px] w-full flex flex-col md:flex-row overflow-hidden">
      {/* Video Side (Left 60%) */}
      <div className="relative w-full md:w-[60%] h-[250px] md:h-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/src/assets/hero-video.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Text Content Area (Right 40%) */}
      <div className="relative w-full md:w-[40%] py-12 md:py-0 md:h-full flex flex-col items-center justify-center p-6 md:p-12 lg:p-16 bg-brand-cream overflow-hidden group flex-grow">

        {/* Background Accents SVG */}
        <div className="absolute -top-10 -right-10 opacity-[0.08] pointer-events-none transition-opacity duration-1000 rotate-12">
          <svg width="450" height="450" viewBox="0 0 200 200" fill="currentColor" className="text-brand-secondary">
            <path d="M100 20C110 40 140 50 140 70C140 90 110 100 100 120C90 100 60 90 60 70C60 50 90 40 100 20Z"></path>
          </svg>
        </div>
        <div className="absolute -bottom-20 -left-20 opacity-[0.05] pointer-events-none transition-opacity duration-1000 -rotate-12">
          <svg width="400" height="400" viewBox="0 0 200 200" fill="currentColor" className="text-brand-secondary">
            <path d="M100 20C110 40 140 50 140 70C140 90 110 100 100 120C90 100 60 90 60 70C60 50 90 40 100 20Z"></path>
          </svg>
        </div>



        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center space-y-10 md:space-y-12 relative z-10 w-full"
        >
          <div className="space-y-6 flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center justify-center gap-4 mb-4"
            >
              <div className="w-8 h-[1px] bg-brand-secondary/30"></div>
              <span className="text-xs sm:text-sm font-bold text-brand-secondary block transition-all tracking-[0.4em] uppercase">
                Exclusive Collection
              </span>
              <div className="w-8 h-[1px] bg-brand-secondary/30"></div>
            </motion.div>
            <h1 className="heading-serif text-brand-primary uppercase leading-[0.95] flex flex-col items-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
              <span>Crafting</span>
              <span>Timeless</span>
              <span className="text-brand-secondary font-light lowercase">essence</span>
            </h1>
            <div className="w-16 h-[1px] bg-brand-secondary/30"></div>
            <p className="max-w-[280px] text-brand-primary/70 text-sm leading-relaxed text-center">
              Discover the finest fragrances crafted from rare ingredients, where elegance meets artistry.
            </p>
          </div>

          <button 
            onClick={() => navigate('/shop')}
            className="px-12 py-4 md:py-5 bg-[#C89B3C] text-white text-[10px] md:text-xs font-bold transition-all duration-500 hover:bg-black hover:text-white border-none cursor-pointer rounded-none shadow-xl mx-auto block w-fit"
          >
            Shop Now
          </button>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-10 left-12 hidden lg:flex items-center space-x-4">
        <div className="w-12 h-[1px] bg-brand-secondary/50"></div>
        <span className="text-[10px] text-brand-secondary font-bold">ESTD. 1924</span>
      </div>
    </section>
  );
}





