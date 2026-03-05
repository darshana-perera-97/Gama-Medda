import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

export function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { language, changeLanguage } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartItemCount, setIsCartOpen } = useCart();
  const t = translations[language];
  
  const navLinks = [
    { name: t.nav.dashboard, path: '/' },
    { name: t.nav.bazaar, path: '/bazaar' },
    { name: t.nav.culture, path: '/culture' },
    { name: t.nav.games, path: '/games' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-gray-200/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-[2rem] bg-gradient-to-br from-[#d4af37] to-[#dc143c] flex items-center justify-center shadow-lg">
              <span className="text-white text-lg sm:text-xl">🌞</span>
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg tracking-tight text-gray-900">Avurudu Ulela</span>
              <span className="text-[10px] sm:text-xs text-gray-500">Digital Village</span>
            </div>
          </Link>

          {/* Nakath Pulse Ticker - Hidden on mobile, shown on tablet+ */}
          <div className="hidden md:flex items-center gap-2 px-3 lg:px-5 py-2 lg:py-2.5 rounded-full bg-gradient-to-r from-[#d4af37]/10 to-[#dc143c]/10 border border-[#d4af37]/20 shadow-inner">
            <div className="relative flex items-center justify-center w-2 h-2">
              <div className="absolute w-2 h-2 rounded-full bg-[#dc143c] animate-ping" />
              <div className="relative w-2 h-2 rounded-full bg-[#dc143c]" />
            </div>
            <span className="text-xs text-gray-700 whitespace-nowrap">{t.nav.nakathPulse} 09:42 AM</span>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className="relative text-sm text-gray-700 hover:text-[#d4af37] transition-colors"
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute -bottom-5 left-0 right-0 h-0.5 bg-[#d4af37]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Language Toggle - Hidden on very small screens */}
            <div className="hidden sm:flex items-center gap-1 p-1 rounded-full bg-white/80 backdrop-blur-sm shadow-lg border border-gray-200/50">
              {['SI', 'EN', 'TA'].map((lang) => (
                <button
                  key={lang}
                  onClick={() => changeLanguage(lang)}
                  className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs transition-all ${
                    language === lang
                      ? 'bg-gradient-to-r from-[#d4af37] to-[#dc143c] text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>

            {/* Cart Icon */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 sm:p-2.5 rounded-full hover:bg-gray-100 transition-colors"
            >
              <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-[#dc143c] text-white text-[10px] sm:text-xs rounded-full flex items-center justify-center shadow-lg">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Profile Avatar */}
            <button 
              onClick={() => navigate('/profile')}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-[#228b22] to-[#d4af37] flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
            >
              <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-gray-700" />
              ) : (
                <Menu className="w-5 h-5 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden mt-4 pb-4 border-t border-gray-200"
            >
              <div className="flex flex-col gap-4 pt-4">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`text-base px-4 py-2 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-gradient-to-r from-[#d4af37]/10 to-[#dc143c]/10 text-[#d4af37] font-medium'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
                {/* Mobile Language Toggle */}
                <div className="flex items-center gap-2 px-4 pt-2">
                  <span className="text-sm text-gray-600 mr-2">{t.nav.language}:</span>
                  {['SI', 'EN', 'TA'].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => changeLanguage(lang)}
                      className={`px-3 py-1.5 rounded-full text-xs transition-all ${
                        language === lang
                          ? 'bg-gradient-to-r from-[#d4af37] to-[#dc143c] text-white shadow-md'
                          : 'text-gray-600 hover:text-gray-900 bg-gray-100'
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
          </AnimatePresence>
      </div>
    </nav>
  );
}

