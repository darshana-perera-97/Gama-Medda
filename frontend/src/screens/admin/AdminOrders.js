import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, User, Package, Calendar, Search, Filter } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../translations';

export function AdminOrders() {
  const { language } = useLanguage();
  const t = translations[language];
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock orders data
  const orders = [
    {
      id: 'ORD-001',
      userId: 'USR-001',
      userName: 'Saman Perera',
      userEmail: 'saman@example.com',
      items: [
        { name: 'Konda Kavum Bowl', quantity: 2, price: 850 },
        { name: 'Golden Kokis Pack', quantity: 1, price: 650 },
      ],
      total: 2350,
      status: 'pending',
      date: '2024-01-15',
      address: '123 Main St, Colombo',
    },
    {
      id: 'ORD-002',
      userId: 'USR-002',
      userName: 'Nimal Rajapaksa',
      userEmail: 'nimal@example.com',
      items: [
        { name: 'Premium Silk Batik Sarong', quantity: 1, price: 15500 },
      ],
      total: 15500,
      status: 'completed',
      date: '2024-01-14',
      address: '456 Galle Road, Galle',
    },
    {
      id: 'ORD-003',
      userId: 'USR-003',
      userName: 'Kamala Wickramasinghe',
      userEmail: 'kamala@example.com',
      items: [
        { name: 'Handcrafted Brass Oil Lamp', quantity: 3, price: 4200 },
        { name: 'Traditional Aluwa Box', quantity: 2, price: 720 },
      ],
      total: 14040,
      status: 'shipped',
      date: '2024-01-13',
      address: '789 Kandy Road, Kandy',
    },
  ];

  const statuses = ['all', 'pending', 'shipped', 'completed', 'cancelled'];

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-700',
      shipped: 'bg-blue-100 text-blue-700',
      completed: 'bg-green-100 text-green-700',
      cancelled: 'bg-red-100 text-red-700',
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  const totalRevenue = orders.filter(o => o.status === 'completed').reduce((sum, o) => sum + o.total, 0);
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status === 'pending').length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          {t.admin.orders.title}
        </h1>
        <p className="text-gray-600">{t.admin.orders.subtitle}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-6 rounded-xl bg-white shadow-lg">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
              <ShoppingBag className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <div className="text-sm text-gray-600">{t.admin.orders.totalOrders}</div>
              <div className="text-2xl font-bold text-gray-900">{totalOrders}</div>
            </div>
          </div>
        </div>
        <div className="p-6 rounded-xl bg-white shadow-lg">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center">
              <Package className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <div className="text-sm text-gray-600">{t.admin.orders.pendingOrders}</div>
              <div className="text-2xl font-bold text-gray-900">{pendingOrders}</div>
            </div>
          </div>
        </div>
        <div className="p-6 rounded-xl bg-white shadow-lg">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
              <Package className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <div className="text-sm text-gray-600">{t.admin.orders.totalRevenue}</div>
              <div className="text-2xl font-bold bg-gradient-to-r from-[#d4af37] to-[#dc143c] bg-clip-text text-transparent">
                LKR {totalRevenue.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            <Search className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t.admin.orders.searchPlaceholder}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-transparent"
          />
        </div>
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            <Filter className="w-5 h-5 text-gray-400" />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="pl-12 pr-10 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-transparent appearance-none bg-white"
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status === 'all' ? t.admin.orders.allStatuses : t.admin.orders[status]}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order, index) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              {/* Order Info */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{order.id}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {new Date(order.date).toLocaleDateString()}
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {t.admin.orders[order.status]}
                      </span>
                    </div>
                  </div>
                </div>

                {/* User Info */}
                <div className="mb-4 p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3 mb-2">
                    <User className="w-5 h-5 text-gray-600" />
                    <div>
                      <div className="font-medium text-gray-900">{order.userName}</div>
                      <div className="text-sm text-gray-600">{order.userEmail}</div>
                      <div className="text-sm text-gray-600">{order.address}</div>
                    </div>
                  </div>
                </div>

                {/* Items */}
                <div className="space-y-2">
                  <div className="text-sm font-medium text-gray-700 mb-2">{t.admin.orders.items}:</div>
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        {item.name} × {item.quantity}
                      </span>
                      <span className="font-medium">LKR {item.price.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total & Actions */}
              <div className="lg:w-48 flex flex-col justify-between">
                <div className="mb-4">
                  <div className="text-sm text-gray-600 mb-1">{t.admin.orders.total}</div>
                  <div className="text-2xl font-bold bg-gradient-to-r from-[#d4af37] to-[#dc143c] bg-clip-text text-transparent">
                    LKR {order.total.toLocaleString()}
                  </div>
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  {t.admin.orders.itemCount}: {order.items.reduce((sum, item) => sum + item.quantity, 0)}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

