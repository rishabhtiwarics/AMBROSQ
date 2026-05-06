import { Truck, ShoppingBag, Headphones, Lock, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

const services = [
  {
    icon: <Truck size={32} strokeWidth={1.2} />,
    title: "Timely Delivery",
    desc: "Aliquam sem et tortor consequat id porta"
  },
  {
    icon: <ShoppingBag size={32} strokeWidth={1.2} />,
    title: "Free Shipping",
    desc: "Pellentesque id nibh tortor id aliquet lectus proin"
  },
  {
    icon: <Headphones size={32} strokeWidth={1.2} />,
    title: "24/7 Support",
    desc: "Viverra aliquet eget sit amet tellus cras adipiscing"
  },
  {
    icon: <Lock size={32} strokeWidth={1.2} />,
    title: "Secured Payment",
    desc: "Tortor posuere ac ut consequat semper viverra nam"
  },
  {
    icon: <ShieldCheck size={32} strokeWidth={1.2} />,
    title: "Safe Check Out",
    desc: "Fringilla phasellus faucibus scelerisque eleifend donec"
  }
];

export default function ServiceHighlights() {
  return (
    <section id="service-highlights" className="w-full py-16 md:py-24 bg-white border-y border-brand-secondary/10">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 md:gap-8 lg:gap-6">
          {services.map((service, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-16 h-16 flex items-center justify-center bg-brand-cream text-[#C89B3C] mb-6 transition-all duration-500 group-hover:bg-[#C89B3C] group-hover:text-white group-hover:scale-110 shadow-sm border border-[#C89B3C]/10">
                {service.icon}
              </div>
              <h3 className="text-sm md:text-base font-bold text-brand-primary mb-3">
                {service.title}
              </h3>
              <p className="text-xs md:text-sm text-brand-primary/60 leading-relaxed max-w-[200px] mx-auto">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
