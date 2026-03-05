import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Trophy, ArrowRight, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';
import { SEO } from '../components/SEO';

export function Dashboard() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language];
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Countdown to April 14, 2026
  useEffect(() => {
    const targetDate = new Date('2026-04-14T00:00:00').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  const nakathTimes = [
    { time: '06:42 AM', event: t.dashboard.nakathEvents.firstTransaction, status: 'completed' },
    { time: '09:42 AM', event: t.dashboard.nakathEvents.lightHearth, status: 'active' },
    { time: '11:32 AM', event: t.dashboard.nakathEvents.milkRice, status: 'upcoming' },
    { time: '02:18 PM', event: t.dashboard.nakathEvents.workCommencement, status: 'upcoming' },
    { time: '04:45 PM', event: t.dashboard.nakathEvents.anointingOil, status: 'upcoming' },
  ];

  const games = [
    { id: 1, name: t.dashboard.gameNames.elephant, icon: '🐘', path: '/game/elephant', color: 'from-[#d4af37] to-[#228b22]' },
    { id: 2, name: t.dashboard.gameNames.pots, icon: '🏺', path: '/game/pots', color: 'from-[#dc143c] to-[#d4af37]' },
    { id: 3, name: t.dashboard.gameNames.pole, icon: '🪵', path: '/game/pole', color: 'from-[#228b22] to-[#dc143c]' },
    { id: 4, name: t.dashboard.gameNames.pillow, icon: '🛏️', path: '/game/pillow', color: 'from-[#d4af37] to-[#dc143c]' },
  ];

  const leaderboard = [
    { rank: 1, name: t.dashboard.leaderboardPlayers.player1, score: 2850, avatar: '👨', badge: 'gold' },
    { rank: 2, name: t.dashboard.leaderboardPlayers.player2, score: 2650, avatar: '👨', badge: 'silver' },
    { rank: 3, name: t.dashboard.leaderboardPlayers.player3, score: 2400, avatar: '👩', badge: 'bronze' },
  ];

  const getBadgeColor = (badge) => {
    if (badge === 'gold') return 'bg-gradient-to-br from-[#d4af37] to-[#ffd700]';
    if (badge === 'silver') return 'bg-gradient-to-br from-gray-300 to-gray-400';
    return 'bg-gradient-to-br from-[#dc143c] to-[#ff6347]';
  };

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Avurudu Ulela - Digital Village',
    description: 'Experience the rich traditions of Sinhala and Tamil New Year with Avurudu Ulela - Digital Village',
    url: 'https://avuruduulela.lk',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://avuruduulela.lk/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <>
      <SEO
        title="Home"
        description="Experience the rich traditions of Sinhala and Tamil New Year. Shop traditional items, play traditional games, explore recipes, and celebrate the festival online with Avurudu Ulela Digital Village."
        keywords="Sinhala New Year, Tamil New Year, Avurudu, Sri Lanka, Traditional Games, Traditional Food, Bazaar, Culture, Recipes, Nakath Times, New Year Celebration"
        structuredData={structuredData}
      />
      <div className="min-h-screen bg-[#fdfdfd] bg-gradient-to-b from-[#fdfdfd] to-[#f5f5f5]">
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 py-12 sm:py-16 md:py-20 overflow-hidden">
        {/* Geometric Sun Background */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5">
          <div className="w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] md:w-[600px] md:h-[600px] rounded-full bg-gradient-to-br from-[#d4af37] via-[#dc143c] to-[#228b22]" 
               style={{ 
                 filter: 'blur(60px)',
               }}
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8 sm:mb-12"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-4 sm:mb-6 text-gray-900 tracking-tight px-2">
              {t.dashboard.title}
            </h1>

            {/* Countdown Timer with Neumorphism */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 md:gap-8 mb-8 sm:mb-12 px-2">
              {[
                { label: t.dashboard.days, value: timeLeft.days },
                { label: t.dashboard.hours, value: timeLeft.hours },
                { label: t.dashboard.minutes, value: timeLeft.minutes },
                { label: t.dashboard.seconds, value: timeLeft.seconds },
              ].map((unit) => (
                <div
                  key={unit.label}
                  className="flex flex-col items-center p-4 sm:p-6 md:p-8 rounded-[1.5rem] sm:rounded-[2rem] min-w-[70px] sm:min-w-[90px] md:min-w-[110px]"
                  style={{
                    background: 'linear-gradient(145deg, #ffffff, #f0f0f0)',
                    boxShadow: '8px 8px 16px #d9d9d9, -8px -8px 16px #ffffff',
                  }}
                >
                  <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl bg-gradient-to-br from-[#d4af37] to-[#dc143c] bg-clip-text text-transparent tabular-nums">
                    {String(unit.value).padStart(2, '0')}
                  </span>
                  <span className="text-xs sm:text-sm text-gray-600 mt-2 sm:mt-3">{unit.label}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => navigate('/bazaar')}
              className="group px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 rounded-[1.5rem] sm:rounded-[2rem] bg-gradient-to-r from-[#d4af37] to-[#dc143c] text-white hover:shadow-2xl transition-all shadow-xl flex items-center gap-2 sm:gap-3 mx-auto relative overflow-hidden text-sm sm:text-base"
            >
              <span className="relative z-10">{t.dashboard.exploreBazaar}</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#dc143c] to-[#d4af37] opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Bento Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-12 sm:pb-16 md:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Nakath Times Timeline - Large Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1 p-6 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem]"
            style={{
              background: 'linear-gradient(145deg, #ffffff, #f5f5f5)',
              boxShadow: '12px 12px 24px #d9d9d9, -12px -12px 24px #ffffff',
            }}
          >
            <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-[1.5rem] bg-gradient-to-br from-[#228b22]/20 to-[#d4af37]/20 flex items-center justify-center">
                <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-[#228b22]" />
              </div>
              <h2 className="text-xl sm:text-2xl text-gray-900">{t.dashboard.nakathTimes}</h2>
            </div>

            <div className="space-y-4 sm:space-y-6">
              {nakathTimes.map((item, index) => (
                <div key={index} className="flex gap-3 sm:gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full ${
                        item.status === 'completed'
                          ? 'bg-[#228b22] shadow-lg'
                          : item.status === 'active'
                          ? 'bg-[#d4af37] animate-pulse shadow-lg'
                          : 'bg-gray-300'
                      }`}
                    />
                    {index < nakathTimes.length - 1 && (
                      <div className="w-0.5 h-10 sm:h-14 bg-gradient-to-b from-gray-300 to-gray-200 mt-2" />
                    )}
                  </div>
                  <div className="flex-1 pb-3 sm:pb-4">
                    <div className="text-xs sm:text-sm text-[#d4af37]">{item.time}</div>
                    <div className="text-xs sm:text-sm text-gray-700 mt-1">{item.event}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            {/* Game Preview Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-6 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem]"
              style={{
                background: 'linear-gradient(145deg, #ffffff, #f5f5f5)',
                boxShadow: '12px 12px 24px #d9d9d9, -12px -12px 24px #ffffff',
              }}
            >
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-[1.5rem] bg-gradient-to-br from-[#dc143c]/20 to-[#d4af37]/20 flex items-center justify-center">
                    <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-[#dc143c]" />
                  </div>
                  <h2 className="text-xl sm:text-2xl text-gray-900">{t.dashboard.traditionalGames}</h2>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                {games.map((game) => (
                  <motion.button
                    key={game.id}
                    onClick={() => navigate(game.path)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative p-4 sm:p-6 rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden"
                    style={{
                      background: 'linear-gradient(145deg, #ffffff, #f5f5f5)',
                      boxShadow: '8px 8px 16px #d9d9d9, -8px -8px 16px #ffffff',
                    }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${game.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="text-3xl sm:text-4xl md:text-5xl mb-2 sm:mb-3 transform group-hover:scale-110 transition-transform">{game.icon}</div>
                      <h3 className="text-xs sm:text-sm text-gray-900 mb-1 sm:mb-2 text-center">{game.name}</h3>
                      <Play className="w-4 h-4 sm:w-5 sm:h-5 text-[#d4af37] opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Live Leaderboard */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="p-6 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem]"
              style={{
                background: 'linear-gradient(145deg, #ffffff, #f5f5f5)',
                boxShadow: '12px 12px 24px #d9d9d9, -12px -12px 24px #ffffff',
              }}
            >
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-[1.5rem] bg-gradient-to-br from-[#d4af37]/20 to-[#dc143c]/20 flex items-center justify-center">
                    <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-[#d4af37]" />
                  </div>
                  <h2 className="text-xl sm:text-2xl text-gray-900">{t.dashboard.leaderboard}</h2>
                </div>
              </div>

              <div className="space-y-3 sm:space-y-4">
                {leaderboard.map((player) => (
                  <div
                    key={player.rank}
                    className="flex items-center justify-between p-4 sm:p-5 rounded-[1.5rem]"
                    style={{
                      background: 'linear-gradient(145deg, #fafafa, #f0f0f0)',
                      boxShadow: '6px 6px 12px #d9d9d9, -6px -6px 12px #ffffff',
                    }}
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div
                        className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm text-white ${getBadgeColor(
                          player.badge
                        )} shadow-lg`}
                      >
                        {player.rank}
                      </div>
                      <span className="text-2xl sm:text-3xl">{player.avatar}</span>
                      <div>
                        <div className="text-xs sm:text-sm text-gray-900">{player.name}</div>
                        <div className="text-[10px] sm:text-xs text-gray-600">{player.score} {t.dashboard.score}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}

