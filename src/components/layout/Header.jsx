import React, { useState, useEffect, Suspense } from 'react';
import { Search, User, ShoppingBag, Menu, X, ChevronRight, LogOut, ChevronDown, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import CartDrawer from '../cart/CartDrawer';
import SkeletonImage from '../common/SkeletonImage';

// Lazy load the LoginForm
const LoginForm = React.lazy(() => import('../authForm/LoginForm'));
const logoSrc = '/ambrosqlogo/AMBROSQ.png';
const logoFilter = 'brightness(0) saturate(100%) invert(48%) sepia(72%) saturate(454%) hue-rotate(4deg) brightness(94%) contrast(88%)';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isShopSubmenuOpen, setIsShopSubmenuOpen] = useState(false);
  const [expandedMobileMenu, setExpandedMobileMenu] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  
  const { items } = useSelector((state) => state.cart);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Implement hysteresis to prevent jitter/blinking near the threshold
      if (currentScrollY > 50) {
        setIsScrolled(true);
      } else if (currentScrollY <= 5) {
        setIsScrolled(false);
      }

      // Scroll direction logic
      if (currentScrollY > lastScrollY && currentScrollY > 150) {
        // Scrolling down - hide
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY || currentScrollY < 100) {
        // Scrolling up or near top - show
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop', hasSubmenu: true },
    { name: 'About', href: '/about' },
    { name: 'New Arrivals', href: '/new-arrivals' },
    { name: 'Contact', href: '/contact' },
  ];

  const handleLogout = () => {
    dispatch(logout());
    setIsUserMenuOpen(false);
  };

  return (
    <>
      <header className={`sticky top-0 w-full z-50 transition-transform duration-500 ease-in-out ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}>
        <motion.div 
          animate={{ y: 0 }}
          transition={{ duration: 0 }}
          className="w-full relative shadow-sm"
        >
          {/* Top Header (H-10 = 40px) */}
          <AnimatePresence>
            {!isScrolled && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 40, opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="hidden lg:block bg-gradient-to-r from-black via-brand-dark to-[#C89B3C] border-b border-brand-primary/10 relative z-[60] backdrop-blur-sm"
              >
                <div className="container mx-auto px-4 md:px-8 h-full flex justify-between items-center text-[10px] font-semibold text-white/90 tracking-widest uppercase">
                  <div className="flex gap-4 md:gap-10">
                    <span className="hidden sm:inline">Free Express Shipping on Orders Over $250</span>
                    <span className="sm:hidden">Free Shipping Over $250</span>
                  </div>
                  <div className="flex items-center space-x-4 md:space-x-8">
                    {/* Search */}
                    <div className="relative flex items-center h-full">
                      <AnimatePresence>
                        {isSearchOpen && (
                          <motion.input
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: 180, opacity: 1 }}
                            exit={{ width: 0, opacity: 0 }}
                            type="text"
                            placeholder="Search..."
                            className="bg-white/10 border-b border-white/30 text-white text-xs px-2 outline-none py-1 placeholder:text-white/40 mx-2"
                            autoFocus
                          />
                        )}
                      </AnimatePresence>
                      <button 
                        id="search-btn-top"
                        onClick={() => setIsSearchOpen(!isSearchOpen)}
                        className="hover:text-white transition-colors flex items-center gap-2 ml-2"
                      >
                        <Search size={14} className="text-white" />
                        {!isSearchOpen && <span>Search</span>}
                      </button>
                    </div>

                    <div 
                      className="relative h-full flex items-center"
                      onMouseEnter={() => setIsUserMenuOpen(true)}
                      onMouseLeave={() => setIsUserMenuOpen(false)}
                    >
                      <button 
                        id="user-btn-top"
                        onClick={() => !isAuthenticated && navigate('/login')}
                        className="hover:text-white transition-colors flex items-center gap-2 h-full py-2 group"
                      >
                        <div className={`w-6 h-6 rounded-full border border-white/20 flex items-center justify-center transition-all duration-300 ${isAuthenticated ? 'bg-brand-secondary text-white' : 'bg-transparent text-white/60 group-hover:bg-white group-hover:text-brand-dark'}`}>
                          <User size={12} />
                        </div>
                        <span className="font-bold tracking-widest">{isAuthenticated ? user?.name : 'Login'}</span>
                        {isAuthenticated && <ChevronDown size={10} className={`transition-transform duration-300 ${isUserMenuOpen ? 'rotate-180' : ''}`} />}
                      </button>
                      
                      <AnimatePresence>
                        {isUserMenuOpen && isAuthenticated && (
                          <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                            className="absolute right-0 top-full z-[70] pt-2"
                          >
                            {/* Hover Bridge */}
                            <div className="absolute top-[-15px] left-0 w-full h-[15px] bg-transparent" />
                            
                            <div className="w-80 bg-white border border-brand-secondary/30 p-8 shadow-[0_40px_80px_rgba(0,0,0,0.15)] text-brand-primary backdrop-blur-3xl relative overflow-hidden ring-1 ring-black/5 text-left">
                              <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="space-y-6 relative"
                              >
                                <div className="border-b border-brand-secondary/20 pb-5">
                                  <div className="flex items-center justify-between mb-2">
                                    <p className="text-[9px] text-brand-secondary font-bold uppercase tracking-[0.4em]">Boutique Member</p>
                                    <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                                  </div>
                                  <h4 className="text-2xl heading-serif text-brand-primary mb-1 uppercase tracking-tight">{user?.name}</h4>
                                  <p className="text-[10px] text-brand-dark/40 font-medium tracking-wider lowercase">{user?.email}</p>
                                </div>

                                <ul className="space-y-3">
                                  {[
                                    { name: 'Private Profile', icon: User },
                                    { name: 'Collection History', icon: ShoppingBag },
                                    { name: 'Wishlist Vault', icon: ArrowRight },
                                    { name: 'Artisanal Settings', icon: ChevronRight }
                                  ].map((item) => (
                                    <li key={item.name}>
                                      <a href="#" className="group flex items-center justify-between py-1 text-[11px] font-bold uppercase tracking-widest text-brand-dark/60 hover:text-brand-primary transition-all">
                                        <span>{item.name}</span>
                                        <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                      </a>
                                    </li>
                                  ))}
                                </ul>

                                <button 
                                  onClick={handleLogout}
                                  className="flex items-center justify-center w-full bg-brand-primary text-white py-4 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-brand-secondary transition-all shadow-lg group"
                                >
                                  Secure Sign Out
                                </button>
                              </motion.div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Cart */}
                    <button 
                      id="cart-btn-top"
                      onClick={() => setIsCartOpen(true)}
                      className="hover:text-white transition-colors flex items-center gap-2 relative h-full py-2"
                    >
                      <ShoppingBag size={14} className="text-white" />
                      <span>Cart ({totalItems})</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Navigation Bar */}
          <nav 
            id="main-nav"
            className={`w-full transition-all duration-700 border-b z-10 py-0 md:py-4 ${
              isScrolled 
                ? 'bg-white border-brand-secondary/30 shadow-[0_20px_50px_rgba(0,0,0,0.1)]' 
                : 'bg-white border-brand-secondary/10'
            }`}
          >
            <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
              {/* Left Side Links */}
              <div className="flex-1 hidden lg:flex items-center space-x-10">
                {navLinks.slice(0, 3).map((link) => (
                  <div 
                    key={link.name} 
                    className="relative group"
                    onMouseEnter={() => link.hasSubmenu && setIsShopSubmenuOpen(true)}
                    onMouseLeave={() => link.hasSubmenu && setIsShopSubmenuOpen(false)}
                  >
                    <Link 
                      to={link.href}
                      className="text-base font-serif font-semibold transition-colors duration-300 flex items-center gap-1.5 py-4 text-brand-primary hover:text-brand-secondary tracking-wide uppercase"
                    >
                      {link.name}
                      {link.hasSubmenu && <ChevronDown size={12} className={`opacity-50 transition-transform duration-300 ${isShopSubmenuOpen ? 'rotate-180' : ''}`} />}
                    </Link>

                    {link.hasSubmenu && (
                      <AnimatePresence>
                        {isShopSubmenuOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 15 }}
                            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                            className="absolute left-0 top-full w-[500px] bg-brand-cream border border-brand-secondary/20 shadow-[0_40px_80px_rgba(0,0,0,0.15)] backdrop-blur-3xl z-50 p-10 overflow-hidden"
                          >
                            {/* Decorative Corner Accent */}
                            <div className="absolute -top-10 -right-10 w-24 h-24 bg-brand-secondary/5 rounded-full blur-2xl" />
                            
                            <div className="grid grid-cols-2 gap-12 relative z-10 text-left">
                              {/* Collections Column */}
                              <div className="space-y-6">
                                <h6 className="text-[11px] text-[#C89B3C] uppercase tracking-[0.4em] font-bold border-b border-[#C89B3C]/40 pb-3">Collections</h6>
                                <ul className="space-y-4">
                                  {['Signature Noir', 'Golden Oud', 'Rose Garden', 'Imperial Scent'].map(item => (
                                    <li key={item}>
                                      <a href="/shop" className="text-sm font-serif text-brand-dark hover:text-brand-primary hover:translate-x-1 transition-all duration-300 flex items-center gap-2 group font-medium">
                                        <span className="w-0 group-hover:w-4 h-[1px] bg-brand-secondary transition-all" />
                                        {item}
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              {/* Categories Column */}
                              <div className="space-y-6 text-left">
                                <h6 className="text-[11px] text-[#C89B3C] uppercase tracking-[0.4em] font-bold border-b border-[#C89B3C]/40 pb-3">Categories</h6>
                                <ul className="space-y-4">
                                  {['Parfum', 'Eau de Parfum', 'Home Fragrance', 'Gift Sets'].map(item => (
                                    <li key={item}>
                                      <a href="/shop" className="text-sm font-serif text-brand-dark hover:text-brand-primary hover:translate-x-1 transition-all duration-300 flex items-center gap-2 group font-medium">
                                        <span className="w-0 group-hover:w-4 h-[1px] bg-brand-secondary transition-all" />
                                        {item}
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>

                            {/* Dropdown Footer */}
                            <div className="mt-10 pt-8 border-t border-brand-secondary/10 relative z-10">
                              <Link 
                                to="/shop" 
                                onClick={() => setIsShopSubmenuOpen(false)}
                                className="text-[10px] text-[#C89B3C] hover:text-brand-primary font-bold uppercase tracking-[0.4em] flex items-center justify-between group"
                              >
                                <span>Discover All Essence</span>
                                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                              </Link>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </div>
                ))}
              </div>

              {/* Logo Area */}
              <div id="logo-container" className="flex-shrink-0 flex items-center lg:justify-center min-h-[60px] lg:flex-1">
                <Link to="/" className="inline-flex items-center cursor-pointer">
                  <SkeletonImage
                    src={logoSrc}
                    alt="AMBROSQ"
                    wrapperClassName="h-10 md:h-14 w-auto"
                    imageClassName="h-10 md:h-14 w-auto object-contain"
                    style={{ filter: logoFilter }}
                  />
                </Link>
              </div>
      
              {/* Desktop Right Side Links */}
              <div className="flex-1 hidden lg:flex items-center justify-end space-x-10">
                {navLinks.slice(3).map((link) => (
                  <div key={link.name} className="relative group">
                    <Link 
                      to={link.href}
                      className="text-base font-serif font-semibold transition-colors duration-300 flex items-center gap-1.5 text-brand-primary hover:text-brand-secondary tracking-wide uppercase"
                    >
                      {link.name}
                    </Link>
                  </div>
                ))}
              </div>
      
              {/* Mobile Only Icons/Toggle */}
              <div className="lg:hidden flex-1 flex items-center justify-end space-x-5 transition-colors duration-500">
                {/* User Identity / Login */}
                <button 
                  onClick={() => isAuthenticated ? setIsMenuOpen(true) : navigate('/login')}
                  className="relative group"
                >
                  {isAuthenticated ? (
                    <div className="w-8 h-8 rounded-full bg-brand-secondary flex items-center justify-center border border-white/20 shadow-md transform active:scale-95 transition-transform">
                      <span className="text-[10px] font-bold text-white uppercase">{user?.name?.charAt(0)}</span>
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-brand-secondary/5 flex items-center justify-center border border-brand-secondary/10">
                      <User size={18} className="text-brand-secondary" />
                    </div>
                  )}
                </button>

                {/* Cart Icon */}
                <button onClick={() => setIsCartOpen(true)} className="relative group p-1">
                  <ShoppingBag size={20} className="text-brand-secondary" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-brand-primary text-white text-[8px] w-4 h-4 flex items-center justify-center rounded-full font-bold shadow-lg">
                      {totalItems}
                    </span>
                  )}
                </button>

                {/* Menu Toggle */}
                <button 
                  onClick={() => setIsMenuOpen(true)}
                  className="p-1"
                >
                  <Menu size={24} className="text-brand-primary" />
                </button>
              </div>
            </div>
          </nav>
        </motion.div>
      </header>

      {/* Mobile Drawer (Right to Left) */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-brand-dark/40 backdrop-blur-sm z-[100] lg:hidden"
          >
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute left-0 top-0 bottom-0 w-[85%] max-w-sm bg-brand-cream border-r border-brand-secondary/20 shadow-2xl flex flex-col overflow-hidden"
            >
              {/* Drawer Header */}
              <div className="flex justify-between items-center px-8 py-6 border-b border-brand-secondary/10 bg-white/30 backdrop-blur-sm">
                <Link to="/" onClick={() => setIsMenuOpen(false)} className="inline-flex items-center">
                  <SkeletonImage
                    src={logoSrc}
                    alt="AMBROSQ"
                    wrapperClassName="h-10 w-auto"
                    imageClassName="h-10 w-auto object-contain"
                    style={{ filter: logoFilter }}
                  />
                </Link>
                <button 
                  onClick={() => setIsMenuOpen(false)} 
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-brand-secondary/10 text-brand-secondary hover:bg-brand-secondary hover:text-white transition-all"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8">
              <ul className="space-y-4 text-left">
                {navLinks.map((link) => (
                  <li key={link.name} className="border-b border-brand-secondary/10 pb-4 last:border-0">
                    <div className="flex flex-col">
                      <div 
                        className="flex items-center justify-between cursor-pointer"
                        onClick={() => {
                          if (link.hasSubmenu) {
                            setExpandedMobileMenu(expandedMobileMenu === link.name ? null : link.name);
                          } else {
                            setIsMenuOpen(false);
                            navigate(link.href);
                          }
                        }}
                      >
                        <span className={`text-xl font-serif text-brand-dark hover:text-brand-secondary transition-colors ${expandedMobileMenu === link.name ? 'text-brand-secondary' : ''}`}>
                          {link.name}
                        </span>
                        {link.hasSubmenu && (
                          <ChevronRight 
                            size={18} 
                            className={`text-brand-secondary transition-transform duration-300 ${expandedMobileMenu === link.name ? 'rotate-90' : ''}`} 
                          />
                        )}
                      </div>

                      {link.hasSubmenu && (
                        <AnimatePresence>
                          {expandedMobileMenu === link.name && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                              className="overflow-hidden"
                            >
                              <ul className="mt-4 ml-4 space-y-3 border-l border-brand-secondary/20 pl-4">
                                {['Signature Noir', 'Golden Oud', 'Rose Garden', 'Imperial Scent', 'All Products'].map((item) => (
                                  <li key={item}>
                                    <button 
                                      onClick={() => {
                                        setIsMenuOpen(false);
                                        navigate('/shop');
                                      }}
                                      className="text-base font-serif text-brand-dark/60 hover:text-brand-primary transition-colors text-left w-full"
                                    >
                                      {item}
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
              </div>

              {/* Drawer Footer Info */}
              <div className="mt-auto p-8 border-t border-brand-secondary/10 bg-white/10">
                <div className="space-y-6">
                  {isAuthenticated ? (
                    <div className="space-y-6 pt-4 border-t border-brand-secondary/10">
                      <div className="space-y-1">
                        <p className="text-[9px] text-brand-secondary uppercase tracking-[0.4em] font-bold">Boutique Member</p>
                        <h4 className="text-xl heading-serif text-brand-primary uppercase">{user?.name}</h4>
                        <p className="text-[10px] text-brand-dark/40 tracking-wider lowercase">{user?.email}</p>
                      </div>
                      <button 
                        onClick={() => {
                          handleLogout();
                          setIsMenuOpen(false);
                        }}
                        className="flex items-center justify-center w-full bg-brand-primary text-white py-4 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-brand-secondary transition-all shadow-lg"
                      >
                        Secure Sign Out
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <p className="text-[10px] text-brand-secondary uppercase tracking-[0.3em] font-bold">Guest Access</p>
                      <button 
                        onClick={() => {
                          setIsMenuOpen(false);
                          navigate('/login');
                        }}
                        className="w-full border border-brand-secondary/30 py-4 text-[10px] font-bold uppercase tracking-[0.3em] text-brand-primary hover:bg-brand-secondary hover:text-white transition-all"
                      >
                        Sign In to Profile
                      </button>
                    </div>
                  )}
                  
                  <div className="pt-4 border-t border-brand-secondary/5 text-center">
                    <p className="text-[9px] text-brand-dark/40 tracking-widest uppercase">© 2024 AMBROSQ LUXURY</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Drawer (Right to Left) */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
