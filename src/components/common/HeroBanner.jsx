import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

const HeroBanner = ({
  title,
  description,
  bgImage = "/VisibleSensesswiper/Gemini_Generated_Image_ (17).png",
  breadcrumbItems = []
}) => {
  return (
    <section className="relative w-full h-[300px] md:h-[450px] flex items-center justify-center overflow-hidden border-b border-brand-secondary/10 group">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={bgImage}
          alt={title}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        {/* Subtle Light-Dark Overlay for maximum visibility */}
        <div className="absolute inset-0 bg-black/25"></div>
      </div>

      <div className="absolute inset-x-0 bottom-4 md:bottom-5 z-10 px-4 md:px-8">
        <div className="container mx-auto">
          {/* Breadcrumb Navigation - Optimized for Mobile */}
          {breadcrumbItems.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-center gap-3 mb-4 md:mb-5 text-[9px] md:text-xs font-bold uppercase tracking-[0.3em] text-white/80 relative z-20"
            >
              {breadcrumbItems.map((item, index) => (
                <React.Fragment key={item.name}>
                  {item.href ? (
                    <Link to={item.href} className="hover:text-[#C89B3C] transition-colors">
                      {item.name}
                    </Link>
                  ) : (
                    <span className={`text-[#C89B3C] ${item.active ? 'border-b border-[#C89B3C]/40 pb-0.5' : ''}`}>
                      {item.name}
                    </span>
                  )}
                  {index < breadcrumbItems.length - 1 && (
                    <span className="text-[#C89B3C]/40">/</span>
                  )}
                </React.Fragment>
              ))}
            </motion.div>
          )}

          {/* Glass Effect Content Panel - Responsive Padding */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="w-full bg-white/5 backdrop-blur-md border border-white/10 py-4 md:py-6 px-4 md:px-6 text-center space-y-3 md:space-y-4 overflow-hidden relative"
          >
            {/* Decorative Watermarks in Varied Positions (Organic Rhythm) */}
            <div className="absolute -top-16 -right-12 opacity-[0.5] pointer-events-none rotate-12">
              <svg width="280" height="280" viewBox="0 0 200 200" fill="currentColor" className="text-brand-secondary">
                <path d="M100 20C110 40 140 50 140 70C140 90 110 100 100 120C90 100 60 90 60 70C60 50 90 40 100 20Z"></path>
              </svg>
            </div>
            <div className="absolute -top-8 -left-20 opacity-[0.5] pointer-events-none -rotate-[15deg]">
              <svg width="240" height="240" viewBox="0 0 200 200" fill="currentColor" className="text-brand-secondary">
                <path d="M100 20C110 40 140 50 140 70C140 90 110 100 100 120C90 100 60 90 60 70C60 50 90 40 100 20Z"></path>
              </svg>
            </div>
            <div className="absolute -bottom-20 -right-10 opacity-[0.5] pointer-events-none -rotate-[20deg]">
              <svg width="260" height="260" viewBox="0 0 200 200" fill="currentColor" className="text-brand-secondary">
                <path d="M100 20C110 40 140 50 140 70C140 90 110 100 100 120C90 100 60 90 60 70C60 50 90 40 100 20Z"></path>
              </svg>
            </div>
            <div className="absolute -bottom-10 -left-16 opacity-[0.5] pointer-events-none rotate-[25deg]">
              <svg width="300" height="300" viewBox="0 0 200 200" fill="currentColor" className="text-brand-secondary">
                <path d="M100 20C110 40 140 50 140 70C140 90 110 100 100 120C90 100 60 90 60 70C60 50 90 40 100 20Z"></path>
              </svg>
            </div>
            <div className="flex flex-col items-center gap-2 md:gap-3 relative z-20">
              <h1 className="text-white text-2xl md:text-5xl heading-serif leading-tight uppercase tracking-tight">
                {title}
              </h1>

              <div className="w-12 md:w-16 h-[1px] bg-[#C89B3C]/40" />

              {description && (
                <p className="text-[10px] md:text-sm text-white/90 leading-relaxed font-medium max-w-xl mx-auto line-clamp-2 md:line-clamp-none">
                  {description}
                </p>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;

