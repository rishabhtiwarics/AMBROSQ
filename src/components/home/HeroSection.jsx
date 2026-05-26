import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';


export default function Hero() {
  const navigate = useNavigate();

  const slides = [
    {
      id: 1,
      video: "/hero-video.mp4",
      subtitle: "Exclusive Collection",
      title: ["Crafting", "Timeless", "essence"],
      description: "Discover the finest fragrances crafted from rare ingredients, where elegance meets artistry.",
    },
    {
      id: 2,
      video: "/hero-video.mp4",
      subtitle: "The Art of Scent",
      title: ["Bespoke", "Luxury", "fragrance"],
      description: "Experience the luxury of hand-picked botanicals and rare essences from around the world.",
    },
    {
      id: 3,
      video: "/hero-video.mp4",
      subtitle: "Heritage Collection",
      title: ["Defining", "Modern", "elegance"],
      description: "A symphony of notes designed to evoke emotion and define your personal style.",
    }
  ];

  return (
    <section id="hero-section" className="relative h-auto min-h-[600px] md:h-[700px] w-full overflow-hidden bg-brand-cream">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        speed={1500}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          el: '.custom-swiper-pagination',
        }}
        loop={true}
        className="h-full w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="flex flex-col md:flex-row h-full w-full min-h-[600px] md:h-[700px]">

              {/* Video Side (60%) */}
              <div className="relative w-full md:w-[60%] h-[300px] md:h-full overflow-hidden">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className="absolute inset-0 w-full h-full object-cover"
                >
                  <source src={slide.video} type="video/mp4" />
                </video>
                {/* Overlay to soften video if needed */}
                <div className="absolute inset-0 bg-black/5"></div>
              </div>

              {/* Text Content Area (40%) */}
              <div className="relative w-full md:w-[40%] py-12 md:py-0 md:h-full flex flex-col items-center justify-center p-6 md:p-12 lg:p-16 bg-brand-cream overflow-hidden">

                {/* Background Accents SVG */}
                <div className="absolute -top-10 -right-10 opacity-[0.08] pointer-events-none rotate-12 transition-transform duration-1000">
                  <svg width="450" height="450" viewBox="0 0 200 200" fill="currentColor" className="text-brand-secondary">
                    <path d="M100 20C110 40 140 50 140 70C140 90 110 100 100 120C90 100 60 90 60 70C60 50 90 40 100 20Z"></path>
                  </svg>
                </div>
                <div className="absolute -bottom-20 -left-20 opacity-[0.05] pointer-events-none -rotate-12 transition-transform duration-1000">
                  <svg width="400" height="400" viewBox="0 0 200 200" fill="currentColor" className="text-brand-secondary">
                    <path d="M100 20C110 40 140 50 140 70C140 90 110 100 100 120C90 100 60 90 60 70C60 50 90 40 100 20Z"></path>
                  </svg>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="text-center space-y-10 md:space-y-12 relative z-10 w-full"
                >
                  <div className="space-y-6 flex flex-col items-center">
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="flex items-center justify-center gap-4 mb-4"
                    >
                      <div className="w-8 h-[1px] bg-brand-secondary/30"></div>
                      <span className="text-xs sm:text-sm font-bold text-brand-secondary block tracking-[0.4em] uppercase">
                        {slide.subtitle}
                      </span>
                      <div className="w-8 h-[1px] bg-brand-secondary/30"></div>
                    </motion.div>

                    <h1 className="heading-serif text-brand-primary uppercase leading-[0.95] flex flex-col items-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
                      <span>{slide.title[0]}</span>
                      <span>{slide.title[1]}</span>
                      <span className="text-brand-secondary font-light lowercase">{slide.title[2]}</span>
                    </h1>

                    <div className="w-16 h-[1px] bg-brand-secondary/30"></div>

                    <p className="max-w-[280px] text-brand-primary/70 text-sm leading-relaxed text-center">
                      {slide.description}
                    </p>
                  </div>

                  <button
                    onClick={() => navigate('/shop')}
                    className="px-12 py-4 md:py-5 bg-[#9B8A45] text-white text-[10px] md:text-xs font-bold transition-all duration-500 hover:bg-brand-primary hover:text-white border-none cursor-pointer rounded-none shadow-xl mx-auto block w-fit"
                  >
                    Shop Now
                  </button>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Pagination Container */}
      <div className="custom-swiper-pagination absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2"></div>

      {/* Decorative Elements */}
      <div className="absolute bottom-10 left-12 hidden lg:flex items-center space-x-4 z-20">
        <div className="w-12 h-[1px] bg-brand-secondary/50"></div>
        <span className="text-[10px] text-brand-secondary font-bold">ESTD. 1924</span>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .custom-swiper-pagination .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: #9B8A45;
          opacity: 0.3;
          border-radius: 0;
          transition: all 0.3s ease;
        }
        .custom-swiper-pagination .swiper-pagination-bullet-active {
          width: 24px;
          opacity: 1;
        }
      `}} />
    </section>
  );
}
