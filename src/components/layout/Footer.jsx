import { Instagram, Facebook, Twitter, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#050505] via-[#0a0a0a] to-[#1a1a1a] text-white py-14 md:py-20 border-t border-[#C89B3C]/40 relative overflow-hidden">
      {/* Background Decorative Accent */}
      <div className="absolute -bottom-20 -right-20 opacity-[0.15] pointer-events-none rotate-12 scale-150">
          <svg width="600" height="600" viewBox="0 0 200 200" fill="currentColor" className="text-[#C89B3C]">
            <path d="M100 20C110 40 140 50 140 70C140 90 110 100 100 120C90 100 60 90 60 70C60 50 90 40 100 20Z" />
          </svg>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 md:gap-20 mb-10 md:mb-16 text-center md:text-left">
          
          {/* Brand Column - Always Visible */}
          <div className="space-y-6 md:space-y-8 flex flex-col items-center md:items-start">
            <h3 className="text-[#C89B3C] font-serif text-3xl tracking-[0.25em] font-bold drop-shadow-sm">AMBROSQ</h3>
              <p className="text-white/80 text-sm leading-relaxed max-w-[280px] font-light">
              Crafting the essence of timeless luxury through artisanal perfumery since 1924.
            </p>
            <div className="flex gap-4">
              {[Instagram, Facebook, Twitter, Youtube].map((Icon, idx) => (
                <a key={idx} href="#" className="w-10 h-10 flex items-center justify-center border border-[#C89B3C]/40 text-[#C89B3C] hover:bg-[#C89B3C] hover:text-white transition-all duration-500 rounded-full shadow-lg shadow-black/20">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Column - Hidden on Mobile */}
          <div className="hidden md:flex flex-col items-center md:items-start">
            <h6 className="text-[#C89B3C] text-[11px] font-bold uppercase tracking-[0.4em] mb-6 md:mb-10 border-b border-[#C89B3C]/30 pb-3 inline-block">Navigation</h6>
            <ul className="space-y-4 md:space-y-5">
              {['Our Story', 'Contact Us', 'Retailers', 'Fragrance Care'].map(item => (
                <li key={item}>
                  <a href="#" className="text-white/70 hover:text-white transition-all duration-300 text-sm font-medium tracking-wide flex items-center gap-3 group">
                    <span className="hidden md:block w-2 h-[1px] bg-[#C89B3C]/50 group-hover:w-5 group-hover:bg-[#C89B3C] transition-all"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Collections Column - Hidden on Mobile */}
          <div className="hidden md:flex flex-col items-center md:items-start">
            <h6 className="text-[#C89B3C] text-[11px] font-bold uppercase tracking-[0.4em] mb-6 md:mb-10 border-b border-[#C89B3C]/30 pb-3 inline-block">Collections</h6>
            <ul className="space-y-4 md:space-y-5">
              {['Signature Noir', 'Golden Oud', 'Rose Garden', 'Limited Editions'].map(item => (
                <li key={item}>
                  <a href="#" className="text-white/70 hover:text-white transition-all duration-300 text-sm font-medium tracking-wide flex items-center gap-3 group">
                    <span className="hidden md:block w-2 h-[1px] bg-[#C89B3C]/50 group-hover:w-5 group-hover:bg-[#C89B3C] transition-all"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Column - Hidden on Mobile */}
          <div className="hidden md:flex flex-col items-center md:items-start space-y-8 md:space-y-10">
            <div className="w-full max-w-[280px] md:max-w-none">
              <h6 className="text-[#C89B3C] text-[11px] font-bold uppercase tracking-[0.4em] mb-6 md:mb-8 text-center md:text-left">Newsletter</h6>
              <p className="text-white/70 text-sm leading-relaxed font-light mb-8 text-center md:text-left">
                Join our exclusive circle for rare ingredient harvests.
              </p>
              <div className="flex border-b border-white/40 pb-4 group focus-within:border-[#C89B3C] transition-all relative">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="bg-transparent text-sm w-full focus:outline-none placeholder:text-white/30 text-white font-medium pr-12 text-center md:text-left"
                />
                <button className="text-[#C89B3C] font-bold text-xs uppercase tracking-widest hover:text-white transition-colors absolute right-0 top-0">JOIN</button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom - Always Visible */}
        <div className="pt-10 md:pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8">
          <p className="text-[10px] md:text-xs text-white/40 font-medium tracking-widest uppercase text-center md:text-left">
            © 2026 AMBROSQ International. All Rights Reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-6 md:gap-10 text-[10px] items-center tracking-[0.25em] uppercase font-bold">
              <a href="#" className="text-white/50 hover:text-[#C89B3C] transition-colors">Privacy Policy</a>
              <a href="#" className="text-white/50 hover:text-[#C89B3C] transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
