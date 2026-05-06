import React from 'react';
import HeroBanner from '../components/common/HeroBanner';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock } from 'lucide-react';

const ContactPage = () => {
  const contactBreadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Contact', active: true }
  ];

  return (
    <div className="bg-brand-cream/10 min-h-screen">
      <HeroBanner 
        title="Contact Us"
        description="Our concierge team is at your disposal for any inquiries regarding our collections or bespoke services."
        breadcrumbItems={contactBreadcrumbs}
      />

      <section className="py-24 md:py-32 px-4 md:px-8">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row gap-16 xl:gap-24">
            
            {/* ── Left Side: Contact Information ── */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full lg:w-1/2 space-y-12"
            >
              <div className="space-y-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-brand-secondary flex items-center gap-3">
                  <span className="block w-8 h-[1px] bg-brand-secondary" />
                  Get In Touch
                </p>
                <h2 className="text-4xl md:text-5xl heading-serif text-brand-primary leading-tight uppercase tracking-tight">
                  The <span className="italic text-brand-secondary">Concierge</span> Experience
                </h2>
                <p className="text-sm text-brand-dark/80 leading-relaxed font-medium max-w-lg">
                  Whether you seek guidance in finding your signature scent or have questions about an order, our experts are here to provide a seamless experience.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Contact Item: Email */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-brand-secondary">
                    <Mail size={18} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Email Us</span>
                  </div>
                  <p className="text-base font-serif text-brand-primary hover:text-brand-secondary transition-colors cursor-pointer">concierge@ambrosq.com</p>
                  <p className="text-xs text-brand-dark/70 italic">Inquiries answered within 24 hours.</p>
                </div>

                {/* Contact Item: Phone */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-brand-secondary">
                    <Phone size={18} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Call Us</span>
                  </div>
                  <p className="text-base font-serif text-brand-primary">+1 (800) AMBROSQ</p>
                  <p className="text-xs text-brand-dark/70 italic">Mon-Fri: 9am — 6pm EST</p>
                </div>

                {/* Contact Item: Address */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-brand-secondary">
                    <MapPin size={18} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Visit Us</span>
                  </div>
                  <p className="text-base font-serif text-brand-primary leading-relaxed">
                    742 Fifth Avenue,<br />
                    Manhattan, New York 10151
                  </p>
                </div>

                {/* Contact Item: Support */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-brand-secondary">
                    <Clock size={18} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Hours</span>
                  </div>
                  <p className="text-base font-serif text-brand-primary">Available 24/7</p>
                  <p className="text-xs text-brand-dark/70 italic">For urgent private consultation.</p>
                </div>
              </div>
            </motion.div>

            {/* ── Right Side: Contact Form (Modern Auth Look) ── */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full lg:w-1/2"
            >
              <div className="relative">
                {/* Decorative border accent */}
                <div className="absolute -top-4 -left-4 w-12 h-12 border-t border-l border-brand-secondary/30" />
                <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b border-r border-brand-secondary/30" />

                {/* Form Card */}
                <div className="bg-[#FAF9F6] border border-brand-secondary/20 shadow-2xl relative overflow-hidden group">
                  {/* Gold top line */}
                  <div className="h-[3px] bg-gradient-to-r from-transparent via-brand-secondary to-transparent" />
                  
                  <div className="p-8 md:p-12 space-y-8">
                    <div className="space-y-2">
                      <h3 className="text-2xl font-serif text-brand-primary font-light">Send a Message</h3>
                      <p className="text-sm text-brand-dark/70 font-light italic">Your journey to excellence starts here.</p>
                    </div>

                    <form className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-brand-dark/80 block">Full Name</label>
                          <input 
                            type="text" 
                            className="w-full bg-transparent border-b border-brand-secondary/30 py-3 text-sm focus:border-brand-secondary outline-none transition-colors font-serif placeholder:text-brand-dark/40 text-brand-primary"
                            placeholder="Alexandre Dumont"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-brand-dark/80 block">Email Address</label>
                          <input 
                            type="email" 
                            className="w-full bg-transparent border-b border-brand-secondary/30 py-3 text-sm focus:border-brand-secondary outline-none transition-colors font-serif placeholder:text-brand-dark/40 text-brand-primary"
                            placeholder="alexandre@example.com"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-brand-dark/80 block">Subject</label>
                        <select className="w-full bg-transparent border-b border-brand-secondary/30 py-3 text-sm focus:border-brand-secondary outline-none transition-colors font-serif text-brand-primary">
                          <option>General Inquiry</option>
                          <option>Order Assistance</option>
                          <option>Bespoke Consultation</option>
                          <option>Press & Media</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-brand-dark/80 block">Your Message</label>
                        <textarea 
                          rows="4"
                          className="w-full bg-transparent border-b border-brand-secondary/30 py-3 text-sm focus:border-brand-secondary outline-none transition-colors font-serif placeholder:text-brand-dark/40 text-brand-primary resize-none"
                          placeholder="Tell us about your olfactory desires..."
                        ></textarea>
                      </div>

                      <div className="pt-4">
                        <button 
                          type="submit"
                          className="w-full bg-brand-primary text-white py-5 text-[10px] font-bold uppercase tracking-[0.5em] hover:bg-brand-secondary transition-all shadow-xl flex items-center justify-center gap-3 group"
                        >
                          Deliver Message
                          <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* Inner border overlay like the vision cards */}
                  <div className="absolute inset-4 border border-brand-secondary/10 group-hover:border-brand-secondary/30 transition-colors duration-500 pointer-events-none" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default ContactPage;
