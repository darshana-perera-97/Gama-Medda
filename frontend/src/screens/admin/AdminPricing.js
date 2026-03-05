import { useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Edit, Save, X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../translations';

export function AdminPricing() {
  const { language } = useLanguage();
  const t = translations[language];
  const [editingId, setEditingId] = useState(null);
  const [prices, setPrices] = useState([
    { id: 1, name: 'Konda Kavum Bowl', category: 'Rasa Kavili', currentPrice: 850, newPrice: 850 },
    { id: 2, name: 'Premium Silk Batik Sarong', category: 'Clothing', currentPrice: 15500, newPrice: 15500 },
    { id: 3, name: 'Handcrafted Brass Oil Lamp', category: 'Gifts', currentPrice: 4200, newPrice: 4200 },
    { id: 4, name: 'Golden Kokis Pack', category: 'Rasa Kavili', currentPrice: 650, newPrice: 650 },
    { id: 5, name: 'Traditional Aluwa Box', category: 'Rasa Kavili', currentPrice: 720, newPrice: 720 },
    { id: 6, name: 'Handwoven Cotton Saree', category: 'Clothing', currentPrice: 12800, newPrice: 12800 },
    { id: 7, name: 'Carved Wooden Elephant', category: 'Gifts', currentPrice: 3800, newPrice: 3800 },
    { id: 8, name: 'Athirasa Deluxe Pack', category: 'Rasa Kavili', currentPrice: 890, newPrice: 890 },
  ]);

  const handleEdit = (id) => {
    setEditingId(id);
  };

  const handleSave = (id) => {
    setPrices(prices.map(item =>
      item.id === id
        ? { ...item, currentPrice: item.newPrice }
        : item
    ));
    setEditingId(null);
  };

  const handleCancel = () => {
    setPrices(prices.map(item => ({ ...item, newPrice: item.currentPrice })));
    setEditingId(null);
  };

  const handlePriceChange = (id, value) => {
    setPrices(prices.map(item =>
      item.id === id ? { ...item, newPrice: parseFloat(value) || 0 } : item
    ));
  };

  const categories = ['All', 'Rasa Kavili', 'Clothing', 'Gifts'];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredPrices = selectedCategory === 'All'
    ? prices
    : prices.filter(item => item.category === selectedCategory);

  const totalValue = prices.reduce((sum, item) => sum + item.currentPrice, 0);
  const averagePrice = totalValue / prices.length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            {t.admin.pricing.title}
          </h1>
          <p className="text-gray-600">{t.admin.pricing.subtitle}</p>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-6 rounded-xl bg-white shadow-lg">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#d4af37] to-[#dc143c] flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-sm text-gray-600">{t.admin.pricing.totalItems}</div>
              <div className="text-2xl font-bold text-gray-900">{prices.length}</div>
            </div>
          </div>
        </div>
        <div className="p-6 rounded-xl bg-white shadow-lg">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <div className="text-sm text-gray-600">{t.admin.pricing.averagePrice}</div>
              <div className="text-2xl font-bold bg-gradient-to-r from-[#d4af37] to-[#dc143c] bg-clip-text text-transparent">
                LKR {Math.round(averagePrice).toLocaleString()}
              </div>
            </div>
          </div>
        </div>
        <div className="p-6 rounded-xl bg-white shadow-lg">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <div className="text-sm text-gray-600">{t.admin.pricing.totalValue}</div>
              <div className="text-2xl font-bold text-gray-900">
                LKR {totalValue.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-6 py-2 rounded-full whitespace-nowrap transition-all ${
              selectedCategory === category
                ? 'bg-gradient-to-r from-[#d4af37] to-[#dc143c] text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            {category === 'All' ? t.admin.pricing.allCategories : category}
          </button>
        ))}
      </div>

      {/* Pricing Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-[#d4af37]/10 to-[#dc143c]/10">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">{t.admin.pricing.itemName}</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">{t.admin.pricing.category}</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">{t.admin.pricing.currentPrice}</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">{t.admin.pricing.newPrice}</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">{t.admin.pricing.change}</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">{t.admin.pricing.actions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPrices.map((item, index) => {
                const change = item.newPrice - item.currentPrice;
                const changePercent = item.currentPrice > 0 ? ((change / item.currentPrice) * 100).toFixed(1) : 0;
                const isEditing = editingId === item.id;

                return (
                  <motion.tr
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <span className="font-medium text-gray-900">{item.name}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-600">{item.category}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-medium text-gray-900">
                        LKR {item.currentPrice.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {isEditing ? (
                        <input
                          type="number"
                          value={item.newPrice}
                          onChange={(e) => handlePriceChange(item.id, e.target.value)}
                          className="w-32 px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                        />
                      ) : (
                        <span className="font-medium text-gray-900">
                          LKR {item.newPrice.toLocaleString()}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {change !== 0 && (
                        <span className={`font-medium ${
                          change > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {change > 0 ? '+' : ''}{changePercent}%
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {isEditing ? (
                          <>
                            <button
                              onClick={() => handleSave(item.id)}
                              className="p-2 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition-colors"
                            >
                              <Save className="w-4 h-4" />
                            </button>
                            <button
                              onClick={handleCancel}
                              className="p-2 rounded-lg bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => handleEdit(item.id)}
                            className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

