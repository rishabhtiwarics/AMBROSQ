import { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import ProductCard from '../components/shop/ProductCard';
import { motion, AnimatePresence } from 'motion/react';
import HeroBanner from '../components/common/HeroBanner';
import { ChevronDown, Filter } from 'lucide-react';

export default function ShopPage() {
  const products = useSelector((state) => state.products.items);
  const [selectedCategory, setSelectedCategory] = useState('All Pieces');
  const [sortOrder, setSortOrder] = useState('Newest Arrivals');
  const [isSortOpen, setIsSortOpen] = useState(false);

  const shopBreadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Shop', active: true }
  ];

  // Filtering and Sorting Logic
  const processedProducts = useMemo(() => {
    let result = [...products];

    // Filter by Category
    if (selectedCategory !== 'All Pieces') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Sort
    switch (sortOrder) {
      case 'Price: High to Low':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'Price: Low to High':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'Alphabetical':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default: // Newest Arrivals (assuming id or some default order)
        result.sort((a, b) => b.id - a.id);
    }

    return result;
  }, [products, selectedCategory, sortOrder]);

  return (
    <div className="bg-brand-cream/30 min-h-screen">
      <HeroBanner 
        title="All Fragrances"
        description="Explore our curated selection of ultra-premium scents, hand-crafted from the world's rarest botanical extractions."
        breadcrumbItems={shopBreadcrumbs}
      />

      <div className="container mx-auto px-4 md:px-8 pb-32">
        <div className="mt-8">
          {/* Redesigned Filter/Sort Bar - Mobile Optimized */}
          <div className="flex flex-col md:flex-row justify-between items-center border-y border-brand-secondary/20 py-6 md:py-8 mb-12 md:mb-16 gap-6 md:gap-8">
            {/* Category Tabs */}
            <div className="flex items-center gap-8 md:gap-12 relative">
              {['All Pieces', 'Signatures'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-[11px] uppercase font-bold tracking-[0.3em] transition-all duration-300 relative py-2 ${
                    selectedCategory === cat ? 'text-brand-primary' : 'text-brand-primary/40 hover:text-brand-primary/70'
                  }`}
                >
                  {cat}
                  {selectedCategory === cat && (
                    <motion.div 
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 w-full h-[1px] bg-brand-secondary"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Custom Luxury Sort Controls */}
            <div className="flex items-center gap-10">
              <div className="flex items-center gap-4 relative group">
                <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-brand-primary/40">Sort By</span>
                <div className="relative">
                  <button 
                    onClick={() => setIsSortOpen(!isSortOpen)}
                    className="flex items-center gap-6 text-[11px] uppercase font-bold tracking-[0.3em] text-brand-primary min-w-[160px] justify-between group"
                  >
                    <span>{sortOrder}</span>
                    <ChevronDown size={14} className={`text-brand-secondary transition-transform duration-500 ${isSortOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Custom Animated Dropdown Menu */}
                  <AnimatePresence>
                    {isSortOpen && (
                      <>
                        {/* Backdrop to close on click outside */}
                        <div 
                          className="fixed inset-0 z-30" 
                          onClick={() => setIsSortOpen(false)}
                        />
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute right-0 top-full mt-4 w-56 bg-white shadow-2xl border border-brand-secondary/10 z-40 overflow-hidden"
                        >
                          <div className="py-2">
                            {['Newest Arrivals', 'Price: High to Low', 'Price: Low to High', 'Alphabetical'].map((option) => (
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
                <span className="text-[10px] uppercase font-bold tracking-[0.2em]">Filters</span>
              </div>
            </div>
          </div>

          {/* Products Grid with Animation */}
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12"
          >
            <AnimatePresence mode="popLayout">
              {processedProducts.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          
          {processedProducts.length === 0 && (
            <div className="text-center py-32">
              <p className="text-brand-dark/40 font-medium tracking-widest uppercase text-xs">No fragrances found in this category.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
