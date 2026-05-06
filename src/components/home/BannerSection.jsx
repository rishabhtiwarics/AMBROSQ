import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';

const bannerImages = [
  "/VisibleSensesswiper/Gemini_Generated_Image_ (16).png",
  "/VisibleSensesswiper/Gemini_Generated_Image_ (17).png",
  "/VisibleSensesswiper/Gemini_Generated_Image_ (18).png",
  "/VisibleSensesswiper/Gemini_Generated_Image_ (16).png",
  "/VisibleSensesswiper/Gemini_Generated_Image_ (17).png",
  "/VisibleSensesswiper/Gemini_Generated_Image_ (18).png"
];

export default function BannerSection() {
  const navigate = useNavigate();
  return (
    <section id="fragrance-banner" className="w-full relative py-16 md:py-24 overflow-hidden border-y border-brand-secondary/10 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row h-auto md:h-[600px] overflow-hidden bg-brand-cream border border-[#C89B3C]/10 shadow-2xl relative">
          
          {/* Subtle Noise Texture Overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay z-0" 
               style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/natural-paper.png')` }}></div>

          {/* Left Side — Text Content (40%) */}
          <div className="w-full md:w-[40%] relative flex flex-col items-center justify-center p-12 md:p-20 text-center min-h-[450px] md:min-h-full border-r border-brand-secondary/10 bg-brand-cream z-10 group">
            <div className="absolute inset-4 border border-brand-secondary/20 group-hover:border-brand-secondary/40 transition-colors duration-500 pointer-events-none z-[5]"></div>
            <div className="absolute top-10 left-10 opacity-[0.05] pointer-events-none">
              <span className="text-[120px] font-serif font-light text-brand-primary leading-none">É</span>
            </div>

            <div className="relative space-y-6 w-full max-w-[380px]">
              <div className="space-y-3">
                <motion.div
                  initial={{ opacity: 0, letterSpacing: "0.2em" }}
                  whileInView={{ opacity: 1, letterSpacing: "0.4em" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                >
                  <span className="text-[#C89B3C] text-xs font-bold block transition-all tracking-[0.5em] uppercase">Prestige Collection</span>
                </motion.div>

                <h2 className="uppercase leading-[1.05] tracking-tight">
                  BEYOND THE <br />
                  <span className="text-brand-secondary font-light lowercase">Visible Senses</span>
                </h2>
                
                <div className="h-[1px] bg-brand-secondary/40 mx-auto w-12"></div>
              </div>
              
              <p className="max-w-[300px] mx-auto text-brand-primary/70 text-sm md:text-base leading-relaxed text-center">
                "Perfume is the indispensable complement to the personality, the finishing touch on an outfit."
              </p>

              <div className="pt-4">
                <button 
                  onClick={() => navigate('/shop')}
                  className="group relative overflow-hidden bg-brand-primary text-white py-5 px-12 rounded-none text-[10px] font-bold transition-all duration-500 cursor-pointer shadow-2xl"
                >
                  <span className="relative z-10">Explore Artistry</span>
                  <div className="absolute inset-0 bg-[#C89B3C] translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                </button>
              </div>
            </div>
          </div>

          {/* Right Side — Swiper Slider (60%) */}
          <div className="w-full md:w-[60%] relative h-[500px] md:h-full group overflow-hidden">
            <Swiper
              modules={[Autoplay, EffectFade, Navigation]}
              effect="fade"
              speed={1500}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              navigation={{
                prevEl: '.banner-prev',
                nextEl: '.banner-next',
              }}
              loop={true}
              className="w-full h-full"
            >
              {bannerImages.map((image, index) => (
                <SwiperSlide key={index}>
                  <div className="relative w-full h-full border-b-2 border-[#C89B3C]/20 group-hover:border-b-[#C89B3C] transition-all duration-500">
                    <img 
                      src={image} 
                      loading="lazy"
                      className="w-full h-full object-cover" 
                      alt={`Fragrance Atmosphere ${index + 1}`}
                    />
                    <div className="absolute inset-0 bg-[#C89B3C]/5"></div>
                    <div className="absolute inset-8 border border-[#C89B3C]/10 pointer-events-none"></div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Navigation Buttons - Bottom Right */}
            <div className="absolute bottom-8 right-8 z-20 flex gap-2">
              <button className="banner-prev w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-[#C89B3C] text-white transition-all duration-300 border border-[#C89B3C]/20 backdrop-blur-sm cursor-pointer active:scale-95">
                <ChevronLeft size={20} />
              </button>
              <button className="banner-next w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-[#C89B3C] text-white transition-all duration-300 border border-[#C89B3C]/20 backdrop-blur-sm cursor-pointer active:scale-95">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
