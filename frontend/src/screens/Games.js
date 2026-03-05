import { motion } from 'framer-motion';
import { Play, Trophy, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';
import { SEO } from '../components/SEO';

export function Games() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language];

  const games = [
    {
      id: 1,
      name: t.games.gameNames.elephant,
      description: t.games.gameDescriptions.elephant,
      icon: '🐘',
      path: '/game/elephant',
      color: 'from-[#d4af37] to-[#228b22]',
      difficulty: t.games.difficultyLevels.medium,
      playTime: '2-3 min',
      players: '1',
    },
    {
      id: 2,
      name: t.games.gameNames.pots,
      description: t.games.gameDescriptions.pots,
      icon: '🏺',
      path: '/game/pots',
      color: 'from-[#dc143c] to-[#d4af37]',
      difficulty: t.games.difficultyLevels.hard,
      playTime: '3-5 min',
      players: '1',
    },
    {
      id: 3,
      name: t.games.gameNames.pole,
      description: t.games.gameDescriptions.pole,
      icon: '🪵',
      path: '/game/pole',
      color: 'from-[#228b22] to-[#dc143c]',
      difficulty: t.games.difficultyLevels.hard,
      playTime: '2-4 min',
      players: '1',
    },
    {
      id: 4,
      name: t.games.gameNames.pillow,
      description: t.games.gameDescriptions.pillow,
      icon: '🛏️',
      path: '/game/pillow',
      color: 'from-[#d4af37] to-[#dc143c]',
      difficulty: t.games.difficultyLevels.medium,
      playTime: '3-5 min',
      players: '1v1',
    },
  ];

  const getDifficultyColor = (difficulty) => {
    if (difficulty === t.games.difficultyLevels.hard) return 'text-[#dc143c]';
    if (difficulty === t.games.difficultyLevels.medium) return 'text-[#d4af37]';
    return 'text-[#228b22]';
  };

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Game',
    name: 'Traditional New Year Games',
    description: 'Play traditional Sinhala and Tamil New Year games online',
    url: 'https://avuruduulela.lk/games',
  };

  return (
    <>
      <SEO
        title="Traditional Games"
        description="Play traditional Sinhala and Tamil New Year games online including Aliyata Asa Thabeema (Elephant Game), Kana Mutti Bindeema (Pot Breaking), Lissana Gaha (Greased Pole), and Kotta Pora (Pillow Fight)."
        keywords="Traditional games, New Year games, Elephant game, Pot breaking game, Greased pole, Pillow fight, Sinhala games, Tamil games"
        structuredData={structuredData}
      />
      <div className="min-h-screen bg-[#fdfdfd] bg-gradient-to-b from-[#fdfdfd] to-[#f5f5f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 sm:mb-16 text-center"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl mb-2 sm:mb-3 text-gray-900">{t.games.title}</h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600">
            Experience the joy of Avurudu through interactive traditional games
          </p>
        </motion.div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8">
          {games.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden cursor-pointer"
              onClick={() => navigate(game.path)}
              style={{
                background: 'linear-gradient(145deg, #ffffff, #f5f5f5)',
                boxShadow: '16px 16px 32px #d9d9d9, -16px -16px 32px #ffffff',
              }}
            >
              {/* Gradient Overlay on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${game.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

              {/* Content */}
              <div className="relative z-10 p-6 sm:p-8">
                {/* Icon and Title */}
                <div className="flex items-start gap-4 sm:gap-6 mb-4 sm:mb-6">
                  <div
                    className={`w-16 h-16 sm:w-20 sm:h-20 rounded-[1.5rem] bg-gradient-to-br ${game.color} flex items-center justify-center text-3xl sm:text-4xl shadow-lg flex-shrink-0`}
                  >
                    {game.icon}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl sm:text-2xl md:text-3xl mb-2 text-gray-900">{game.name}</h2>
                    <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">{game.description}</p>
                  </div>
                </div>

                {/* Game Info */}
                <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-6 sm:mb-8">
                  <div className="flex items-center gap-2">
                    <Trophy className={`w-4 h-4 sm:w-5 sm:h-5 ${getDifficultyColor(game.difficulty)}`} />
                    <span className={`text-xs sm:text-sm font-medium ${getDifficultyColor(game.difficulty)}`}>
                      {game.difficulty}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                    <span className="text-xs sm:text-sm text-gray-600">{game.playTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs sm:text-sm text-gray-600">👥 {game.players}</span>
                  </div>
                </div>

                {/* Play Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-3 sm:py-4 rounded-[1.5rem] bg-gradient-to-r ${game.color} text-white flex items-center justify-center gap-2 sm:gap-3 shadow-xl hover:shadow-2xl transition-all group/btn`}
                >
                  <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-sm sm:text-base font-medium">{t.games.play}</span>
                  <motion.div
                    className="opacity-0 group-hover/btn:opacity-100 transition-opacity"
                    initial={{ x: -5 }}
                    whileHover={{ x: 5 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  >
                    →
                  </motion.div>
                </motion.button>
              </div>

              {/* Decorative Corner */}
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${game.color} opacity-5 rounded-bl-[3rem]`} />
            </motion.div>
          ))}
        </div>

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 sm:mt-16 p-6 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] text-center"
          style={{
            background: 'linear-gradient(145deg, #ffffff, #f5f5f5)',
            boxShadow: '12px 12px 24px #d9d9d9, -12px -12px 24px #ffffff',
          }}
        >
          <h3 className="text-xl sm:text-2xl mb-3 sm:mb-4 text-gray-900">About Traditional Games</h3>
          <p className="text-sm sm:text-base text-gray-600 max-w-3xl mx-auto">
            These games are an integral part of Sinhalese New Year celebrations. Each game tests different skills
            - precision, timing, rhythm, and balance. Play to earn Bazaar Coins and compete on the leaderboard!
          </p>
        </motion.div>

        <div className="h-8 sm:h-16" />
      </div>
    </div>
    </>
  );
}

