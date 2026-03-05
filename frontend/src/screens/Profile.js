import { motion } from 'framer-motion';
import { User, Trophy, ShoppingBag, Gamepad2, Settings, LogOut, Award, Coins, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';
import { SEO } from '../components/SEO';

export function Profile() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language];

  // Mock user data - in a real app, this would come from a context or API
  const userData = {
    name: 'Saman Perera',
    email: 'saman@avurudu.lk',
    avatar: '👨',
    joinDate: '2024-01-15',
    totalGames: 42,
    totalWins: 28,
    totalScore: 12500,
    bazaarCoins: 350,
    rank: 1,
    level: 5,
  };

  const stats = [
    { icon: Trophy, label: t.profile.gamesPlayed, value: userData.totalGames, color: 'from-[#d4af37] to-[#ffd700]' },
    { icon: Award, label: t.profile.gamesWon, value: userData.totalWins, color: 'from-[#228b22] to-[#32cd32]' },
    { icon: Gamepad2, label: t.profile.totalScore, value: userData.totalScore.toLocaleString(), color: 'from-[#dc143c] to-[#ff6347]' },
    { icon: Coins, label: t.profile.bazaarCoins, value: userData.bazaarCoins, color: 'from-[#d4af37] to-[#dc143c]' },
  ];

  const menuItems = [
    { icon: User, label: t.profile.editProfile, action: () => console.log('Edit Profile') },
    { icon: ShoppingBag, label: t.profile.orderHistory, action: () => console.log('Order History') },
    { icon: Trophy, label: t.profile.achievements, action: () => console.log('Achievements') },
    { icon: Settings, label: t.profile.settings, action: () => console.log('Settings') },
    { icon: LogOut, label: t.profile.logout, action: () => console.log('Logout'), isDanger: true },
  ];

  return (
    <>
      <SEO
        title="User Profile"
        description="View your profile, game scores, achievements, and order history on Avurudu Ulela Digital Village"
        noindex={true}
      />
      <div className="min-h-screen bg-[#fdfdfd] bg-gradient-to-b from-[#fdfdfd] to-[#f5f5f5]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10 md:py-12">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-6 sm:mb-8 text-gray-700 hover:text-[#d4af37] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm sm:text-base">{t.profile.back}</span>
        </motion.button>

        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 sm:mb-12"
        >
          {/* Avatar */}
          <div className="relative inline-block mb-4 sm:mb-6">
            <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-[#228b22] via-[#d4af37] to-[#dc143c] flex items-center justify-center text-5xl sm:text-6xl md:text-7xl shadow-2xl">
              {userData.avatar}
            </div>
            {/* Level Badge */}
            <div className="absolute -bottom-2 -right-2 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-[#d4af37] to-[#dc143c] flex items-center justify-center text-white text-sm sm:text-base md:text-lg font-bold shadow-lg border-4 border-white">
              {userData.level}
            </div>
          </div>

          {/* Name & Email */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">{userData.name}</h1>
          <p className="text-sm sm:text-base text-gray-600 mb-4">{userData.email}</p>

          {/* Rank Badge */}
          <div className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-gradient-to-r from-[#d4af37]/20 to-[#dc143c]/20 border border-[#d4af37]/30">
            <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-[#d4af37]" />
            <span className="text-sm sm:text-base font-medium text-gray-700">
              {t.profile.rank} #{userData.rank}
            </span>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="p-4 sm:p-6 rounded-[1.5rem] sm:rounded-[2rem]"
              style={{
                background: 'linear-gradient(145deg, #ffffff, #f0f0f0)',
                boxShadow: '8px 8px 16px #d9d9d9, -8px -8px 16px #ffffff',
              }}
            >
              <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3 sm:mb-4`}>
                <stat.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#d4af37] to-[#dc143c] bg-clip-text text-transparent mb-1 sm:mb-2">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Menu Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-3 sm:space-y-4 mb-8 sm:mb-12"
        >
          {menuItems.map((item, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.05 }}
              onClick={item.action}
              className={`w-full flex items-center gap-4 sm:gap-6 p-4 sm:p-6 rounded-[1.5rem] sm:rounded-[2rem] transition-all ${
                item.isDanger
                  ? 'hover:bg-red-50 text-red-600'
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
              style={{
                background: item.isDanger
                  ? 'linear-gradient(145deg, #fef2f2, #fee2e2)'
                  : 'linear-gradient(145deg, #ffffff, #f5f5f5)',
                boxShadow: '8px 8px 16px #d9d9d9, -8px -8px 16px #ffffff',
              }}
            >
              <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center ${
                item.isDanger
                  ? 'bg-red-100'
                  : 'bg-gradient-to-br from-[#d4af37]/20 to-[#dc143c]/20'
              }`}>
                <item.icon className={`w-6 h-6 sm:w-7 sm:h-7 ${item.isDanger ? 'text-red-600' : 'text-[#d4af37]'}`} />
              </div>
              <span className="flex-1 text-left text-base sm:text-lg font-medium">{item.label}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Join Date */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-center pt-6 sm:pt-8 border-t border-gray-200"
        >
          <p className="text-xs sm:text-sm text-gray-500">
            {t.profile.memberSince} {new Date(userData.joinDate).toLocaleDateString(
              language === 'SI' ? 'si-LK' : language === 'TA' ? 'ta-LK' : 'en-US',
              {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              }
            )}
          </p>
        </motion.div>
      </div>
    </div>
    </>
  );
}

