import { motion } from 'motion/react';
import { Sparkles, Flower2, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function FragranceExcellence() {
  const navigate = useNavigate();
  const images = [
    {
      name: "Rose Blossom",
      tagline: "A delicate floral heart and warm musk",
      src: "/fragranceexcellence/Gemini_Generated_Image_(6).png",
    },
    {
      name: "Noir Elixir",
      tagline: "Mysterious amber and deep woody notes",
      src: "/fragranceexcellence/Gemini_Generated_Image_.png",
    },
    {
      name: "Gold Essence",
      tagline: "Golden citric glow with precious resins",
      src: "/fragranceexcellence/Gemini_Generated_Image_ (12).png",
    }
  ];

  const infoCards = [
    {
      label: "HEART",
      title: "Peony Blossom",
      desc: "A soft and ethereal fragrance captured by the captivation of fresh blossoms.",
      icon: <Heart size={32} strokeWidth={1} />
    },
    {
      label: "BENEFITS",
      title: "Sophisticated Simplicity",
      desc: "An elegant and refined scent, blending classics for a harmonious delight in luxury perfume.",
      icon: <Sparkles size={32} strokeWidth={1} />
    },
    {
      label: "PROMISE",
      title: "Pure Luxury",
      desc: "A gentle and soothing fragrance delivering the tranquility of delicate botanicals and silk sensations.",
      icon: <Flower2 size={32} strokeWidth={1} />
    }
  ];

  return (
    <section id="fragrance-excellence-section" className="py-24 bg-brand-cream relative overflow-hidden">
      {/* Decorative Floral Background */}
      <div className="absolute right-0 top-1/4 opacity-[0.02] pointer-events-none -mr-32">
        <svg width="600" height="800" viewBox="0 0 200 200" fill="currentColor" className="text-brand-primary">
          <path d="M100 20C110 40 140 50 140 70C140 90 110 100 100 120C90 100 60 90 60 70C60 50 90 40 100 20Z" />
        </svg>
      </div>

      <div className="container mx-auto px-4 md:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-4 mb-4"
          >
            <div className="w-8 h-[1px] bg-brand-secondary/30"></div>
            <span className="text-xs sm:text-sm font-bold text-[#C89B3C] block transition-all tracking-[0.4em] uppercase">
              Fragrance About Our Brand
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
            Fragrance Excellence
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="max-w-[750px] mx-auto text-brand-dark/70 text-sm md:text-base leading-relaxed"
          >
            Blending rare ingredients from our heart, fragrance excellence is our dedication to making essences that speak for an individual, crafting unique perfumes as a gift for a loved one.
          </motion.p>
        </div>

        {/* 3x2 Checkerboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full border border-brand-secondary/5 bg-brand-cream/10 shadow-2xl shadow-brand-secondary/10">
          
          {/* Card 1: Image Card with Hover */}
          <div 
            onClick={() => navigate('/shop')}
            className="relative aspect-square group overflow-hidden bg-brand-cream border-r border-b border-brand-secondary/5 border-b-2 border-transparent hover:border-b-[#C89B3C] transition-all duration-500 cursor-pointer"
          >
            <img 
              src={images[0].src} 
              alt={images[0].name} 
              loading="lazy"
              className="w-full h-full object-cover transition-all duration-[0.4s] ease-out group-hover:scale-110"
            />
            {/* Inner Border Overlay */}
            <div className="absolute inset-4 border border-brand-secondary/20 group-hover:border-brand-secondary/40 transition-colors duration-500 pointer-events-none z-[5]"></div>
            <div 
              className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center translate-y-full group-hover:translate-y-0 transition-transform duration-[0.4s] ease-out z-10 bg-gradient-to-t from-brand-primary/95 via-brand-primary/80 to-transparent"
            >
              <div className="space-y-4 mb-8">
                <h3 className="text-white">{images[0].name}</h3>
                <p className="text-white/80 text-sm tracking-wide max-w-[200px]">{images[0].tagline}</p>
              </div>
              <button className="px-10 py-4 border border-brand-secondary text-brand-secondary text-xs font-bold transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-white hover:text-brand-dark">
                Shop Now
              </button>
            </div>
          </div>

          {/* Card 2: Info Card (Peony) */}
          <div className="relative aspect-square flex flex-col items-center justify-center p-12 text-center bg-white border-r border-b border-brand-secondary/5 transition-colors duration-500 group">
            <div className="absolute inset-4 border border-brand-secondary/20 group-hover:border-brand-secondary/40 transition-colors duration-500 pointer-events-none z-[5]"></div>
            <div className="text-brand-secondary mb-8 transform group-hover:scale-110 transition-transform duration-500 relative z-10">
              {infoCards[0].icon}
            </div>
            <span className="text-[10px] sm:text-xs font-bold text-brand-secondary mb-3 tracking-[0.5em] uppercase">{infoCards[0].label}</span>
            <h3 className="mb-4 uppercase tracking-tight">{infoCards[0].title}</h3>
            <p className="text-sm text-brand-dark/60 leading-relaxed max-w-xs">{infoCards[0].desc}</p>
          </div>

          {/* Card 3: Image Card with Hover */}
          <div 
            onClick={() => navigate('/shop')}
            className="relative aspect-square group overflow-hidden bg-brand-cream border-b border-brand-secondary/5 border-b-2 border-transparent hover:border-b-[#C89B3C] transition-all duration-500 cursor-pointer"
          >
            <img 
              src={images[1].src} 
              alt={images[1].name} 
              loading="lazy"
              className="w-full h-full object-cover transition-all duration-[0.4s] ease-out group-hover:scale-110"
            />
            {/* Inner Border Overlay */}
            <div className="absolute inset-4 border border-brand-secondary/20 group-hover:border-brand-secondary/40 transition-colors duration-500 pointer-events-none z-[5]"></div>
            <div 
              className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center translate-y-full group-hover:translate-y-0 transition-transform duration-[0.4s] ease-out z-10 bg-gradient-to-t from-brand-primary/95 via-brand-primary/80 to-transparent"
            >
              <div className="space-y-4 mb-8">
                <h3 className="text-white">{images[1].name}</h3>
                <p className="text-white/80 text-sm tracking-wide max-w-[200px]">{images[1].tagline}</p>
              </div>
              <button className="px-10 py-4 border border-brand-secondary text-brand-secondary text-xs font-bold uppercase tracking-[0.2em] transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-white hover:text-brand-dark">
                SHOP NOW
              </button>
            </div>
          </div>

          {/* Row 2, Col 1: Info Card (Sophisticated) */}
          <div className="relative aspect-square flex flex-col items-center justify-center p-12 text-center bg-white border-r border-brand-secondary/5 transition-colors duration-500 group md:order-4 lg:order-none">
            <div className="absolute inset-4 border border-brand-secondary/20 group-hover:border-brand-secondary/40 transition-colors duration-500 pointer-events-none z-[5]"></div>
            <div className="text-brand-secondary mb-8 transform group-hover:scale-110 transition-transform duration-500 relative z-10">
              {infoCards[1].icon}
            </div>
            <span className="text-[10px] sm:text-xs font-bold text-brand-secondary mb-3 tracking-[0.5em] uppercase">{infoCards[1].label}</span>
            <h3 className="mb-4 uppercase tracking-tight">{infoCards[1].title}</h3>
            <p className="text-sm text-brand-dark/60 leading-relaxed max-w-xs">{infoCards[1].desc}</p>
          </div>

          {/* Row 2, Col 2: Image Card with Hover */}
          <div 
            onClick={() => navigate('/shop')}
            className="relative aspect-square group overflow-hidden bg-brand-cream border-r border-brand-secondary/5 md:order-3 lg:order-none border-b-2 border-transparent hover:border-b-[#C89B3C] transition-all duration-500 cursor-pointer"
          >
            <img 
              src={images[2].src} 
              alt={images[2].name} 
              loading="lazy"
              className="w-full h-full object-cover transition-all duration-[0.4s] ease-out group-hover:scale-110"
            />
            {/* Inner Border Overlay */}
            <div className="absolute inset-4 border border-brand-secondary/20 group-hover:border-brand-secondary/40 transition-colors duration-500 pointer-events-none z-[5]"></div>
            <div 
              className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center translate-y-full group-hover:translate-y-0 transition-transform duration-[0.4s] ease-out z-10 bg-gradient-to-t from-brand-primary/95 via-brand-primary/80 to-transparent"
            >
              <div className="space-y-4 mb-8">
                <h3 className="text-white">{images[2].name}</h3>
                <p className="text-white/80 text-sm tracking-wide max-w-[200px]">{images[2].tagline}</p>
              </div>
              <button className="px-10 py-4 border border-brand-secondary text-brand-secondary text-sm font-bold uppercase tracking-[0.2em] transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-white hover:text-brand-dark">
                SHOP NOW
              </button>
            </div>
          </div>

          {/* Row 2, Col 3: Info Card (Promise) */}
          <div className="relative aspect-square flex flex-col items-center justify-center p-12 text-center bg-white md:order-5 lg:order-none transition-colors duration-500 group">
            <div className="absolute inset-4 border border-brand-secondary/20 group-hover:border-brand-secondary/40 transition-colors duration-500 pointer-events-none z-[5]"></div>
            <div className="text-brand-secondary mb-8 transform group-hover:scale-110 transition-transform duration-500 relative z-10">
              {infoCards[2].icon}
            </div>
            <span className="text-[10px] sm:text-xs font-bold text-brand-secondary mb-3 tracking-[0.5em] uppercase">{infoCards[2].label}</span>
            <h3 className="mb-4 uppercase tracking-tight">{infoCards[2].title}</h3>
            <p className="text-sm text-brand-dark/60 leading-relaxed max-w-xs">{infoCards[2].desc}</p>
          </div>

        </div>
      </div>
    </section>
  );
}
