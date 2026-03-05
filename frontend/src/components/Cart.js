import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

export function Cart() {
  const { cart, isCartOpen, setIsCartOpen, updateQuantity, subtotal } = useCart();
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-md z-40"
          />

          {/* Cart Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full sm:max-w-md z-50 flex flex-col"
            style={{
              background: 'linear-gradient(145deg, #ffffff, #f5f5f5)',
              boxShadow: '-20px 0 40px rgba(0,0,0,0.1)',
            }}
          >
            {/* Header */}
            <div className="p-4 sm:p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl sm:text-3xl text-gray-900">{t.cart.yourCart}</h2>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
                </button>
              </div>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              {cart.length === 0 ? (
                <div className="text-center py-8 sm:py-12">
                  <ShoppingBag className="w-16 h-16 sm:w-20 sm:h-20 text-gray-300 mx-auto mb-4" />
                  <p className="text-sm sm:text-base text-gray-600">{t.cart.empty}</p>
                </div>
              ) : (
                <div className="space-y-3 sm:space-y-4">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-3 sm:gap-4 p-3 sm:p-4 rounded-[1.5rem]"
                      style={{
                        background: 'linear-gradient(145deg, #fafafa, #f0f0f0)',
                        boxShadow: '6px 6px 12px #d9d9d9, -6px -6px 12px #ffffff',
                      }}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 sm:w-24 sm:h-24 rounded-[1.5rem] object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xs sm:text-sm mb-1 text-gray-900 truncate">{item.name}</h3>
                        <p className="text-[10px] sm:text-xs text-gray-600 mb-2 sm:mb-3 truncate">{item.vendor}</p>
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs sm:text-sm bg-gradient-to-r from-[#d4af37] to-[#dc143c] bg-clip-text text-transparent">
                            LKR {item.price.toLocaleString()}
                          </span>
                          <div className="flex items-center gap-1 sm:gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white flex items-center justify-center text-gray-700 shadow-md"
                            >
                              <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
                            </button>
                            <span className="text-xs sm:text-sm text-gray-900 w-6 sm:w-8 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white flex items-center justify-center text-gray-700 shadow-md"
                            >
                              <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-4 sm:p-6 border-t border-gray-200">
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <span className="text-sm sm:text-base text-gray-600">{t.cart.subtotal}</span>
                  <span className="text-xl sm:text-2xl bg-gradient-to-r from-[#d4af37] to-[#dc143c] bg-clip-text text-transparent">
                    LKR {subtotal.toLocaleString()}
                  </span>
                </div>
                <button className="w-full py-4 sm:py-5 rounded-[1.5rem] sm:rounded-[2rem] bg-gradient-to-r from-[#d4af37] to-[#dc143c] text-white hover:shadow-2xl transition-all shadow-xl text-sm sm:text-base">
                  {t.cart.checkout}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

