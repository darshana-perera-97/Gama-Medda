import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, RotateCcw, Trophy, ArrowLeft, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../translations';

export function PoleGame() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language];
  const [position, setPosition] = useState(10); // Start at bottom (10%)
  const [grip, setGrip] = useState(100);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [lastTap, setLastTap] = useState(null);
  const [isSliding, setIsSliding] = useState(false);

  // Grip depletes over time
  useEffect(() => {
    if (gameOver || showResult) return;

    const interval = setInterval(() => {
      setGrip((prev) => {
        const newGrip = Math.max(0, prev - 1);
        if (newGrip === 0) {
          setIsSliding(true);
          setTimeout(() => {
            setGameOver(true);
            setShowResult(true);
          }, 1000);
        }
        return newGrip;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [gameOver, showResult]);

  const handleTap = (direction) => {
    if (gameOver || isSliding) return;

    // Correct alternating pattern
    if (lastTap === null || lastTap !== direction) {
      setPosition((prev) => {
        const newPos = Math.min(90, prev + 5);
        if (newPos >= 90) {
          setGameOver(true);
          setShowResult(true);
          setScore(1000);
        }
        return newPos;
      });
      setGrip((prev) => Math.min(100, prev + 5)); // Reward correct tap
      setLastTap(direction);
    } else {
      // Wrong pattern - penalty
      setGrip((prev) => Math.max(0, prev - 10));
    }
  };

  const handlePlayAgain = () => {
    setPosition(10);
    setGrip(100);
    setScore(0);
    setShowResult(false);
    setGameOver(false);
    setLastTap(null);
    setIsSliding(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdfdfd] via-[#f5f5f5] to-[#fdfdfd] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-[#228b22] rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-[#d4af37] rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 sm:mb-8">
          <button
            onClick={() => navigate('/')}
            className="p-3 rounded-[1.5rem] bg-white/80 backdrop-blur-sm hover:bg-white transition-all shadow-lg"
          >
            <Home className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        {/* Game Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6 sm:mb-8"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl mb-2 text-gray-900">{t.poleGame.title}</h1>
          <p className="text-sm sm:text-base text-gray-600">{t.poleGame.subtitle}</p>
        </motion.div>

        {/* Game Stage - Vertical Pole */}
        <div className="relative max-w-2xl mx-auto mb-8 sm:mb-12 h-[400px] sm:h-[600px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative h-full p-4 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] flex justify-center"
            style={{
              background: 'linear-gradient(145deg, #ffffff, #f5f5f5)',
              boxShadow: '16px 16px 32px #d9d9d9, -16px -16px 32px #ffffff',
            }}
          >
            {/* Pole */}
            <div className="relative w-12 sm:w-16">
              <div
                className="absolute inset-x-0 top-0 bottom-0 rounded-full"
                style={{
                  background: 'linear-gradient(180deg, #8b4513 0%, #654321 100%)',
                  boxShadow: 'inset -4px 0 8px rgba(0,0,0,0.3), inset 4px 0 8px rgba(255,255,255,0.1)',
                }}
              />

              {/* Target at top */}
              <div className="absolute -top-6 sm:-top-8 left-1/2 transform -translate-x-1/2">
                <div className="text-3xl sm:text-4xl">🏆</div>
              </div>

              {/* Progress markers */}
              {[25, 50, 75].map((marker) => (
                <div
                  key={marker}
                  className="absolute left-full ml-2 sm:ml-4 text-[10px] sm:text-xs text-gray-500"
                  style={{ top: `${100 - marker}%` }}
                >
                  {marker}%
                </div>
              ))}

              {/* Climber Avatar */}
              <motion.div
                animate={{
                  bottom: `${isSliding ? 0 : position}%`,
                }}
                transition={{
                  type: isSliding ? 'tween' : 'spring',
                  stiffness: 300,
                  damping: 20,
                }}
                className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              >
                <motion.div
                  animate={{
                    rotate: isSliding ? [0, -10, 10, 0] : 0,
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: isSliding ? Infinity : 0,
                  }}
                  className="text-4xl sm:text-5xl"
                >
                  🧗
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Controls - Alternating Buttons */}
        <div className="flex justify-center gap-4 sm:gap-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleTap('left')}
            disabled={gameOver || isSliding}
            className={`p-6 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] text-white shadow-2xl transition-all ${
              gameOver || isSliding
                ? 'bg-gray-400 cursor-not-allowed'
                : lastTap === 'right'
                ? 'bg-gradient-to-r from-[#228b22] to-[#d4af37]'
                : 'bg-gradient-to-r from-[#dc143c] to-[#d4af37]'
            }`}
          >
            <ArrowLeft className="w-8 h-8 sm:w-12 sm:h-12" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleTap('right')}
            disabled={gameOver || isSliding}
            className={`p-6 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] text-white shadow-2xl transition-all ${
              gameOver || isSliding
                ? 'bg-gray-400 cursor-not-allowed'
                : lastTap === 'left'
                ? 'bg-gradient-to-r from-[#228b22] to-[#d4af37]'
                : 'bg-gradient-to-r from-[#dc143c] to-[#d4af37]'
            }`}
          >
            <ArrowRight className="w-8 h-8 sm:w-12 sm:h-12" />
          </motion.button>
        </div>

        <div className="text-center mt-4 sm:mt-6 text-xs sm:text-base text-gray-600 px-4">
          {t.poleGame.alternateClimb}
        </div>
      </div>

      {/* Fixed Scoreboard at Bottom */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed bottom-0 left-0 right-0 z-30 flex justify-center p-4 sm:p-6"
      >
        <div className="flex items-center gap-4 sm:gap-6 px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-t-[1.5rem] sm:rounded-t-[2rem] bg-white/90 backdrop-blur-xl border-t border-x border-white/50 shadow-2xl max-w-md w-full">
          <div className="text-center flex-1">
            <div className="text-[10px] sm:text-xs text-gray-600 mb-2">{t.poleGame.gripStrength}</div>
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 mx-auto">
              <svg className="transform -rotate-90 w-16 h-16 sm:w-20 sm:h-20">
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  className="sm:hidden"
                  stroke="#e0e0e0"
                  strokeWidth="4"
                  fill="none"
                />
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  className="sm:hidden"
                  stroke="url(#gripGradient)"
                  strokeWidth="4"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 28}`}
                  strokeDashoffset={`${2 * Math.PI * 28 * (1 - grip / 100)}`}
                  strokeLinecap="round"
                  style={{ transition: 'all 0.3s' }}
                />
                <circle
                  cx="40"
                  cy="40"
                  r="36"
                  className="hidden sm:block"
                  stroke="#e0e0e0"
                  strokeWidth="6"
                  fill="none"
                />
                <circle
                  cx="40"
                  cy="40"
                  r="36"
                  className="hidden sm:block"
                  stroke="url(#gripGradient)"
                  strokeWidth="6"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 36}`}
                  strokeDashoffset={`${2 * Math.PI * 36 * (1 - grip / 100)}`}
                  strokeLinecap="round"
                  style={{ transition: 'all 0.3s' }}
                />
                <defs>
                  <linearGradient id="gripGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#228b22" />
                    <stop offset="100%" stopColor="#d4af37" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-base sm:text-lg md:text-xl bg-gradient-to-r from-[#228b22] to-[#d4af37] bg-clip-text text-transparent">
                  {grip}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Result Modal */}
      <AnimatePresence>
        {showResult && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-md z-40"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              className="fixed inset-0 flex items-center justify-center z-50 p-4 sm:p-6"
            >
              <div
                className="w-full max-w-md p-6 sm:p-10 rounded-[1.5rem] sm:rounded-[2rem] text-center"
                style={{
                  background: 'linear-gradient(145deg, #ffffff, #f5f5f5)',
                  boxShadow: '24px 24px 48px #d9d9d9, -24px -24px 48px #ffffff',
                }}
              >
                <div className="text-5xl sm:text-7xl mb-4 sm:mb-6">
                  {position >= 90 ? '🎉' : position >= 50 ? '💪' : '😓'}
                </div>
                <h2 className="text-2xl sm:text-4xl mb-3 sm:mb-4 text-gray-900">
                  {position >= 90 ? t.poleGame.youWon : position >= 50 ? t.poleGame.youWon : t.poleGame.youLost}
                </h2>
                <div className="mb-4 sm:mb-6">
                  <div className="text-4xl sm:text-6xl bg-gradient-to-r from-[#228b22] to-[#d4af37] bg-clip-text text-transparent mb-2">
                    {position}%
                  </div>
                  <div className="text-sm sm:text-base text-gray-600">Height Reached</div>
                </div>
                <div className="flex items-center justify-center gap-3 mb-6 sm:mb-8 px-4 sm:px-6 py-3 sm:py-4 rounded-[1.5rem] bg-[#d4af37]/10">
                  <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-[#d4af37]" />
                  <span className="text-lg sm:text-xl text-gray-900">
                    +{Math.round(position * 10)} Bazaar Coins
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <button
                    onClick={handlePlayAgain}
                    className="flex-1 py-3 sm:py-4 rounded-[1.5rem] bg-gradient-to-r from-[#228b22] to-[#d4af37] text-white hover:shadow-xl transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
                  >
                    <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
                    Play Again
                  </button>
                  <button
                    onClick={() => navigate('/')}
                    className="flex-1 py-3 sm:py-4 rounded-[1.5rem] bg-white text-gray-700 hover:shadow-xl transition-all text-sm sm:text-base"
                    style={{
                      boxShadow: '8px 8px 16px #d9d9d9, -8px -8px 16px #ffffff',
                    }}
                  >
                    {t.poleGame.home}
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

