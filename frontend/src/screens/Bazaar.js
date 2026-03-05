import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';
import { SEO } from '../components/SEO';

export function Bazaar() {
  const { language } = useLanguage();
  const t = translations[language];
  const [selectedFilter, setSelectedFilter] = useState('all'); // Use language-independent key
  const { addToCart } = useCart();

  // Filter configuration with keys and category mappings
  const filterConfig = [
    { key: 'all', category: null, label: t.bazaar.all },
    { key: 'rasaKavili', category: 'Rasa Kavili', label: t.bazaar.rasaKavili },
    { key: 'clothing', category: 'Clothing', label: t.bazaar.clothing },
    { key: 'gifts', category: 'Gifts', label: t.bazaar.gifts },
  ];

  const products = [
    {
      id: 1,
      name: t.bazaar.products.kondaKavumBowl,
      vendor: t.bazaar.vendors.rasaKitchen,
      price: 850,
      category: 'Rasa Kavili',
      image: 'https://images.unsplash.com/photo-1742281095650-dd3c50c08772?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcmklMjBsYW5rYW4lMjBrYXZ1bSUyMHJlYWxpc3RpYyUyMGZvb2QlMjBwaG90b2dyYXBoeXxlbnwxfHx8fDE3NzI2ODc2MDh8MA&ixlib=rb-4.1.0&q=80&w=600',
    },
    {
      id: 2,
      name: t.bazaar.products.premiumSilkBatik,
      vendor: t.bazaar.vendors.craftLanka,
      price: 15500,
      category: 'Clothing',
      image: 'https://images.unsplash.com/photo-1761699890197-46dda22b17b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXRpayUyMHNpbGslMjBmYWJyaWMlMjB0ZXh0dXJlJTIwY2xvc2V1cHxlbnwxfHx8fDE3NzI2ODc2MDh8MA&ixlib=rb-4.1.0&q=80&w=600',
    },
    {
      id: 3,
      name: t.bazaar.products.brassOilLamp,
      vendor: t.bazaar.vendors.heritageBrass,
      price: 4200,
      category: 'Gifts',
      image: 'https://images.unsplash.com/photo-1623954310022-1b4494e26f32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFzcyUyMHRyYWRpdGlvbmFsJTIwY3JhZnRzJTIwY2xvc2V1cHxlbnwxfHx8fDE3NzI2ODc2MDh8MA&ixlib=rb-4.1.0&q=80&w=600',
    },
    {
      id: 4,
      name: t.bazaar.products.goldenKokis,
      vendor: t.bazaar.vendors.rasaKitchen,
      price: 650,
      category: 'Rasa Kavili',
      image: 'https://images.unsplash.com/photo-1695279087980-6f3d3102bf15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcmklMjBsYW5rYW4lMjBrb2tpcyUyMHRyYWRpdGlvbmFsfGVufDF8fHx8MTc3MjY4NjY5OHww&ixlib=rb-4.1.0&q=80&w=600',
    },
    {
      id: 5,
      name: t.bazaar.products.traditionalAluwa,
      vendor: t.bazaar.vendors.sweetMoments,
      price: 720,
      category: 'Rasa Kavili',
      image: 'https://images.unsplash.com/photo-1561827978-45f07fa822fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcmklMjBsYW5rYW4lMjB0cmFkaXRpb25hbCUyMHN3ZWV0cyUyMGthdnVtfGVufDF8fHx8MTc3MjY4NjY5OHww&ixlib=rb-4.1.0&q=80&w=600',
    },
    {
      id: 6,
      name: t.bazaar.products.cottonSaree,
      vendor: t.bazaar.vendors.craftLanka,
      price: 12800,
      category: 'Clothing',
      image: 'https://images.unsplash.com/photo-1674810040080-e614ad64392e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMHNyaSUyMGxhbmthbiUyMGNsb3RoaW5nfGVufDF8fHx8MTc3MjY4NjY5OXww&ixlib=rb-4.1.0&q=80&w=600',
    },
    {
      id: 7,
      name: t.bazaar.products.woodenElephant,
      vendor: t.bazaar.vendors.heritageBrass,
      price: 3800,
      category: 'Gifts',
      image: 'https://images.unsplash.com/photo-1635790073975-ac99496914e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcmklMjBsYW5rYW4lMjBnaWZ0JTIwaGFuZGljcmFmdHxlbnwxfHx8fDE3NzI2ODY2OTl8MA&ixlib=rb-4.1.0&q=80&w=600',
    },
    {
      id: 8,
      name: t.bazaar.products.athirasaDeluxe,
      vendor: t.bazaar.vendors.sweetMoments,
      price: 890,
      category: 'Rasa Kavili',
      image: 'https://images.unsplash.com/photo-1742281095650-dd3c50c08772?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcmklMjBsYW5rYW4lMjBrYXZ1bSUyMHJlYWxpc3RpYyUyMGZvb2QlMjBwaG90b2dyYXBoeXxlbnwxfHx8fDE3NzI2ODc2MDh8MA&ixlib=rb-4.1.0&q=80&w=600',
    },
  ];

  // Get the selected filter config
  const selectedFilterConfig = filterConfig.find(f => f.key === selectedFilter);
  
  const filteredProducts =
    selectedFilter === 'all'
      ? products
      : products.filter((p) => p.category === selectedFilterConfig?.category);

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Store',
    name: 'Avurudu Bazaar',
    description: 'Shop traditional Sinhala and Tamil New Year items including sweets, clothing, and gifts',
    url: 'https://avuruduulela.lk/bazaar',
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'LKR',
      availability: 'https://schema.org/InStock',
    },
  };

  return (
    <>
      <SEO
        title="Avurudu Bazaar"
        description="Shop traditional Sinhala and Tamil New Year items including Konda Kavum, Kokis, Batik Sarongs, Brass Oil Lamps, and more. Authentic traditional products delivered to your door."
        keywords="New Year shopping, Traditional sweets, Batik, Sarong, Brass items, Sri Lankan products, Avurudu items, Traditional gifts"
        structuredData={structuredData}
      />
      <div className="min-h-screen bg-[#fdfdfd] bg-gradient-to-b from-[#fdfdfd] to-[#f5f5f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 sm:mb-8"
        >
                <h1 className="text-3xl sm:text-4xl md:text-5xl mb-2 text-gray-900">{t.bazaar.title}</h1>
                <p className="text-sm sm:text-base text-gray-600">{t.bazaar.subtitle}</p>
        </motion.div>

        {/* Filter Pills */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex gap-2 sm:gap-3 mb-6 sm:mb-10 overflow-x-auto pb-2 scrollbar-hide"
        >
          {filterConfig.map((filter) => (
            <button
              key={filter.key}
              onClick={() => setSelectedFilter(filter.key)}
              className={`px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 rounded-full whitespace-nowrap transition-all text-xs sm:text-sm ${
                selectedFilter === filter.key
                  ? 'bg-gradient-to-r from-[#d4af37] to-[#dc143c] text-white shadow-xl'
                  : 'bg-white text-gray-700 hover:shadow-lg'
              }`}
              style={
                selectedFilter !== filter.key
                  ? {
                      boxShadow: '6px 6px 12px #d9d9d9, -6px -6px 12px #ffffff',
                    }
                  : undefined
              }
            >
              {filter.label}
            </button>
          ))}
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group rounded-[2rem] bg-white overflow-hidden hover:shadow-2xl transition-all"
              style={{
                boxShadow: '12px 12px 24px #d9d9d9, -12px -12px 24px #ffffff',
              }}
            >
              {/* Image */}
              <div className="relative h-48 sm:h-56 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  style={{
                    filter: 'contrast(1.1) saturate(1.1)',
                  }}
                />
              </div>

              {/* Content */}
              <div className="p-4 sm:p-6">
                <h3 className="text-sm sm:text-base mb-1 text-gray-900 line-clamp-2">{product.name}</h3>
                <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">{product.vendor}</p>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-base sm:text-lg bg-gradient-to-r from-[#d4af37] to-[#dc143c] bg-clip-text text-transparent">
                    LKR {product.price.toLocaleString()}
                  </span>
                  <button
                    onClick={() => addToCart(product)}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-[#d4af37] to-[#dc143c] text-white hover:shadow-xl flex items-center justify-center transition-all flex-shrink-0"
                  >
                    <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}

