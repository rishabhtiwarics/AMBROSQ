import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

/**
 * GlassmorphicBreadcrumbs Component
 * @param {Array} items - Array of objects { name: string, href?: string, active?: boolean }
 */
const GlassmorphicBreadcrumbs = ({ items }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="w-full bg-white/40 backdrop-blur-xl border border-brand-secondary/10 py-6 md:py-8 px-6 md:px-10 text-center relative overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.03)]"
    >
      {/* Decorative Watermarks - Highly subtle etched effect */}
      <div className="absolute -top-12 -right-12 opacity-[0.07] pointer-events-none rotate-12 scale-150">
        <svg width="200" height="200" viewBox="0 0 200 200" fill="currentColor" className="text-brand-secondary">
          <path d="M100 20C110 40 140 50 140 70C140 90 110 100 100 120C90 100 60 90 60 70C60 50 90 40 100 20Z"></path>
        </svg>
      </div>
      <div className="absolute -bottom-16 -left-16 opacity-[0.07] pointer-events-none -rotate-[15deg] scale-150">
        <svg width="200" height="200" viewBox="0 0 200 200" fill="currentColor" className="text-brand-secondary">
          <path d="M100 20C110 40 140 50 140 70C140 90 110 100 100 120C90 100 60 90 60 70C60 50 90 40 100 20Z"></path>
        </svg>
      </div>

      <div className="flex items-center justify-center gap-4 text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] relative z-20">
        {items.map((item, index) => (
          <React.Fragment key={item.name}>
            {item.href ? (
              <Link to={item.href} className="text-brand-dark/40 hover:text-brand-secondary transition-colors duration-300">
                {item.name}
              </Link>
            ) : (
              <span className="text-brand-secondary border-b border-brand-secondary/30 pb-1">
                {item.name}
              </span>
            )}
            {index < items.length - 1 && (
              <span className="text-brand-secondary/20">/</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </motion.div>
  );
};

export default GlassmorphicBreadcrumbs;
