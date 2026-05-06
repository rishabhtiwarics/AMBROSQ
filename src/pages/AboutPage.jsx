import React, { useState, useEffect } from 'react';
import HeroBanner from '../components/common/HeroBanner';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Truck, Tag, Headphones } from 'lucide-react';

/* ─── Countdown Timer Helper ─────────────────────────────────────────────── */
function useCountdown(targetDate) {
  const calc = () => {
    const diff = Math.max(0, targetDate - Date.now());
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      mins: Math.floor((diff / (1000 * 60)) % 60),
      secs: Math.floor((diff / 1000) % 60),
    };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

/* ─── Parallax Section Component ─────────────────────────────────────────── */
function ParallaxCountdownSection() {
  // Target: 215 days from today as an example limited edition drop
  const target = Date.now() + 215 * 24 * 60 * 60 * 1000;
  const { days, hours, mins, secs } = useCountdown(target);

  const units = [
    { value: String(days).padStart(3, '0'), label: 'Days' },
    { value: String(hours).padStart(2, '0'), label: 'Hours' },
    { value: String(mins).padStart(2, '0'), label: 'Mins' },
    { value: String(secs).padStart(2, '0'), label: 'Secs' },
  ];

  return (
    <section
      className="relative w-full overflow-hidden group"
      style={{
        minHeight: '340px',
        backgroundImage: `url("https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=1800&q=85&auto=format&fit=crop")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundColor: '#0a0a0a',
      }}
    >
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/55" />
      {/* Gold shimmer strip at top */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C89B3C] to-transparent opacity-70" />
      {/* Gold shimmer strip at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C89B3C] to-transparent opacity-70" />
      {/* Border Overlay */}
      <div className="absolute inset-4 border border-brand-secondary/20 group-hover:border-brand-secondary/40 transition-colors duration-500 pointer-events-none"></div>

      {/* ── Content ── */}
      <div className="relative z-10 container mx-auto px-4 md:px-8 py-24 md:py-32 flex flex-col lg:flex-row items-center justify-between gap-12">

        {/* LEFT — Label + Headline + CTA */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
          className="text-left max-w-xl"
        >
          {/* Eyebrow label */}
          <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#C89B3C] mb-4 flex items-center gap-3">
            <span className="block w-8 h-[1px] bg-[#C89B3C]" />
            Best Deals of the Week!
          </p>

          {/* Main Headline */}
          <h2
            className="font-serif font-semibold text-white leading-[1.1] mb-6 uppercase"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', letterSpacing: '0.02em' }}
          >
            Hurry! Time Is Running Out<br />
            <span className="italic text-[#C89B3C]">Buy Before It's Gone.</span>
          </h2>

          {/* Divider */}
          <div className="w-16 h-[1px] bg-[#C89B3C]/50 mb-8" />

          {/* CTA Button */}
          <a
            href="/shop"
            className="inline-flex items-center gap-3 bg-[#C89B3C] text-white px-10 py-4 text-[10px] font-bold uppercase tracking-[0.5em] hover:bg-white hover:text-[#0D0D0D] transition-all duration-300 shadow-[0_8px_30px_rgba(200,155,60,0.35)] group"
          >
            Shop Now
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="group-hover:translate-x-1 transition-transform">
              <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </motion.div>

        {/* RIGHT — Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1], delay: 0.15 }}
          className="flex items-center gap-4 md:gap-6 lg:gap-8 flex-shrink-0"
        >
          {units.map(({ value, label }, i) => (
            <React.Fragment key={label}>
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.08 }}
              >
                <div
                  className="font-serif font-semibold text-white tabular-nums leading-none mb-2"
                  style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', letterSpacing: '-0.02em' }}
                >
                  {value}
                </div>
                <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#C89B3C]">
                  {label}
                </p>
              </motion.div>
              {i < units.length - 1 && (
                <span
                  className="font-serif text-[#C89B3C] self-start mt-2 select-none"
                  style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}
                >
                  :
                </span>
              )}
            </React.Fragment>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

const AboutPage = () => {
  const aboutBreadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'About', active: true }
  ];

  return (
    <>
      <HeroBanner
        title="Our Story"
        description="Born from a passion for olfactory excellence, AMBROSQ is a tribute to the timeless art of high perfumery."
        breadcrumbItems={aboutBreadcrumbs}
      />

      {/* ── Narrative Section — The Vision ── */}
      <section className="py-24 md:py-32 px-4 md:px-8">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row gap-16 xl:gap-24 items-center">

            {/* ── LEFT — Two Overlapping Image Cards ── */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
              className="w-full lg:w-1/2 relative flex-shrink-0"
              style={{ minHeight: '420px' }}
            >
              {/* Gold corner bracket — top left */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-brand-secondary z-20" />

              {/* BACK card — larger, shifted left */}
              <div className="absolute top-0 left-0 w-[62%] aspect-[3/4] bg-brand-cream border border-brand-secondary/20 overflow-hidden shadow-xl group">
                <img
                  src="/VisibleSensesswiper/Gemini_Generated_Image_ (18).png"
                  alt="Heritage Perfume"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/10" />
                {/* Inner Border Overlay */}
                <div className="absolute inset-4 border border-brand-secondary/20 group-hover:border-brand-secondary/40 transition-colors duration-500"></div>
              </div>

              {/* FRONT card — smaller, shifted right & down */}
              <div
                className="absolute w-[55%] aspect-[3/4] bg-brand-cream border border-brand-secondary/20 overflow-hidden shadow-2xl group"
                style={{ right: 0, bottom: 0 }}
              >
                <img
                  src="/VisibleSensesswiper/Gemini_Generated_Image_ (16).png"
                  alt="Collection Perfume"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/10" />
                {/* Inner Border Overlay */}
                <div className="absolute inset-4 border border-brand-secondary/20 group-hover:border-brand-secondary/40 transition-colors duration-500"></div>
              </div>



              {/* Spacer so the section has proper height */}
              <div style={{ paddingBottom: '95%' }} />
            </motion.div>

            {/* ── RIGHT — Text Content ── */}
            <div className="w-full lg:w-1/2 text-left space-y-7">

              {/* Eyebrow */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-[10px] font-bold uppercase tracking-[0.5em] text-brand-secondary flex items-center gap-3"
              >
                <span className="block w-8 h-[1px] bg-brand-secondary" />
                Our Heritage · Est. 2024
              </motion.p>

              {/* Mixed-weight Heading */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                <h2 className="heading-serif text-brand-primary leading-[1.05] uppercase tracking-tight" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)' }}>
                  The Vision Behind
                </h2>
                <h2 className="heading-serif leading-[1.05]" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)' }}>
                  <span className="italic text-brand-secondary" style={{ fontStyle: 'italic', textTransform: 'none' }}>Scent&nbsp;</span>
                  <span className="text-brand-primary uppercase tracking-tight">Artistry</span>
                </h2>
              </motion.div>

              {/* Divider */}
              <div className="w-16 h-[2px] bg-brand-secondary" />

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-4 text-brand-dark/70 leading-relaxed"
              >
                <p className="text-sm md:text-base font-medium">
                  Find your signature scent today and enjoy our curated luxury fragrances — from delicate florals to deep oriental accords.
                </p>
                <p className="text-sm text-brand-dark/55">
                  Our journey began with a single mission: to redefine the boundary between raw nature and refined art. We source the world's most elusive botanical extractions to create olfactory masterpieces that resonate with the soul.
                </p>
              </motion.div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-3 bg-brand-primary text-white px-10 py-4 text-[10px] font-bold uppercase tracking-[0.5em] hover:bg-brand-secondary transition-all duration-300 shadow-lg group"
                >
                  Explore Now
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="group-hover:translate-x-1 transition-transform">
                    <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </motion.div>

              {/* Stats Row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="flex items-center gap-10 pt-6 border-t border-brand-secondary/15"
              >
                {[
                  { value: '200+', label: 'Fragrances' },
                  { value: '50+', label: 'Luxury Brands' },
                  { value: '20%', label: 'Off Today' },
                ].map(({ value, label }) => (
                  <div key={label} className="text-left">
                    <p className="font-serif font-semibold text-brand-primary" style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.8rem)' }}>{value}</p>
                    <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-brand-dark/50 mt-0.5">{label}</p>
                  </div>
                ))}
              </motion.div>

            </div>
          </div>
        </div>
      </section>

      {/* ── Parallax Countdown Deal Banner ── */}
      <ParallaxCountdownSection />

      {/* ── About Our Services Section ── */}
      <section className="py-24 md:py-32 px-4 md:px-8">
        <div className="container mx-auto">

          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-2xl mx-auto mb-16 md:mb-20 space-y-5"
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-brand-secondary flex items-center justify-center gap-3">
              <span className="block w-8 h-[1px] bg-brand-secondary" />
              What We Offer
              <span className="block w-8 h-[1px] bg-brand-secondary" />
            </p>
            <h2 className="text-4xl md:text-5xl heading-serif text-brand-primary leading-tight uppercase tracking-tight">
              About Our <span className="italic text-brand-secondary">Services</span>
            </h2>
            <p className="text-sm text-brand-dark/60 leading-relaxed font-medium max-w-xl mx-auto">
              Our collection is a journey through scents that capture the essence of human experiences and personal narratives.
            </p>
            <div className="w-20 h-[1px] bg-brand-secondary/40 mx-auto" />
          </motion.div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">

            {/* Card 1 — Fast Delivery */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="group relative bg-white border border-brand-secondary/15 p-10 shadow-sm hover:shadow-[0_20px_60px_rgba(200,155,60,0.12)] hover:-translate-y-2 transition-all duration-500 overflow-hidden"
            >
              {/* Top gold accent line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-secondary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              {/* BG watermark number */}
              <span className="absolute -right-4 -top-4 text-[6rem] font-serif font-bold text-brand-secondary/5 leading-none select-none">01</span>

              <div className="relative z-10 space-y-5">
                <div className="w-14 h-14 bg-brand-secondary/10 border border-brand-secondary/20 flex items-center justify-center group-hover:bg-brand-secondary transition-colors duration-400">
                  <Truck size={24} className="text-brand-secondary group-hover:text-white transition-colors duration-400" />
                </div>
                <h3 className="text-xl heading-serif text-brand-primary font-semibold tracking-wide">Fast Delivery</h3>
                <div className="w-8 h-[1px] bg-brand-secondary/50" />
                <p className="text-sm text-brand-dark/60 leading-relaxed font-medium">
                  The specific delivery time will vary depending on the shipping address and selected delivery option. Customers can track their order online to see the estimated delivery date.
                </p>
              </div>
            </motion.div>

            {/* Card 2 — Many Offers */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="group relative bg-brand-primary border border-brand-secondary/20 p-10 shadow-sm hover:shadow-[0_20px_60px_rgba(200,155,60,0.2)] hover:-translate-y-2 transition-all duration-500 overflow-hidden"
            >
              {/* Top gold accent line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-secondary to-transparent" />
              {/* BG watermark number */}
              <span className="absolute -right-4 -top-4 text-[6rem] font-serif font-bold text-brand-secondary/10 leading-none select-none">02</span>

              <div className="relative z-10 space-y-5">
                <div className="w-14 h-14 bg-brand-secondary flex items-center justify-center">
                  <Tag size={24} className="text-white" />
                </div>
                <h3 className="text-xl heading-serif text-white font-semibold tracking-wide">Many Offers</h3>
                <div className="w-8 h-[1px] bg-brand-secondary/70" />
                <p className="text-sm text-white/60 leading-relaxed font-medium">
                  We offer a variety of exclusive deals and curated bundles to help you explore the world of luxury fragrance — from seasonal collections to member-only rewards.
                </p>
              </div>
            </motion.div>

            {/* Card 3 — 24/7 Support */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="group relative bg-white border border-brand-secondary/15 p-10 shadow-sm hover:shadow-[0_20px_60px_rgba(200,155,60,0.12)] hover:-translate-y-2 transition-all duration-500 overflow-hidden"
            >
              {/* Top gold accent line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-secondary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              {/* BG watermark number */}
              <span className="absolute -right-4 -top-4 text-[6rem] font-serif font-bold text-brand-secondary/5 leading-none select-none">03</span>

              <div className="relative z-10 space-y-5">
                <div className="w-14 h-14 bg-brand-secondary/10 border border-brand-secondary/20 flex items-center justify-center group-hover:bg-brand-secondary transition-colors duration-400">
                  <Headphones size={24} className="text-brand-secondary group-hover:text-white transition-colors duration-400" />
                </div>
                <h3 className="text-xl heading-serif text-brand-primary font-semibold tracking-wide">24/7 Support</h3>
                <div className="w-8 h-[1px] bg-brand-secondary/50" />
                <p className="text-sm text-brand-dark/60 leading-relaxed font-medium">
                  Our concierge support is available 24 hours a day, 7 days a week. Reach us by phone, email, or live chat — we're here whenever you need us.
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>


    </>
  );
};

export default AboutPage;
