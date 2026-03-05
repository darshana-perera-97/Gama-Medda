import { motion } from 'framer-motion';
import { Users, Eye, TrendingUp, ShoppingCart, Trophy, DollarSign } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../translations';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

export function AdminDashboard() {
  const { language } = useLanguage();
  const t = translations[language];

  // Mock analytics data
  const stats = [
    { icon: Users, label: t.admin.dashboard.totalUsers, value: '1,234', change: '+12%', color: 'from-blue-500 to-blue-600' },
    { icon: Eye, label: t.admin.dashboard.totalVisitors, value: '5,678', change: '+8%', color: 'from-green-500 to-green-600' },
    { icon: ShoppingCart, label: t.admin.dashboard.totalOrders, value: '890', change: '+15%', color: 'from-purple-500 to-purple-600' },
    { icon: DollarSign, label: t.admin.dashboard.totalRevenue, value: 'LKR 125K', change: '+23%', color: 'from-[#d4af37] to-[#dc143c]' },
  ];

  const recentActivity = [
    { type: 'order', message: t.admin.dashboard.newOrder, time: '2 min ago', color: 'bg-green-100 text-green-700' },
    { type: 'user', message: t.admin.dashboard.newUser, time: '5 min ago', color: 'bg-blue-100 text-blue-700' },
    { type: 'game', message: t.admin.dashboard.gameCompleted, time: '10 min ago', color: 'bg-purple-100 text-purple-700' },
  ];

  // Visitor data for area chart (last 7 days)
  const visitorData = [
    { day: 'Mon', visitors: 120, users: 85 },
    { day: 'Tue', visitors: 190, users: 140 },
    { day: 'Wed', visitors: 150, users: 110 },
    { day: 'Thu', visitors: 220, users: 165 },
    { day: 'Fri', visitors: 180, users: 135 },
    { day: 'Sat', visitors: 250, users: 190 },
    { day: 'Sun', visitors: 210, users: 160 },
  ];

  // Revenue data for area chart (last 6 months)
  const revenueData = [
    { month: 'Jan', revenue: 45000, orders: 120 },
    { month: 'Feb', revenue: 52000, orders: 145 },
    { month: 'Mar', revenue: 48000, orders: 135 },
    { month: 'Apr', revenue: 61000, orders: 170 },
    { month: 'May', revenue: 55000, orders: 155 },
    { month: 'Jun', revenue: 67000, orders: 185 },
  ];

  // Order status distribution for pie chart
  const orderStatusData = [
    { name: 'Completed', value: 65, color: '#22c55e' },
    { name: 'Pending', value: 20, color: '#eab308' },
    { name: 'Shipped', value: 12, color: '#3b82f6' },
    { name: 'Cancelled', value: 3, color: '#ef4444' },
  ];

  // Category sales for bar chart
  const categoryData = [
    { category: 'Rasa Kavili', sales: 12500, items: 45 },
    { category: 'Clothing', sales: 18900, items: 32 },
    { category: 'Gifts', sales: 9800, items: 28 },
  ];

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="text-sm font-semibold text-gray-900 mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-xs" style={{ color: entry.color }}>
              {entry.name}: <span className="font-semibold">{entry.value}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          {t.admin.dashboard.title}
        </h1>
        <p className="text-gray-600">{t.admin.dashboard.subtitle}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 rounded-2xl bg-white shadow-lg"
            style={{
              background: 'linear-gradient(145deg, #ffffff, #f5f5f5)',
              boxShadow: '8px 8px 16px #d9d9d9, -8px -8px 16px #ffffff',
            }}
          >
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
            <div className="text-sm text-gray-600 mb-2">{stat.label}</div>
            <div className="text-xs text-green-600 font-medium">{stat.change}</div>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Visitor Chart - Area Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-6 rounded-2xl bg-white"
          style={{
            background: 'linear-gradient(145deg, #ffffff, #f5f5f5)',
            boxShadow: '8px 8px 16px #d9d9d9, -8px -8px 16px #ffffff',
          }}
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.admin.dashboard.visitorChart}</h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={visitorData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="visitorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#d4af37" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#dc143c" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="userGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="day" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Area
                type="monotone"
                dataKey="visitors"
                stroke="#d4af37"
                strokeWidth={2}
                fill="url(#visitorGradient)"
                name="Visitors"
              />
              <Area
                type="monotone"
                dataKey="users"
                stroke="#3b82f6"
                strokeWidth={2}
                fill="url(#userGradient)"
                name="Users"
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="p-6 rounded-2xl bg-white"
          style={{
            background: 'linear-gradient(145deg, #ffffff, #f5f5f5)',
            boxShadow: '8px 8px 16px #d9d9d9, -8px -8px 16px #ffffff',
          }}
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.admin.dashboard.recentActivity}</h3>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${activity.color.split(' ')[0]}`} />
                  <span className="text-sm text-gray-700">{activity.message}</span>
                </div>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Additional Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Trend - Area Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="lg:col-span-2 p-6 rounded-2xl bg-white"
          style={{
            background: 'linear-gradient(145deg, #ffffff, #f5f5f5)',
            boxShadow: '8px 8px 16px #d9d9d9, -8px -8px 16px #ffffff',
          }}
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#d4af37" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#dc143c" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} tickFormatter={(value) => `LKR ${value / 1000}K`} />
              <Tooltip
                content={<CustomTooltip />}
                formatter={(value) => `LKR ${value.toLocaleString()}`}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#d4af37"
                strokeWidth={3}
                fill="url(#revenueGradient)"
                name="Revenue"
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Order Status - Pie Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="p-6 rounded-2xl bg-white"
          style={{
            background: 'linear-gradient(145deg, #ffffff, #f5f5f5)',
            boxShadow: '8px 8px 16px #d9d9d9, -8px -8px 16px #ffffff',
          }}
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Status</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={orderStatusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {orderStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Category Sales - Bar Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="p-6 rounded-2xl bg-white"
        style={{
          background: 'linear-gradient(145deg, #ffffff, #f5f5f5)',
          boxShadow: '8px 8px 16px #d9d9d9, -8px -8px 16px #ffffff',
        }}
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Category Sales</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={categoryData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="category" stroke="#6b7280" fontSize={12} />
            <YAxis stroke="#6b7280" fontSize={12} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="sales" fill="#d4af37" name="Sales (LKR)" radius={[8, 8, 0, 0]} />
            <Bar dataKey="items" fill="#3b82f6" name="Items Sold" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}
