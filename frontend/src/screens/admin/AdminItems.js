import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Edit, X, Save, Globe } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../translations';

export function AdminItems() {
  const { language } = useLanguage();
  const t = translations[language];
  const [items, setItems] = useState([
    {
      id: 1,
      name: 'Konda Kavum Bowl',
      category: 'Rasa Kavili',
      price: 850,
      vendor: 'Rasa Kitchen',
      image: 'https://images.unsplash.com/photo-1742281095650-dd3c50c08772?w=600',
      active: true,
    },
    {
      id: 2,
      name: 'Premium Silk Batik Sarong',
      category: 'Clothing',
      price: 15500,
      vendor: 'Craft Lanka Textiles',
      image: 'https://images.unsplash.com/photo-1761699890197-46dda22b17b4?w=600',
      active: true,
    },
    {
      id: 3,
      name: 'Handcrafted Brass Oil Lamp',
      category: 'Gifts',
      price: 4200,
      vendor: 'Heritage Brass Works',
      image: 'https://images.unsplash.com/photo-1623954310022-1b4494e26f32?w=600',
      active: true,
    },
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: {
      EN: '',
      SI: '',
      TA: '',
    },
    category: 'Rasa Kavili',
    price: '',
    vendor: {
      EN: '',
      SI: '',
      TA: '',
    },
    image: '',
  });

  const categories = ['Rasa Kavili', 'Clothing', 'Gifts'];

  const handleAdd = () => {
    const newItem = {
      id: items.length + 1,
      name: formData.name,
      category: formData.category,
      price: parseFloat(formData.price),
      vendor: formData.vendor,
      image: formData.image,
      active: true,
    };
    setItems([...items, newItem]);
    setIsAddModalOpen(false);
    setFormData({
      name: { EN: '', SI: '', TA: '' },
      category: 'Rasa Kavili',
      price: '',
      vendor: { EN: '', SI: '', TA: '' },
      image: '',
    });
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormData({
      name: typeof item.name === 'string' 
        ? { EN: item.name, SI: item.name, TA: item.name }
        : item.name,
      category: item.category,
      price: item.price.toString(),
      vendor: typeof item.vendor === 'string'
        ? { EN: item.vendor, SI: item.vendor, TA: item.vendor }
        : item.vendor,
      image: item.image,
    });
  };

  const handleSave = () => {
    setItems(items.map(item =>
      item.id === editingId
        ? {
            ...item,
            name: formData.name,
            category: formData.category,
            price: parseFloat(formData.price),
            vendor: formData.vendor,
            image: formData.image,
          }
        : item
    ));
    setEditingId(null);
    setFormData({
      name: { EN: '', SI: '', TA: '' },
      category: 'Rasa Kavili',
      price: '',
      vendor: { EN: '', SI: '', TA: '' },
      image: '',
    });
  };

  const handleDelete = (id) => {
    if (window.confirm(t.admin.items.confirmDelete)) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const handleToggleActive = (id) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, active: !item.active } : item
    ));
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            {t.admin.items.title}
          </h1>
          <p className="text-gray-600">{t.admin.items.subtitle}</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#dc143c] text-white font-medium hover:shadow-xl transition-all flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          {t.admin.items.addItem}
        </button>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-white rounded-2xl overflow-hidden shadow-lg ${!item.active ? 'opacity-60' : ''}`}
          >
            {/* Image */}
            <div className="relative h-48 bg-gray-100">
              <img 
                src={item.image} 
                alt={typeof item.name === 'string' ? item.name : item.name[language] || item.name.EN} 
                className="w-full h-full object-cover" 
              />
              <div className="absolute top-2 right-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  item.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                }`}>
                  {item.active ? t.admin.items.active : t.admin.items.inactive}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {typeof item.name === 'string' ? item.name : item.name[language] || item.name.EN}
              </h3>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{t.admin.items.category}:</span>
                  <span className="font-medium">{item.category}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{t.admin.items.vendor}:</span>
                  <span className="font-medium">
                    {typeof item.vendor === 'string' ? item.vendor : item.vendor[language] || item.vendor.EN}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{t.admin.items.price}:</span>
                  <span className="font-bold bg-gradient-to-r from-[#d4af37] to-[#dc143c] bg-clip-text text-transparent">
                    LKR {item.price.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="flex-1 px-4 py-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors flex items-center justify-center gap-2"
                >
                  <Edit className="w-4 h-4" />
                  {t.admin.items.edit}
                </button>
                <button
                  onClick={() => handleToggleActive(item.id)}
                  className={`flex-1 px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2 ${
                    item.active
                      ? 'bg-yellow-50 text-yellow-600 hover:bg-yellow-100'
                      : 'bg-green-50 text-green-600 hover:bg-green-100'
                  }`}
                >
                  {item.active ? t.admin.items.deactivate : t.admin.items.activate}
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="px-4 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {(isAddModalOpen || editingId) && (
          <>
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-50"
              onClick={() => {
                setIsAddModalOpen(false);
                setEditingId(null);
                setFormData({
                  name: { EN: '', SI: '', TA: '' },
                  category: 'Rasa Kavili',
                  price: '',
                  vendor: { EN: '', SI: '', TA: '' },
                  image: '',
                });
              }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div
                className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl p-6 shadow-2xl custom-scrollbar"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">
                    {editingId ? t.admin.items.editItem : t.admin.items.addItem}
                  </h2>
                  <button
                    onClick={() => {
                      setIsAddModalOpen(false);
                      setEditingId(null);
                      setFormData({
                        name: { EN: '', SI: '', TA: '' },
                        category: 'Rasa Kavili',
                        price: '',
                        vendor: { EN: '', SI: '', TA: '' },
                        image: '',
                      });
                    }}
                    className="p-2 rounded-lg hover:bg-gray-100"
                  >
                    <X className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Item Name - Multi-language */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      {t.admin.items.name}
                    </label>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">English (EN)</label>
                        <input
                          type="text"
                          value={formData.name.EN}
                          onChange={(e) => setFormData({ ...formData, name: { ...formData.name, EN: e.target.value } })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                          placeholder="Item name in English"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Sinhala (SI)</label>
                        <input
                          type="text"
                          value={formData.name.SI}
                          onChange={(e) => setFormData({ ...formData, name: { ...formData.name, SI: e.target.value } })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                          placeholder="අයිතමයේ නම සිංහලෙන්"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Tamil (TA)</label>
                        <input
                          type="text"
                          value={formData.name.TA}
                          onChange={(e) => setFormData({ ...formData, name: { ...formData.name, TA: e.target.value } })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                          placeholder="உருப்படி பெயர் தமிழில்"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t.admin.items.category}
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t.admin.items.price}
                    </label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                    />
                  </div>

                  {/* Vendor - Multi-language */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      {t.admin.items.vendor}
                    </label>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">English (EN)</label>
                        <input
                          type="text"
                          value={formData.vendor.EN}
                          onChange={(e) => setFormData({ ...formData, vendor: { ...formData.vendor, EN: e.target.value } })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                          placeholder="Vendor name in English"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Sinhala (SI)</label>
                        <input
                          type="text"
                          value={formData.vendor.SI}
                          onChange={(e) => setFormData({ ...formData, vendor: { ...formData.vendor, SI: e.target.value } })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                          placeholder="වෙළෙන්දාගේ නම සිංහලෙන්"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Tamil (TA)</label>
                        <input
                          type="text"
                          value={formData.vendor.TA}
                          onChange={(e) => setFormData({ ...formData, vendor: { ...formData.vendor, TA: e.target.value } })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                          placeholder="விற்பனையாளர் பெயர் தமிழில்"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t.admin.items.imageUrl}
                    </label>
                    <input
                      type="url"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                    />
                  </div>

                  <button
                    onClick={editingId ? handleSave : handleAdd}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#dc143c] text-white font-medium hover:shadow-xl transition-all flex items-center justify-center gap-2"
                  >
                    <Save className="w-5 h-5" />
                    {editingId ? t.admin.items.save : t.admin.items.add}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

