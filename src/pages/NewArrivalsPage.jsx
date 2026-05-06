import { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import ProductCard from '../components/shop/ProductCard';
import { motion, AnimatePresence } from 'motion/react';
import HeroBanner from '../components/common/HeroBanner';
import { ChevronDown, Filter, Sparkles } from 'lucide-react';

export default function NewArrivalsPage() {
  const products = useSelector((state) => state.products.items);
  const [selectedCategory, setSelectedCategory] = useState('All New');
  const [sortOrder, setSortOrder] = useState('Newest Arrivals');
  const [isSortOpen, setIsSortOpen] = useState(false);

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'New Arrivals', active: true }
  ];

  // Filtering and Sorting Logic - Focused on Newest first
  const processedProducts = useMemo(() => {
    // In a real app, we might filter by a 'isNew' flag or date.
    // For now, we'll just sort by ID descending to simulate 'newest' and show everything.
    let result = [...products];

    // Filter by Category if needed
    if (selectedCategory !== 'All New') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Sort - Default to Newest Arrivals
    switch (sortOrder) {
      case 'Price: High to Low':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'Price: Low to High':
        result.sort((a, b) => a.price - b.price);
        break;
      default: // Newest Arrivals (default)
        result.sort((a, b) => b.id - a.id);
    }

    // Only show first 8 for 'New Arrivals' if we want to keep it exclusive, 
    // or just show all if that's the shop style. Let's show all for consistency.
    return result;
  }, [products, selectedCategory, sortOrder]);

  return (
    <div className="bg-brand-cream/30 min-h-screen">
      <HeroBanner 
        title="L'Aube Nouvelle"
        description="Be the first to experience our latest olfactive discoveries. Rare extractions and limited edition releases, freshly artisanal-crafted for the discerning collector."
        breadcrumbItems={breadcrumbs}
      />

      <div className="container mx-auto px-4 md:px-8 pb-32">
        <div className="mt-8">
          {/* Filter/Sort Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center border-y border-brand-secondary/20 py-8 mb-16 gap-8">
            {/* Tagline */}
            <div className="flex items-center gap-4">
              <Sparkles size={16} className="text-brand-secondary" />
              <span className="text-[11px] uppercase font-bold tracking-[0.4em] text-brand-primary">
                Fresh Discoveries
              </span>
            </div>

            {/* Sort Controls */}
            <div className="flex items-center gap-10">
              <div className="flex items-center gap-4 relative group">
                <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-brand-primary/40">Refine</span>
                <div className="relative">
                  <button 
                    onClick={() => setIsSortOpen(!isSortOpen)}
                    className="flex items-center gap-6 text-[11px] uppercase font-bold tracking-[0.3em] text-brand-primary min-w-[180px] justify-between group"
                  >
                    <span>{sortOrder}</span>
                    <ChevronDown size={14} className={`text-brand-secondary transition-transform duration-500 ${isSortOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {isSortOpen && (
                      <>
                        <div className="fixed inset-0 z-30" onClick={() => setIsSortOpen(false)} />
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute right-0 top-full mt-4 w-60 bg-white shadow-2xl border border-brand-secondary/10 z-40 overflow-hidden"
                        >
                          <div className="py-2">
                            {['Newest Arrivals', 'Price: High to Low', 'Price: Low to High'].map((option) => (
                              <button
                                key={option}
                                onClick={() => {
                                  setSortOrder(option);
                                  setIsSortOpen(false);
                                }}
                                className={`w-full text-left px-6 py-4 text-[10px] uppercase font-bold tracking-[0.2em] transition-all duration-300 ${
                                  sortOrder === option 
                                    ? 'bg-brand-cream text-brand-primary' 
                                    : 'text-brand-primary/60 hover:bg-brand-cream/50 hover:text-brand-primary'
                                }`}
                              >
                                {option}
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="h-6 w-[1px] bg-brand-secondary/20 hidden md:block" />

              <div className="flex items-center gap-3 text-brand-primary/60 hover:text-brand-primary cursor-pointer transition-colors group">
                <Filter size={14} className="text-brand-secondary group-hover:scale-110 transition-transform" />
                <span className="text-[10px] uppercase font-bold tracking-[0.2em]">Filter</span>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12"
          >
            <AnimatePresence mode="popLayout">
              {processedProducts.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          
          {processedProducts.length === 0 && (
            <div className="text-center py-40">
              <p className="text-brand-dark/40 font-medium tracking-widest uppercase text-xs">Awaiting new artisanal creations.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
