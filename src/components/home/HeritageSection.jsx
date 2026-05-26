import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import SkeletonImage from '../common/SkeletonImage';

export default function HeritageSection() {
  return (
    <section id="heritage-section" className="w-full relative py-24 overflow-hidden bg-brand-primary border-y border-brand-secondary/10">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 opacity-[0.05] pointer-events-none transform translate-x-1/4 -translate-y-1/4">
        <svg width="600" height="600" viewBox="0 0 200 200" fill="currentColor" className="text-brand-secondary">
          <path d="M100 20C110 40 140 50 140 70C140 90 110 100 100 120C90 100 60 90 60 70C60 50 90 40 100 20Z" />
        </svg>
      </div>

      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-center gap-16 xl:gap-24">
          
          {/* Image Block with Luxury Frame */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-full md:w-1/2 relative group"
          >
            <div className="relative aspect-[4/5] overflow-hidden border-b-2 border-transparent group-hover:border-b-[#C89B3C] transition-all duration-500">
              <SkeletonImage
                src="https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1000&auto=format&fit=crop"
                alt="Heritage Mastery"
                loading="lazy"
                wrapperClassName="w-full h-full transition-transform duration-700 group-hover:scale-105"
                imageClassName="w-full h-full object-cover"
              />
              {/* Signature Inner Border */}
              <div className="absolute inset-6 border border-brand-secondary/30 group-hover:border-brand-secondary transition-colors duration-500 pointer-events-none z-10"></div>
              {/* Subtle Gradient */}
              <div className="absolute inset-0 bg-brand-primary/10 group-hover:bg-transparent transition-colors duration-500"></div>
            </div>
            
            {/* Floating Accent Card */}
            <div className="absolute -bottom-8 -right-8 bg-white p-8 hidden lg:block shadow-2xl border-l-4 border-brand-secondary max-w-[240px]">
              <Sparkles className="text-brand-secondary mb-4" size={20} />
              <p className="text-brand-dark/60 text-xs leading-relaxed font-medium">
                Gathered by hand, extracted by heart.
              </p>
            </div>
          </motion.div>

          {/* Text Content Block */}
          <div className="w-full md:w-1/2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-2"
            >
              <span className="text-[#C89B3C] text-xs font-bold block tracking-[0.6em] uppercase">Our Heritage</span>
              <h2 className="text-4xl md:text-5xl lg:text-[56px] heading-serif text-white font-bold leading-[1.1] tracking-tight">
                THE ART OF <br />
                <span className="text-[#C89B3C] font-medium tracking-normal">Scent Mastery</span>
              </h2>
              <div className="w-20 h-[1px] bg-brand-secondary/30"></div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <p className="text-white/70 text-base md:text-lg leading-relaxed font-light font-sans max-w-xl">
                From the misty valleys of Grasse to the golden sands of the East, we traverse the globe to source the rarest botanicals and resins. Each bottle is a symphony of time, patience, and absolute dedication to the craft of fine perfumery.
              </p>

              <div className="grid grid-cols-2 gap-8 py-8 border-y border-brand-secondary/10">
                <div className="space-y-2">
                  <h4 className="text-brand-secondary text-xs font-bold">Handmade</h4>
                  <p className="text-white/50 text-[10px]">Artisanal Small Batches</p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-brand-secondary text-xs font-bold">Pure Essence</h4>
                  <p className="text-white/50 text-[10px]">100% Rare Ingredients</p>
                </div>
              </div>

              <button className="px-10 py-5 bg-white text-brand-primary text-xs font-bold transition-all duration-500 cursor-pointer shadow-xl">
                Learn More
              </button>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
